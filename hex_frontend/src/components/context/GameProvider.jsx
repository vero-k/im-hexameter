import { useState} from 'react';
import GameContext from './GameContext';


export const GameProvider = ({ children }) => { 

  const [baseImageFile, setBaseImageFile] = useState()
  const [baseImageString, setBaseImageString] = useState()

  const [userID, setUserID] = useState()
  const [userName, setUserName] = useState()
  const [gameID, setGameID] = useState()
  const [level, setLevel] = useState(0)

  const [gameStats, setGameStats] = useState()
  const [baseImgStats, setBaseImgStats] = useState()

  const [gridConstants, setGridConstants] = useState() //
  const [gridImgAbsolutes, setGridImgAbsolutes] = useState() //
  const [currentConstellation, setCurrentConstellation] = useState()
  const [hexArray, setHexArray] = useState()
  const [hexTable, setHexTable] = useState()
  const [baseImgTable, setBaseImgTable] = useState()
  const [modTrackerTable, setModTrackerTable] = useState()
  const [modTracker, setModTracker] = useState()
  const [tableRaster, setTableRaster] = useState()
  const [visitedTiles, setVisitedTiles] = useState()

  // The value prop is where you provide the data you want to distribute
  return (
    <GameContext.Provider value={{ 
        baseImageFile, setBaseImageFile,
        baseImageString, setBaseImageString,
        userID, setUserID,
        userName, setUserName,
        gameID, setGameID,
        level, setLevel,
        gameStats, setGameStats,
        baseImgStats, setBaseImgStats,
        gridConstants, setGridConstants,
        gridImgAbsolutes, setGridImgAbsolutes,
        currentConstellation, setCurrentConstellation,
        hexArray, setHexArray,
        hexTable, setHexTable,
        baseImgTable, setBaseImgTable,
        modTrackerTable, setModTrackerTable,
        modTracker, setModTracker,
        tableRaster, setTableRaster,
        visitedTiles, setVisitedTiles,
    }}>
      {children}
    </GameContext.Provider>
  );
};