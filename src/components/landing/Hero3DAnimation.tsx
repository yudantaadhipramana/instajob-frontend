'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Hero3DAnimationProps {
  isVisible?: boolean;
  autoPlay?: boolean;
}

export const Hero3DAnimation: React.FC<Hero3DAnimationProps> = ({
  isVisible = true,
  autoPlay = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const contractGroupRef = useRef<THREE.Group | null>(null);
  const handGroupRef = useRef<THREE.Group | null>(null);
  const penRef = useRef<THREE.Mesh | null>(null);
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfafafa);
    sceneRef.current = scene;

    // Camera Setup
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Contract Paper Group (will zoom in/out)
    const contractGroup = new THREE.Group();
    contractGroupRef.current = contractGroup;
    scene.add(contractGroup);

    // Create Contract Paper Mesh
    const paperGeometry = new THREE.PlaneGeometry(3, 4);
    const paperMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.8,
      side: THREE.FrontSide,
    });
    const paperMesh = new THREE.Mesh(paperGeometry, paperMaterial);
    paperMesh.receiveShadow = true;
    paperMesh.position.z = 0;
    contractGroup.add(paperMesh);

    // Add border/frame to paper (subtle shadow effect)
    const borderGeometry = new THREE.PlaneGeometry(3.05, 4.05);
    const borderMaterial = new THREE.MeshStandardMaterial({
      color: 0xe5e5e5,
      metalness: 0,
      roughness: 1,
    });
    const borderMesh = new THREE.Mesh(borderGeometry, borderMaterial);
    borderMesh.position.z = -0.01;
    contractGroup.add(borderMesh);

    // Hand Group
    const handGroup = new THREE.Group();
    handGroupRef.current = handGroup;
    scene.add(handGroup);

    // Create Simple Hand (arm + hand + pen)
    // Arm
    const armGeometry = new THREE.BoxGeometry(0.2, 2, 0.15);
    const skinMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4a574,
      metalness: 0,
      roughness: 0.8,
    });
    const arm = new THREE.Mesh(armGeometry, skinMaterial);
    arm.position.set(-0.8, -0.5, 1.5);
    arm.castShadow = true;
    handGroup.add(arm);

    // Hand (simplified as box)
    const handGeometry = new THREE.BoxGeometry(0.3, 0.25, 0.15);
    const hand = new THREE.Mesh(handGeometry, skinMaterial);
    hand.position.set(-0.65, 1.2, 1.5);
    hand.castShadow = true;
    handGroup.add(hand);

    // Pen
    const penGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.8, 16);
    const penMaterial = new THREE.MeshStandardMaterial({
      color: 0x0051ff,
      metalness: 0.7,
      roughness: 0.2,
    });
    const pen = new THREE.Mesh(penGeometry, penMaterial);
    pen.rotation.z = Math.PI / 4;
    pen.position.set(-0.4, 1.3, 1.5);
    pen.castShadow = true;
    handGroup.add(pen);
    penRef.current = pen;

    // Animation Loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      if (autoPlay && isVisible) {
        timeRef.current += 0.005;

        // Animation Timeline (0-1)
        const progress = (Math.sin(timeRef.current) + 1) / 2; // Oscillate 0-1
        setAnimationProgress(progress);

        // Phase 1: Zoom out contract (0-0.2)
        if (progress < 0.2) {
          const phaseProgress = progress / 0.2;
          contractGroup.scale.set(
            1 - phaseProgress * 0.3,
            1 - phaseProgress * 0.3,
            1
          );
          contractGroup.position.z = -phaseProgress * 2;
        }

        // Phase 2: Hold (0.2-0.4)
        else if (progress < 0.4) {
          contractGroup.scale.set(0.7, 0.7, 1);
          contractGroup.position.z = -2;
        }

        // Phase 3: Zoom in (0.4-0.6)
        else if (progress < 0.6) {
          const phaseProgress = (progress - 0.4) / 0.2;
          contractGroup.scale.set(
            0.7 + phaseProgress * 0.3,
            0.7 + phaseProgress * 0.3,
            1
          );
          contractGroup.position.z = -2 + phaseProgress * 2;
        }

        // Phase 4: Hand signing animation (0.6-1.0)
        else {
          const phaseProgress = (progress - 0.6) / 0.4;
          contractGroup.scale.set(1, 1, 1);
          contractGroup.position.z = 0;

          // Hand moves to paper and signs
          handGroup.position.x = -1.2 + phaseProgress * 1;
          handGroup.position.y = 0.5 - phaseProgress * 1;

          // Pen rotation for signing motion
          pen.rotation.z = Math.PI / 4 + Math.sin(phaseProgress * Math.PI) * 0.3;
        }

        // Subtle camera wobble for depth
        camera.position.x = Math.sin(timeRef.current * 0.5) * 0.1;
        camera.position.y = Math.cos(timeRef.current * 0.3) * 0.1;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      const newWidth = containerRef.current?.clientWidth || width;
      const newHeight = containerRef.current?.clientHeight || height;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [autoPlay, isVisible]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '12px',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #f5f8ff 0%, #eef2ff 100%)',
      }}
    />
  );
};

export default Hero3DAnimation;
