import React, { useState } from "react";
import { LockKeyhole } from "lucide-react";
import "./../css/LockScreen.css";

const Lock = ({ onUnlock }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === "14-10-2025") {
      onUnlock();
    } else {
      setError("❌ Wrong password! Try again.");
    }
  };

  return (
    <div className="lockscreen">
      <div className="lock-card">
        <div className="lock-icon">
          <LockKeyhole size={60} strokeWidth={1.5} />
        </div>
        <h1>🎁 Enter the Secret Date 🎉</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter your birthdate (DD-MM-YYYY)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">Unlock</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default Lock;
