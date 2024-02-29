import {useEffect, useState} from 'react'
import {useThree} from "@react-three/fiber"


export const FirstPersonCamera = (props: any) => {

    //const [isBirdEye, setIsBirdEye] = useState(props.isBirdEye)
    //const [currentTile, setCurrentTile] = useState(props.currentConstellation.currentTile)

    const currentTile = useState()

    const { camera } = useThree()

    console.log("camera component change")
    
    useEffect(() => {

        console.log("cameraComponent change")
        camera.near = 0.5

        const currentTile = props.currentConstellation['currentTile']
        const currentHex = props.hexTable.get(currentTile)
        const x = currentHex.posX 
        const z = currentHex.posZ
        const y = 4

        camera.position.set(x - 4, y, z-4)
        
        camera.rotation.set(0.4, Math.PI *1.2, 0)

        camera.updateProjectionMatrix()

    }, [props.currentConstellation.currentTile])

    return(
        <>
            
        </>
    )
}