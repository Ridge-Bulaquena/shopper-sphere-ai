
import { Product } from '@/types/product';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Info } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="product-card rounded-lg overflow-hidden bg-black/30 border border-shopsphere-primary/30 shadow-lg"
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge className="bg-shopsphere-primary/20 text-shopsphere-light border-none">
            {product.category}
          </Badge>
          <span className="font-bold text-shopsphere-accent">${product.price}</span>
        </div>
        
        <h3 className="text-lg font-semibold mb-2 text-white">{product.name}</h3>
        
        <p className="text-sm text-gray-300 line-clamp-2 mb-4">
          {product.description}
        </p>
        
        <div className="flex justify-between gap-2">
          <Button 
            size="sm" 
            className="flex-1 bg-shopsphere-primary hover:bg-shopsphere-secondary"
          >
            <ShoppingCart size={16} className="mr-1" /> Add
          </Button>
          <Button 
            size="sm"
            variant="outline"
            className="flex-1 border-shopsphere-primary/50 text-shopsphere-light hover:bg-shopsphere-primary/10"
            onClick={onClick}
          >
            <Info size={16} className="mr-1" /> Details
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
