import './App.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import BattlePage from './pages/BattlePage'
import HomePage from './pages/HomePage'
import RotateTest from './pages/RotateTest'
import BattlePage3d from './pages/BattlePage3d'

function App() {

    return (
        <BrowserRouter>
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
