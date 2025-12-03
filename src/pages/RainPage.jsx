import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import PlayerBar from "../components/PlayerBar";

function RainPage() {
  const navigate = useNavigate();
  const location = useLocation();
    
  const rainRef = useRef(null);
  const musicRef = useRef(null);

  const [showVideo, setShowVideo] = useState(true);

  useEffect(() => {
    rainRef.current.src = '/rain.mp3';
    rainRef.current.loop = true;
  }, [])

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    if (file && file.type.startsWith("audio/")) {
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
      <button
       className="toggle-video-btn"
       onClick={() => setShowVideo(prev => !prev)}>
        {showVideo ? "🌨️" : "🌧️"}  
      </button>
      
      {showVideo && (
        <video
          className="bg-video"
          src="/rain.mp4"
          autoPlay
          loop
          muted
          playsInline
        /> 
      )}

      <h1 className="title">My Music Maker</h1>

      <div className="left-menu">
        <button className={`sound-btn ${location.pathname === "/" ? "active" :  ""}`} 
        onClick={() => navigate("/")}>none</button>
        <button className={`sound-btn ${location.pathname === "/RainPage" ? "active" :  ""}`} 
        onClick={() => navigate("/RainPage")}>rain</button>
      </div>

      <PlayerBar 
        natureRef={rainRef} 
        musicRef={musicRef} 
      />
    </div>
  )
}

export default RainPage;