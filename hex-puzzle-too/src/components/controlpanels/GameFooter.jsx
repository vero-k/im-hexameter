
import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import MenuContext from '../context/MenuContext';
import GameContext from '../context/GameContext';

import {PerspectiveMenus} from './PerspectiveMenus'

export const GameFooter = (props) => {


    const {gridConstants, gameStats} = useContext(GameContext)
    const {changePerspective} = useContext(MenuContext)

    const togglePerspective = () => changePerspective(prev => ((prev === "bird's view")? "first person view":"bird's view"))

    return (
        <Container>
            <Row>
                <Col
                    style={{
                        alignContent: "center"
                      }}
                >
                    <Row>
                    {"width: " + gridConstants.gridWidthCount.toString()}
                    </Row>
                    <Row>
                    {"height: " + gridConstants.gridHeightCount.toString()}
                    </Row>
                </Col>
                <Col
                    style={{
                        alignContent: "center"
                      }}
                >
                    <Row>
                    {"level: " + gameStats.level.toString()}
                    </Row>
                    <Row>
                    {"difficulty: " + gameStats.difficulty.toString()}
                    </Row>
                    
                    
                </Col>
                <Col>
                    <PerspectiveMenus
                    togglePerspective={togglePerspective}
                    />
                </Col>
            </Row>
        </Container>
        
    )
}