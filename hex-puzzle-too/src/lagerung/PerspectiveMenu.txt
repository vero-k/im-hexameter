import Button from 'react-bootstrap/Button'
import {useState} from 'react'


export const PerspectiveMenu = (props: any) => {

    const [disableBttnOne, setDisableBttnOne] = useState(true)
    const [disableBttnTwo, setDisableBttnTwo] = useState(false)

    return(<>
    
        <Button variant="primary" onClick={() => {
            setDisableBttnOne(true)
            setDisableBttnTwo(false)
            props.changePerspective()
        }} disabled={disableBttnOne}>
                {'Bird Perspective'}
        </Button>
        
        <Button variant="primary" onClick={() => {
            setDisableBttnOne(false)
            setDisableBttnTwo(true)
            props.changePerspective()
        }} disabled={disableBttnTwo}>
                {'First Person Perspective'}
        </Button>
    </>)
}