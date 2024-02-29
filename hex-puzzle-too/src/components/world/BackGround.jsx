

export default function BackGround(props){
    return(
        <mesh
            {...props}
        >
            <planeGeometry args={[1000, 1000]} />
            <meshStandardMaterial 
                color={0x66a6b3}
                fog={true}
                opacity={0.3}
            />
        
            
        </mesh>
    )
}