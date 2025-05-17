
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const StoreHeader = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-20 bg-black/30 backdrop-blur-lg border-b border-shopsphere-primary/20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-white">ShopSphere</h1>
            <Badge variant="outline" className="bg-shopsphere-primary/20 text-shopsphere-light border-none">
              Virtual Store
            </Badge>
          </div>

          <div className="flex items-center space-x-4">
            {isSearchOpen ? (
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="bg-black/50 border-shopsphere-primary/30 text-white w-64 pr-10"
                  autoFocus
                  onBlur={() => setIsSearchOpen(false)}
                />
                <Button 
                  size="icon" 
                  variant="ghost"
                  className="absolute right-0 top-0 text-shopsphere-light"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <Search size={18} />
                </Button>
              </div>
            ) : (
              <Button 
                size="icon" 
                variant="ghost" 
                className="text-white hover:bg-black/50"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search size={20} />
              </Button>
            )}
            
            <Button 
              size="icon" 
              variant="ghost" 
              className="text-white hover:bg-black/50 relative"
            >
              <ShoppingCart size={20} />
              <span className="absolute top-0 right-0 bg-shopsphere-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                0
              </span>
            </Button>
            
            <Button 
              size="icon" 
              variant="ghost" 
              className="text-white hover:bg-black/50"
            >
              <User size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreHeader;
