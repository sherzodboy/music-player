import React from "react";
//import fontAwsome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  setCurrentSong,
  setSongs,
  songs,
}) => {
  //State
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  //Handlers
  const playSondHandler = () => {
    if (!isPlaying) {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    }
  };
  const timeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime, duration });
  };
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };
  const autoPlayHandler = () => {
    if (isPlaying) {
      audioRef.current.play();
    }
  };
  const skipTrackHandler = (direction) => {
    const currentIndex = songs.findIndex(
      (songs) => songs.id === currentSong.id
    );
    if (direction === "skip-forword") {
      setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        setCurrentSong(songs[songs.length - 1]);
        return;
      }
      setCurrentSong(songs[(currentIndex - 1) % songs.length]);
    }
  };
  useEffect(() => {
    const newSongs = songs.map((song) => {
      if (song.id === currentSong.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong]);

  const songEndHandler = async () => {
    const currentIndex = songs.findIndex(
      (songs) => songs.id === currentSong.id
    );
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) {
      setTimeout(() => {
        audioRef.current.play();
      }, 100);
    }
  };
  //get time
  const getTime = (t) => {
    return Math.floor(t / 60) + ":" + ("0" + Math.floor(t % 60)).slice(-2);
  };
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          type="range"
          min={0}
          max={songInfo.duration || 0}
          onChange={dragHandler}
          value={songInfo.currentTime}
        />
        <p>{getTime(songInfo.duration || 0)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          icon={faAngleLeft}
          size="2x"
        />

        <FontAwesomeIcon
          icon={isPlaying ? faPause : faPlay}
          onClick={playSondHandler}
          size="2x"
        />

        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forword")}
          icon={faAngleRight}
          size="2x"
        />
      </div>
      <audio
        src={currentSong.audio}
        ref={audioRef}
        onTimeUpdate={timeUpdateHandler}
        onLoadedData={autoPlayHandler}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
};

export default Player;
