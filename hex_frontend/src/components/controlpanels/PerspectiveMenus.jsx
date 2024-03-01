import Button from 'react-bootstrap/Button'
import {useContext} from 'react'
import { PerspectiveContext } from '../game/Game'


export const PerspectiveMenus = (props) => {

    const perspective = useContext(PerspectiveContext)

    return(<>
    
        <Button variant="primary" onClick={() => props.togglePerspective()}>
                {"change to " + perspective}
        </Button>

    </>)
}