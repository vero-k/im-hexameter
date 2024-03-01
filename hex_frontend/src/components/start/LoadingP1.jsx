import axios from 'axios'

import { useEffect, useContext, useState} from "react"
import { useLocation, useNavigate } from 'react-router-dom'

import Spinner from 'react-bootstrap/Spinner'
import Container from 'react-bootstrap/Container'

import GameContext from '../context/GameContext'

import { baseURL } from '../context/Constants'

/// CONSTANTS
export let GRIDWIDTHCOUNT = 5
export let GRIDHEIGHTCOUNT = 5
export const GRIDCOUNT = GRIDHEIGHTCOUNT * GRIDWIDTHCOUNT

export const RADIUS = 1.0
export const HEXWIDTH = 2.0 * RADIUS
export const HEXHEIGHT = Math.sqrt(3) * RADIUS
export const HORIZONTAL_SPACING = HEXWIDTH * 3.0 / 4.0
export const VERTICAL_SPACING = HEXHEIGHT

export const GRIDWIDTH = (GRIDWIDTHCOUNT -1) * HORIZONTAL_SPACING + HEXWIDTH
export const GRIDHEIGHT = GRIDHEIGHTCOUNT * HEXHEIGHT + HEXHEIGHT / 2.0

export const STARTING_HEX_COMPLETED = [0, 1, 11, 12, 132, 143]
export const STARTING_HEX_BASE = [0, 1, 11, 12, 132, 143]
export const STARTING_HEX_GROUND = [0, 1, 11, 12, 132, 143]

export const STARTING_TILE = 0

const GRIDFORMS = {
  desktop : [2, 1],
  mobile : [1, 2],
  square : [1, 1]
}

const GRIDSIZES = {
  small : 8,
  medium : 15,
  large : 25
}



////////////////////////////////////////////////////////////////
export default function LoadingP1 (props) {

  const URL = process.env.REACT_APP_BACKENDURL_PRIO || baseURL;

  const navigate = useNavigate()
  const location = useLocation();

  const { setBaseImageFile } = useContext(GameContext)
  const { setBaseImageString } = useContext(GameContext)
  const { userID, setUserID } = useContext(GameContext)
  const { level, setLevel } = useContext(GameContext)
  const { setCurrentConstellation } = useContext(GameContext)
  const { setHexArray } = useContext(GameContext)
  const { setHexTable } = useContext(GameContext)
  const { gameID, setGameID } = useContext(GameContext)
  const { setGridImgAbsolutes } = useContext(GameContext)
  const { setGameStats } = useContext(GameContext)
  const { setGridConstants } = useContext(GameContext)
  const { setVisitedTiles } = useContext(GameContext)



  useEffect(() => {

    const gameStats = {
      score: location.state?.orgWidth,
      difficulty: location.state?.difficulty,
      level: 1,

    }

    const baseImgStats = {
      orgWidth: location.state?.orgWidth,
      orgHeight : location.state?.orgHeight,
      imgWidth : location.state?.imgWidth,
      imgHeight : location.state?.imgHeight,
      imgTop: location.state?.imgTop,
      imgLeft: location.state?.imgLeft,
      imgType: 'jpg',
      fieldForm: location.state?.fieldForm,
      fieldSize: location.state?.fieldSize,
    }
  
    const GRIDWIDTHCOUNT = GRIDFORMS[baseImgStats.fieldForm][0] * GRIDSIZES[baseImgStats.fieldSize]
    const GRIDHEIGHTCOUNT = GRIDFORMS[baseImgStats.fieldForm][1] * GRIDSIZES[baseImgStats.fieldSize]
    const GRIDCOUNT = GRIDWIDTHCOUNT * GRIDWIDTHCOUNT
    
    const gridConstants = {
        fieldSize: baseImgStats.fieldSize,
        fieldForm: baseImgStats.fieldForm,
        gridWidthCount : GRIDWIDTHCOUNT,
        gridHeightCount : GRIDHEIGHTCOUNT,
        gridCount: GRIDCOUNT,
  
        hexWidth : HEXWIDTH,
        hexHeight:  HEXHEIGHT,
        hexRadius : RADIUS,
        hexHorizontalSpacing: HORIZONTAL_SPACING,
        hexVerticalSpacing: VERTICAL_SPACING,
        gridWidth: (GRIDWIDTHCOUNT - 1) * HORIZONTAL_SPACING + HEXWIDTH,
        gridHeight: Math.floor(GRIDHEIGHTCOUNT * HEXHEIGHT + HEXHEIGHT / 2.0),
    }
  
    
  
    
    const gridImgAbsolutes = {
        hexWidthAbsolute: Math.floor(baseImgStats.imgWidth / gridConstants.gridWidthCount),
        hexRadiusAbsolute: Math.floor(baseImgStats.imgWidth / gridConstants.gridWidthCount) / 2,
        hexHeightAbsolute: Math.floor(Math.floor(baseImgStats.imgHeight / gridConstants.gridHeightCount) / 2.0 * Math.sqrt(3)),
  
        gridWidthAbsolute:  gridConstants.gridWidthCount * Math.floor(baseImgStats.imgWidth / gridConstants.gridWidthCount),
        gridHeightAbsolute:  gridConstants.gridHeightCount * Math.floor(Math.floor(baseImgStats.imgHeight / gridConstants.gridHeightCount) / 2.0 * Math.sqrt(3)),
    }
  
    
    
  
  
    const islandTiles = [Math.floor(gridConstants.gridCount * Math.random()), Math.floor(gridConstants.gridCount * Math.random()), Math.floor(gridConstants.gridCount * Math.random())]
  
    const currentConstellation = {
        currentTile: STARTING_TILE,
        neighboursToCurrent: [STARTING_TILE + 1, STARTING_TILE + gridConstants.gridHeightCount, ],
  
        currentHexComplete: [STARTING_TILE, ].concat(islandTiles),
        currentHexBase: [STARTING_TILE, ].concat(islandTiles),
        currentHexGround: [STARTING_TILE, STARTING_TILE + 1, STARTING_TILE + gridConstants.gridHeightCount, ].concat(islandTiles),
    }

    
  
  
    const hexArray = [...Array(gridConstants.gridCount).keys()].map(i => {
          
      const x = Math.floor(i / gridConstants.gridHeightCount)
      const y = i % gridConstants.gridHeightCount
  
      const posX = gridConstants.hexRadius + x * gridConstants.hexHorizontalSpacing
      const verticalShiftDown = (x % 2) === 0
      const verticalShift = (verticalShiftDown)? 0: gridConstants.hexVerticalSpacing / 2.0
      const posZ = gridConstants.hexRadius + y * gridConstants.hexVerticalSpacing + verticalShift
      const isTop = y === 0
      const isBottom = y === (gridConstants.gridHeightCount - 1)
      const isLeft = x === 0
      const isRight = x === (gridConstants.gridWidthCount - 1)
      const isEdge = (isTop || isLeft || isBottom || isRight)
      const isCorner = (isTop && isLeft) || (isTop && isRight) || (isBottom && isLeft) || (isBottom && isRight)
  
      return {
        tkey: i,
        gridX: x,
        gridY: y,
        posX: posX,
        posY: 0,
        posZ: posZ,
        neighbours: [],
        neighboursCoord: {},
        neighboursObject: {},
        isEdge: isEdge,
        isCorner: isCorner,
        isLeft: isLeft,
        isRight: isRight,
        isTop: isTop,
        isBottom: isBottom,
        verticalShiftDown: verticalShiftDown
      }
    })
  
  
  
    const hexTable = new Map()
  
    hexArray.forEach((hex, index) => {
      hexTable.set(index, hex)
    })
  
    hexArray.forEach((hex, index) => {
        if(!hex.verticalShiftDown){
            
            hex.neighboursCoord = {
                'north': (!hex.isTop)? [hex.gridX, hex.gridY - 1] : null, 
                'south': (!hex.isBottom)? [hex.gridX, hex.gridY + 1]: null, 
                'northeast': (!hex.isRight)? [hex.gridX + 1, hex.gridY] : null,
                'southeast': !(hex.isBottom || hex.isRight)? [hex.gridX + 1, hex.gridY + 1]: null, 
                'northwest' : !(hex.isLeft)? [hex.gridX -1, hex.gridY]: null, 
                'southwest' : !(hex.isLeft || hex.isBottom)? [hex.gridX -1, hex.gridY + 1]: null,
            }
  
            hex.neighboursObject = {
              'north': (hex.neighboursCoord.north)? index - 1: null, 
              'south': (hex.neighboursCoord.south)? index + 1 : null, 
              'northeast': (hex.neighboursCoord.northeast)? index + gridConstants.gridHeightCount : null, 
              'southeast' : (hex.neighboursCoord.southeast)? index + gridConstants.gridHeightCount + 1 : null, 
              'northwest' : (hex.neighboursCoord.northwest)? index - gridConstants.gridHeightCount : null, 
              'southwest' : (hex.neighboursCoord.southwest)? index - gridConstants.gridHeightCount + 1 : null,
            }
  
            if(hex.neighboursCoord.north){
              hex.neighbours.push(index-1)
            }
  
            if(hex.neighboursCoord.south){
              hex.neighbours.push(index+1)
            }
  
            if(hex.neighboursCoord.northeast){
              hex.neighbours.push(index + gridConstants.gridHeightCount,)
            }
  
            if(hex.neighboursCoord.northwest){
              hex.neighbours.push(index - gridConstants.gridHeightCount)
            }
  
            if(hex.neighboursCoord.southeast){
              hex.neighbours.push(index + gridConstants.gridHeightCount + 1)
            }
  
            if(hex.neighboursCoord.southwest){
              hex.neighbours.push(index - gridConstants.gridHeightCount + 1)
            }
  
            
          
        } else {
  
          hex.neighboursCoord = {
            'north': (!hex.isTop)? [hex.gridX, hex.gridY - 1] : null, 
            'south': (!hex.isBottom)? [hex.gridX, hex.gridY + 1]: null, 
            'northeast': !(hex.isRight || hex.isTop)? [hex.gridX + 1, hex.gridY -1] : null,
            'southeast': (!hex.isRight)? [hex.gridX + 1, hex.gridY]: null, 
            'northwest' : !(hex.isLeft || hex.isTop)? [hex.gridX -1, hex.gridY-1]: null, 
            'southwest' : (!hex.isLeft)? [hex.gridX -1, hex.gridY]: null,
        }
  
        hex.neighboursObject = {
          'north': (hex.neighboursCoord.north)? index - 1: null, 
          'south': (hex.neighboursCoord.south)? index + 1 : null, 
          'northeast': (hex.neighboursCoord.northeast)? index + gridConstants.gridHeightCount - 1 : null, 
          'southeast' : (hex.neighboursCoord.southeast)? index + gridConstants.gridHeightCount : null, 
          'northwest' : (hex.neighboursCoord.northwest)? index - gridConstants.gridHeightCount -1 : null, 
          'southwest' : (hex.neighboursCoord.southwest)? index - gridConstants.gridHeightCount : null,
        }
  
        if(hex.neighboursCoord.north){
          hex.neighbours.push(index-1)
        }
  
        if(hex.neighboursCoord.south){
          hex.neighbours.push(index+1)
        }
  
        if(hex.neighboursCoord.northeast){
          hex.neighbours.push(index + gridConstants.gridHeightCount -1,)
        }
  
        if(hex.neighboursCoord.northwest){
          hex.neighbours.push(index - gridConstants.gridHeightCount -1)
        }
  
        if(hex.neighboursCoord.southeast){
          hex.neighbours.push(index + gridConstants.gridHeightCount)
        }
  
        if(hex.neighboursCoord.southwest){
          hex.neighbours.push(index - gridConstants.gridHeightCount)
        }
  
      }})
  
    currentConstellation.neighboursToCurrent = hexTable.get(currentConstellation.currentTile).neighbours
  
    hexArray.forEach((hex, index) => {
      const isCurrent = (index === currentConstellation.currentTile)? true: false
      const isNeighbour = currentConstellation.neighboursToCurrent.includes(index)? true : false 
      const status = isCurrent? "current" : (isNeighbour? "neighbour":"regular")
      hex.status = status
    })
    
    const visitedTiles = new Map()
    hexArray.forEach((hex, index) => {
      visitedTiles.set(hex.tkey, "false")
    })
    visitedTiles.set(STARTING_TILE, "true")

    setBaseImageFile(location.state?.imgFile)
    setBaseImageString(location.state?.base64Image)
    setLevel(gameStats.level)
    setCurrentConstellation(currentConstellation)
    setHexTable(hexTable)
    setHexArray(hexArray)
    setGameStats(gameStats)
    setGridConstants(gridConstants) 
    setGridImgAbsolutes(gridImgAbsolutes) 
    setVisitedTiles(visitedTiles)
    const formData = new FormData()
    formData.append('file', location.state?.imgFile)
    formData.append('userID', userID)
    formData.append('level', gameStats.level.toString())
    formData.append('difficulty', gameStats.difficulty)
    formData.append("orgWidth", baseImgStats.orgWidth.toString())
    formData.append("orgHeight", baseImgStats.orgHeight.toString())
    formData.append('height', baseImgStats.imgHeight.toString())
    formData.append('width', baseImgStats.imgWidth.toString())
    formData.append('top', baseImgStats.imgTop.toString())
    formData.append('left', baseImgStats.imgLeft.toString())
    formData.append('hexNrWidth', gridConstants.gridWidthCount.toString())
    formData.append('hexNrHeight', gridConstants.gridHeightCount.toString())


    const loadAsyncStuff = async () => {

        try {

          const response_post_img = await axios.post(URL + 'post-image/', formData, {
            headers: {
              'Content-Type' : 'multipart/form-data'
            }
          })
          setGameID(response_post_img.data.game_id)
        } catch (error) {

        }
         
    }

    loadAsyncStuff();

  

  }, [])


  useEffect(() => {
    if(gameID){
      navigate('/loading-')
    }
  }, [gameID])


  return (
    <Container
    className='container-spinner'
      style={{
        alignContent: "center",
        alignSelf: "center",
        height: "50vh",
        width: "50vw"
      }}
    >
      <Spinner className="spinner" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>

    </Container>

)

    
}
  
