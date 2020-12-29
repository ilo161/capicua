
import './stylesheets/App.css';
import './stylesheets/reset.css';
import { Switch, Route } from "react-router-dom"
import Game from "./components/game"
import bodega from "./assets/img/La_Bodega.jpg"
import Splash from './components/splash';
 




function App() {
  

  return (
    <div className="App">
      <header className="App-header">

       
          

      </header>
      
        <Switch>
          <Route path="/play_game" component={Game}/>
          <Route exact path="/" component={Splash}/>
        </Switch>
      
      <img src={bodega} alt="bodega" className="bodega-img" ></img>
    </div>
  );
}

export default App;
