import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const ThreeScene2 = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Create scene
    const scene = new THREE.Scene();

    // Create camera
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 4, 11);
    camera.rotation.set(-0.4, 0, 0);

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true; // Enable shadow maps
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Soft shadow maps

    // Append renderer to DOM
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Lower intensity for better sunlight contrast
    scene.add(ambientLight);

    // Add directional light (existing)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(-10, 5, 2).normalize();
    scene.add(directionalLight);

    // Add sunlight (directional light)
    const sunLight = new THREE.DirectionalLight(0xffffff, 10);
    sunLight.position.set(50, 50, 50); // Position the light to simulate the sun
    sunLight.castShadow = true; // Enable shadows
    sunLight.shadow.mapSize.width = 1024; // Shadow map resolution
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 500;
    sunLight.shadow.camera.left = -50;
    sunLight.shadow.camera.right = 50;
    sunLight.shadow.camera.top = 50;
    sunLight.shadow.camera.bottom = -50;
    scene.add(sunLight);

    // Load a 3D model
    const modelUrl =
      "https://raw.githubusercontent.com/Alshekizx/17kStudio/3dAssets/pacmanworld.glb";

    const loader = new GLTFLoader();
    loader.load(
      modelUrl,
      (gltf) => {
        const model = gltf.scene;
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true; // Cast shadows from model
            child.receiveShadow = true; // Receive shadows on model
          }
        });
        scene.add(model);
      },
      undefined,
      (error) => {
        console.error("An error occurred while loading the model:", error);
      },
    );

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Smooth damping effect
    controls.dampingFactor = 0.05; // Controls the damping factor
    controls.screenSpacePanning = false; // Disables panning in screen space
    controls.minDistance = 5; // Minimum zoom distance
    controls.maxDistance = 50; // Maximum zoom distance
    controls.maxPolarAngle = Math.PI / 2; // Prevents flipping

    // Resize function
    const resizeRenderer = () => {
      if (mountRef.current) {
        const size = mountRef.current.clientWidth;
        renderer.setSize(size, size);
        camera.aspect = 1;
        camera.updateProjectionMatrix();
      }
    };

    // Initial resize to fit the parent div
    resizeRenderer();

    // Handle window resize
    window.addEventListener("resize", resizeRenderer);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update(); // Update the controls
      renderer.render(scene, camera);
    };
    animate();

    // Clean up on component unmount
    return () => {
      window.removeEventListener("resize", resizeRenderer);
      controls.dispose();
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "0",
        paddingBottom: "100%", // 1:1 aspect ratio
        position: "relative",
      }}
    ></div>
  );
};

export default ThreeScene2;
