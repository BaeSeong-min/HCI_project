import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import PlayerBar from "../components/PlayerBar";

function RainPage({ playlist, currentSong, addSong, playNext, playPrev, playSpecificSong, currentIndex }) {
  const navigate = useNavigate();
  const location = useLocation();
    
  const rainRef = useRef(null);
  const musicRef = useRef(null);

  // 1. 빗소리 배경음 설정
  useEffect(() => {
    if(rainRef.current) {
      rainRef.current.src = '/rain.mp3';
      rainRef.current.loop = true;
      rainRef.current.play().catch(() => console.log("Background autoplay blocked"));
    }
  }, []);

  // 2. 현재 곡이 바뀌면 플레이어에 로드하고 재생
  useEffect(() => {
    if (currentSong && musicRef.current) {
      const audioURL = URL.createObjectURL(currentSong);
      musicRef.current.src = audioURL;
      musicRef.current.play();
    }
  }, [currentSong]);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("audio/")) {
      addSong(droppedFile);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div className="container" onDrop={handleDrop} onDragOver={handleDragOver}>
      {/* 배경 그라데이션 */}
      {currentSong && <div className="background-gradient"></div>}

      <h1 className="title">My Music Maker</h1>

      {/* 메인 레이아웃 */}
      <div style={{ display: 'flex', width: '100%', height: '60vh', alignItems: 'flex-start', marginTop: '20px' }}>
        
        {/* [왼쪽] 메뉴 버튼들 */}
        <div className="left-menu" style={{ width: '10%', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <button className={`sound-btn ${location.pathname === "/" ? "active" : ""}`} onClick={() => navigate("/")}>none</button>
          <button className={`sound-btn ${location.pathname === "/RainPage" ? "active" : ""}`} onClick={() => navigate("/RainPage")}>rain</button>
          <button className={`sound-btn ${location.pathname === "/BirdPage" ? "active" : ""}`} onClick={() => navigate("/BirdPage")}>bird</button>
        </div>

        <div className="center-area" style={{ flex: 1, textAlign: 'center', padding: '0 20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
           {currentSong && (
             <div style={{ color: '#333' }}>
               <h2 style={{ fontSize: '2rem', marginBottom: '100px' }}></h2>
               <p style={{ fontSize: '1.2rem' }}>{currentSong.name}</p>
             </div>
           )}
        </div>

        {/* [오른쪽] 플레이리스트 목록 */}
        <div className="right-playlist" style={{ width: '20%', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(5px)', padding: '20px', borderRadius: '15px', height: '100%', overflowY: 'auto' }}>
          <h3 style={{ borderBottom: '2px solid #fff', paddingBottom: '10px', color: '#333' }}>Playlist ({playlist.length})</h3>
          <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left' }}>
            {playlist.map((file, index) => (
              <li 
                key={index} 
                onClick={() => playSpecificSong(index)}
                style={{ 
                  padding: '10px', 
                  cursor: 'pointer',
                  borderRadius: '8px',
                  marginBottom: '8px',
                  backgroundColor: index === currentIndex ? 'rgba(255, 255, 255, 0.6)' : 'transparent',
                  fontWeight: index === currentIndex ? 'bold' : 'normal',
                  color: '#333',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {index + 1}. {file.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 하단 플레이어 */}
      <PlayerBar 
        natureRef={rainRef} 
        musicRef={musicRef}
        onMusicEnd={playNext}
        playNext={playNext}
        playPrev={playPrev}
      />
    </div>
  )
}

export default RainPage;