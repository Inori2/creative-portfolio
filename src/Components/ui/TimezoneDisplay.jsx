import { useEffect, useState } from "react";

export default function TimezoneDisplay() {
  const [timeInfo, setTimeInfo] = useState({ time: "", timezone: "" });

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();

      // Get formatted time in hh:mm:ss AM/PM for GMT+11
      // Note: In IANA time zone database, 'Etc/GMT-11' represents GMT+11
      const time = date.toLocaleTimeString("en-US", {
        timeZone: "Etc/GMT-11",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      setTimeInfo({
        time,
        timezone: "GMT+11",
      });
    };

    updateTime(); // Run immediately on mount
    const interval = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup
  }, []);

  const [hours, minutes] = timeInfo.time.split(":");

  return (
    <span className="font-primary text-base text-stone-400 font-semibold">
      Melborne, AU {hours}
      <span className="animate-blink">:</span>
      {minutes}
    </span>
  );
}
