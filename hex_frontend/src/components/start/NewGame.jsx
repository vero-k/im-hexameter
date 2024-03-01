
import { useNavigate} from "react-router-dom"

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'


import Footer from '../controlpanels/Footer'
import {Header} from '../controlpanels/Header'


export default function NewGame() {


  const navigate = useNavigate()

  const begin = (e) => {
    e.preventDefault()
    navigate('/chooseImage')
  }  

  const newplayer = (e) => {
    e.preventDefault();
    navigate('/begin');
  }


  const gohome = (e) => {
    e.preventDefault();
    navigate('/');
  }

  return (
    <>

            <Header />

            <div className={"container-fluid"}>

              <div className={"container-fluid"}>
                <div className={"container"}>
                  <div className={"row justify-content-md-center pt-3 pb-4 mt-3 mb-4"}>
                    <Container>
                      <Row>
                      <button className="btn btn-outline-dark" onClick={() => navigate('../chooseImage', { replace: true })}>Start New Game</button>
                      </Row>
                      <Row>
                      <button className="btn btn-outline-dark" onClick={() => navigate('../', { replace: true })}>Home</button>
                      </Row>
                    </Container>
                  </div>
                </div>
              </div>
            </div>

      <Footer />

    </>
)
  
}





