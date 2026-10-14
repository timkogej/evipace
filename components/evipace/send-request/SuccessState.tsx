import { Check } from "lucide-react";
import { defaultSendRequestCopy, type SuccessStateCopy } from "./copy";
import styles from "./SendRequest.module.css";

type SuccessStateProps = {
  copy?: SuccessStateCopy;
};

export function SuccessState({
  copy = defaultSendRequestCopy.success
}: SuccessStateProps) {
  return (
    <div className={styles.success} role="status">
      <span aria-hidden="true" className={styles.successIcon}>
        <Check />
      </span>
      <h2>{copy.heading}</h2>
      <p>{copy.body}</p>
      <div className={styles.successNext}>
        <p className={styles.panelLabel}>{copy.nextLabel}</p>
        <ol className={styles.next}>
          {copy.next.map((item) => (
            <li key={item}>
              <p>{item}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
