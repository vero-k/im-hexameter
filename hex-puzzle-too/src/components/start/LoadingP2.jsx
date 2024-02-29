import axios from 'axios'

import { useEffect, useContext} from "react"
import { useNavigate } from 'react-router-dom'

import Spinner from 'react-bootstrap/Spinner'
import Container from 'react-bootstrap/Container'

import { Buffer } from 'buffer'

import GameContext from '../context/GameContext'

import { baseURL } from '../context/Constants'


////////////////////////////////////////////////////////////////
export default function LoadingP2 (props) {

  const URL = process.env.REACT_APP_BACKENDURL_PRIO || baseURL;

  const navigate = useNavigate()

  const { userID, gameID, tableRaster, setTableRaster, gridConstants } = useContext(GameContext);


  useEffect(() => {
    const fetchImages = async () => {
      const requests = [];
      for (let i = 0; i < gridConstants.gridCount; i++) {
        requests.push(axios.get(`${URL}get-image/?gameID=${gameID}&userID=${userID}&currentImg=${i}`, {
          responseType: 'arraybuffer'
        }));
      }

      try {
        const responses = await Promise.all(requests);
        const updatedTable = tableRaster

        responses.forEach((response, index) => {
          let b64encoded = Buffer.from(response.data, 'binary').toString('base64');
          let mimetype = "image/jpeg";
          const base64 = `data:${mimetype};base64,${b64encoded}`;

          updatedTable.get(index).modMap.set(0, {
            listing: 0,
            type: 'original',
            image: base64,
            tkey: index,
          });
        });

        setTableRaster(updatedTable);
        navigate('/loading---');
      } catch (error) {
        console.error("Error loading images:", error);
        // Handle the error appropriately here
      }
    };

    fetchImages();
  }, [userID, gameID, gridConstants, tableRaster, setTableRaster, navigate]);




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
  
