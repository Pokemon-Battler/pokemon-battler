import './App.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import BattlePage from './pages/BattlePage'
import HomePage from './pages/HomePage'
import WinPage from './pages/WinPage'

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/battle' element={<BattlePage />} />
                <Route path='/winner' element={<WinPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
