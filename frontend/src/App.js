import './stylesheets/App.css';
import './stylesheets/reset.css';
import { Switch, Route } from "react-router-dom"
import Game from "./components/game"
// import bodega from "./assets/img/La_Bodega.jpg"
import Splash from './components/splash';
import Chat from './components/chat/chat'
import GameView from './components/gameView';
 




function App() {
  

  return (
    <div className="App">
      <header className="App-header">

       
          

      </header>
      
        <Switch>
          <Route exact path="/" component={Splash}/>
          <Route path="/play_game" component={GameView}/>
        </Switch>
      
      {/* <img src={bodega} alt="bodega" className="bodega-img" ></img> */}
    </div>
  );
}

export default App