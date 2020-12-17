
import './stylesheets/App.css';


import Game from "./components/game"
import bodega from "./assets/img/La_Bodega.jpg"
import Chatbox from "./components/chatBox";



function App() {
  

  return (
    <div className="App">
      <header className="App-header">

          <Game/>

          <Chatbox/>
        
      

      </header>
      {/* <div className="bodega-img"></div> */}
      <img src={bodega} alt="bodega" className="bodega-img" ></img>
    </div>
  );
}

export default App;
