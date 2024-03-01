
import { useFrame} from '@react-three/fiber';
import { useRef, useState,  useContext } from 'react';
import {Select } from '@react-three/postprocessing'
import GameContext from '../context/GameContext';
////



const groundColors = {
  mouseOut : {
    regular: 0xffffff,
    current: 0xFFDE59,
    neighbour: 0xffffff,
  },
  mouseIn : {
    regular: 0xaaaaaa,
    current: 0xFFC259,
    neighbour: 0xcccccc,
  }
}



//////

export function GroundHex(props) {

  const refGroundTile = useRef(null);

  const tkey = props.tkey;
  const [status, setStatus] = useState(props.status)
  const [groundColor, setGroundColor] = useState(groundColors.mouseOut[props.status])
  const {gridConstants } = useContext(GameContext)


  // event handlers

  const handlePointerEnter = () => {
    setGroundColor(groundColors.mouseIn[status])
  }

  const handlePointerLeave= () => {
    setGroundColor(groundColors.mouseOut[status])
  }

  const handleClick = (props, e) => {
    if(status === 'neighbour'){
      let shadowProps = props;
      props.makeAStep(tkey)
    }
  }

  useFrame(({clock}) => {

    if(status !== "regular"){
      const a = clock.getElapsedTime() 
      refGroundTile.current.position.y = Math.abs(0.2 * (Math.sin(3 * a)))
    }
    
  });


  return (

    <group
      {... props}
      ref={refGroundTile}
      status={status}

      onClick={(e) => handleClick(props, e)}
      onPointerEnter={handlePointerEnter} // see note 1
      onPointerLeave={handlePointerLeave} // see note 1
    >
      <Select enabled={status==="neighbour"}>
      <mesh>

        <cylinderGeometry args={[gridConstants.hexRadius, gridConstants.hexRadius, 0.1, 6]} />

        <meshPhysicalMaterial 
          transparent={true}
          opacity={0.1}  
          color={groundColor}
        />
        
      </mesh>


      </Select>
    </group>
    
  );
  
}




export function GroundFloor(props) {

  
  const {currentConstellation} = useContext(GameContext)
  const {hexTable} = useContext(GameContext)

  return (
    <group
      {...props}
      key={currentConstellation.currentTile}
      position={[0, 0.2, 0]}
    >
        {currentConstellation.currentHexGround.map((hexKey) => {
          const hex = hexTable.get(hexKey)
          return (
            <GroundHex
              {...props}
              key={hex.tkey}
              tkey={hex.tkey}
              x= {hex.gridX}
              y={hex.gridY}
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
