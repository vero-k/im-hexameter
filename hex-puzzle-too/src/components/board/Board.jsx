import {useContext} from 'react';
import {BaseFloor} from './BaseFloor';
import {GroundFloor} from './GroundFloor';
import { useThree } from "@react-three/fiber";

import GameContext from '../context/GameContext';


export default function Board(props){


    const {
        currentConstellation, setCurrentConstellation,
        hexTable, visitedTiles,
    } = useContext(GameContext)


    function degree2rad(degree){
        return degree * (Math.PI / 180)
    }

    // eslint-disable-next-line
    const {
    gl, // WebGL renderer
    scene, // Default scene
    camera, // Default camera
    size, // Bounds of the view (which stretches 100% and auto-adjusts)
    viewport, // Bounds of the viewport in 3d units + factor (size/viewport)
    mouse, // Current, centered, normalized 2D mouse coordinates
    raycaster, // Intternal raycaster instance
    clock, // THREE.Clock (useful for useFrame deltas)
    invalidate, // Invalidates a single frame (for <Canvas invalidateFrameloop />)
    } = useThree();
    

    let makeAStep = (currentTile) => {

        visitedTiles.set(currentTile, true)

        // set all neighbors to the current (former tile) to regular
        currentConstellation.neighboursToCurrent.forEach((i) => {
            const neighbour= hexTable.get(i)
            neighbour.status = "regular"
        })

        

        const nextCurrentTile = currentTile
        const nextCurrentHex = hexTable.get(nextCurrentTile)
        const nextCurrentNeighbours = nextCurrentHex.neighbours

        nextCurrentNeighbours.forEach((i) => {
            if(!currentConstellation.currentHexGround.includes(i)){
                currentConstellation.currentHexGround.push(i)
            }
            
            const neighbour = hexTable.get(i)
            neighbour.status = "neighbour"
        })
        

        currentConstellation.currentTile = nextCurrentTile
        currentConstellation.neighboursToCurrent = nextCurrentNeighbours

        currentConstellation.currentHexBase.push(currentTile)
        currentConstellation.currentHexComplete.push(currentTile)

        nextCurrentHex.status = "current"
        setCurrentConstellation(prev => ({
            ...prev,
            currentTile: nextCurrentTile
        }))
    }

    

    return(
        
        <group
            rotation={[0, 0, 0]}
            position={[-5, 2, 0]}
            scale={[0.7, 0.7, 0.7]}
        >
            

            <GroundFloor 
                {...props}
                key={currentConstellation.currentTile*10 + 1}
                makeAStep={makeAStep}
            />

            <BaseFloor 
                {...props}
                key={currentConstellation.currentTile*10 + 2}
            />


        </group>
    )

    
}