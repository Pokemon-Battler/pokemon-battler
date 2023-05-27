import './App.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import BattlePage from './pages/BattlePage'
import HomePage from './pages/HomePage'
import RotateTest from './pages/RotateTest'
import BattlePage3d from './pages/BattlePage3d'

import AudioPlayer from './components/AudioPlayer'

function App() {
    return (
        <BrowserRouter>
            <div className='fixed top-0 right-0 m-1 z-20'>
                <AudioPlayer />
            </div>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/battle' element={<BattlePage />} />
                <Route path='/test' element={<RotateTest />} />
                <Route path='/battle3d' element={<BattlePage3d />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
