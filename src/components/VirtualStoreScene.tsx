
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Product } from '@/types/product';

interface VirtualStoreSceneProps {
  onProductSelect: (productId: string) => void;
  products: Product[];
  isLoaded: boolean;
}

const VirtualStoreScene: React.FC<VirtualStoreSceneProps> = ({ onProductSelect, products, isLoaded }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [keysPressed, setKeysPressed] = useState({
    w: false, a: false, s: false, d: false
  });

  useEffect(() => {
    if (!containerRef.current || !isLoaded) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

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
    
    // Store Environment
    
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
    const backWallGeometry = new THREE.PlaneGeometry(20, 10);
    const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
    backWall.position.z = -10;
    backWall.position.y = 4.5;
    backWall.receiveShadow = true;
    scene.add(backWall);
    
    // Left wall
    const leftWallGeometry = new THREE.PlaneGeometry(20, 10);
    const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
    leftWall.position.x = -10;
    leftWall.position.y = 4.5;
    leftWall.rotation.y = Math.PI / 2;
    leftWall.receiveShadow = true;
    scene.add(leftWall);
    
    // Right wall
    const rightWallGeometry = new THREE.PlaneGeometry(20, 10);
    const rightWall = new THREE.Mesh(rightWallGeometry, wallMaterial);
    rightWall.position.x = 10;
    rightWall.position.y = 4.5;
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.receiveShadow = true;
    scene.add(rightWall);

    // Store shelving and displays
    const shelfMaterial = new THREE.MeshStandardMaterial({
      color: 0x333333,
      roughness: 0.5,
      metalness: 0.7
    });

    // Create shelves
    for (let i = -8; i <= 8; i += 4) {
      // Skip the center for main aisle
      if (i === 0) continue;
      
      // Create shelf unit
      const shelfUnit = new THREE.Group();
      
      // Main shelf structure
      const shelfBase = new THREE.BoxGeometry(3, 0.1, 1.5);
      const shelf = new THREE.Mesh(shelfBase, shelfMaterial);
      
      // Create multiple shelves stacked
      for (let j = 0; j < 4; j++) {
        const shelfClone = shelf.clone();
        shelfClone.position.y = j * 1.2;
        shelfUnit.add(shelfClone);
      }
      
      // Add shelf supports
      const supportGeometry = new THREE.BoxGeometry(0.1, 4.8, 1.5);
      const leftSupport = new THREE.Mesh(supportGeometry, shelfMaterial);
      leftSupport.position.set(-1.45, 2.4, 0);
      shelfUnit.add(leftSupport);
      
      const rightSupport = new THREE.Mesh(supportGeometry, shelfMaterial);
      rightSupport.position.set(1.45, 2.4, 0);
      shelfUnit.add(rightSupport);
      
      // Position the shelf unit
      shelfUnit.position.set(i, 0, -6);
      scene.add(shelfUnit);
      
      // Add similar shelf unit on the other side
      const oppositeShelf = shelfUnit.clone();
      oppositeShelf.position.set(i, 0, 6);
      oppositeShelf.rotation.y = Math.PI;
      scene.add(oppositeShelf);
    }

    // Product displays - simplified for demonstration
    const productObjects: { [key: string]: THREE.Object3D } = {};
    
    products.forEach((product, index) => {
      // Calculate position to spread products around the store
      const angle = (index / products.length) * Math.PI * 2;
      const radius = 6;
      const xPos = Math.cos(angle) * radius;
      const zPos = Math.sin(angle) * radius;
      
      // Product stand
      const standGeometry = new THREE.CylinderGeometry(0.8, 0.8, 0.2, 32);
      const standMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x6E59A5,
        metalness: 0.8,
        roughness: 0.2
      });
      const stand = new THREE.Mesh(standGeometry, standMaterial);
      stand.position.set(xPos, 0, zPos);
      stand.castShadow = true;
      stand.receiveShadow = true;
      scene.add(stand);
      
      // Create simple product representation
      const productGroup = new THREE.Group();
      
      // Different geometry based on product type
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
          productGeometry = new THREE.BoxGeometry(0.6, 0.1, 0.6);
          break;
        case 'earbuds':
          productGeometry = new THREE.SphereGeometry(0.3, 16, 16);
          break;
        default:
          productGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
      }
      
      const productMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xE5DEFF,
        metalness: 0.6,
        roughness: 0.4
      });
      
      const productMesh = new THREE.Mesh(productGeometry, productMaterial);
      productGroup.add(productMesh);
      
      // Position the product
      productGroup.position.set(xPos, 1, zPos);
      productGroup.userData.productId = product.id;
      scene.add(productGroup);
      
      // Add product to objects map
      productObjects[product.id] = productGroup;
      
      // Product info hologram
      const hologramGeometry = new THREE.PlaneGeometry(1, 0.3);
      const hologramMaterial = new THREE.MeshBasicMaterial({
        color: 0x8B5CF6,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide
      });
      const hologram = new THREE.Mesh(hologramGeometry, hologramMaterial);
      hologram.position.set(xPos, 2, zPos);
      scene.add(hologram);
      
      // Add point light above product
      const productLight = new THREE.PointLight(0x8B5CF6, 1, 3);
      productLight.position.set(xPos, 3, zPos);
      scene.add(productLight);
    });
    
    // Raycaster for product selection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    // Handle mouse click
    const handleClick = (event: MouseEvent) => {
      // Calculate mouse position in normalized device coordinates
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Update the raycaster
      raycaster.setFromCamera(mouse, camera);
      
      // Find objects intersecting with the ray
      const intersects = raycaster.intersectObjects(Object.values(productObjects), true);
      
      // Check if a product was clicked
      if (intersects.length > 0) {
        // Find the top-level parent which has the productId
        let currentObject: THREE.Object3D | null = intersects[0].object;
        
        while (currentObject && !currentObject.userData.productId) {
          currentObject = currentObject.parent;
        }
        
        if (currentObject && currentObject.userData.productId) {
          onProductSelect(currentObject.userData.productId);
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
    
    // Animation loop
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
      
      // Apply movement in camera direction
      const forwardVector = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion).setY(0).normalize();
      const rightVector = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion).setY(0).normalize();
      
      if (direction.z !== 0) {
        camera.position.addScaledVector(forwardVector, direction.z);
      }
      
      if (sideDirection.x !== 0) {
        camera.position.addScaledVector(rightVector, sideDirection.x);
      }
      
      // Ensure camera stays within store boundaries
      camera.position.x = Math.max(-9.5, Math.min(9.5, camera.position.x));
      camera.position.z = Math.max(-9.5, Math.min(9.5, camera.position.z));
      camera.position.y = 1.6; // Lock height
      
      // Animate products
      Object.values(productObjects).forEach(obj => {
        obj.rotation.y += 0.01;
      });
      
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
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose resources
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });
      
      renderer.dispose();
    };
  }, [isLoaded, onProductSelect, products, keysPressed]);

  return <div ref={containerRef} className="w-full h-screen" />;
};

export default VirtualStoreScene;
