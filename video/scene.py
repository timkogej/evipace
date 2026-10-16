"""Build the whole 3D set, animation and cameras, then save scene.blend.

Run: blender -b -P video/scene.py
Render: blender -b video/out/scene.blend -o video/out/frames/f_#### -f 40
"""

import json
import math
import os
import random
import sys

import bpy
from mathutils import Euler, Matrix, Vector

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import timeline as TL  # noqa: E402
from timeline import frame  # noqa: E402

TEX = os.path.join(HERE, "tex")
OUT = os.path.join(HERE, "out")
rnd = random.Random(11)

# --------------------------------------------------------------------------
# Reset
# --------------------------------------------------------------------------
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
scene.render.fps = TL.FPS
scene.frame_start = 1
scene.frame_end = TL.FRAMES
scene.render.resolution_x = 1080
scene.render.resolution_y = 1080
scene.render.engine = "BLENDER_EEVEE"
ee = scene.eevee
ee.taa_render_samples = 48
for attr, val in [("use_raytracing", True), ("use_shadows", True), ("volumetric_tile_size", "2"),
                  ("volumetric_samples", 64), ("volumetric_end", 9.0), ("use_volumetric_shadows", True),
                  ("volumetric_shadow_samples", 32), ("shadow_ray_count", 2), ("shadow_step_count", 8),
                  ("use_shadow_jitter_viewport", False), ("fast_gi_method", "GLOBAL_ILLUMINATION")]:
    try:
        setattr(ee, attr, val)
    except Exception as e:  # noqa: BLE001
        print("eevee skip", attr, e)
scene.render.use_motion_blur = True
scene.render.motion_blur_shutter = 0.45
scene.view_settings.view_transform = "AgX"
try:
    scene.view_settings.look = "AgX - Medium High Contrast"
except Exception:  # noqa: BLE001
    pass
scene.view_settings.exposure = 0.0
scene.render.image_settings.file_format = "PNG"
scene.render.image_settings.color_mode = "RGB"
scene.render.film_transparent = False


# --------------------------------------------------------------------------
# Helpers
# --------------------------------------------------------------------------
def key(owner, path, t, value, index=-1):
    """Set owner.path = value and keyframe it at video time t."""
    if isinstance(owner, bpy.types.Object) and path.startswith("modifiers"):
        owner.path_resolve(path)  # validate
        obj_mod, prop = path.rsplit(".", 1)
        setattr(owner.path_resolve(obj_mod), prop, value)
    else:
        setattr(owner, path, value)
    owner.keyframe_insert(data_path=path, frame=frame(t), index=index)


def key_input(node_input, t, value):
    node_input.default_value = value
    node_input.keyframe_insert("default_value", frame=frame(t))


def link(obj, coll=None):
    (coll or scene.collection).objects.link(obj)
    return obj


def quad(name, w, h, origin="center", subdiv=(1, 1)):
    """Flat quad in XY with UVs. origin: center | left | bottom."""
    nx, ny = subdiv
    ox = {"left": 0.0}.get(origin, -w / 2)
    oy = {"bottom": 0.0}.get(origin, -h / 2)
    verts, faces, uvs = [], [], []
    for j in range(ny + 1):
        for i in range(nx + 1):
            verts.append((ox + w * i / nx, oy + h * j / ny, 0.0))
    for j in range(ny):
        for i in range(nx):
            a = j * (nx + 1) + i
            faces.append((a, a + 1, a + nx + 2, a + nx + 1))
    me = bpy.data.meshes.new(name)
    me.from_pydata(verts, [], faces)
    uv = me.uv_layers.new(name="UVMap")
    for poly in me.polygons:
        for li in poly.loop_indices:
            v = me.vertices[me.loops[li].vertex_index].co
            uv.data[li].uv = ((v.x - ox) / w, (v.y - oy) / h)
    me.update()
    return link(bpy.data.objects.new(name, me))


def prim(kind, name, **kw):
    getattr(bpy.ops.mesh, f"primitive_{kind}_add")(**kw)
    o = bpy.context.active_object
    o.name = name
    return o


def smooth(o):
    for p in o.data.polygons:
        p.use_smooth = True


def mat_principled(name, color=(0.8, 0.8, 0.8), rough=0.5, metal=0.0, image=None, emission=None,
                   estrength=0.0, coat=0.0, bump=None, generated=False):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    p = nt.nodes["Principled BSDF"]
    p.inputs["Base Color"].default_value = (*color, 1)
    p.inputs["Roughness"].default_value = rough
    p.inputs["Metallic"].default_value = metal
    if coat:
        p.inputs["Coat Weight"].default_value = coat
        p.inputs["Coat Roughness"].default_value = 0.25
    if image:
        tx = nt.nodes.new("ShaderNodeTexImage")
        tx.image = image if isinstance(image, bpy.types.Image) else bpy.data.images.load(image)
        tx.interpolation = "Cubic"
        if generated:
            tc = nt.nodes.new("ShaderNodeTexCoord")
            nt.links.new(tc.outputs["Generated"], tx.inputs["Vector"])
        nt.links.new(tx.outputs["Color"], p.inputs["Base Color"])
        if bump:
            b = nt.nodes.new("ShaderNodeBump")
            b.inputs["Strength"].default_value = bump
            b.inputs["Distance"].default_value = 0.002
            nt.links.new(tx.outputs["Color"], b.inputs["Height"])
            nt.links.new(b.outputs["Normal"], p.inputs["Normal"])
        m["tex"] = tx.name
    if emission is not None:
        p.inputs["Emission Color"].default_value = (*emission, 1)
        p.inputs["Emission Strength"].default_value = estrength
    return m


def assign(o, m):
    o.data.materials.clear()
    o.data.materials.append(m)
    return o


def between(name, a, b, r, mat):
    a, b = Vector(a), Vector(b)
    d = b - a
    o = prim("cylinder", name, radius=r, depth=d.length, location=(a + b) / 2, vertices=24)
    o.rotation_mode = "QUATERNION"
    o.rotation_quaternion = d.to_track_quat("Z", "Y")
    smooth(o)
    return assign(o, mat)


def look_quat(src, dst):
    return (Vector(dst) - Vector(src)).to_track_quat("-Z", "Y")


DESK_Z = 0.75

# --------------------------------------------------------------------------
# Materials
# --------------------------------------------------------------------------
img = lambda n: bpy.data.images.load(os.path.join(TEX, n))  # noqa: E731
M_WOOD = mat_principled("Walnut", rough=0.38, image=os.path.join(TEX, "wood.jpg"), coat=0.35, bump=0.25)
M_WALL = mat_principled("Wall", color=(0.028, 0.032, 0.031), rough=0.92)
M_FLOOR = mat_principled("Floor", color=(0.015, 0.014, 0.013), rough=0.6)
M_ALU = mat_principled("SpaceGray", color=(0.055, 0.06, 0.065), rough=0.32, metal=0.85)
M_KEYS = mat_principled("Keys", color=(0.012, 0.013, 0.014), rough=0.55)
M_LAMP = mat_principled("LampMetal", color=(0.03, 0.04, 0.036), rough=0.42, metal=0.6)
M_BRASS = mat_principled("Brass", color=(0.55, 0.38, 0.18), rough=0.3, metal=1.0)
M_CERAMIC = mat_principled("Ceramic", color=(0.78, 0.76, 0.7), rough=0.18)
M_COFFEE = mat_principled("Coffee", color=(0.025, 0.012, 0.006), rough=0.05)
M_NOTEBOOK = mat_principled("Notebook", color=(0.035, 0.07, 0.06), rough=0.7)
M_FOLDER = mat_principled("Folder", color=(0.045, 0.06, 0.055), rough=0.62)
M_ORANGE = mat_principled("Orange", color=(1.0, 0.2, 0.0), rough=0.35, emission=(1.0, 0.22, 0.0), estrength=0.25)
M_FRAME = mat_principled("WindowFrame", color=(0.02, 0.022, 0.022), rough=0.5)


def paper_mat(name, tex_name):
    m = mat_principled("Paper_" + name, image=os.path.join(TEX, tex_name), rough=0.62)
    p = m.node_tree.nodes["Principled BSDF"]
    try:
        p.inputs["Subsurface Weight"].default_value = 0.05
    except KeyError:
        pass
    return m


# --------------------------------------------------------------------------
# Room
# --------------------------------------------------------------------------
desk = assign(prim("cube", "Desk", size=1, location=(0, 0, DESK_Z - 0.02)), M_WOOD)
desk.scale = (1.8, 0.9, 0.04)
bpy.ops.object.transform_apply(scale=True)
bpy.ops.object.modifier_add(type="BEVEL")
desk.modifiers["Bevel"].width = 0.006
desk.modifiers["Bevel"].segments = 3
for x in (-0.85, 0.85):
    for y in (-0.4, 0.4):
        leg = assign(prim("cube", "Leg", size=1, location=(x, y, (DESK_Z - 0.04) / 2)), M_FLOOR)
        leg.scale = (0.05, 0.05, DESK_Z - 0.04)

floor = assign(prim("plane", "Floor", size=12, location=(0, 0, 0)), M_FLOOR)

WALL_Y = 1.15
WIN = dict(x0=0.35, x1=1.45, z0=1.05, z1=2.25)  # window opening


def wall_box(name, x0, x1, z0, z1):
    o = assign(prim("cube", name, size=1, location=((x0 + x1) / 2, WALL_Y + 0.05, (z0 + z1) / 2)), M_WALL)
    o.scale = (x1 - x0, 0.1, z1 - z0)


wall_box("WallLeft", -4, WIN["x0"], 0, 4)
wall_box("WallRight", WIN["x1"], 4, 0, 4)
wall_box("WallBottom", WIN["x0"], WIN["x1"], 0, WIN["z0"])
wall_box("WallTop", WIN["x0"], WIN["x1"], WIN["z1"], 4)
# mullions
for xm in (WIN["x0"] + 0.02, (WIN["x0"] + WIN["x1"]) / 2, WIN["x1"] - 0.02):
    o = assign(prim("cube", "Mullion", size=1, location=(xm, WALL_Y + 0.02, (WIN["z0"] + WIN["z1"]) / 2)), M_FRAME)
    o.scale = (0.035, 0.06, WIN["z1"] - WIN["z0"])
for zm in (WIN["z0"] + 0.02, (WIN["z0"] + WIN["z1"]) / 2, WIN["z1"] - 0.02):
    o = assign(prim("cube", "Transom", size=1, location=((WIN["x0"] + WIN["x1"]) / 2, WALL_Y + 0.02, zm)), M_FRAME)
    o.scale = (WIN["x1"] - WIN["x0"], 0.06, 0.035)

# sky behind the window: night navy -> dawn
M_SKY = mat_principled("Sky", color=(0, 0, 0), rough=1, emission=(0.05, 0.08, 0.16), estrength=0.25)
sky = assign(prim("plane", "Sky", size=1, location=(0.9, 7.0, 2.0), rotation=(math.radians(90), 0, 0)), M_SKY)
sky.scale = (14, 8, 1)
sky_p = M_SKY.node_tree.nodes["Principled BSDF"]

# distant city lights -> soft bokeh through the window
M_CITY = mat_principled("City", color=(0, 0, 0), emission=(1.0, 0.72, 0.42), estrength=18)
city_p = M_CITY.node_tree.nodes["Principled BSDF"]
for i in range(70):
    x = rnd.uniform(-2.0, 3.6)
    z = rnd.uniform(0.6, 2.4)
    y = rnd.uniform(4.0, 6.5)
    o = assign(prim("uv_sphere", f"City{i}", radius=rnd.uniform(0.012, 0.03), location=(x, y, z), segments=12,
                    ring_count=6), M_CITY)

# --------------------------------------------------------------------------
# Laptop
# --------------------------------------------------------------------------
LAP = Vector((0.04, 0.07, DESK_Z))
base = assign(prim("cube", "LaptopBase", size=1, location=LAP + Vector((0, 0, 0.0075))), M_ALU)
base.scale = (0.31, 0.215, 0.015)
bpy.ops.object.transform_apply(scale=True)
bpy.ops.object.modifier_add(type="BEVEL")
base.modifiers["Bevel"].width = 0.004
base.modifiers["Bevel"].segments = 3
kb = assign(prim("plane", "Keyboard", size=1, location=LAP + Vector((0, 0.02, 0.0152))), M_KEYS)
kb.scale = (0.27, 0.11, 1)
tp = assign(prim("plane", "Trackpad", size=1, location=LAP + Vector((0, -0.068, 0.0152))), M_ALU)
tp.scale = (0.12, 0.065, 1)

TILT = math.radians(14)
hinge = LAP + Vector((0, 0.1075, 0.015))
R = Euler((-TILT, 0, 0)).to_matrix()
lid = assign(prim("cube", "LaptopLid", size=1, location=hinge + R @ Vector((0, 0.003, 0.106))), M_ALU)
lid.scale = (0.31, 0.006, 0.212)
lid.rotation_euler = (-TILT, 0, 0)
bpy.ops.object.transform_apply(scale=True)
bpy.ops.object.modifier_add(type="BEVEL")
lid.modifiers["Bevel"].width = 0.003

SCR_W, SCR_H = 0.285, 0.178
screen = quad("Screen", SCR_W, SCR_H)
screen.location = hinge + R @ Vector((0, -0.0005, 0.112))
screen.rotation_euler = (math.radians(90) - TILT, 0, 0)

scr_img = bpy.data.images.load(os.path.join(TEX, "screen", "screen_0001.png"))
scr_img.source = "SEQUENCE"
M_SCREEN = bpy.data.materials.new("ScreenMat")
M_SCREEN.use_nodes = True
nt = M_SCREEN.node_tree
p = nt.nodes["Principled BSDF"]
p.inputs["Base Color"].default_value = (0, 0, 0, 1)
p.inputs["Roughness"].default_value = 0.12
tx = nt.nodes.new("ShaderNodeTexImage")
tx.image = scr_img
tx.image_user.frame_duration = TL.FRAMES
tx.image_user.frame_start = 1
tx.image_user.frame_offset = 0
tx.image_user.use_auto_refresh = True
nt.links.new(tx.outputs["Color"], p.inputs["Emission Color"])
p.inputs["Emission Strength"].default_value = 0.95
SCREEN_P = p
assign(screen, M_SCREEN)

bpy.context.view_layer.update()


def screen_point(u, v):
    """Screen texture uv (0..1, v from bottom) -> world position."""
    return screen.matrix_world @ Vector(((u - 0.5) * SCR_W, (v - 0.5) * SCR_H, 0))


SCREEN_N = (screen.matrix_world.to_3x3() @ Vector((0, 0, 1))).normalized()
SCREEN_C = screen_point(0.5, 0.5)

# screen glow as real light
glow = bpy.data.lights.new("ScreenGlow", "AREA")
glow.shape = "RECTANGLE"
glow.size, glow.size_y = SCR_W, SCR_H
glow.color = (0.62, 0.74, 1.0)
glow.energy = 2.2
glow.volume_factor = 0.0
go = link(bpy.data.objects.new("ScreenGlow", glow))
go.location = SCREEN_C + SCREEN_N * 0.01
go.rotation_euler = screen.rotation_euler.copy()
go.rotation_euler.rotate_axis("X", math.pi)  # emit out of the screen, not into it

# --------------------------------------------------------------------------
# Desk lamp (architect style)
# --------------------------------------------------------------------------
LB = Vector((-0.66, 0.34, DESK_Z))
assign(prim("cylinder", "LampBase", radius=0.085, depth=0.022, location=LB + Vector((0, 0, 0.011)), vertices=48), M_LAMP)
elbow = LB + Vector((0.06, -0.03, 0.46))
SHADE = Vector((-0.30, 0.04, 1.20))
LAMP_TARGET = Vector((-0.04, -0.12, DESK_Z))
between("LampArm1", LB + Vector((0, 0, 0.02)), elbow, 0.009, M_LAMP)
between("LampArm2", elbow, SHADE, 0.008, M_LAMP)
assign(prim("uv_sphere", "LampJoint", radius=0.017, location=elbow), M_BRASS)
assign(prim("uv_sphere", "LampJoint2", radius=0.015, location=SHADE), M_BRASS)
aim = (LAMP_TARGET - SHADE).normalized()
shade = prim("cone", "LampShade", radius1=0.095, radius2=0.032, depth=0.15, vertices=64, end_fill_type="NOTHING")
shade.rotation_mode = "QUATERNION"
shade.rotation_quaternion = (-aim).to_track_quat("Z", "Y")
shade.location = SHADE + aim * 0.08
smooth(shade)
assign(shade, M_LAMP)
sol = shade.modifiers.new("Solid", "SOLIDIFY")
sol.thickness = 0.003
M_BULB = mat_principled("Bulb", color=(1, 1, 1), emission=(1.0, 0.85, 0.65), estrength=0.0)
BULB_P = M_BULB.node_tree.nodes["Principled BSDF"]
bulb = assign(prim("uv_sphere", "Bulb", radius=0.028, location=SHADE + aim * 0.075), M_BULB)
smooth(bulb)

spot = bpy.data.lights.new("LampSpot", "SPOT")
spot.spot_size = math.radians(66)
spot.spot_blend = 0.55
spot.shadow_soft_size = 0.025
spot.color = (1.0, 0.8, 0.58)
spot.energy = 0
so = link(bpy.data.objects.new("LampSpot", spot))
so.location = SHADE + aim * 0.10
so.rotation_mode = "QUATERNION"
so.rotation_quaternion = aim.to_track_quat("-Z", "Y")
# small fill so the shade interior and arm catch light
fill = bpy.data.lights.new("LampBounce", "POINT")
fill.shadow_soft_size = 0.2
fill.energy = 0
fill.color = (1.0, 0.75, 0.5)
fo = link(bpy.data.objects.new("LampBounce", fill))
fo.location = LAMP_TARGET + Vector((0, 0, 0.25))

# moonlight rim from the window
moon = bpy.data.lights.new("Moon", "AREA")
moon.size = 1.0
moon.color = (0.45, 0.58, 1.0)
moon.energy = 8
mo = link(bpy.data.objects.new("Moon", moon))
mo.location = (0.9, 1.6, 1.8)
mo.rotation_mode = "QUATERNION"
mo.rotation_quaternion = look_quat(mo.location, (0, 0, DESK_Z))

# faint cool fill so the clock face reads in its close-up
cf = bpy.data.lights.new("ClockFill", "POINT")
cf.energy = 0.35
cf.color = (0.7, 0.8, 1.0)
cf.shadow_soft_size = 0.1
cf.volume_factor = 0.0
cfo = link(bpy.data.objects.new("ClockFill", cf))
cfo.location = (0.5, 0.05, 0.95)

# dawn sun through the window
sun = bpy.data.lights.new("Dawn", "AREA")
sun.size = 1.4
sun.color = (1.0, 0.72, 0.46)
sun.energy = 0
sun.shadow_soft_size = 0.5
su = link(bpy.data.objects.new("Dawn", sun))
su.location = (1.3, 2.2, 2.6)
su.rotation_mode = "QUATERNION"
su.rotation_quaternion = look_quat(su.location, (-0.1, -0.1, DESK_Z))


# --------------------------------------------------------------------------
# Fake light beam + dust motes (cheap stand-in for volumetric fog)
# --------------------------------------------------------------------------
BEAM_LEN = 0.72
beam = prim("cone", "Beam", radius1=BEAM_LEN * math.tan(math.radians(31)), radius2=0.02, depth=BEAM_LEN,
            vertices=96, end_fill_type="NOTHING")
beam.rotation_mode = "QUATERNION"
beam.rotation_quaternion = (-aim).to_track_quat("Z", "Y")
beam.location = SHADE + aim * (0.09 + BEAM_LEN / 2)
smooth(beam)
M_BEAM = bpy.data.materials.new("BeamMat")
M_BEAM.use_nodes = True
M_BEAM.use_backface_culling = True
try:
    M_BEAM.surface_render_method = "BLENDED"
except Exception:  # noqa: BLE001
    M_BEAM.blend_method = "BLEND"
bn = M_BEAM.node_tree.nodes
bl = M_BEAM.node_tree.links
for n_ in list(bn):
    if n_.type != "OUTPUT_MATERIAL":
        bn.remove(n_)
outn = [n_ for n_ in bn if n_.type == "OUTPUT_MATERIAL"][0]
lw = bn.new("ShaderNodeLayerWeight")
lw.inputs["Blend"].default_value = 0.5
inv = bn.new("ShaderNodeMath"); inv.operation = "SUBTRACT"; inv.inputs[0].default_value = 1.0
bl.new(lw.outputs["Facing"], inv.inputs[1])
pw = bn.new("ShaderNodeMath"); pw.operation = "POWER"; pw.inputs[1].default_value = 2.2
bl.new(inv.outputs[0], pw.inputs[0])
tc = bn.new("ShaderNodeTexCoord")
sep = bn.new("ShaderNodeSeparateXYZ")
bl.new(tc.outputs["Object"], sep.inputs[0])
# local z: +len/2 at apex (shade) .. -len/2 at the desk
mr = bn.new("ShaderNodeMapRange")
mr.inputs["From Min"].default_value = BEAM_LEN / 2
mr.inputs["From Max"].default_value = BEAM_LEN / 2 - 0.12
fade_tail = bn.new("ShaderNodeMapRange")
fade_tail.inputs["From Min"].default_value = -BEAM_LEN / 2
fade_tail.inputs["From Max"].default_value = -BEAM_LEN / 2 + 0.35
fade_tail.inputs["To Min"].default_value = 0.35
bl.new(sep.outputs["Z"], mr.inputs["Value"])
bl.new(sep.outputs["Z"], fade_tail.inputs["Value"])
m1 = bn.new("ShaderNodeMath"); m1.operation = "MULTIPLY"
bl.new(pw.outputs[0], m1.inputs[0]); bl.new(mr.outputs[0], m1.inputs[1])
m2 = bn.new("ShaderNodeMath"); m2.operation = "MULTIPLY"
bl.new(m1.outputs[0], m2.inputs[0]); bl.new(fade_tail.outputs[0], m2.inputs[1])
geo = bn.new("ShaderNodeNewGeometry")
gsep = bn.new("ShaderNodeSeparateXYZ")
bl.new(geo.outputs["Position"], gsep.inputs[0])
zmask = bn.new("ShaderNodeMapRange")
zmask.inputs["From Min"].default_value = DESK_Z + 0.005
zmask.inputs["From Max"].default_value = DESK_Z + 0.09
bl.new(gsep.outputs["Z"], zmask.inputs["Value"])
m3 = bn.new("ShaderNodeMath"); m3.operation = "MULTIPLY"
bl.new(m2.outputs[0], m3.inputs[0]); bl.new(zmask.outputs[0], m3.inputs[1])
gain = bn.new("ShaderNodeMath"); gain.operation = "MULTIPLY"; gain.inputs[1].default_value = 0.0
BEAM_GAIN = gain.inputs[1]
bl.new(m3.outputs[0], gain.inputs[0])
em = bn.new("ShaderNodeEmission")
em.inputs["Color"].default_value = (1.0, 0.8, 0.58, 1)
BEAM_COLOR = em.inputs["Color"]
bl.new(gain.outputs[0], em.inputs["Strength"])
tr = bn.new("ShaderNodeBsdfTransparent")
add = bn.new("ShaderNodeAddShader")
bl.new(tr.outputs[0], add.inputs[0]); bl.new(em.outputs[0], add.inputs[1])
bl.new(add.outputs[0], outn.inputs["Surface"])
assign(beam, M_BEAM)
beam.visible_shadow = False

M_DUST = mat_principled("Dust", color=(0, 0, 0), emission=(1.0, 0.82, 0.62), estrength=0.0)
DUST_P = M_DUST.node_tree.nodes["Principled BSDF"]
bpy.ops.mesh.primitive_ico_sphere_add(radius=0.0008, subdivisions=1)
dust_proto = bpy.context.active_object
dust_proto.name = "DustProto"
assign(dust_proto, M_DUST)
dust_proto.visible_shadow = False
for i in range(90):
    along = rnd.uniform(0.1, 0.95) * BEAM_LEN
    rad = along * math.tan(math.radians(30)) * math.sqrt(rnd.random())
    ang = rnd.uniform(0, 6.283)
    side = aim.orthogonal().normalized()
    up = aim.cross(side).normalized()
    p0 = SHADE + aim * (0.09 + along) + (side * math.cos(ang) + up * math.sin(ang)) * rad
    if p0.z < DESK_Z + 0.02:
        continue
    d = dust_proto.copy()
    link(d)
    s_ = rnd.uniform(0.5, 1.4)
    d.scale = (s_, s_, s_)
    drift = Vector((rnd.uniform(-1, 1), rnd.uniform(-1, 1), rnd.uniform(-0.3, 1.0))) * 0.05
    for t_, pp in [(0, p0), (TL.DURATION, p0 + drift)]:
        d.location = pp
        d.keyframe_insert("location", frame=frame(t_))
dust_proto.location = (0, 0, -5)

# --------------------------------------------------------------------------
# Props
# --------------------------------------------------------------------------
cup = assign(prim("cylinder", "Cup", radius=0.042, depth=0.09, location=(-0.5, -0.02, DESK_Z + 0.045), vertices=48),
             M_CERAMIC)
smooth(cup)
cs = cup.modifiers.new("Bevel", "BEVEL")
cs.width = 0.004
cs.segments = 3
assign(prim("cylinder", "Coffee", radius=0.038, depth=0.002, location=(-0.5, -0.02, DESK_Z + 0.084), vertices=48),
       M_COFFEE)
handle = assign(prim("torus", "CupHandle", major_radius=0.022, minor_radius=0.006,
                     location=(-0.5 - 0.048, -0.02, DESK_Z + 0.05), rotation=(math.radians(90), 0, 0)), M_CERAMIC)
smooth(handle)

nb = assign(prim("cube", "Notebook", size=1, location=(-0.70, -0.27, DESK_Z + 0.007)), M_NOTEBOOK)
nb.scale = (0.15, 0.21, 0.014)
nb.rotation_euler = (0, 0, math.radians(-10))
pen = between("Pen", (-0.74, -0.36, DESK_Z + 0.019), (-0.63, -0.20, DESK_Z + 0.019), 0.0045, M_BRASS)

# clock
CLK = Vector((0.66, 0.30, DESK_Z + 0.09))
cbody = assign(prim("cylinder", "ClockBody", radius=0.082, depth=0.04, location=CLK, rotation=(math.radians(90), 0, 0),
                    vertices=64), M_LAMP)
smooth(cbody)
rim = assign(prim("torus", "ClockRim", major_radius=0.078, minor_radius=0.006, location=CLK + Vector((0, -0.021, 0)),
                  rotation=(math.radians(90), 0, 0), major_segments=64), M_BRASS)
smooth(rim)
face = prim("circle", "ClockFace", radius=0.075, vertices=64, fill_type="NGON",
            location=CLK + Vector((0, -0.0205, 0)), rotation=(math.radians(90), 0, 0))
assign(face, mat_principled("ClockFace", image=os.path.join(TEX, "clock_face.png"), rough=0.4, generated=True))
pivot = link(bpy.data.objects.new("ClockPivot", None))
pivot.location = CLK + Vector((0, -0.024, 0))
pivot.rotation_euler = (math.radians(90), 0, 0)


def hand(name, length, width, mat):
    me = bpy.data.meshes.new(name)
    w, t = width / 2, 0.0012
    v = [(-w, -0.012, 0), (w, -0.012, 0), (w, length, 0), (-w, length, 0),
         (-w, -0.012, t), (w, -0.012, t), (w, length, t), (-w, length, t)]
    f = [(0, 1, 2, 3), (4, 5, 6, 7), (0, 1, 5, 4), (1, 2, 6, 5), (2, 3, 7, 6), (3, 0, 4, 7)]
    me.from_pydata(v, [], f)
    o = link(bpy.data.objects.new(name, me))
    o.parent = pivot
    o.data.materials.append(mat)
    return o


M_HAND = mat_principled("Hand", color=(0.02, 0.022, 0.024), rough=0.4)
h_hour = hand("HourHand", 0.038, 0.006, M_HAND)
h_min = hand("MinuteHand", 0.058, 0.004, M_HAND)
h_sec = hand("SecondHand", 0.062, 0.0015, M_ORANGE)
h_min.location.z = 0.0013
h_sec.location.z = 0.0026


def clock_angles(hours):
    return -math.radians((hours % 12) * 30), -math.radians((hours * 60 % 60) * 6)


START_H = 23 + 47 / 60
END_H = 24 + 9 + 2 / 60
SPIN0, SPIN1 = 9.4, 13.4
for t, hh in [(0, START_H), (SPIN0, START_H + 0.4 / 60), (SPIN1, END_H), (TL.DURATION, END_H + 0.1)]:
    a_h = -math.radians(hh * 30)
    a_m = -math.radians(hh * 360)
    h_hour.rotation_euler.z = a_h
    h_hour.keyframe_insert("rotation_euler", index=2, frame=frame(t))
    h_min.rotation_euler.z = a_m
    h_min.keyframe_insert("rotation_euler", index=2, frame=frame(t))
# second hand ticks once a second until the spin
sec = 12.0
for s in range(0, 10):
    a = -math.radians((sec + s) * 6)
    h_sec.rotation_euler.z = a
    h_sec.keyframe_insert("rotation_euler", index=2, frame=frame(s + 0.0))
    h_sec.keyframe_insert("rotation_euler", index=2, frame=frame(s + 0.9))
h_sec.rotation_euler.z = -math.radians((sec + 10) * 6) - math.radians(360 * 9)
h_sec.keyframe_insert("rotation_euler", index=2, frame=frame(SPIN1))

# --------------------------------------------------------------------------
# Paper choreography
# --------------------------------------------------------------------------
A4 = (0.21, 0.297)
ROW_Y = -0.225
POS = {"scope": Vector((-0.39, ROW_Y, DESK_Z)), "folder": Vector((-0.125, ROW_Y, DESK_Z)),
       "policy": Vector((0.14, ROW_Y, DESK_Z)), "answers": Vector((0.405, ROW_Y, DESK_Z))}


def sheet(name, tex_name, w=A4[0], h=A4[1]):
    o = quad(name, w, h, subdiv=(6, 8))
    assign(o, paper_mat(name, tex_name))
    o.rotation_mode = "XYZ"
    b = o.modifiers.new("Bend", "SIMPLE_DEFORM")
    b.deform_method = "BEND"
    b.deform_axis = "Y"
    b.angle = 0.0
    return o


def pose(o, t, loc, rz=0.0, rx=0.0, ry=0.0, bend=None):
    o.location = loc
    o.rotation_euler = (rx, ry, rz)
    o.keyframe_insert("location", frame=frame(t))
    o.keyframe_insert("rotation_euler", frame=frame(t))
    if bend is not None:
        o.modifiers["Bend"].angle = bend
        o.keyframe_insert('modifiers["Bend"].angle', frame=frame(t))


# messy pile, right of the laptop, plus a few strays under the lamp
PILE = Vector((0.43, -0.10, DESK_Z))
STRAY = Vector((-0.22, -0.24, DESK_Z))

docs = [
    # name, texture, start cluster, target, stack index, land time
    ("InvPower", "invoice_power.png", STRAY, "scope", 0, 10.70),
    ("SheetA", "sheet_a.png", PILE, "scope", 1, 10.80),
    ("InvGas", "invoice_gas.png", PILE, "scope", 2, 10.90),
    ("SheetB", "sheet_b.png", STRAY, "scope", 3, 11.00),
    ("InvFuel", "invoice_fuel.png", PILE, "scope", 4, 11.08),
    ("Request", "request.png", PILE, "folder", 0, 12.02),
    ("Cert", "cert.png", STRAY, "folder", 1, 12.16),
    ("Contract", "contract.png", PILE, "folder", 2, 12.30),
    ("Policy", "policy.png", PILE, "policy", 0, 10.62),
    ("Questionnaire", "questionnaire.png", STRAY, "answers", 0, 10.84),
]

# order in the pile (top of the pile shown first in close-ups)
pile_order = ["Policy", "InvGas", "SheetA", "Contract", "Request", "InvFuel"]
stray_order = ["SheetB", "Cert", "InvPower", "Questionnaire"]
sheets = {}
for i, (name, tx_name, cluster, target, idx, land) in enumerate(docs):
    o = sheet(name, tx_name)
    sheets[name] = o
    order = (pile_order if cluster is PILE else stray_order).index(name)
    z0 = DESK_Z + 0.0008 + (len(pile_order) - order) * 0.0011
    start = cluster + Vector((rnd.uniform(-0.06, 0.06), rnd.uniform(-0.05, 0.05), z0 - DESK_Z))
    rz0 = math.radians(rnd.uniform(-35, 35))
    lift = TL.LIFT_START + order * 0.07 + (0.12 if cluster is STRAY else 0)
    tgt = POS[target]
    if target == "scope":
        end = tgt + Vector((rnd.uniform(-0.004, 0.004), rnd.uniform(-0.004, 0.004), 0.0008 + idx * 0.0011))
        rz1 = math.radians(rnd.uniform(-3, 3))
    elif target == "folder":
        end = tgt + Vector((0.004 * idx, -0.003 * idx, 0.0035 + idx * 0.0011))
        rz1 = math.radians(rnd.uniform(-1.5, 1.5))
    else:
        end = tgt + Vector((0, 0, 0.0009))
        rz1 = math.radians(rnd.uniform(-2, 2))
    apex = (start + end) / 2 + Vector((rnd.uniform(-0.12, 0.12), rnd.uniform(-0.05, 0.12), rnd.uniform(0.22, 0.42)))
    float_pt = apex + Vector((rnd.uniform(-0.06, 0.06), rnd.uniform(-0.04, 0.04), rnd.uniform(0.02, 0.07)))
    tilt = lambda: math.radians(rnd.uniform(-28, 28))  # noqa: E731
    pose(o, 0, start, rz0, bend=0.0)
    pose(o, lift, start, rz0, bend=0.0)
    pose(o, lift + 0.75, apex, rz0 + math.radians(rnd.uniform(-60, 60)), tilt(), tilt(), bend=rnd.uniform(-0.5, 0.5))
    if land - lift > 1.6:
        pose(o, land - 0.55, float_pt, rz1 + math.radians(rnd.uniform(-25, 25)), tilt() * 0.6, tilt() * 0.6,
             bend=rnd.uniform(-0.3, 0.3))
    pose(o, land - 0.12, end + Vector((0, 0, 0.012)), rz1, 0, 0, bend=0.05)
    pose(o, land, end, rz1, 0, 0, bend=0.0)

# policy: a cover sheet hides the text until it is "written"
cover = quad("PolicyCover", A4[0] * 0.92, A4[1] * 0.84, origin="bottom")
cover.parent = sheets["Policy"]
cover.location = (0, -A4[1] * 0.46, 0.00025)
assign(cover, paper_mat("Cover", "blank.png"))
for t, s in [(0, 1.0), (10.78, 1.0), (12.3, 0.0)]:
    cover.scale = (1, max(s, 0.0001), 1)
    cover.keyframe_insert("scale", frame=frame(t))
# the cover is a separate mesh; give it the same bend so it stays glued while flying
cb = cover.modifiers.new("Bend", "SIMPLE_DEFORM")
cb.deform_method = "BEND"
cb.deform_axis = "Y"
cb.angle = 0.0
drv = cb.driver_add("angle").driver
drv.type = "AVERAGE"
dv = drv.variables.new()
dv.targets[0].id = sheets["Policy"]
dv.targets[0].data_path = 'modifiers["Bend"].angle'

# questionnaire check marks
boxes = json.load(open(os.path.join(TEX, "boxes.json")))


def checkmark(name):
    me = bpy.data.meshes.new(name)
    th, z = 0.0028, 0.0006
    pts = [(-0.0085, 0.0005), (-0.0025, -0.0065), (0.0105, 0.0085)]
    verts, faces = [], []
    for a, b in zip(pts, pts[1:]):
        d = Vector((b[0] - a[0], b[1] - a[1], 0))
        n = Vector((-d.y, d.x, 0)).normalized() * th / 2
        base = len(verts)
        for p in (Vector((*a, 0)) - n, Vector((*b, 0)) - n, Vector((*b, 0)) + n, Vector((*a, 0)) + n):
            verts.append((p.x, p.y, 0))
            verts.append((p.x, p.y, z))
        faces += [(base, base + 2, base + 4, base + 6), (base + 1, base + 3, base + 5, base + 7),
                  (base, base + 2, base + 3, base + 1), (base + 2, base + 4, base + 5, base + 3),
                  (base + 4, base + 6, base + 7, base + 5), (base + 6, base, base + 1, base + 7)]
    me.from_pydata(verts, [], faces)
    o = link(bpy.data.objects.new(name, me))
    o.data.materials.append(M_ORANGE)
    return o


q = sheets["Questionnaire"]
for i, (u, v) in enumerate(boxes):
    c = checkmark(f"Check{i}")
    c.parent = q
    c.location = ((u - 0.5) * A4[0] - 0.0009, (0.5 - v) * A4[1] - 0.0009, 0.0004)
    c.scale = (0.95, 0.95, 0.95)
    t0 = TL.PHRASES["answers"][0] - 0.12 + i * 0.075
    for t, s in [(0, 0.0001), (t0, 0.0001), (t0 + 0.09, 1.2), (t0 + 0.2, 0.95)]:
        c.scale = (s, s, s)
        c.keyframe_insert("scale", frame=frame(t))

# Scope 1 & 2 card drops onto the stack of invoices
card = sheet("ScopeCard", "scope_card.png")
card.modifiers.remove(card.modifiers["Bend"])
_cb = card.modifiers.new("Bend", "SIMPLE_DEFORM")
_cb.deform_axis = "Y"
_cb.angle = 0.0
sol = card.modifiers.new("Thick", "SOLIDIFY")
sol.thickness = 0.0012
t_em = TL.PHRASES["emissions"][0]
card_end = POS["scope"] + Vector((0.006, -0.004, 0.0075))
pose(card, 0, card_end + Vector((0.05, 0.1, 1.6)), math.radians(30), math.radians(20), 0)
pose(card, t_em - 0.5, card_end + Vector((0.05, 0.1, 1.6)), math.radians(30), math.radians(20), 0)
pose(card, t_em - 0.05, card_end + Vector((0.01, 0.02, 0.12)), math.radians(8), math.radians(6), math.radians(-3))
pose(card, t_em + 0.22, card_end + Vector((0, 0, 0.006)), math.radians(-1.2), 0, 0)
pose(card, t_em + 0.4, card_end, math.radians(-1.5), 0, 0)

# Evidence folder: descends open, documents slide in, cover closes on "evidence"
FW, FH = 0.235, 0.315
folder = link(bpy.data.objects.new("Folder", None))
f_end = POS["folder"] + Vector((0, 0, 0.001))
back = quad("FolderBack", FW, FH)
back.parent = folder
assign(back, M_FOLDER)
back.modifiers.new("Thick", "SOLIDIFY").thickness = 0.0015
fcover = quad("FolderCover", FW, FH, origin="left")
fcover.parent = folder
fcover.location = (-FW / 2, 0, 0.0065)
assign(fcover, M_FOLDER)
fcover.modifiers.new("Thick", "SOLIDIFY").thickness = 0.0015
label = quad("FolderLabel", 0.13, 0.036)
label.parent = fcover
label.location = (FW * 0.5, FH * 0.3, 0.0016)
assign(label, mat_principled("Label", image=os.path.join(TEX, "folder_label.png"), rough=0.5))
tab = quad("FolderTab", 0.05, 0.022)
tab.parent = back
tab.location = (FW * 0.28, FH / 2 + 0.010, 0)
assign(tab, M_ORANGE)

t_ev = TL.PHRASES["evidence"][0]
for t, loc, rz in [(0, f_end + Vector((0.1, 0.05, 1.5)), 0.4), (10.25, f_end + Vector((0.1, 0.05, 1.5)), 0.4),
                   (10.95, f_end + Vector((0, 0, 0.02)), 0.02), (11.15, f_end, 0.0)]:
    folder.location = loc
    folder.rotation_euler = (0, 0, rz)
    folder.keyframe_insert("location", frame=frame(t))
    folder.keyframe_insert("rotation_euler", frame=frame(t))
OPEN = math.radians(-78)  # stays over the folder, out of the Scope card shot
for t, a in [(0, OPEN), (t_ev - 0.05, OPEN), (t_ev + 0.32, math.radians(3)), (t_ev + 0.42, 0.0)]:
    fcover.rotation_euler = (0, a, 0)
    fcover.keyframe_insert("rotation_euler", index=1, frame=frame(t))

# --------------------------------------------------------------------------
# Lighting story
# --------------------------------------------------------------------------
NIGHT_SPOT = 80.0
BEAM_STRENGTH = 0.34
DUST_STRENGTH = 1.6
WARM_COLOR = (1.0, 0.52, 0.2)
NIGHT_COLOR = (1.0, 0.8, 0.58)
on = TL.LAMP_ON
for t, k in [(0, 0), (on, 0), (on + 0.04, 0.75), (on + 0.08, 0.25), (on + 0.13, 1.0)]:
    key(spot, "energy", t, NIGHT_SPOT * k)
    key(fill, "energy", t, 1.2 * k)
    key_input(BULB_P.inputs["Emission Strength"], t, 14 * k)
    key_input(BEAM_GAIN, t, BEAM_STRENGTH * k)
    key_input(DUST_P.inputs["Emission Strength"], t, DUST_STRENGTH * k)
for t, c, e in [(TL.WARM_START, NIGHT_COLOR, 1.0), (TL.WARM_END, WARM_COLOR, 1.35), (12.9, WARM_COLOR, 1.3),
                (13.9, (1.0, 0.62, 0.32), 0.0)]:
    key(spot, "color", t, c)
    key(spot, "energy", t, NIGHT_SPOT * e)
    key(fill, "energy", t, 1.2 * e)
    key_input(BULB_P.inputs["Emission Strength"], t, 14 * e)
    key_input(BULB_P.inputs["Emission Color"], t, (*c, 1))
    key_input(BEAM_GAIN, t, BEAM_STRENGTH * e)
    key_input(BEAM_COLOR, t, (*c, 1))
    key_input(DUST_P.inputs["Emission Strength"], t, DUST_STRENGTH * e)
    key_input(DUST_P.inputs["Emission Color"], t, (*c, 1))

for t, e in [(0, 0), (TL.DAWN_START, 0), (TL.DAWN_END, 650), (TL.DURATION, 700)]:
    key(sun, "energy", t, e)
for t, e in [(0, 8), (TL.DAWN_START, 8), (TL.DAWN_END, 0)]:
    key(moon, "energy", t, e)
for t, c, s in [(0, (0.05, 0.08, 0.16), 0.25), (TL.DAWN_START, (0.05, 0.08, 0.16), 0.25),
                (TL.DAWN_END, (1.0, 0.7, 0.48), 0.45)]:
    key_input(sky_p.inputs["Emission Color"], t, (*c, 1))
    key_input(sky_p.inputs["Emission Strength"], t, s)
for t, s in [(0, 18), (TL.DAWN_START, 18), (TL.DAWN_END, 0)]:
    key_input(city_p.inputs["Emission Strength"], t, s)
for t, e in [(0, 2.2), (TL.DAWN_START, 2.2), (TL.DAWN_END, 0.6)]:
    key(glow, "energy", t, e)

# the room warms up once Evipace takes over
warm_fill = bpy.data.lights.new("WarmFill", "AREA")
warm_fill.size = 1.2
warm_fill.color = (1.0, 0.6, 0.3)
warm_fill.volume_factor = 0.0
wfo = link(bpy.data.objects.new("WarmFill", warm_fill))
wfo.location = (0.1, -0.5, 1.9)
wfo.rotation_mode = "QUATERNION"
wfo.rotation_quaternion = look_quat(wfo.location, (0, -0.15, DESK_Z))
for t, e in [(0, 0), (TL.WARM_START, 0), (TL.WARM_END + 0.6, 38), (TL.DAWN_START, 38), (TL.DAWN_END, 6)]:
    key(warm_fill, "energy", t, e)

# world + volumetric haze for visible light cones
world = bpy.data.worlds.new("World")
scene.world = world
world.use_nodes = True
wn = world.node_tree
bg = wn.nodes["Background"]
bg.inputs["Color"].default_value = (0.0015, 0.0018, 0.0022, 1)
vol = wn.nodes.new("ShaderNodeVolumePrincipled")
vol.inputs["Density"].default_value = 0.03
vol.inputs["Anisotropy"].default_value = 0.55
vol.inputs["Color"].default_value = (0.9, 0.9, 0.9, 1)
for t, c in [(0, (0.0015, 0.0018, 0.0022, 1)), (TL.DAWN_START, (0.0015, 0.0018, 0.0022, 1)),
             (TL.DAWN_END, (0.02, 0.017, 0.014, 1))]:
    key_input(bg.inputs["Color"], t, c)

# --------------------------------------------------------------------------
# Cameras
# --------------------------------------------------------------------------
def camera(name, t0, t1, p0, p1, tgt0, tgt1, lens, fstop, focus_keys, shake=0.004):
    cd = bpy.data.cameras.new(name)
    cd.lens = lens
    cd.sensor_width = 36
    cd.clip_start = 0.01
    cd.dof.use_dof = True
    cd.dof.aperture_fstop = fstop
    cd.dof.aperture_blades = 7
    cam = link(bpy.data.objects.new(name, cd))
    tgt = link(bpy.data.objects.new(name + "_aim", None))
    foc = link(bpy.data.objects.new(name + "_focus", None))
    cd.dof.focus_object = foc
    c = cam.constraints.new("TRACK_TO")
    c.target = tgt
    c.track_axis = "TRACK_NEGATIVE_Z"
    c.up_axis = "UP_Y"
    pad = 0.3
    n = 4
    for i in range(n + 1):
        k = i / n
        t = t0 - pad + (t1 - t0 + 2 * pad) * k
        kk = max(0.0, min(1.0, (t - t0) / (t1 - t0)))
        cam.location = Vector(p0).lerp(Vector(p1), kk)
        cam.keyframe_insert("location", frame=frame(max(t, 0)))
        jitter = Vector((rnd.uniform(-1, 1), rnd.uniform(-1, 1), rnd.uniform(-1, 1))) * shake
        tgt.location = Vector(tgt0).lerp(Vector(tgt1), kk) + (jitter if 0 < i < n else Vector())
        tgt.keyframe_insert("location", frame=frame(max(t, 0)))
    for t, loc in focus_keys:
        foc.location = loc
        foc.keyframe_insert("location", frame=frame(t))
    m = scene.timeline_markers.new(name, frame=frame(t0))
    m.camera = cam
    return cam


SHOT = dict(TL.SHOTS and [(n, t) for t, n in TL.SHOTS])
ends = {n: (TL.SHOTS[i + 1][0] if i + 1 < len(TL.SHOTS) else TL.DURATION) for i, (t, n) in enumerate(TL.SHOTS)}


def span(n):
    return SHOT[n], ends[n]


toast_pt = screen_point(0.76, 0.66)
button_pt = screen_point(340 / 1440, 1 - 763 / 900)
camera("C1_desk", *span("C1_desk"), (-0.62, -1.38, 1.1), (-0.5, -1.18, 1.05), (0.0, 0.02, 0.86), (0.03, 0.04, 0.86),
       40, 2.0, [(0, SCREEN_C)])
camera("C2_screen", *span("C2_screen"), toast_pt + SCREEN_N * 0.5 + Vector((0.12, 0, 0.04)),
       toast_pt + SCREEN_N * 0.38 + Vector((0.09, 0, 0.03)), toast_pt + Vector((-0.02, 0, -0.01)),
       toast_pt + Vector((0.0, 0, -0.015)), 55, 2.0, [(0, toast_pt)], shake=0.002)
camera("C3_clock", *span("C3_clock"), (0.30, -0.22, 0.83), (0.34, -0.19, 0.83), CLK + Vector((-0.04, 0, -0.01)),
       CLK + Vector((-0.02, 0, -0.005)), 85, 1.4,
       [(0, CLK + Vector((0, -0.025, 0)))],
       shake=0.002)
camera("C4_button", *span("C4_button"), button_pt + SCREEN_N * 0.24 + Vector((0.06, 0, 0.02)),
       button_pt + SCREEN_N * 0.19 + Vector((0.05, 0, 0.015)), button_pt, button_pt + Vector((0.004, 0, 0)), 85, 2.2,
       [(0, button_pt)], shake=0.0015)
camera("C5_side", *span("C5_side"), (-0.98, -0.86, 1.0), (-0.86, -1.0, 0.99), (-0.14, 0.04, 0.95),
       (-0.12, 0.02, 0.94), 34, 2.4, [(0, LAP + Vector((0, 0.05, 0.1)))])
camera("C6_crane", *span("C6_crane"), (0.85, -1.05, 1.58), (0.32, -1.25, 1.66), (0.0, -0.1, 0.9),
       (-0.03, -0.12, 0.84), 30, 4.0, [(0, Vector((0.0, -0.18, 0.9)))])
camera("C7_scope", *span("C7_scope"), POS["scope"] + Vector((-0.15, -0.44, 0.25)),
       POS["scope"] + Vector((-0.11, -0.38, 0.21)), POS["scope"] + Vector((0, 0, 0.02)),
       POS["scope"] + Vector((0, 0.01, 0.01)), 60, 2.2, [(0, card_end)])
camera("C8_folder", *span("C8_folder"), POS["folder"] + Vector((0.26, -0.46, 0.34)),
       POS["folder"] + Vector((0.22, -0.42, 0.30)), POS["folder"] + Vector((0, 0.0, 0.02)),
       POS["folder"] + Vector((0, 0.01, 0.01)), 50, 3.2, [(0, POS["folder"] + Vector((0, 0, 0.01)))])
camera("C9_answers", *span("C9_answers"), POS["answers"] + Vector((0.05, -0.16, 0.42)),
       POS["answers"] + Vector((0.04, -0.13, 0.36)), POS["answers"] + Vector((0.01, 0.01, 0)),
       POS["answers"] + Vector((0.01, 0.0, 0)), 50, 2.8, [(0, POS["answers"])])
camera("C10_dawn", *span("C10_dawn"), (0.05, -0.92, 1.16), (0.0, -1.55, 1.45), (0.0, -0.08, 0.84),
       (0.0, -0.02, 0.86), 38, 3.5, [(0, Vector((0.0, -0.18, DESK_Z)))])

scene.camera = bpy.data.objects["C1_desk"]

os.makedirs(OUT, exist_ok=True)
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(OUT, "scene.blend"))
print("SAVED")
