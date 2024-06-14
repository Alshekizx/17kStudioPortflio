import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const ThreeScene = () => {
  const mountRef = useRef(null);
  const modelRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 0.05, 1.1);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 15);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
    directionalLight.position.set(-10, 5, 2).normalize();
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xff0000, 200, 100);
    pointLight.position.set(10, 5, 2);
    scene.add(pointLight);

    // Load model
    const modelUrl =
      "https://raw.githubusercontent.com/Alshekizx/17kStudio/3dAssets/17k.glb";
    const loader = new GLTFLoader();
    loader.load(
      modelUrl,
      (gltf) => {
        const model = gltf.scene;
        modelRef.current = model;
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
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 0.5;
    controls.maxDistance = 5;
    controls.maxPolarAngle = Math.PI / 2; // Prevent looking below the scene

    // Resize function
    const resizeRenderer = () => {
      if (mountRef.current) {
        const size = mountRef.current.clientWidth;
        renderer.setSize(size, size);
        camera.aspect = 1;
        camera.updateProjectionMatrix();
      }
    };

    resizeRenderer();
    window.addEventListener("resize", resizeRenderer);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (modelRef.current) {
        modelRef.current.rotation.y -= 0.003;
      }
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
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
        paddingBottom: "100%",
        position: "relative",
      }}
    />
  );
};

export default ThreeScene;
