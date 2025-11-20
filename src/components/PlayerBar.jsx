import { useState } from "react";
import { FiPlay, FiPause, FiSkipBack, FiSkipForward } from "react-icons/fi";

function PlayerBar({ audioRef }) {
  const [isPlaying, setIsPlaying] = useState(false);

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

  const progress = 40;

  return (
    <div className="player-container">
      <audio ref={audioRef} />

      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}/>
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