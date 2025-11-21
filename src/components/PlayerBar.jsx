import { useState, useEffect } from "react"; // useEffect 추가
import { FiPlay, FiPause, FiSkipBack, FiSkipForward } from "react-icons/fi";
import VolumeControl from "./VolumeControl";
import "../PlayerBar.css"

function PlayerBar({ natureRef, musicRef, onMusicEnd, playNext, playPrev }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // 곡이 바뀌면(musicRef.current.src가 변하면) 버튼 상태를 동기화하기 위한 코드
  useEffect(() => {
    const audio = musicRef.current;
    if (!audio) return;

    const setPlay = () => setIsPlaying(true);
    const setPause = () => setIsPlaying(false);

    audio.addEventListener('play', setPlay);
    audio.addEventListener('pause', setPause);

    return () => {
      audio.removeEventListener('play', setPlay);
      audio.removeEventListener('pause', setPause);
    };
  }, [musicRef]);


  const handlePlayClick = () => {
    if (!musicRef.current?.src) return;

    if (isPlaying) {
      musicRef.current.pause();
      if(natureRef && natureRef.current) natureRef.current.pause();

    } else {
      musicRef.current.play();
      if (natureRef && natureRef.current) natureRef.current.play();

    }
  };

  // 음악 진행바 업데이트 함수
  const updateProgress = () => {
    if (!musicRef.current) return;
    const current = musicRef.current.currentTime;
    const total = musicRef.current.duration;

    if (total > 0) {
      setProgress((current / total) * 100);
    }
  }

  // 선택한 특정 시점으로 음악 이동
  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    const total = musicRef.current.duration;
    const newTime = (clickX / width) * total;

    musicRef.current.currentTime = newTime;
  };

  return (
    <div className="player-container">
      {/* 비 소리 오디오 */}
      {natureRef && <audio ref={natureRef} />}
      
      {/* 사용자 음악 오디오 */}
      <audio 
        ref={musicRef} 
        onTimeUpdate={updateProgress}
        onEnded={onMusicEnd} 
        autoPlay 
      />

      <div className="progress-container" onClick={handleSeek}>
        <div 
          className="progress-bar" 
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="player-controls">
        {/* 이전 곡 버튼 연결 (playPrev가 있다면 실행) */}
        <button className="player-btn" onClick={playPrev}>
          <FiSkipBack size={30} />
        </button>

        <button className="player-btn" onClick={handlePlayClick}>
          {isPlaying ? (
            <FiPause size={30} />
            ) : (
            <FiPlay size={30} />
            )}
        </button>

        {/* 다음 곡 버튼 연결 */}
        <button className="player-btn" onClick={playNext}>
          <FiSkipForward size={30} />
        </button>

        <VolumeControl natureRef={natureRef} musicRef={musicRef} />
      </div>
    </div>
  );
}

export default PlayerBar;