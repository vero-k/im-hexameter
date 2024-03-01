import { useRef} from 'react'
import { extend, useFrame, useThree } from '@react-three/fiber'
import {MapControls} from '@react-three/drei';


extend({ MapControls });

export const Controls = (props) => {

  const controls = useRef(null)

  const { camera, gl } = useThree()

  useFrame(() => {
    if(controls.current) {
      controls.current.update()
    }
  })

  return (
    <MapControls
      ref={controls}
      args={[camera, gl.domElement]}
      enableDamping={true}
      dampingFactor={0.05}
      minDistance={1}
      maxDistance={5000}
      {...props}
    />
  )
}


