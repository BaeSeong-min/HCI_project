import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import PlayerBar from "../components/PlayerBar";

function BirdPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const birdRef = useRef(null);
  const musicRef = useRef(null);

  const [audioFile, setAudioFile] = useState(null);

  useEffect(() => {
    birdRef.current.src = '/bird.mp3';
    birdRef.current.loop = true;
  }, [])
  
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    if (file && file.type.startsWith("audio/")) {
      setAudioFile(file);
      const audioURL = URL.createObjectURL(file);
      musicRef.current.src = audioURL;
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div 
      className="container" 
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {audioFile && <div className="background-gradient"></div>}

      <h1 className="title">My Music Maker</h1>

      <div className="left-menu">
        <button className={`sound-btn ${location.pathname === "/" ? "active" :  ""}`} 
        onClick={() => navigate("/")}>none</button>
        <button className={`sound-btn ${location.pathname === "/RainPage" ? "active" :  ""}`} 
        onClick={() => navigate("/RainPage")}>rain</button>
        <button className={`sound-btn ${location.pathname === "/BirdPage" ? "active" :  ""}`} 
        onClick={() => navigate("/BirdPage")}>bird</button>
      </div>

      <PlayerBar 
        natureRef={birdRef}
        musicRef={musicRef} 
      />
    </div>
  )
}

export default BirdPage;