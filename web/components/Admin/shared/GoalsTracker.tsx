import React, { useEffect, useRef } from "react";
import styles from "../../../styles/components/shared/Admin/GoalsTracker.module.scss";

interface Props {
  title: string;
  total: number;
  value: number;
}

const GoalsTracker: React.FC<Props> = ({ title, value, total }) => {
  const progressBar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const perc = (value / total) * 100;
    if (progressBar.current) {
      progressBar.current.style.width = `${perc}%`;

      if (perc > 40) {
        progressBar.current.classList.remove(styles.red);

        progressBar.current.classList.add(styles.green);
      } else {
        progressBar.current.classList.remove(styles.green);
        progressBar.current.classList.add(styles.red);
      }
    }
  }, [value]);

  return (
    <div className={styles.tracker}>
      <div className={styles.title}>{title}</div>
      <div className={styles.trackerBody}>
        <div className={styles.progressBar} ref={progressBar}></div>
      </div>
      <div className={styles.progressInNumber}>
        {value}/{total}
      </div>
    </div>
  );
};

export default GoalsTracker;
