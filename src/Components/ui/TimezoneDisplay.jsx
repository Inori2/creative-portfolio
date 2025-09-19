import { useEffect, useState } from "react";

export default function TimezoneDisplay() {
  const [timeInfo, setTimeInfo] = useState({ time: "", timezone: "" });

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();

      // Get formatted time in hh:mm:ss AM/PM
      const time = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      // Calculate timezone offset
      const offset = -date.getTimezoneOffset() / 60; // convert to hours
      const sign = offset >= 0 ? "+" : "-";

      setTimeInfo({
        time,
        timezone: `GMT ${sign}${Math.abs(offset)}`,
      });
    };

    updateTime(); // Run immediately on mount
    const interval = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup
  }, []);

  return (
    <span className="font-primary text-base text-stone-400 font-semibold">
      {timeInfo.time} ({timeInfo.timezone})
    </span>
  );
}
