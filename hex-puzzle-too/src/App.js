import './style/App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from "react-router-dom"

import { GameProvider } from './components/context/GameProvider';
import MenuProvider  from './components/context/MenuProvider';

import Home from './components/start/Home'
import Start from './components/start/ChooseImage'
import LoadingP1 from './components/start/LoadingP1'
import LoadingP15 from './components/start/LoadingP15'
import LoadingP2 from './components/start/LoadingP2'
import LoadingP3 from './components/start/LoadingP3'
import Game from './components/game/Game'
import Begin from './components/start/Begin'
import NewGame from "./components/start/NewGame";


export default function App() {

  return (
    <GameProvider>
      <MenuProvider>
      <Routes>
        <Route path='/newgame' element={<NewGame />} />
        <Route path='/game' element={<Game />} />
        <Route path="/loading---" element={<LoadingP3 />} />
        <Route path="/loading--" element={<LoadingP2 />} />
        <Route path="/loading-" element={<LoadingP15 />} />
        <Route path="/loading" element={<LoadingP1 />} />
        <Route path="/chooseImage" element={<Start />} />
        <Route path="/begin" element={<Begin />} />
        <Route path="/" element={<Home />} />
      </Routes>
      </MenuProvider>
    </GameProvider>
  )
}
