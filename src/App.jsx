import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage';
import RainPage from './pages/RainPage';
import BirdPage from './pages/BirdPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/RainPage' element={<RainPage />} />
      <Route path='/BirdPage' element={<BirdPage />} />
    </Routes>
  )
}

export default App
