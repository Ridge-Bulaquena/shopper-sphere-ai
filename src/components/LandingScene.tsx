
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const LandingScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    
    // Camera position
    camera.position.z = 5;
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x8B5CF6, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    const pointLight1 = new THREE.PointLight(0xD946EF, 1, 10);
    pointLight1.position.set(-2, 1, 3);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x6E59A5, 1, 10);
    pointLight2.position.set(2, -1, 3);
    scene.add(pointLight2);
    
    // Grid of particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      // Create a grid pattern with some randomness
      posArray[i] = (Math.random() - 0.5) * 15;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.01,
      color: 0x8B5CF6,
      transparent: true,
      opacity: 0.8
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Floating shapes
    const torusGeometry = new THREE.TorusGeometry(1, 0.3, 16, 100);
    const torusMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x8B5CF6,
      metalness: 0.7, 
      roughness: 0.2 
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(-2, 1, 0);
    scene.add(torus);
    
    const dodecahedronGeometry = new THREE.DodecahedronGeometry(0.8);
    const dodecahedronMaterial = new THREE.MeshStandardMaterial({
      color: 0xD946EF,
      metalness: 0.7,
      roughness: 0.2
    });
    const dodecahedron = new THREE.Mesh(dodecahedronGeometry, dodecahedronMaterial);
    dodecahedron.position.set(2, -1, 0);
    scene.add(dodecahedron);
    
    const octahedronGeometry = new THREE.OctahedronGeometry(0.6);
    const octahedronMaterial = new THREE.MeshStandardMaterial({
      color: 0x6E59A5,
      metalness: 0.7,
      roughness: 0.2
    });
    const octahedron = new THREE.Mesh(octahedronGeometry, octahedronMaterial);
    octahedron.position.set(0, 2, -2);
    scene.add(octahedron);
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate the shapes
      torus.rotation.x += 0.005;
      torus.rotation.y += 0.005;
      dodecahedron.rotation.x += 0.003;
      dodecahedron.rotation.y += 0.006;
      octahedron.rotation.x -= 0.004;
      octahedron.rotation.y -= 0.004;
      
      // Slow rotation of the particles
      particlesMesh.rotation.y += 0.0005;
      
      // Gentle floating motion for shapes
      torus.position.y = Math.sin(Date.now() * 0.0005) * 0.2 + 1;
      dodecahedron.position.y = Math.cos(Date.now() * 0.0004) * 0.2 - 1;
      octahedron.position.y = Math.sin(Date.now() * 0.0003) * 0.2 + 2;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
};

export default LandingScene;
