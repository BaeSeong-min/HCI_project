import { useState } from "react";
import { FiVolume2 } from "react-icons/fi";

function VolumeControl({ natureRef, musicRef }) {
  const [show, setShow] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const [natureVolume, setNatureVolume] = useState(0.5);
  const [musicVolume, setMusicVolume] = useState(1.0);

  const changeNatureVolume = (e) => {
    const value = parseFloat(e.target.value);
    setNatureVolume(value);
    if (natureRef) natureRef.current.volume = value;
  };

  const changeMusicVolume = (e) => {
    const value = parseFloat(e.target.value);
    setMusicVolume(value);
    musicRef.current.volume = value;
  };

  const toggleVolumePanel = () => {
    if (!show) {
      setShow(true);
    } else {
      setIsClosing(true);

      setTimeout(() => {
        setShow(false);
        setIsClosing(false);
      }, 250);
    }
  }

  return (
    <div className="volume-wrapper">
      <button className="player-btn" onClick={toggleVolumePanel}>
        <FiVolume2 size={30} />
      </button>

      {show && (
        <div className={`volume-panel ${isClosing ? "closing" : ""}`}>
          {/* 자연음이 있는 페이지에서만 표시 */}
          {natureRef && (
            <div className="volume-line">
              <span>Background</span>
              <input 
                type="range" 
                min="0" max="1" step="0.01"
                value={natureVolume}
                onChange={changeNatureVolume}
              />
            </div>
          )}

          <div className="volume-line">
            <span>Music</span>
            <input 
              type="range" 
              min="0" max="1" step="0.01"
              value={musicVolume}
              onChange={changeMusicVolume}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default VolumeControl;
