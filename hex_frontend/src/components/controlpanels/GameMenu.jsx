

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import MenuContext from '../context/MenuContext';
import { useContext } from 'react';



export const GameMenu = (props) => {

    const { gameStatus, setGameStatus } = useContext(MenuContext)
    const { currentToolOp, setCurrentToolOp} = useContext(MenuContext)

    const handleExit = () => {
      setGameStatus('off')
    }

    const handleClickMirror = () => {
      setCurrentToolOp("mirror")
    }

    const handleClickWheel = () => {
      setCurrentToolOp("rotate")
    }

    const handleClickGlasses = () => {
      setCurrentToolOp("blur")
    }

    const handleClickWhisk = () => {
      setCurrentToolOp("blend")
    }

    const handleClickPaint = () => {
      setCurrentToolOp("colorinvert")
    }

    const handleClickShoo = () => {
      setCurrentToolOp("cat")
    }

    const handleClickWrench = () => {
      setCurrentToolOp("deform")
    }



    return (
        <Tabs
          defaultActiveKey="game"
          id="fill-tab-example"
          className="mb-3"
          fill
        >
          <Tab eventKey="game" title="Game">
            
            <ListGroup 
              horizontal
            >
              <ListGroup.Item>
              <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="button-mirror">Reflect</Tooltip>}
                >
                  {({ ref, ...triggerHandler }) => (
                    <div
                      {...triggerHandler}
                      className={(currentToolOp === "mirror")? "active-toolbar-div":"toolbar-div"}
                      onClick={handleClickMirror}
                    >
                      <Image
                        ref={ref}
                        thumbnail
                        src="symbols/mirror.png"
                        className={"toolbar-img"}
                      />
                    </div>
                  )}
                </OverlayTrigger>
              </ListGroup.Item>
              <ListGroup.Item><OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="button-mirror">Blur</Tooltip>}
                >
                  {({ ref, ...triggerHandler }) => (
                    <div
                      {...triggerHandler}
                      className={(currentToolOp === "blur")? "active-toolbar-div":"toolbar-div"}
                      onClick={handleClickGlasses}
                    >
                      <Image
                        ref={ref}
                        thumbnail
                        src="symbols/glasses.png"
                        className={"toolbar-img"}
                      />
                    </div>
                  )}
                </OverlayTrigger></ListGroup.Item>
              <ListGroup.Item><OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="button-mirror">Blend</Tooltip>}
                >
                  {({ ref, ...triggerHandler }) => (
                    <div
                      {...triggerHandler}
                      className={(currentToolOp === "blend")? "active-toolbar-div":"toolbar-div"}
                      onClick={handleClickWhisk}
                    >
                      <Image
                        ref={ref}
                        thumbnail
                        src="symbols/whisk.png"
                        className={"toolbar-img"}
                      />
                    </div>
                  )}
                </OverlayTrigger></ListGroup.Item>
              <ListGroup.Item><OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="button-mirror">Deform</Tooltip>}
                >
                  {({ ref, ...triggerHandler }) => (
                    <div
                      {...triggerHandler}
                      className={(currentToolOp === "deform")? "active-toolbar-div":"toolbar-div"}
                      onClick={handleClickWrench}
                    >
                      <Image
                        ref={ref}
                        thumbnail
                        src="symbols/wrench.png"
                        className={"toolbar-img"}
                      />
                    </div>
                  )}
                </OverlayTrigger></ListGroup.Item>
                <ListGroup.Item><OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="button-mirror">Shooo Cat</Tooltip>}
                >
                  {({ ref, ...triggerHandler }) => (
                    <div
                      {...triggerHandler}
                      className={(currentToolOp === "cat")? "active-toolbar-div":"toolbar-div"}
                      onClick={handleClickShoo}
                    >
                      <Image
                        ref={ref}
                        thumbnail
                        src="symbols/shoo.png"
                        className={"toolbar-img"}
                      />
                    </div>
                  )}
                </OverlayTrigger></ListGroup.Item>
                <ListGroup.Item><OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="button-mirror">Wheel</Tooltip>}
                >
                  {({ ref, ...triggerHandler }) => (
                    <div
                      {...triggerHandler}
                      className={(currentToolOp === "rotate")? "active-toolbar-div":"toolbar-div"}
                      onClick={handleClickWheel}
                    >
                      <Image
                        ref={ref}
                        thumbnail
                        src="symbols/steering-wheel.png"
                        className={"toolbar-img"}
                      />
                    </div>
                  )}
                </OverlayTrigger></ListGroup.Item>
                <ListGroup.Item><OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="button-mirror">Color</Tooltip>}
                >
                  {({ ref, ...triggerHandler }) => (
                    <div
                      {...triggerHandler}
                      className={(currentToolOp === "colorinvert")? "active-toolbar-div":"toolbar-div"}
                      onClick={handleClickPaint}
                    >
                      <Image
                        ref={ref}
                        thumbnail
                        src="symbols/paint.png"
                        className={"toolbar-img"}
                      />
                    </div>
                  )}
                </OverlayTrigger></ListGroup.Item>
            </ListGroup>

          </Tab>
          <Tab eventKey="player" title="Player">
            
          </Tab>
          <Tab eventKey="settings" title="Settings">
      
          </Tab>
          <Tab eventKey="exit" title="Exit">
            <Button variant="primary" onClick={handleExit}>
                {'Exit Game'}
            </Button>
          </Tab>
    </Tabs>
    )
}