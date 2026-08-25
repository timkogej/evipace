import { CheckCircle2 } from "lucide-react";
import { defaultSendRequestCopy, type SuccessStateCopy } from "./copy";

type SuccessStateProps = {
  copy?: SuccessStateCopy;
};

export function SuccessState({
  copy = defaultSendRequestCopy.success
}: SuccessStateProps) {
  return (
    <div
      className="rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-white p-8 text-center shadow-lift sm:p-12"
      role="status"
    >
      <CheckCircle2 aria-hidden="true" className="mx-auto h-10 w-10 text-orange" />
      <h2 className="mt-5 text-2xl font-bold text-ink">{copy.heading}</h2>
      <p className="mt-3 text-lg leading-8 text-muted">{copy.body}</p>
    </div>
  );
}
