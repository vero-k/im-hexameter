import axios from 'axios'

import { useEffect, useContext} from "react"
import { useNavigate } from 'react-router-dom'

import Spinner from 'react-bootstrap/Spinner'
import Container from 'react-bootstrap/Container'
import GameContext from '../context/GameContext'


import { baseURL } from '../context/Constants'



////////////////////////////////////////////////////////////////
export default function LoadingP15 (props) {

  const URL = process.env.REACT_APP_BACKENDURL_PRIO || baseURL;
  const navigate = useNavigate();
  const { gameID, setModTracker, setTableRaster } = useContext(GameContext);

  useEffect(() => {
    const loadAsyncStuff = async () => {
      try {
        const modTrackerResp = await axios.get(`${URL}grid-image/?gameID=${gameID}`);
        const newModTracker = new Map()
        const newTableRaster = new Map()

        for (const [key, value] of Object.entries(modTrackerResp.data)) {
          const keyInt = parseInt(key);
          newModTracker.set(keyInt, value);
          const hexImageDataMap = new Map()
          for(let j = 0; j < value.length; j++) {
            hexImageDataMap.set(j, {
              listing: j,
              type: value[j],
              image: null,
              tkey: parseInt(key),
            })
          }
          newTableRaster.set(keyInt, {
            tkey: keyInt,
            currentListing: value.length - 1,
            modMap: hexImageDataMap
          });
        }

        setModTracker(newModTracker);
        setTableRaster(newTableRaster);

        navigate('/loading--');
      } catch (error) {
        console.error("Error in LoadingP15:", error);
      }
    };

    loadAsyncStuff();
  }, [gameID, setModTracker, setTableRaster, navigate]);



  return (
    <Container
    className='container-spinner'
      style={{
        alignContent: "center",
        alignSelf: "center",
        height: "50vh"
      }}
    >
      <Spinner className="spinner" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>

    </Container>

)

    
}
  
