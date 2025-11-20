import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import PlayerBar from "../components/PlayerBar";

function BirdPage() {
  const navigate = useNavigate();

  const audioRef = useRef(null);
  const [audioFile, setAudioFile] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    if (file && file.type.startsWith("audio/")) {
      setAudioFile(file);
      const audioURL = URL.createObjectURL(file);
      audioRef.current.src = audioURL;
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div 
      className="container" 
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <h1 className="title">My Music Maker Bird</h1>

      <div className="left-menu">
        <button className="sound-btn" onClick={() => navigate("/")}>none</button>
        <button className="sound-btn" onClick={() => navigate("/RainPage")}>rain</button>
        <button className="sound-btn" onClick={() => navigate("/BirdPage")}>bird</button>
      </div>

      <PlayerBar audioRef={audioRef} audioFile={audioFile} />
    </div>
  )

}

export default BirdPage;