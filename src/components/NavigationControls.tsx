
import { useState } from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NavigationControls = () => {
  const [keysPressed, setKeysPressed] = useState({
    w: false,
    a: false,
    s: false,
    d: false
  });
  
  const handleMouseDown = (key: 'w' | 'a' | 's' | 'd') => {
    setKeysPressed(prev => ({ ...prev, [key]: true }));
    // Simulate keydown event
    const event = new KeyboardEvent('keydown', { key });
    window.dispatchEvent(event);
  };
  
  const handleMouseUp = (key: 'w' | 'a' | 's' | 'd') => {
    setKeysPressed(prev => ({ ...prev, [key]: false }));
    // Simulate keyup event
    const event = new KeyboardEvent('keyup', { key });
    window.dispatchEvent(event);
  };
  
  const handleTouchStart = (key: 'w' | 'a' | 's' | 'd') => {
    handleMouseDown(key);
  };
  
  const handleTouchEnd = (key: 'w' | 'a' | 's' | 'd') => {
    handleMouseUp(key);
  };

  return (
    <div className="nav-controls rounded-xl p-2">
      <div className="grid grid-cols-3 gap-1">
        <div className="col-start-2">
          <Button
            variant="ghost"
            size="icon"
            className={`w-12 h-12 rounded-full ${keysPressed.w ? 'bg-shopsphere-primary text-white' : 'bg-black/20 text-white/70 hover:bg-black/40'}`}
            onMouseDown={() => handleMouseDown('w')}
            onMouseUp={() => handleMouseUp('w')}
            onMouseLeave={() => keysPressed.w && handleMouseUp('w')}
            onTouchStart={() => handleTouchStart('w')}
            onTouchEnd={() => handleTouchEnd('w')}
          >
            <ChevronUp size={24} />
          </Button>
        </div>
        <div className="col-start-1 row-start-2">
          <Button
            variant="ghost"
            size="icon"
            className={`w-12 h-12 rounded-full ${keysPressed.a ? 'bg-shopsphere-primary text-white' : 'bg-black/20 text-white/70 hover:bg-black/40'}`}
            onMouseDown={() => handleMouseDown('a')}
            onMouseUp={() => handleMouseUp('a')}
            onMouseLeave={() => keysPressed.a && handleMouseUp('a')}
            onTouchStart={() => handleTouchStart('a')}
            onTouchEnd={() => handleTouchEnd('a')}
          >
            <ChevronLeft size={24} />
          </Button>
        </div>
        <div className="col-start-2 row-start-2">
          <div className="w-12 h-12 rounded-full bg-black/40 flex items-center justify-center text-xs text-white/50">
            MOVE
          </div>
        </div>
        <div className="col-start-3 row-start-2">
          <Button
            variant="ghost"
            size="icon"
            className={`w-12 h-12 rounded-full ${keysPressed.d ? 'bg-shopsphere-primary text-white' : 'bg-black/20 text-white/70 hover:bg-black/40'}`}
            onMouseDown={() => handleMouseDown('d')}
            onMouseUp={() => handleMouseUp('d')}
            onMouseLeave={() => keysPressed.d && handleMouseUp('d')}
            onTouchStart={() => handleTouchStart('d')}
            onTouchEnd={() => handleTouchEnd('d')}
          >
            <ChevronRight size={24} />
          </Button>
        </div>
        <div className="col-start-2 row-start-3">
          <Button
            variant="ghost"
            size="icon"
            className={`w-12 h-12 rounded-full ${keysPressed.s ? 'bg-shopsphere-primary text-white' : 'bg-black/20 text-white/70 hover:bg-black/40'}`}
            onMouseDown={() => handleMouseDown('s')}
            onMouseUp={() => handleMouseUp('s')}
            onMouseLeave={() => keysPressed.s && handleMouseUp('s')}
            onTouchStart={() => handleTouchStart('s')}
            onTouchEnd={() => handleTouchEnd('s')}
          >
            <ChevronDown size={24} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavigationControls;
