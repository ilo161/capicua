import React from "react"
import './lobby.css';
import bodega from "../../assets/img/La_Bodega.jpg"

const Lobby = (props) => {
  const {players, totalPlayers} = props;
  // debugger
    let buttonText;
    const allUsernames = players.map(player => {
      return (
          <p key={player.username}>{player.username} has joined!</p>
      )
    })

    buttonText = players.length === totalPlayers ? "StartGame" : "Waiting for players";

  return (
    <div className="lobbyOuterContainer">
      <div className="lobbyInnerContainer">
        <h1 className="heading">LOBBY</h1>
        <div className="lobbyPlayers">
        {allUsernames}
        </div>
        {/* <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/play_game?name=${name}&room=${room}`}> */}
        <button className={'button mt-20'}
         type="submit"
         onClick={props.handleGameStart}
         >{buttonText}</button>
        <div className="lds-ripple"><div></div><div></div></div>
        {/* </Link> */}
      </div>
      <img src={bodega} alt="bodega" className="bodega-img-splash" ></img>
    </div>
  );
}

export default Lobby;