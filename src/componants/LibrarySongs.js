import React from "react";

const LibrarySong=({song,setCurrentSong,isPlaying,id,songs,setSongs,audioRef})=>{
  //Handlers
  const songSelectorHandler=()=>{
    setCurrentSong(song);
    //to update the active value
    const newSongs= songs.map((song)=>{
      if(song.id === id){
        return{
          ...song,
          active:true,
        }
      }else{
        return{
          ...song,
          active:false
        }
      }
    })
    setSongs(newSongs)
    if(isPlaying){
      const playP=audioRef.current.play();
      if(playP !== undefined){
        playP.then((audio)=>{
          audioRef.current.play();
        })
      }
    }
  }
  return(
    <div
     className={`libary-song ${song.active ? "selected" :""}`} 
     onClick={songSelectorHandler}>
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  )
}

export default LibrarySong;
