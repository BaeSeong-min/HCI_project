import { useState } from "react";
import { FiPlay, FiPause, FiSkipBack, FiSkipForward } from "react-icons/fi";

function PlayerBar() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(!isPlaying);
  };

  const progress = 40;

  return (
    <div className="player-container">
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
  )
}

export default PlayerBar;