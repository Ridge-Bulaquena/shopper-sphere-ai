
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  modelPath: string;
  thumbnail: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  rotation: {
    x: number;
    y: number;
    z: number;
  };
  scale: number;
  rating: number;
  reviews: number;
  features: string[];
  details?: {
    materials?: string;
    color?: string;
    size?: string;
  };
}
