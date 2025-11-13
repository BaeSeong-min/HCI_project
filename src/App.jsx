import { Routes, Route } from 'react-router-dom'
import BgmSelect from './pages/BgmSelect';
import MusicPlayer from './pages/MusicPlayer';

function App() {
  return (
    <Routes>
      <Route path='/' element={<BgmSelect />} />
      <Route path='/musicPlayer' element={<MusicPlayer />} />
    </Routes>
  )
}

export default App
