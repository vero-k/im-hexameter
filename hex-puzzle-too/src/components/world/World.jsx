
import Board from "../board/Board"
import {Player} from "../player/Player"

import { PerspectiveCamera} from "@react-three/drei"

import { Canvas} from "@react-three/fiber"
import { EffectComposer, Selection, Outline, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing'

import { Controls } from '../controlpanels/Controls'


export const World = (props) => {

    

    return (
        <div className="canvas">

            <Canvas>


                <ambientLight color={"white"} intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />

                {/*<primitive object={new THREE.AxesHelper(100)} /> */}
                
                <Controls />
                <Player />

                <PerspectiveCamera
                    fov={100}
                    position={[-2, 8, -10]}
                    zoom={1}
                >

                <Selection>
                        <EffectComposer multisampling={5} autoClear={false}>
                        <Outline blur visibleEdgeColor="pink" edgeStrength={40} width={500} />
                        </EffectComposer>
                        <Board 
                        {...props}
                        rotation={[Math.PI /2, 0, 0]}
                        position={[-10, -10, -10]}
                        />
                </Selection>

                </PerspectiveCamera>
                
            
            </Canvas>
        
        </div>
    )
}