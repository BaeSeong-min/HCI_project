import { useNavigate } from "react-router-dom";

function BirdPage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 className="title">My Music Maker Bird</h1>

      <div className="left-menu">
        <button className="sound-btn" onClick={() => navigate("/")}>none</button>
        <button className="sound-btn" onClick={() => navigate("/RainPage")}>rain</button>
        <button className="sound-btn" onClick={() => navigate("/BirdPage")}>bird</button>
      </div>
    </div>
  );
}

export default BirdPage;