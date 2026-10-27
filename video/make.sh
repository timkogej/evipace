#!/bin/zsh
# Full pipeline: textures -> 3D scene -> render -> post -> sound -> MP4.
# Pass --skip-render to only redo post, sound and the encode.
set -e
cd "$(dirname "$0")"

if [[ "$1" != "--skip-render" ]]; then
  python3 tex.py
  blender -b -P scene.py
  blender -b out/scene.blend -o out/frames/f_#### -a
fi

python3 post.py
python3 sfx.py
ffmpeg -y -loglevel error -framerate 30 -i out/final/p_%04d.png -i out/mix.wav \
  -c:v libx264 -preset slow -crf 16 -pix_fmt yuv420p -movflags +faststart \
  -c:a aac -b:a 256k -shortest evipace-ad-1x1.mp4
echo "done: video/evipace-ad-1x1.mp4"
