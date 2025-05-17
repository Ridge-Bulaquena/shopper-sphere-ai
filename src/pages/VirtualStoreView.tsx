
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import VirtualStoreScene from '@/components/VirtualStoreScene';
import ProductCard from '@/components/ProductCard';
import NavigationControls from '@/components/NavigationControls';
import StoreHeader from '@/components/StoreHeader';
import { Product } from '@/types/product';
import { ArrowLeft } from 'lucide-react';
import { toast } from "sonner";
import { products } from '@/data/products';

const VirtualStoreView = () => {
  const navigate = useNavigate();
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const [isStoreLoaded, setIsStoreLoaded] = useState(false);

  useEffect(() => {
    // Simulate store loading
    const timer = setTimeout(() => {
      setIsStoreLoaded(true);
      toast.success("3D virtual store loaded! Use WASD to move around and click on products to view them.");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleProductSelect = (productId: string) => {
    setActiveProductId(productId);
    const product = products.find(p => p.id === productId);
    if (product) {
      toast(`Now viewing ${product.name}`);
    }
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const activeProduct = activeProductId ? products.find(p => p.id === activeProductId) : null;

  return (
    <div className="relative min-h-screen bg-black text-white">
      {/* 3D Store Scene */}
      <VirtualStoreScene 
        onProductSelect={handleProductSelect} 
        products={products}
        isLoaded={isStoreLoaded}
      />

      {/* Loading Overlay */}
      {!isStoreLoaded && (
        <div className="fixed inset-0 z-50 bg-shopsphere-dark flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-shopsphere-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-shopsphere-light">Loading 3D Store Experience...</p>
          </div>
        </div>
      )}

      {/* UI Overlay */}
      <div className="pointer-events-none">
        <StoreHeader />
        
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-auto">
          <NavigationControls />
        </div>
        
        <div className="fixed top-4 left-4 pointer-events-auto">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-black/30 backdrop-blur-sm text-white border-white/20 hover:bg-black/50"
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={16} className="mr-2" /> Back to Home
          </Button>
        </div>
        
        {/* Active Product Info */}
        {activeProduct && (
          <div className="fixed bottom-32 right-8 w-80 pointer-events-auto">
            <ProductCard 
              product={activeProduct}
              onClick={() => handleProductClick(activeProduct.id)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VirtualStoreView;
