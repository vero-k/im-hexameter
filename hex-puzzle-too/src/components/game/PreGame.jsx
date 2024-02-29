
import { useContext, createContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

import Game from './Game'

import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'

import GameContext from "../context/GameContext"
import MenuContext from "../context/MenuContext"

import { baseURL } from "../context/Constants"
import { useState } from "react"


export const PerspectiveContext = createContext('birdview')


export default function PreGame(props) {

  const URL = process.env.REACT_APP_BACKENDURL_PRIO || baseURL;
  const navigate = useNavigate()
  const [etwas, setEtwas] = useState(0)

  const { gameStatus, setGameStatus,
    perspective, changePerspective,
    currentToolOp, setCurrentToolOp,} = useContext(MenuContext)


  const {
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
      tableRaster2, setTableRaster2,
  } = useContext(GameContext)


  useEffect(() => {

    const handleUnload = async (e) => {

      await axios.get(URL + 'erase',  { params: { userID } });
    
      // Prevent the default action to ensure the request is sent
      e.preventDefault();
      e.returnValue = '';
    };



    window.addEventListener('beforeunload', handleUnload);
    setEtwas(1)
    
    return () => {
        window.removeEventListener('beforeunload', handleUnload);
    };

    

  }, [])

  
  useEffect(() => {

    if(gameStatus === 'off'){

      const handleUnload = async () => {
        await axios.get(URL + 'erase',  { params: { userID } });
      };
  
      handleUnload()
        setBaseImageFile(null)
        setBaseImageString(null)
        setGameID(null)
        setGameStats(null)
        setBaseImgStats(null)
        setGridConstants(null)
        setGridImgAbsolutes(null)
        setCurrentConstellation(null)
        setHexArray(null)
        setHexTable(null)
        setBaseImgTable(null)
        setModTrackerTable(null)
        setModTracker(null)
        setTableRaster(null)
        setTableRaster2(null)
        changePerspective("bird's view")
        setGameStatus('on')
        setCurrentToolOp('')
      navigate('/new_game')
  
      window.addEventListener('beforeunload', handleUnload);
  
      return () => {
          window.removeEventListener('beforeunload', handleUnload);
      };

    }
    
  }, [gameStatus])


  return (
    <>
      {etwas && <Game/>}
      {!etwas && 
        
        <Container
            className='container-spinner'
                style={{
                alignContent: "center",
                alignSelf: "center",
                height: "50vh"
                }}
            >
                <Spinner className="spinner" animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>

            </Container>

      }
    </>
  )
}
