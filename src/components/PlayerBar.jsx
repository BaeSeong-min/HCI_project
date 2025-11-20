import { useState } from "react";
import { FiPlay, FiPause, FiSkipBack, FiSkipForward } from "react-icons/fi";
import "../PlayerBar.css"

function PlayerBar({ natureRef, musicRef }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePlayClick = () => {
    if (!musicRef.current?.src) return;

    if (isPlaying) {
      musicRef.current.pause();
      if(natureRef)
        natureRef.current.pause();
      setIsPlaying(false);
    } else {
      musicRef.current.play();
      if (natureRef)
        natureRef.current.play();
      setIsPlaying(true);
    }
  };

  // 음악 진행바 업데이트 함수
  const updateProgress = () => {
    const current = musicRef.current.currentTime;
    const total = musicRef.current.duration;

    if (total > 0) {
      setProgress((current / total) * 100);
    }
  }

  // 선택한 특점 시점으로 음악 이동
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
      <audio ref={natureRef} />
      {/* 사용자 음악 오디오 */}
      <audio 
        ref={musicRef} 
        onTimeUpdate={updateProgress}
        onEnded={() => setIsPlaying(false)}
        />

      <div className="progress-container" onClick={handleSeek}>
        <div 
          className="progress-bar" 
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="player-controls">
        <button className="player-btn">
          <FiSkipBack size={30} />
        </button>

        <button className="player-btn" onClick={handlePlayClick}>
          {isPlaying ? (
            <FiPause size={30} />
            ) : (
            <FiPlay size={30} />
            )}
        </button>

        <button className="player-btn">
          <FiSkipForward size={30} />
        </button>
      </div>
    </div>
  );
}

export default PlayerBar;