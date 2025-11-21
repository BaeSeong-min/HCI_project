import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import RainPage from './pages/RainPage';
import BirdPage from './pages/BirdPage';
import './App.css'; 

function App() {
  // 음악 리스트(playlist)와 현재 재생 중인 곡의 순서(currentIndex)를 관리
  const [playlist, setPlaylist] = useState([]); 
  const [currentIndex, setCurrentIndex] = useState(0);

  // 음악 추가 함수 (드래그 앤 드롭 시 호출)
  const addSong = (file) => {
    setPlaylist((prev) => {
      const newList = [...prev, file];
      return newList;
    });
    // 리스트가 비어있었다면(첫 곡인 경우) 바로 재생 시작
    if (playlist.length === 0) {
      setCurrentIndex(0);
    }
  };

  // 다음 곡 재생 함수 (노래가 끝나면 PlayerBar에서 호출됨)
  const playNext = () => {
    if (currentIndex < playlist.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      console.log("Playlist ended");
    }
  };

  // 리스트에서 특정 곡을 클릭했을 때 바로 재생하는 함수
  const playSpecificSong = (index) => {
    setCurrentIndex(index);
  };

  // 모든 페이지에 내려줄 공통 Props 객체
  const commonProps = {
    playlist,
    currentSong: playlist[currentIndex], // 현재 재생해야 할 파일 객체
    addSong,
    playNext,
    playSpecificSong,
    currentIndex
  };

  return (
    <Routes>
      <Route path='/' element={<MainPage {...commonProps} />} />
      <Route path='/RainPage' element={<RainPage {...commonProps} />} />
      <Route path='/BirdPage' element={<BirdPage {...commonProps} />} />
    </Routes>
  );
}

export default App;