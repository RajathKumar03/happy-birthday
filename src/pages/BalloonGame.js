import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { Howl } from "howler";
import bgImage from "../assets/bgImage.jpg";


import "../css/BalloonGame.css";

import objFile from "../assets/Balloon.obj";
import mtlFile from "../assets/Balloon.mtl";
import soundFile from "../assets/pop.wav";

const colors = [0xff5733, 0x26e310, 0xfcf408, 0x08fcf5, 0x085dfc];

export default function BalloonGame() {
  const mountRef = useRef(null);
  const cursorRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const meshArray = useRef([]);
  const pointsArray = useRef([]);
  const childArr = useRef([]);
  const balloonGroup = useRef(null);
  const hs = useRef(new Set());
  const SPEED = useRef(0.1);
  const sound = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.TextureLoader().load(bgImage);


    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(0, 0, 100);
    scene.add(directionalLight);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 40;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Remove any existing canvas before adding a new one
    if (mountRef.current) {
      while (mountRef.current.firstChild) {
        mountRef.current.removeChild(mountRef.current.firstChild);
      }
      mountRef.current.appendChild(renderer.domElement);
    }

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    const cursor = cursorRef.current;
    const cursorMove = (event) => {
      cursor.style.left = event.pageX + "px";
      cursor.style.top = event.pageY + "px";
    };
    document.addEventListener("mousemove", cursorMove);

    sound.current = new Howl({ src: [soundFile], volume: 0.5 });

    const mtlLoader = new MTLLoader();
    mtlLoader.load(mtlFile, (materials) => {
      materials.preload();
      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials);
      objLoader.load(objFile, (object) => {
        balloonGroup.current = object;
        addBalloons(scene);
      });
    });

    // Balloon spawning
    let spawnCount = 0;
    const intervalID = setInterval(() => {
      if (++spawnCount === 7) {
        clearInterval(intervalID);
        setGameOver(true); // show game over overlay
      }
      addBalloons(scene);
    }, 3000);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const onPointerDown = (event) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);

      const intersects = raycaster.intersectObjects(childArr.current);
      if (!intersects.length) return;

      const res = intersects[0];
      if (!res.object) return;

      const parent = res.object.parent;
      if (hs.current.has(parent.uuid) || gameOver) return;

      hs.current.add(parent.uuid);
      setScore((prev) => prev + 1);
      sound.current.play();

      const [child1, child2] = parent.children;
      const pointMaterial = new THREE.PointsMaterial({
        color: child1.material.color,
        size: 0.08,
      });

      const mergedGeo = mergeGeometries([child1.geometry, child2.geometry], false);
      const mesh = new THREE.Points(mergedGeo, pointMaterial);
      mesh.position.copy(parent.position);
      mesh.scale.set(4, 4, 4);

      scene.remove(parent);
      pointsArray.current.push(mesh);
      scene.add(mesh);
    };
    document.addEventListener("pointerdown", onPointerDown);

    const animate = () => {
      meshArray.current.forEach((mesh, index) => {
        mesh.rotation.x += index % 2 ? Math.random() * 0.01 : -Math.random() * 0.02;
        mesh.position.y += SPEED.current;
      });
      pointsArray.current.forEach(explodeBalloon);
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      clearInterval(intervalID);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("mousemove", cursorMove);
      window.removeEventListener("resize", onResize);
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [gameOver]);

  const addBalloons = (scene) => {
    if (!balloonGroup.current) return;
    for (let i = 0; i < 10; i++) {
      const randX = Math.random();
      const randZ = Math.random();
      const bcopy = balloonGroup.current.clone();
      const position = {
        x: randX <= 0.5 ? -50 * randX : 50 * randX,
        y: -45 + Math.random() * 10,
        z: randZ <= 0.5 ? -20 * randZ : 20 * randZ,
      };
      bcopy.position.copy(position);
      bcopy.scale.set(3, 3, 3);

      const balloonColor = colors[Math.floor(Math.random() * colors.length)];
      bcopy.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = child.material.clone();
          child.material.color.set(balloonColor);
        }
      });

      meshArray.current.push(bcopy);
      childArr.current.push(...bcopy.children);
      scene.add(bcopy);
    }
  };

  const explodeBalloon = (mesh) => {
    const positions = mesh.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      const v = new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2]).multiplyScalar(1.05);
      positions[i] = v.x;
      positions[i + 1] = v.y;
      positions[i + 2] = v.z;
    }
    mesh.geometry.attributes.position.needsUpdate = true;
  };

  return (
    <div className="balloon-game-container">
      <div ref={mountRef}></div>
      <div className="cursor" ref={cursorRef}></div>
      <div className="score-display">Score: {score}</div>

      {gameOver && (
        <div className="game-over-overlay">
          <h1>Game Over!</h1>
          <p style={{ color: "white", fontFamily: "Balsamiq Sans, sans-serif" }}>Your Score: {score}</p>
          <button
            className="btn btn--wide"
            onClick={() => window.history.back()} // goes to previous page
            style={{ marginTop: "1em" }}
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
}
