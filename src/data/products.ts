
import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: 'smart-watch-1',
    name: 'Galaxy Smart Watch',
    description: 'Next-generation smart watch with health tracking, notifications, and a sleek design. Perfect for keeping track of your fitness goals and staying connected on-the-go.',
    price: 249.99,
    category: 'Wearables',
    modelPath: 'smartwatch',
    thumbnail: '/smartwatch-thumb.jpg',
    position: { x: 5, y: 1, z: -3 },
    rotation: { x: 0, y: Math.PI / 4, z: 0 },
    scale: 2,
    rating: 4.5,
    reviews: 128,
    features: [
      'Health & fitness tracking',
      'Notifications & calls',
      '3-day battery life',
      'Water resistant (5ATM)',
      'Compatible with iOS and Android'
    ],
    details: {
      materials: 'Aluminum body, silicone strap',
      color: 'Cosmic Black',
      size: '44mm'
    }
  },
  {
    id: 'vr-headset-1',
    name: 'Immerse VR Headset',
    description: 'Experience virtual reality like never before with our high-resolution display, comfortable fit, and immersive audio. The perfect gateway to virtual worlds.',
    price: 399.99,
    category: 'VR/AR',
    modelPath: 'vr-headset',
    thumbnail: '/vr-thumb.jpg',
    position: { x: -5, y: 1.2, z: -3 },
    rotation: { x: 0, y: -Math.PI / 4, z: 0 },
    scale: 3,
    rating: 4.7,
    reviews: 93,
    features: [
      '4K resolution per eye',
      'Integrated spatial audio',
      'Wireless design',
      '2-3 hour battery life',
      'Advanced motion tracking'
    ],
    details: {
      materials: 'Lightweight composite, premium face padding',
      color: 'Matte Black',
      size: 'One size fits all (adjustable)'
    }
  },
  {
    id: 'gaming-console-1',
    name: 'Nebula Gaming Console',
    description: 'The ultimate gaming experience with 8K support, lightning-fast load times, and an expansive game library. Elevate your gaming sessions to new heights.',
    price: 499.99,
    category: 'Gaming',
    modelPath: 'console',
    thumbnail: '/console-thumb.jpg',
    position: { x: 0, y: 1, z: -6 },
    rotation: { x: 0, y: Math.PI, z: 0 },
    scale: 2.5,
    rating: 4.9,
    reviews: 342,
    features: [
      '8K gaming support',
      'Ray tracing technology',
      '1TB SSD storage',
      'Backward compatibility',
      'Digital and disc versions available'
    ],
    details: {
      materials: 'High-grade plastic and metal components',
      color: 'Deep Space Blue',
      size: 'Standard'
    }
  },
  {
    id: 'drone-1',
    name: 'Horizon Drone Pro',
    description: 'Capture stunning aerial footage with our professional-grade drone featuring stabilized 4K camera, long flight time, and intuitive controls.',
    price: 799.99,
    category: 'Drones',
    modelPath: 'drone',
    thumbnail: '/drone-thumb.jpg',
    position: { x: 8, y: 2, z: -8 },
    rotation: { x: 0.2, y: Math.PI / 6, z: 0 },
    scale: 2,
    rating: 4.6,
    reviews: 87,
    features: [
      '4K 60fps stabilized camera',
      '30-minute flight time',
      'Obstacle avoidance sensors',
      '5km transmission range',
      'Automated flight modes'
    ],
    details: {
      materials: 'Carbon fiber and composite materials',
      color: 'Titanium Grey',
      size: 'Foldable design (fits in backpack)'
    }
  },
  {
    id: 'wireless-earbuds-1',
    name: 'Echo Wireless Earbuds',
    description: 'Experience crystal-clear audio and perfect calls with our noise-cancelling wireless earbuds. Comfortable for all-day wear with extended battery life.',
    price: 149.99,
    category: 'Audio',
    modelPath: 'earbuds',
    thumbnail: '/earbuds-thumb.jpg',
    position: { x: -8, y: 1, z: -8 },
    rotation: { x: 0, y: -Math.PI / 6, z: 0 },
    scale: 2,
    rating: 4.4,
    reviews: 256,
    features: [
      'Active noise cancellation',
      '24-hour battery with case',
      'Water resistant (IPX5)',
      'Touch controls',
      'Voice assistant support'
    ],
    details: {
      materials: 'Premium composite, silicone tips',
      color: 'Pearl White',
      size: 'Includes S/M/L ear tips'
    }
  }
];
