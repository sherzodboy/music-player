import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const Navbar=({active,setActive})=>{
  return(
    <nav>
      <h1>Waves</h1>
      <button onClick={()=>{setActive(!active ? `active` : ``)}}>
        Musics
        <FontAwesomeIcon icon={faMusic}/>
      </button>
   </nav>
  )
}

export default Navbar;