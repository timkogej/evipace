import { existsSync } from "node:fs";
import path from "node:path";
import { evipaceImages } from "./evipace-images";

const publicRoot = path.join(process.cwd(), "public");

function hasPublicAsset(src: string) {
  return existsSync(path.join(publicRoot, src.replace(/^\//, "")));
}

export type EvipaceImageAvailability = ReturnType<
  typeof getEvipaceImageAvailability
>;

export function getEvipaceImageAvailability() {
  return {
    hero:
      hasPublicAsset(evipaceImages.hero.src) &&
      hasPublicAsset(evipaceImages.hero.mobileSrc),
    customerData: hasPublicAsset(evipaceImages.customerData.src),
    services: {
      questionnaires: hasPublicAsset(evipaceImages.services.questionnaires.src),
      vsme: hasPublicAsset(evipaceImages.services.vsme.src),
      scope: hasPublicAsset(evipaceImages.services.scope.src),
      evidence: hasPublicAsset(evipaceImages.services.evidence.src)
    },
    howItWorks: hasPublicAsset(evipaceImages.howItWorks.src),
    questionnaireForward: hasPublicAsset(
      evipaceImages.questionnaireForward.src
    ),
    founder: hasPublicAsset(evipaceImages.founder.src),
    industrialBreak: hasPublicAsset(evipaceImages.industrialBreak.src)
  };
}
