import React from "react";
import { useNavigate } from "react-router-dom";
import "./../css/Card.css";

const BirthdayCard = () => {
    const navigate = useNavigate();

    const handleRibbonClick = () => {
        navigate("/birthday"); // replace with your target route
    };

    return (
        <div className="birthdayCard">
            <div className="cardFront">
                <h3 className="happy">🎉 HAPPY BIRTHDAY SRUSTI! 🎂</h3>
                <div className="balloons">
                    <div className="balloon-container" style={{ left: "-10px", top: "50px" }}>
                        <div className="balloon balloonOne"></div>
                        <div className="balloon-string"></div>
                    </div>
                    <div className="balloon-container" style={{ left: "50px", top: "20px" }}>
                        <div className="balloon balloonTwo"></div>
                        <div className="balloon-string"></div>
                    </div>
                    <div className="balloon-container" style={{ left: "110px", top: "50px" }}>
                        <div className="balloon balloonThree"></div>
                        <div className="balloon-string"></div>
                    </div>
                    <div className="balloon-container" style={{ left: "170px", top: "20px" }}>
                        <div className="balloon balloonFour"></div>
                        <div className="balloon-string"></div>
                    </div>
                </div>
            </div>

            <div className="cardInside">
                <h3 className="back">
                    🎂 HAPPY BIRTHDAY{" "}
                    <span
                        onClick={handleRibbonClick}
                        style={{ cursor: "pointer" }}
                        role="button"
                        aria-label="Go to Birthday Page"
                    >
                        🎀
                    </span>
                </h3>
                <p>Dear Friend,</p>
                <p>
                    May your special day be filled with love, laughter, and endless happiness.
                    Wishing you all the success, joy, and beautiful moments that life can bring! 💖🌸
                </p>
            </div>
        </div>
    );
};

export default BirthdayCard;
