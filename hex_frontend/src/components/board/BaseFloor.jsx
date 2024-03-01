import { useState, useRef, useContext, useEffect } from 'react';
//import { TextureLoader } from 'three/src/loaders/TextureLoader';
import GameContext from '../context/GameContext';
import MenuContext from '../context/MenuContext';
import { useTexture } from "@react-three/drei"

//const loader = new TextureLoader()


export function BaseHex(props) {

  const {baseImgTable, gridConstants} = useContext(GameContext)
  const {currentToolOp} = useContext(MenuContext)


  const [tkey] = useState(props.tkey)
  const [trackerTable] = useState(baseImgTable.get(tkey))
  const [table] = useState(trackerTable.modMap)
  const [currentTextureNr, setCurrentTextureNr] = useState(trackerTable.currentListing)
  const [textures, setTextures] = useState()
  const [status] = useState(props.status)
  const [currentTextureKey, setCurrentTextureKey] = useState(table.get(trackerTable.currentListing).type)


  useEffect(() => {
    
    const getTextures = () => {
      const textures = {}
      for (let [key, value] of table){
        textures[key] = value.image
      }
      return textures
    }

    
    setTextures(getTextures())
    
  }, [])

  //const [currentTexture, setCurrentTexture] = useState(() => loader.load(table.get(trackerTable.currentListing).image))

  if(textures){
    const texturesLoaded = useTexture(textures)
  }

  const geo = useRef(null)

  const textureChange = () => {
    if(currentTextureKey){
      if(currentTextureNr > 0 && currentToolOp === currentTextureKey){
        const newNr = currentTextureNr - 1
        const key = table.get(newNr).type
        //const img = loader.load(table.get(newNr).image)
        
        trackerTable.currentListing = newNr
        setCurrentTextureNr(newNr)
        setCurrentTextureKey(key)
       
      }
      
    }
    
  }
  
  
  return (
    <>
    { textures &&
    <mesh 
        {... props}
        receiveShadow={true}
        status={status}

        onDoubleClick={() => textureChange()}
        >
      <cylinderGeometry ref={geo} args={[gridConstants.hexRadius, gridConstants.hexRadius, 0.1, 6]} />

      <meshStandardMaterial 
        map={texturesLoaded.get(currentTextureNr)}  
        />
    </mesh>
    } 
    </>
  );
}




export function BaseFloor(props) {

  const {currentConstellation} = useContext(GameContext)
  const {hexTable} = useContext(GameContext)


  return (
    <group
      {...props}
      key={currentConstellation.currentTile}
      position={[0, 0, 0]}
    >
        {currentConstellation.currentHexBase.map((hexKey) => {
          const hex = hexTable.get(hexKey)
          return (
            <BaseHex
              {...props}
              key={hex.tkey}
              tkey={hex.tkey}
              position={[hex.posX, hex.posY, hex.posZ]}
              rotation={[0, - Math.PI / 6, 0]}
              status={hex.status}
            />
          )
        }
            
        )}

    </group>
    
  );


}
