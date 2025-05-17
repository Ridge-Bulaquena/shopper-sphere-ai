
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { products } from '@/data/products';

interface ProductViewer3DProps {
  productId: string;
}

const ProductViewer3D: React.FC<ProductViewer3DProps> = ({ productId }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1A1F2C);
    
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    
    // Camera position
    camera.position.z = 3;
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    const pointLight1 = new THREE.PointLight(0x8B5CF6, 1, 10);
    pointLight1.position.set(-2, 1, 3);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xD946EF, 1, 10);
    pointLight2.position.set(2, -1, 3);
    scene.add(pointLight2);
    
    // Rotating platform
    const platformGeometry = new THREE.CylinderGeometry(1, 1, 0.1, 32);
    const platformMaterial = new THREE.MeshStandardMaterial({
      color: 0x6E59A5,
      metalness: 0.8,
      roughness: 0.2
    });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.position.y = -0.5;
    scene.add(platform);
    
    // Add product model based on type
    let productModel: THREE.Mesh | THREE.Group;
    
    switch(product.modelPath) {
      case 'smartwatch':
        const watchGroup = new THREE.Group();
        
        // Watch band
        const bandGeometry = new THREE.TorusGeometry(0.7, 0.1, 16, 32);
        const bandMaterial = new THREE.MeshStandardMaterial({
          color: 0x222222,
          metalness: 0.5,
          roughness: 0.5
        });
        const band = new THREE.Mesh(bandGeometry, bandMaterial);
        band.rotation.x = Math.PI / 2;
        watchGroup.add(band);
        
        // Watch face
        const faceGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.1, 32);
        const faceMaterial = new THREE.MeshStandardMaterial({
          color: 0x333333,
          metalness: 0.9,
          roughness: 0.1
        });
        const face = new THREE.Mesh(faceGeometry, faceMaterial);
        face.rotation.x = Math.PI / 2;
        watchGroup.add(face);
        
        // Watch screen
        const screenGeometry = new THREE.CylinderGeometry(0.45, 0.45, 0.02, 32);
        const screenMaterial = new THREE.MeshStandardMaterial({
          color: 0x111111,
          emissive: 0x8B5CF6,
          emissiveIntensity: 0.5,
          metalness: 1,
          roughness: 0
        });
        const screen = new THREE.Mesh(screenGeometry, screenMaterial);
        screen.position.y = 0.06;
        screen.rotation.x = Math.PI / 2;
        watchGroup.add(screen);
        
        productModel = watchGroup;
        break;
        
      case 'vr-headset':
        const headsetGroup = new THREE.Group();
        
        // Main body
        const bodyGeometry = new THREE.BoxGeometry(1.2, 0.6, 0.8);
        const bodyMaterial = new THREE.MeshStandardMaterial({
          color: 0x222222,
          metalness: 0.5,
          roughness: 0.5
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        headsetGroup.add(body);
        
        // Front face
        const frontGeometry = new THREE.BoxGeometry(1.2, 0.6, 0.1);
        const frontMaterial = new THREE.MeshStandardMaterial({
          color: 0x111111,
          metalness: 0.9,
          roughness: 0.1
        });
        const front = new THREE.Mesh(frontGeometry, frontMaterial);
        front.position.z = 0.45;
        headsetGroup.add(front);
        
        // Lenses
        const lensGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.1, 32);
        const lensMaterial = new THREE.MeshStandardMaterial({
          color: 0x000000,
          emissive: 0xD946EF,
          emissiveIntensity: 0.2
        });
        
        const leftLens = new THREE.Mesh(lensGeometry, lensMaterial);
        leftLens.position.set(-0.25, 0, 0.5);
        leftLens.rotation.x = Math.PI / 2;
        headsetGroup.add(leftLens);
        
        const rightLens = new THREE.Mesh(lensGeometry, lensMaterial);
        rightLens.position.set(0.25, 0, 0.5);
        rightLens.rotation.x = Math.PI / 2;
        headsetGroup.add(rightLens);
        
        // Strap
        const strapGeometry = new THREE.TorusGeometry(0.5, 0.05, 16, 32, Math.PI);
        const strapMaterial = new THREE.MeshStandardMaterial({
          color: 0x444444,
          metalness: 0.2,
          roughness: 0.8
        });
        const strap = new THREE.Mesh(strapGeometry, strapMaterial);
        strap.position.z = -0.2;
        strap.rotation.x = Math.PI / 2;
        headsetGroup.add(strap);
        
        productModel = headsetGroup;
        break;
        
      case 'console':
        const consoleGroup = new THREE.Group();
        
        // Main console body
        const consoleGeometry = new THREE.BoxGeometry(1.5, 0.3, 1);
        const consoleMaterial = new THREE.MeshStandardMaterial({
          color: 0x0A0F1C,
          metalness: 0.7,
          roughness: 0.3
        });
        const consoleBody = new THREE.Mesh(consoleGeometry, consoleMaterial);
        consoleGroup.add(consoleBody);
        
        // Logo light
        const logoGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.01, 32);
        const logoMaterial = new THREE.MeshStandardMaterial({
          color: 0x8B5CF6,
          emissive: 0x8B5CF6,
          emissiveIntensity: 1
        });
        const logo = new THREE.Mesh(logoGeometry, logoMaterial);
        logo.position.set(0, 0.16, 0);
        logo.rotation.x = Math.PI / 2;
        consoleGroup.add(logo);
        
        // Power button
        const buttonGeometry = new THREE.CylinderGeometry(0.04, 0.04, 0.02, 32);
        const buttonMaterial = new THREE.MeshStandardMaterial({
          color: 0xffffff
        });
        const button = new THREE.Mesh(buttonGeometry, buttonMaterial);
        button.position.set(0.7, 0.16, 0);
        button.rotation.x = Math.PI / 2;
        consoleGroup.add(button);
        
        // Disc drive
        const driveGeometry = new THREE.BoxGeometry(0.5, 0.02, 0.1);
        const driveMaterial = new THREE.MeshStandardMaterial({
          color: 0x222222
        });
        const drive = new THREE.Mesh(driveGeometry, driveMaterial);
        drive.position.set(-0.4, 0, 0.45);
        consoleGroup.add(drive);
        
        productModel = consoleGroup;
        break;
        
      case 'drone':
        const droneGroup = new THREE.Group();
        
        // Body
        const droneBodyGeometry = new THREE.BoxGeometry(0.4, 0.1, 0.4);
        const droneBodyMaterial = new THREE.MeshStandardMaterial({
          color: 0x444444,
          metalness: 0.8,
          roughness: 0.2
        });
        const droneBody = new THREE.Mesh(droneBodyGeometry, droneBodyMaterial);
        droneGroup.add(droneBody);
        
        // Arms
        const armGeometry = new THREE.BoxGeometry(0.8, 0.05, 0.05);
        const armMaterial = new THREE.MeshStandardMaterial({
          color: 0x666666,
          metalness: 0.8,
          roughness: 0.2
        });
        
        const arm1 = new THREE.Mesh(armGeometry, armMaterial);
        arm1.position.set(0, 0, 0.4);
        droneGroup.add(arm1);
        
        const arm2 = new THREE.Mesh(armGeometry, armMaterial);
        arm2.position.set(0, 0, -0.4);
        droneGroup.add(arm2);
        
        const arm3 = new THREE.Mesh(armGeometry, armMaterial);
        arm3.position.set(0.4, 0, 0);
        arm3.rotation.y = Math.PI / 2;
        droneGroup.add(arm3);
        
        const arm4 = new THREE.Mesh(armGeometry, armMaterial);
        arm4.position.set(-0.4, 0, 0);
        arm4.rotation.y = Math.PI / 2;
        droneGroup.add(arm4);
        
        // Rotors
        const rotorGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.02, 16);
        const rotorMaterial = new THREE.MeshStandardMaterial({
          color: 0x999999,
          metalness: 0.8,
          roughness: 0.2
        });
        
        const rotor1 = new THREE.Mesh(rotorGeometry, rotorMaterial);
        rotor1.position.set(0.4, 0.05, 0.4);
        droneGroup.add(rotor1);
        
        const rotor2 = new THREE.Mesh(rotorGeometry, rotorMaterial);
        rotor2.position.set(-0.4, 0.05, 0.4);
        droneGroup.add(rotor2);
        
        const rotor3 = new THREE.Mesh(rotorGeometry, rotorMaterial);
        rotor3.position.set(0.4, 0.05, -0.4);
        droneGroup.add(rotor3);
        
        const rotor4 = new THREE.Mesh(rotorGeometry, rotorMaterial);
        rotor4.position.set(-0.4, 0.05, -0.4);
        droneGroup.add(rotor4);
        
        // Camera
        const cameraGeometry = new THREE.SphereGeometry(0.1, 32, 16);
        const cameraMaterial = new THREE.MeshStandardMaterial({
          color: 0x111111,
          metalness: 0.9,
          roughness: 0.1
        });
        const droneCamera = new THREE.Mesh(cameraGeometry, cameraMaterial);
        droneCamera.position.set(0, -0.05, 0.2);
        droneGroup.add(droneCamera);
        
        const lensGeometry2 = new THREE.CylinderGeometry(0.05, 0.05, 0.02, 32);
        const lensMaterial2 = new THREE.MeshStandardMaterial({
          color: 0x0000ff,
          emissive: 0x8B5CF6,
          emissiveIntensity: 0.5
        });
        const lens = new THREE.Mesh(lensGeometry2, lensMaterial2);
        lens.position.set(0, -0.05, 0.26);
        lens.rotation.x = Math.PI / 2;
        droneGroup.add(lens);
        
        productModel = droneGroup;
        break;
        
      case 'earbuds':
        const earbudsGroup = new THREE.Group();
        
        // Charging case
        const caseGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.2, 32);
        const caseMaterial = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          metalness: 0.8,
          roughness: 0.2
        });
        const earCase = new THREE.Mesh(caseGeometry, caseMaterial);
        earCase.rotation.x = Math.PI / 2;
        earbudsGroup.add(earCase);
        
        // Case lid
        const lidGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.05, 32);
        const lidMaterial = new THREE.MeshStandardMaterial({
          color: 0xefefef,
          metalness: 0.8,
          roughness: 0.2
        });
        const lid = new THREE.Mesh(lidGeometry, lidMaterial);
        lid.position.y = 0.13;
        lid.rotation.x = Math.PI / 2;
        earbudsGroup.add(lid);
        
        // Earbuds
        const budGeometry = new THREE.SphereGeometry(0.15, 32, 16);
        const budMaterial = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          metalness: 0.8,
          roughness: 0.2
        });
        
        const bud1 = new THREE.Mesh(budGeometry, budMaterial);
        bud1.position.set(0.25, 0.4, 0.25);
        earbudsGroup.add(bud1);
        
        const bud2 = new THREE.Mesh(budGeometry, budMaterial);
        bud2.position.set(-0.25, 0.4, 0.25);
        earbudsGroup.add(bud2);
        
        // Earbud stems
        const stemGeometry = new THREE.CylinderGeometry(0.04, 0.03, 0.3, 32);
        const stemMaterial = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          metalness: 0.8,
          roughness: 0.2
        });
        
        const stem1 = new THREE.Mesh(stemGeometry, stemMaterial);
        stem1.position.set(0.25, 0.28, 0.4);
        stem1.rotation.x = Math.PI / 4;
        earbudsGroup.add(stem1);
        
        const stem2 = new THREE.Mesh(stemGeometry, stemMaterial);
        stem2.position.set(-0.25, 0.28, 0.4);
        stem2.rotation.x = Math.PI / 4;
        earbudsGroup.add(stem2);
        
        // LED indicator
        const ledGeometry = new THREE.CylinderGeometry(0.03, 0.03, 0.01, 32);
        const ledMaterial = new THREE.MeshStandardMaterial({
          color: 0x8B5CF6,
          emissive: 0x8B5CF6,
          emissiveIntensity: 1
        });
        const led = new THREE.Mesh(ledGeometry, ledMaterial);
        led.position.set(0, 0, 0.41);
        led.rotation.x = Math.PI / 2;
        earbudsGroup.add(led);
        
        productModel = earbudsGroup;
        break;
        
      default:
        // Generic cube as fallback
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({
          color: 0xE5DEFF,
          metalness: 0.5,
          roughness: 0.5
        });
        productModel = new THREE.Mesh(geometry, material);
    }
    
    scene.add(productModel);
    
    // Add glow effect
    const glowGeometry = new THREE.SphereGeometry(1.5, 32, 16);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x8B5CF6,
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);
    
    // Mouse interaction for rotation
    let isDragging = false;
    let previousMousePosition = {
      x: 0,
      y: 0
    };
    
    const handleMouseDown = (event: MouseEvent) => {
      isDragging = true;
      previousMousePosition = {
        x: event.clientX,
        y: event.clientY
      };
    };
    
    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging) return;
      
      const deltaMove = {
        x: event.clientX - previousMousePosition.x,
        y: event.clientY - previousMousePosition.y
      };
      
      productModel.rotation.y += deltaMove.x * 0.01;
      productModel.rotation.x += deltaMove.y * 0.01;
      
      previousMousePosition = {
        x: event.clientX,
        y: event.clientY
      };
    };
    
    const handleMouseUp = () => {
      isDragging = false;
    };
    
    containerRef.current.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (!isDragging) {
        // Gentle auto-rotation when not being dragged
        productModel.rotation.y += 0.005;
      }
      
      // Platform rotation
      platform.rotation.y += 0.01;
      
      // Rotate specific parts for certain product types
      if (product.modelPath === 'drone') {
        // Rotate drone rotors
        productModel.children.forEach((child, index) => {
          if (index > 4 && index <= 8) { // Rotors
            child.rotation.y += 0.2 * (index % 2 === 0 ? 1 : -1);
          }
        });
      }
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      containerRef.current?.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
    };
  }, [productId]);

  return <div ref={containerRef} className="w-full h-full rounded-xl overflow-hidden cursor-move" />;
};

export default ProductViewer3D;
