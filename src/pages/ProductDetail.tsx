
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import ProductViewer3D from '@/components/ProductViewer3D';
import { products } from '@/data/products';
import { ArrowLeft, ShoppingCart, Maximize, Minimize, Star } from 'lucide-react';
import { toast } from "sonner";
import { motion } from 'framer-motion';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const product = products.find(p => p.id === id);

  useEffect(() => {
    if (!product) {
      navigate('/store');
      toast.error("Product not found");
    }
  }, [product, navigate]);

  if (!product) return null;

  const handleAddToCart = () => {
    toast.success(`Added ${product.name} to cart`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-shopsphere-dark to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="outline" 
          size="sm" 
          className="mb-8 bg-black/30 backdrop-blur-sm text-white border-white/20 hover:bg-black/50"
          onClick={() => navigate('/store')}
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Store
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 3D Product Viewer */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`relative rounded-xl overflow-hidden border border-shopsphere-primary/30 ${
              isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'h-[500px]'
            }`}
          >
            <ProductViewer3D productId={product.id} />
            
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute top-4 right-4 bg-black/50 border-white/10 text-white hover:bg-black/70"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
            </Button>
          </motion.div>
          
          {/* Product Information */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className={isFullscreen ? 'hidden' : ''}
          >
            <Badge className="bg-shopsphere-primary/20 text-shopsphere-light border-none mb-4">
              {product.category}
            </Badge>
            
            <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star}
                    size={16}
                    className={star <= product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}
                  />
                ))}
              </div>
              <span className="text-gray-400 text-sm">({product.reviews} reviews)</span>
            </div>
            
            <p className="text-3xl font-bold mb-6 text-shopsphere-accent">${product.price.toFixed(2)}</p>
            
            <p className="text-gray-300 mb-6">{product.description}</p>
            
            <Separator className="my-6 bg-white/10" />
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Features:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-4">
              <Button 
                size="lg" 
                className="w-full bg-shopsphere-primary hover:bg-shopsphere-secondary transition-colors"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2" /> Add to Cart
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full border-shopsphere-primary text-shopsphere-light hover:bg-shopsphere-primary/10"
              >
                Try it on virtually
              </Button>
            </div>
            
            <Separator className="my-6 bg-white/10" />
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Materials</p>
                <p className="font-medium">{product.details?.materials || "Premium materials"}</p>
              </div>
              <div>
                <p className="text-gray-400">Color</p>
                <p className="font-medium">{product.details?.color || "Multiple options"}</p>
              </div>
              <div>
                <p className="text-gray-400">Size</p>
                <p className="font-medium">{product.details?.size || "Standard"}</p>
              </div>
              <div>
                <p className="text-gray-400">Shipping</p>
                <p className="font-medium">Free 2-day shipping</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
