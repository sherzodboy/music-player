import React from "react";
//import all songs
import LibrarySong from "./LibrarySongs";
const Library =({songs,setCurrentSong,setSongs,isPlaying,audioRef,active})=>{
  return(
    <div className={`library ${active ? `active` : ``}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song)=>
         <LibrarySong 
         songs={songs}
         song={song}
         setCurrentSong={setCurrentSong}
         setSongs={setSongs}
         isPlaying={isPlaying}
         id={song.id}
         audioRef={audioRef}
         key={song.id}
         />)}
      </div>
    </div>
  )
}
export default Library;