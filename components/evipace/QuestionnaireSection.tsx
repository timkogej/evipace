"use client";

import { evipaceImages } from "@/lib/evipace-images";
import { ButtonLink } from "./ButtonLink";
import { ImageSlot } from "./ImageSlot";
import { Reveal } from "./Reveal";

type QuestionnaireSectionProps = {
  imageAvailable: boolean;
};

export function QuestionnaireSection({
  imageAvailable
}: QuestionnaireSectionProps) {
  return (
    <section className="section-padding bg-white" id="questionnaire">
      <div className="site-shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <Reveal>
          <p className="eyebrow">Questionnaire focus</p>
          <h2 className="heading-md font-display mt-6 max-w-[12ch]">
            Received another ESG questionnaire? Forward it to us.
          </h2>
          <p className="body-lg mt-7">
            Whether it is EcoVadis, IntegrityNext or a custom Excel
            questionnaire from a customer, we organise the evidence, prepare the
            responses and identify what is still missing.
          </p>
          <div className="mt-8">
            <ButtonLink href="#final-cta">Send us your questionnaire</ButtonLink>
          </div>
        </Reveal>

        <div className="relative">
          <ImageSlot
            {...evipaceImages.questionnaireForward}
            className="min-h-[30rem] rounded-[1.25rem]"
            renderActualImage={imageAvailable}
          />
        </div>
      </div>
    </section>
  );
}
