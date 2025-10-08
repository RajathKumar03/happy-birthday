import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import Slideshow from "../components/Slideshow";
import "./../css/SpecialBirthdayPage.css";
import Cake from "./../components/Cake";

const images = [
    process.env.PUBLIC_URL + "/images/img1.jpg",
  process.env.PUBLIC_URL + "/images/img2.jpg",
  process.env.PUBLIC_URL + "/images/img3.jpg",
];

const SpecialBirthdayPage = () => {
    const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
    const [showGiftPopup, setShowGiftPopup] = useState(false);
    const audioRef = useRef(null);
    const [musicStarted, setMusicStarted] = useState(false);

    // Window resize for confetti
    useEffect(() => {
        const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Start music on user interaction
    const handleStartMusic = () => {
        if (!musicStarted && audioRef.current) {
            audioRef.current.play().catch((e) => console.log("Autoplay blocked:", e));
            setMusicStarted(true);
        }
    };

    return (
        <div className="sbp-container">
            <div className="sbp-page" onClick={handleStartMusic}>
                {/* Confetti */}
                <Confetti width={dimensions.width} height={dimensions.height} />

                {/* Background music */}
                <audio ref={audioRef} loop>
                    <source src="/audio/birthday-music.mp3" type="audio/mp3" />
                    Your browser does not support the audio element.
                </audio>

                {/* Floating balloons */}
                <div className="sbp-balloon sbp-balloonOne"></div>
                <div className="sbp-balloon sbp-balloonTwo"></div>
                <div className="sbp-balloon sbp-balloonThree"></div>

                {/* Birthday message */}
                <h1 className="sbp-title">🎉 Happy Birthday, Srusti! 🎂</h1>

                {/* Slideshow */}
                <Slideshow images={images} interval={4000} />

                {/* Gift Button */}
                <button
                    className="sbp-gift-btn"
                    onClick={() => setShowGiftPopup(true)}
                >
                    🎁 Open Gift
                </button>

                {/* Gift Popup */}
                {showGiftPopup && (
                    <div className="sbp-popup-overlay">
                        <div className="sbp-popup-content">
                            <h2>Surprise! 🎀</h2>
                            <Cake />
                            <p>🎁🎈💖 May your day be magical and full of surprises! 💖🎈🎁<br/>And SORRY i didnt have any other photos 😅😂</p>
                            <button onClick={() => setShowGiftPopup(false)}>Close</button>
                        </div>
                    </div>
                )}
            </div>


        </div>
    );
};

export default SpecialBirthdayPage;
