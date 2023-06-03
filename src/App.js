import React, { useState, useRef } from "react";
//import styles
import "./styles/app.scss";
//import Componants
import Song from "./componants/Song";
import Player from "./componants/Player";
import Library from "./componants/Library";
import Navbar from "./componants/Navbar";
//importing utill
import util from "./util";

function App() {
  //run Normal js
  const [songs, setSongs] = useState(util);
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [active, setActive] = useState(false);
  //Ref
  const audioRef = useRef(null);
  return (
    <div className={`App ${active ? "library-active" : ""}`}>
      <Navbar active={active} setActive={setActive} />
      <Song currentSong={currentSong} />
      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
      />
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
        isPlaying={isPlaying}
        audioRef={audioRef}
        active={active}
      />
    </div>
  );
}

export default App;
