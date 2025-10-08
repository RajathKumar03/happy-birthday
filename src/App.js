import "./App.css";
import React, { useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Lock from "./components/Lock";
import Count from "./components/Count";
import BirthdayPage from "./components/BirthdayPage";
import BalloonGame from "./pages/BalloonGame";
import SpecialBirthdayPage from "./pages/SpecialBirthdayPage";
// import Cake from "./components/Cake";

function App() {
  const [unlocked, setUnlocked] = useState(false);
  const audioRef = useRef(null); // 🎵 Global audio
  const [musicStarted, setMusicStarted] = useState(false);

  const targetTime = new Date("2025-10-08T00:00:00");
  const currentTime = new Date();

  const showCountdown = currentTime < targetTime;

  // Function to start music
  const startMusic = () => {
    if (!musicStarted && audioRef.current) {
      audioRef.current.play().catch((e) => console.log("Autoplay prevented:", e));
      setMusicStarted(true);
    }
  };

  const handleUnlock = () => {
    setUnlocked(true);
    startMusic();
  };

  return (
    <Router>
      {/* Global background music */}
      <audio ref={audioRef} loop>
        <source src="/audio/birthday-music.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      <Routes>
        {/* Countdown page */}
        {showCountdown && (
          <Route path="*" element={<Count targetTime={targetTime.getTime()} />} />
        )}

        {/* Lock screen before unlock */}
        {!showCountdown && !unlocked && (
          <Route path="*" element={<Lock onUnlock={handleUnlock} />} />
        )}

        {/* Birthday and game pages after unlock */}
        {!showCountdown && unlocked && (
          <>
            <Route path="/" element={<BirthdayPage />} />
            <Route path="/game" element={<BalloonGame />} />
            <Route path="/birthday" element={<SpecialBirthdayPage />} />
            {/* <Route path="/cake" element={<Cake />} /> */}
            {/* Redirect any unknown route to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
