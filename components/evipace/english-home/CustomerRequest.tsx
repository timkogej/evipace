import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { evipaceImages } from "@/lib/evipace-images";
import { RequestStream } from "../home-sections/RequestStream";
import { HomeImage } from "./HomeImage";
import { requestQuestions, requestTypes } from "./content";
import { SectionHeading } from "./SectionHeading";

export function CustomerRequest({
  imageAvailable
}: {
  imageAvailable: boolean;
}) {
  return (
    <section className="section-padding bg-white" id="customer-request">
      <div className="site-shell">
        <div className="max-w-5xl">
          <SectionHeading
            eyebrow="When the request arrives"
            heading="A customer asks for ESG information. What happens next?"
          />
        </div>

        {/*
          The stream is its own grid item spanning both columns at the row's
          bottom edge, so it runs the full section width and passes behind
          the black panel. Stacked on narrow screens it simply falls between
          the photograph and the panel.
        */}
        <div className="reqsection mt-12">
          <div className="reqsection__grid">
            <div className="reqsection__media flex flex-col">
              <HomeImage
                asset={evipaceImages.questionnaireForward}
                available={imageAvailable}
                className="min-h-[24rem] flex-1 rounded-[1.25rem] sm:min-h-[31rem]"
              />
            </div>

            <div className="reqsection__stream">
              <RequestStream
                items={requestTypes}
                label="Incoming ESG request types"
              />
            </div>

            <div className="reqsection__panel flex flex-col justify-between rounded-[1.25rem] bg-dark p-6 text-white sm:p-9 lg:p-11">
              <div>
                <p className="text-lg leading-8 text-white/70">
                  You do not need another ESG platform just to understand the
                  request. You need to know:
                </p>
                <ul className="mt-8 grid gap-1">
                  {requestQuestions.map((question) => (
                    <li
                      className="flex gap-4 border-t border-white/12 py-4 text-lg font-semibold text-white sm:text-xl"
                      key={question}
                    >
                      <CheckCircle2
                        aria-hidden="true"
                        className="mt-1 h-5 w-5 shrink-0 text-orange"
                      />
                      <span>{question}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 border-t border-white/14 pt-7">
                <p className="font-display text-4xl text-white">
                  That is where we start.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    className="inline-flex items-center gap-2 text-sm font-bold text-white transition hover:text-orange"
                    href="/en/esg-customer-requests"
                  >
                    <span>Customer ESG request support</span>
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                  <Link
                    className="inline-flex items-center gap-2 text-sm font-bold text-white/72 transition hover:text-orange"
                    href="/en/resources"
                  >
                    <span>Explore practical ESG guides and tools</span>
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
