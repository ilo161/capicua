import React from "react"
import './lobby.css';
import bodega from "../../assets/img/La_Bodega.jpg"

const Lobby = (props) => {
  const {players, totalPlayers} = props;
  debugger
    let buttonText;

    const allUsernames = players.map(player => {
      return (
          <p className='lobby-player-p' key={player.username}>{player.username} has joined!</p>
      )
    })

    buttonText = players.length === totalPlayers ? "StartGame" : "Waiting for players";

  return (
    <div className="lobbyOuterContainer">
      <div className="lobbyInnerContainer flex-col-start">
          <h1 className="heading">LOBBY</h1>

          <div className='flex-row-center'>
            <div className="lobbyPlayers flex-col-center">
              {allUsernames}
            </div>
          </div>

          {/* <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/play_game?name=${name}&room=${room}`}> */}
          <button className={'button mt-20'}
            type="submit"
            onClick={props.handleGameStart}
            >{buttonText}
          </button>

          <div className='flex-row-center'>
            <div className="lds-ripple"><div></div><div></div></div>
          </div>
      </div>
      <img src={bodega} alt="bodega" className="bodega-img-splash" ></img>
    </div>
  );
}

export default Lobby;