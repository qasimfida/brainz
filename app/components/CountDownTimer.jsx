import { useEffect, useState, useCallback } from "react";
import classNames from "classnames";

const CountdownTimer = ({ initialMinutes = 1, initialSeconds = 35 }) => {
  const [[minutes, seconds], setTime] = useState([
    initialMinutes,
    initialSeconds,
  ]);

  const tick = useCallback(() => {
    if (minutes === 0 && seconds === 0) {
      setTime([initialMinutes, initialSeconds]);
    } else if (seconds === 0) {
      setTime([minutes - 1, 59]);
    } else {
      setTime([minutes, seconds - 1]);
    }
  }, [minutes, seconds, initialMinutes, initialSeconds]);

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  }, [tick]);

  // Determine if time is less than 30 seconds
  const isLessThanThirty = minutes === 0 && seconds < 31;

  // Apply conditional classes for background color
  const timerClasses = classNames("text-secondary", {
    "text-[red]": isLessThanThirty,
    "px-2 rounded": true,
  });

  return (
    <span className={`${timerClasses}`}>
      {`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
      )}`}
    </span>
  );
};

export default CountdownTimer;
