import './lobby.css';
import bodega from "../../assets/img/La_Bodega.jpg"

const Lobby = () => {

  return (
    <div className="lobbyOuterContainer">
      <div className="lobbyInnerContainer">
        <h1 className="heading">LOBBY</h1>
        <div className="lobbyPlayers">
          - players will appear here
        </div>
        {/* <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/play_game?name=${name}&room=${room}`}> */}
        <button className={'button mt-20'} type="submit">Waiting for players</button>
        <div className="lds-ripple"><div></div><div></div></div>
        {/* </Link> */}
      </div>
      <img src={bodega} alt="bodega" className="bodega-img-splash" ></img>
    </div>
  );
}

export default Lobby;