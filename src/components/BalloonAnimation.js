import { useEffect } from "react";
import "./../css/Balloons.css";

const colors = ["yellow", "green", "blue", "red"];
const density = 7;

const BalloonAnimation = () => {
  useEffect(() => {
    const balloons = [];

    const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

    const releaseBalloon = (balloon) => {
      const delay = random(100, 1000);
      const x = random(-99, -30);
      const y = random(-99, -30);

      const sequence =
        random(0, 2) === 0
          ? [
              { offset: 0, transform: `rotateZ(45deg) translate(0,0)` },
              { offset: x / -200, transform: `rotateZ(45deg) translate(${x}vw,0)` },
              { offset: (x + y) / -200, transform: `rotateZ(45deg) translate(${x}vw, ${y}vh)` },
              { offset: (-100 + y) / -200, transform: `rotateZ(45deg) translate(-100vw, ${y}vh)` },
              { offset: 1, transform: `rotateZ(45deg) translate(-100vw, -100vh)` },
            ]
          : [
              { offset: 0, transform: `rotateZ(45deg) translate(0,0)` },
              { offset: y / -200, transform: `rotateZ(45deg) translate(0, ${y}vh)` },
              { offset: (x + y) / -200, transform: `rotateZ(45deg) translate(${x}vw, ${y}vh)` },
              { offset: (-100 + x) / -200, transform: `rotateZ(45deg) translate(${x}vw, -100vh)` },
              { offset: 1, transform: `rotateZ(45deg) translate(-100vw, -100vh)` },
            ];

      const anim = balloon.animate(sequence, {
        duration: 15000,
        delay: delay,
        iterations: 1,
      });

      anim.onfinish = () => releaseBalloon(balloon);
    };

    for (let i = 0; i < density; i++) {
      const balloon = document.createElement("div");
      balloon.classList.add("balloon");
      balloon.classList.add(colors[random(0, colors.length)]);

      const stringEl = document.createElement("div");
      stringEl.classList.add("string");
      balloon.appendChild(stringEl);

      document.body.appendChild(balloon);
      balloons.push(balloon);

      setTimeout(() => releaseBalloon(balloon), i * 2000 + random(500, 1000));
    }

    return () => {
      // Cleanup on unmount
      balloons.forEach((b) => b.remove());
    };
  }, []);

  return null; // all balloons are handled in DOM directly
};

export default BalloonAnimation;
