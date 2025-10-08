import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import "./../css/BirthdayPage.css";
import Confetti from "react-confetti";

const BirthdayPage = () => {
    const navigate = useNavigate();
    const [showGiftPopup, setShowGiftPopup] = useState(false);
    const yesBtnRef = useRef(null);

    const moveYesButton = (event) => {
        const btn = yesBtnRef.current;
        const popupRect = btn.parentElement.getBoundingClientRect();

        // Move farther away from cursor
        const offsetX = (Math.random() * 200) - 100; // range [-100, +100]
        const offsetY = (Math.random() * 100) - 50;  // range [-50, +50]

        btn.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    };

    const handleYesClick = () => {
        alert("I'm Currently unemployed 😅 You should be the one giving me a gift!");
    };

    const handleNoClick = () => {
        alert("I knew you don't need a gift 😎 but still dont forget to press the 🎀 emoji ");
        setShowGiftPopup(false);
    };


    ///

    const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
    const [showConfetti, setShowConfetti] = useState(false);

    // Update confetti on window resize
    useEffect(() => {
        const handleResize = () => {
            setDimensions({ width: window.innerWidth, height: window.innerHeight });
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="birthday-page">
            <Confetti />
            <Card />

            <div className="button-container">
                <button className="game-btn" onClick={() => navigate("/game")}>
                    Play Balloon Game 🎈
                </button>

                <button
                    className="game-btn gift-btn"
                    onClick={() => setShowGiftPopup(true)}
                >
                    Gift 🎁
                </button>
            </div>

            {showGiftPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <p>Do you need a gift for your birthday ?</p>
                        <div className="popup-buttons">
                            <button
                                className="btn yes-btn"
                                ref={yesBtnRef}
                                onMouseEnter={moveYesButton}
                                onClick={handleYesClick}
                            >
                                Yes
                            </button>
                            <button className="btn no-btn" onClick={handleNoClick}>
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
};

export default BirthdayPage;
