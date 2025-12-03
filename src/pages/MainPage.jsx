import { useNavigate, useLocation } from "react-router-dom";
import { useRef } from "react";
import PlayerBar from "../components/PlayerBar";

function MainPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const musicRef = useRef(null);

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

      <h1 className="title">My Music Maker</h1>

      <div className="left-menu">
        <button className={`sound-btn ${location.pathname === "/" ? "active" :  ""}`} 
        onClick={() => navigate("/")}>none</button>
        <button className={`sound-btn ${location.pathname === "/RainPage" ? "active" :  ""}`} 
        onClick={() => navigate("/RainPage")}>rain</button>
      </div>

      <PlayerBar 
        natureRef={null} 
        musicRef={musicRef} 
      />
    </div>
  )
}

export default MainPage;