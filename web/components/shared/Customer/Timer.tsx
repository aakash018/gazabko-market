import React, { useEffect, useState } from "react";
import styles from "../../../styles/components/shared/Customer/Timer.module.scss";

interface Props {
  date: number;
}

const Timer: React.FC<Props> = ({ date }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [second, setSecond] = useState(0);

  useEffect(() => {
    // Update the count down every 1 second
    const timer = setInterval(function () {
      // Get today's date and time
      const now = new Date().getTime();

      // Find the distance between now and the count down date
      const distance = date - now;

      // Time calculations for days, hours, minutes and seconds
      setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
      setHours(
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      );
      setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      setSecond(Math.floor((distance % (1000 * 60)) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [date]);

  return (
    <div>
      <span className={styles.timeHolder}>{days}</span> :{" "}
      <span className={styles.timeHolder}>{hours}</span> :{" "}
      <span className={styles.timeHolder}>{minutes}</span> :{" "}
      <span className={styles.timeHolder}>{second}</span>
    </div>
  );
};

export default Timer;
