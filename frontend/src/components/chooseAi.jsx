import React from "react"
import './chat/lobby.css';
import bodega from "../assets/img/La_Bodega.jpg"

const ChooseAi = (props) => {
//   const {players, totalPlayers} = props;
//   // debugger
    let buttonText;
//     const allUsernames = players.map(player => {
//       return (
//           <p key={player.username}>{player.username} has joined!</p>
//       )
//     })

//     buttonText = players.length === totalPlayers ? "StartGame" : "Waiting for players";

  return (
    <div className="lobbyOuterContainer">
      <div className="lobbyInnerContainer">
        <h1 className="heading">{props.username} vs how many A.I?</h1>
        <div className="lobbyPlayers flex-col-center">
        {/* {allUsernames} */}
        <button className={'button-circle'} onClick={() => props.handleSetAiPlayers(1)} type="submit">1</button><p></p>
        <button className={'button-circle'} onClick={() => props.handleSetAiPlayers(2)} type="submit">2</button><p></p>
        <button className={'button-circle'} onClick={() => props.handleSetAiPlayers(3)} type="submit">3</button><p></p>

        </div>
        {/* <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/play_game?name=${name}&room=${room}`}> */}
        {/* <button className={'button mt-20'}
         type="submit"
         >{buttonText}</button> */}
         {/* //  onClick={props.handleGameStart} */}
        <div className="lds-ripple"><div></div><div></div></div>
        {/* </Link> */}
      </div>
      <img src={bodega} alt="bodega" className="bodega-img-splash" ></img>
    </div>
  );
}

export default ChooseAi;