
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import LandingScene from '@/components/LandingScene';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag, Globe, Sparkles, Cube } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-shopsphere-dark to-black text-white">
      {/* 3D Scene Background */}
      <LandingScene />

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center space-y-6 mt-12"
        >
          <Badge variant="outline" className="bg-black/30 backdrop-blur-sm border-shopsphere-primary px-4 py-1.5">
            <span className="text-shopsphere-light flex items-center gap-1">
              <Sparkles size={14} />
              Redefining E-commerce
            </span>
          </Badge>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold max-w-4xl bg-clip-text text-transparent bg-gradient-to-r from-shopsphere-light via-shopsphere-primary to-shopsphere-accent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            ShopSphere
          </motion.h1>
          
          <motion.p 
            className="text-2xl md:text-3xl text-gray-300 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            Where your online store becomes an immersive reality
          </motion.p>
          
          <motion.div 
            className="mt-8 space-y-6 md:space-y-0 md:flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <Button 
              size="lg" 
              className="bg-shopsphere-primary hover:bg-shopsphere-secondary text-white group"
              onClick={() => navigate('/store')}
            >
              Enter Store <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-shopsphere-accent text-white hover:bg-shopsphere-accent/90 group"
              onClick={() => navigate('/virtual-store')}
            >
              <Cube className="mr-2" /> 3D Virtual Store
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-shopsphere-primary text-shopsphere-light hover:bg-shopsphere-primary/10"
            >
              Learn More
            </Button>
          </motion.div>
        </motion.div>
        
        <div className="mt-32 md:mt-48">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-shopsphere-primary/20 hover:border-shopsphere-primary/50 transition-colors">
              <div className="h-12 w-12 rounded-full bg-shopsphere-primary/20 flex items-center justify-center mb-4">
                <ShoppingBag className="text-shopsphere-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Immersive Shopping</h3>
              <p className="text-gray-400">Move through beautifully designed, interactive 3D aisles tailored to your taste.</p>
            </div>
            
            <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-shopsphere-primary/20 hover:border-shopsphere-primary/50 transition-colors">
              <div className="h-12 w-12 rounded-full bg-shopsphere-primary/20 flex items-center justify-center mb-4">
                <Globe className="text-shopsphere-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Virtual Try-On</h3>
              <p className="text-gray-400">See how products look and feel before you buy with our advanced 3D visualization.</p>
            </div>
            
            <div className="bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-shopsphere-primary/20 hover:border-shopsphere-primary/50 transition-colors">
              <div className="h-12 w-12 rounded-full bg-shopsphere-primary/20 flex items-center justify-center mb-4">
                <Sparkles className="text-shopsphere-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI Personalization</h3>
              <p className="text-gray-400">Experience a store layout that adapts to your preferences and shopping history.</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-shopsphere-primary/20 bg-black/10 backdrop-blur-sm mt-32 py-6">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2025 ShopSphere. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
