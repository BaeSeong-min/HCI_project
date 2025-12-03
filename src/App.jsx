import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage';
import RainPage from './pages/RainPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/RainPage' element={<RainPage />} />
    </Routes>
  )
}

export default App
