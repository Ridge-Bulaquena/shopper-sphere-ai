
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Product } from '@/types/product';

interface VirtualStoreProps {
  onProductSelect: (productId: string) => void;
  products: Product[];
  isLoaded: boolean;
}

const VirtualStore: React.FC<VirtualStoreProps> = ({ onProductSelect, products, isLoaded }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [keysPressed, setKeysPressed] = useState({
    w: false, a: false, s: false, d: false
  });

  useEffect(() => {
    if (!containerRef.current || !isLoaded) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1A1F2C);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    
    // Camera position
    camera.position.set(0, 1.6, 5); // Eye level for a person
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    // Spot lights for products
    products.forEach(product => {
      const spotLight = new THREE.SpotLight(0x8B5CF6, 2, 10, Math.PI / 6, 0.5);
      spotLight.position.set(
        product.position.x, 
        product.position.y + 3, 
        product.position.z
      );
      spotLight.lookAt(
        product.position.x, 
        product.position.y, 
        product.position.z
      );
      spotLight.castShadow = true;
      scene.add(spotLight);
    });
    
    // Floor
    const floorGeometry = new THREE.PlaneGeometry(50, 50);
    const floorMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x1A1F2C,
      roughness: 0.8,
      metalness: 0.2
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.5;
    floor.receiveShadow = true;
    scene.add(floor);
    
    // Grid helper for floor
    const gridHelper = new THREE.GridHelper(50, 50, 0x8B5CF6, 0x6E59A5);
    gridHelper.position.y = -0.49;
    scene.add(gridHelper);
    
    // Create store walls
    const wallMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x1A1F2C,
      roughness: 0.8,
      metalness: 0.2
    });
    
    // Back wall
    const backWallGeometry = new THREE.PlaneGeometry(50, 10);
    const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
    backWall.position.z = -15;
    backWall.position.y = 5;
    backWall.receiveShadow = true;
    scene.add(backWall);
    
    // Left wall
    const leftWallGeometry = new THREE.PlaneGeometry(30, 10);
    const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
    leftWall.position.x = -15;
    leftWall.position.y = 5;
    leftWall.rotation.y = Math.PI / 2;
    leftWall.receiveShadow = true;
    scene.add(leftWall);
    
    // Right wall
    const rightWallGeometry = new THREE.PlaneGeometry(30, 10);
    const rightWall = new THREE.Mesh(rightWallGeometry, wallMaterial);
    rightWall.position.x = 15;
    rightWall.position.y = 5;
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.receiveShadow = true;
    scene.add(rightWall);
    
    // Product displays - simplified cubes for now
    const productObjects: { [key: string]: THREE.Object3D } = {};
    
    products.forEach(product => {
      // Product stand
      const standGeometry = new THREE.CylinderGeometry(0.8, 0.8, 0.2, 32);
      const standMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x6E59A5,
        metalness: 0.8,
        roughness: 0.2
      });
      const stand = new THREE.Mesh(standGeometry, standMaterial);
      stand.position.set(
        product.position.x,
        product.position.y - 0.5,
        product.position.z
      );
      stand.castShadow = true;
      stand.receiveShadow = true;
      scene.add(stand);
      
      // Product object (simplified)
      let productGeometry;
      
      switch(product.modelPath) {
        case 'smartwatch':
          productGeometry = new THREE.TorusGeometry(0.4, 0.1, 16, 32);
          break;
        case 'vr-headset':
          productGeometry = new THREE.BoxGeometry(0.8, 0.4, 0.4);
          break;
        case 'console':
          productGeometry = new THREE.BoxGeometry(0.8, 0.2, 0.6);
          break;
        case 'drone':
          // Create a simple drone shape
          const droneGroup = new THREE.Group();
          
          const bodyGeometry = new THREE.BoxGeometry(0.3, 0.1, 0.3);
          const bodyMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x444444,
            metalness: 0.8,
            roughness: 0.2
          });
          const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
          droneGroup.add(body);
          
          const armGeometry = new THREE.BoxGeometry(0.6, 0.05, 0.05);
          const armMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x666666,
            metalness: 0.8,
            roughness: 0.2
          });
          
          const arm1 = new THREE.Mesh(armGeometry, armMaterial);
          arm1.position.set(0, 0, 0.2);
          droneGroup.add(arm1);
          
          const arm2 = new THREE.Mesh(armGeometry, armMaterial);
          arm2.position.set(0, 0, -0.2);
          droneGroup.add(arm2);
          
          const arm3 = new THREE.Mesh(armGeometry, armMaterial);
          arm3.position.set(0.2, 0, 0);
          arm3.rotation.y = Math.PI / 2;
          droneGroup.add(arm3);
          
          const arm4 = new THREE.Mesh(armGeometry, armMaterial);
          arm4.position.set(-0.2, 0, 0);
          arm4.rotation.y = Math.PI / 2;
          droneGroup.add(arm4);
          
          const rotorGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.02, 16);
          const rotorMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x999999,
            metalness: 0.8,
            roughness: 0.2
          });
          
          const rotor1 = new THREE.Mesh(rotorGeometry, rotorMaterial);
          rotor1.position.set(0.3, 0.05, 0.2);
          droneGroup.add(rotor1);
          
          const rotor2 = new THREE.Mesh(rotorGeometry, rotorMaterial);
          rotor2.position.set(-0.3, 0.05, 0.2);
          droneGroup.add(rotor2);
          
          const rotor3 = new THREE.Mesh(rotorGeometry, rotorMaterial);
          rotor3.position.set(0.3, 0.05, -0.2);
          droneGroup.add(rotor3);
          
          const rotor4 = new THREE.Mesh(rotorGeometry, rotorMaterial);
          rotor4.position.set(-0.3, 0.05, -0.2);
          droneGroup.add(rotor4);
          
          droneGroup.position.set(
            product.position.x,
            product.position.y,
            product.position.z
          );
          droneGroup.rotation.set(
            product.rotation.x,
            product.rotation.y,
            product.rotation.z
          );
          droneGroup.castShadow = true;
          
          productObjects[product.id] = droneGroup;
          scene.add(droneGroup);
          
          // Skip the rest of this iteration since we've already added the drone
          return;
          
        case 'earbuds':
          const earbudGroup = new THREE.Group();
          
          const caseGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.1, 32);
          const caseMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xffffff,
            metalness: 0.8,
            roughness: 0.2
          });
          const earCase = new THREE.Mesh(caseGeometry, caseMaterial);
          earCase.rotation.x = Math.PI / 2;
          earbudGroup.add(earCase);
          
          const budGeometry = new THREE.SphereGeometry(0.08, 32, 16);
          const budMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xffffff,
            metalness: 0.8,
            roughness: 0.2
          });
          
          const bud1 = new THREE.Mesh(budGeometry, budMaterial);
          bud1.position.set(0.15, 0, 0.15);
          earbudGroup.add(bud1);
          
          const bud2 = new THREE.Mesh(budGeometry, budMaterial);
          bud2.position.set(-0.15, 0, 0.15);
          earbudGroup.add(bud2);
          
          earbudGroup.position.set(
            product.position.x,
            product.position.y,
            product.position.z
          );
          earbudGroup.rotation.set(
            product.rotation.x,
            product.rotation.y,
            product.rotation.z
          );
          earbudGroup.castShadow = true;
          
          productObjects[product.id] = earbudGroup;
          scene.add(earbudGroup);
          
          // Skip the rest of this iteration since we've already added the earbuds
          return;
          
        default:
          productGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
      }
      
      const productMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xE5DEFF,
        metalness: 0.8,
        roughness: 0.2
      });
      
      const productMesh = new THREE.Mesh(productGeometry, productMaterial);
      productMesh.position.set(
        product.position.x,
        product.position.y,
        product.position.z
      );
      productMesh.rotation.set(
        product.rotation.x,
        product.rotation.y,
        product.rotation.z
      );
      productMesh.castShadow = true;
      
      productObjects[product.id] = productMesh;
      scene.add(productMesh);
      
      // Add floating glow effect
      const glowGeometry = new THREE.SphereGeometry(0.6, 32, 16);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x8B5CF6,
        transparent: true,
        opacity: 0.2
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      glow.position.copy(productMesh.position);
      scene.add(glow);
      
      // Product info hologram (simplified)
      const hologramGeometry = new THREE.PlaneGeometry(1, 0.3);
      const hologramMaterial = new THREE.MeshBasicMaterial({
        color: 0xD946EF,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide
      });
      const hologram = new THREE.Mesh(hologramGeometry, hologramMaterial);
      hologram.position.set(
        product.position.x,
        product.position.y + 0.8,
        product.position.z
      );
      hologram.lookAt(camera.position);
      scene.add(hologram);
    });
    
    // Raycaster for product selection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    // Handle mouse click
    const handleClick = (event: MouseEvent) => {
      // Calculate mouse position in normalized device coordinates
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Update the raycaster with the camera and mouse position
      raycaster.setFromCamera(mouse, camera);
      
      // Find all intersected objects
      const intersects = raycaster.intersectObjects(Object.values(productObjects));
      
      // Check if a product was clicked
      if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
        
        // Find the product ID that matches the clicked object
        for (const [productId, object] of Object.entries(productObjects)) {
          // Check if object is the clicked object or if clicked object is a child of a group
          if (object === clickedObject || 
              (object instanceof THREE.Group && object.children.includes(clickedObject))) {
            onProductSelect(productId);
            break;
          }
        }
      }
    };
    
    // Handle keyboard input for navigation
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) {
        case 'w':
          setKeysPressed(prev => ({ ...prev, w: true }));
          break;
        case 'a':
          setKeysPressed(prev => ({ ...prev, a: true }));
          break;
        case 's':
          setKeysPressed(prev => ({ ...prev, s: true }));
          break;
        case 'd':
          setKeysPressed(prev => ({ ...prev, d: true }));
          break;
      }
    };
    
    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) {
        case 'w':
          setKeysPressed(prev => ({ ...prev, w: false }));
          break;
        case 'a':
          setKeysPressed(prev => ({ ...prev, a: false }));
          break;
        case 's':
          setKeysPressed(prev => ({ ...prev, s: false }));
          break;
        case 'd':
          setKeysPressed(prev => ({ ...prev, d: false }));
          break;
      }
    };
    
    window.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    // Animation
    const moveSpeed = 0.1;
    const rotateSpeed = 0.02;
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Handle movement based on keys pressed
      const direction = new THREE.Vector3();
      const sideDirection = new THREE.Vector3();
      
      // Forward/backward movement
      if (keysPressed.w) {
        direction.z = -moveSpeed;
      } else if (keysPressed.s) {
        direction.z = moveSpeed;
      }
      
      // Left/right movement
      if (keysPressed.a) {
        sideDirection.x = -moveSpeed;
      } else if (keysPressed.d) {
        sideDirection.x = moveSpeed;
      }
      
      // Apply movement in the camera's direction
      const forwardVector = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion).setY(0).normalize();
      const rightVector = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion).setY(0).normalize();
      
      if (direction.z !== 0) {
        camera.position.addScaledVector(forwardVector, direction.z);
      }
      
      if (sideDirection.x !== 0) {
        camera.position.addScaledVector(rightVector, sideDirection.x);
      }
      
      // Ensure camera doesn't go outside the store boundaries
      camera.position.x = Math.max(-14, Math.min(14, camera.position.x));
      camera.position.z = Math.max(-14, Math.min(14, camera.position.z));
      
      // Animate products
      for (const product of products) {
        const obj = productObjects[product.id];
        if (obj) {
          obj.rotation.y += 0.01;
        }
      }
      
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
      window.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [isLoaded, onProductSelect, products, keysPressed]);

  return <div ref={containerRef} className="three-canvas" />;
};

export default VirtualStore;
