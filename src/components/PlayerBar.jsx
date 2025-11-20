import { useState } from "react";
import { FiPlay, FiPause, FiSkipBack, FiSkipForward } from "react-icons/fi";
import "../PlayerBar.css"

function PlayerBar({ audioRef }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePlayClick = () => {
    if (!audioRef.current?.src) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // 음악 진행바 업데이트 함수
  const updateProgress = () => {
    const current = audioRef.current.currentTime;
    const total = audioRef.current.duration;

    if (total > 0) {
      setProgress((current / total) * 100);
    }
  }

  // 선택한 특점 시점으로 음악 이동
  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    const total = audioRef.current.duration;
    const newTime = (clickX / width) * total;

    audioRef.current.currentTime = newTime;
  };

  return (
    <div className="player-container">
      <audio 
        ref={audioRef} 
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