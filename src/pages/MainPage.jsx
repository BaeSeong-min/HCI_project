import { useNavigate } from "react-router-dom";
import PlayerBar from "../components/PlayerBar";

function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 className="title">My Music Maker</h1>

      <div className="left-menu">
        <button className="sound-btn" onClick={() => navigate("/")}>none</button>
        <button className="sound-btn" onClick={() => navigate("/RainPage")}>rain</button>
        <button className="sound-btn" onClick={() => navigate("/BirdPage")}>bird</button>
      </div>

      <PlayerBar />
    </div>
  )
}

export default MainPage;