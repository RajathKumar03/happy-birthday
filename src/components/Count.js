import React, { useState, useEffect } from "react";
import "./../css/Countdown.css";

const Count = ({ targetTime }) => {
  const [timeLeft, setTimeLeft] = useState(targetTime - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(targetTime - new Date().getTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [targetTime]);

  // 🧮 Time calculations
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <div className="countdown">
      <h1>🎂 Countdown to the Birthday Surprise 🎉</h1>
      <h2>
        {days}d : {hours}h : {minutes}m : {seconds}s
      </h2>
      <p>Come back at exactly 12:00 AM on October 14 to unlock your surprise! 💝</p>
    </div>
  );
};

export default Count;
