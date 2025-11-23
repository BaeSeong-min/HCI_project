import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage';
import RainPage from './pages/RainPage';
import BirdPage from './pages/BirdPage';
import ThemeSwitcher from "./components/ThemeSwitcher";

function App() {
  return (
    <div className="container">
      <ThemeSwitcher />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/RainPage" element={<RainPage />} />
        <Route path="/BirdPage" element={<BirdPage />} />
      </Routes>
    </div>
  );
}

export default App
