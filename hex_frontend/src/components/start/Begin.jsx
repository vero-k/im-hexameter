import { useState, useContext, useEffect} from 'react';
import { useNavigate} from "react-router-dom"

import GameContext from '../context/GameContext'

import Form from 'react-bootstrap/Form';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';


import Footer from '../controlpanels/Footer'
import {Header} from '../controlpanels/Header'

import axios from 'axios'
import { baseURL } from '../context/Constants';

export default function Begin() {

  const URL = process.env.REACT_APP_BACKENDURL_PRIO || baseURL;
  const navigate = useNavigate()

  const [name, setName] = useState('anonymous');
  const { setUserName, userID, setUserID } = useContext(GameContext)


  const begin = async (e) => {
      try {
        const response = await axios.get(URL + 'newplayer/', { params: { name } });
        const receivedId = response.data.id; 
        setUserID(receivedId); 
        setUserName(name)
      } catch (error) {
        console.error('Error fetching ID:', error);
      }

  }  

  const handleNameInput = (e) => {
    setName(e.target.value)
  }

  useEffect(() => {
    if(userID){
      navigate('/chooseImage'); 
    }
    
  }, [userID, navigate])



  return (
    <>

            <Header />

            <div className={"container-fluid"}>

              <div className={"container-fluid"}>
                <div className={"container"}>
                  <div className={"row justify-content-md-center pt-3 pb-4 mt-3 mb-4"}>

                  <Form.Group controlId="formFile" className="mb-3">
                    <FormControl>

                      <FormLabel id="">Enter your Name</FormLabel>
                      <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        onChange={handleNameInput}
                        />
                           
                    </FormControl>
                  </Form.Group>

                    <Form.Group>
                      <button type="submit" className="btn btn-outline-dark" onClick={begin}>Continue</button>
                    </Form.Group>


                  </div>
                </div>
              </div>
            </div>

      <Footer />

    </>
)
  
}





