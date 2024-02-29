import { useState } from 'react';
import MenuContext from './MenuContext';


export const MenuProvider = ({ children }) => { 
    
    const [gameStatus, setGameStatus] = useState('on')
    const [perspective, changePerspective] = useState("bird's view")
    const [currentToolOp, setCurrentToolOp] = useState('')

    return (
      <MenuContext.Provider value={{ 
        gameStatus, setGameStatus,
        perspective, changePerspective,
        currentToolOp, setCurrentToolOp,
      }}>
        {children}
      </MenuContext.Provider>
    );
  };

export default MenuProvider;