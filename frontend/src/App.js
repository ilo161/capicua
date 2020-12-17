
import './stylesheets/App.css';

// import Drawing from "./drawing.jsx"
// import Bone from "./components/bone.jsx"
// import Hueso from "./hueso.jsx"
// import Board from "./components/board"
import Game from "./components/game"
import bodega from "./assets/img/La_Bodega.jpg"
import Chatbox from "./components/chatBox";



function App() {
  

  return (
    <div className="App">
      <header className="App-header">

        {/* <Drawing></Drawing> */}
        {/* { twoPlayers} */}
        {/* <Bone src={domino34} /> */}
        {/* <Bone /> */}
          <Game/>
          <Chatbox/>
        {/* <Board/> */}
        {/* <Hueso/> */}
      
      </header>
      {/* <div className="bodega-img"></div> */}
      <img src={bodega} alt="bodega" className="bodega-img" ></img>
    </div>
  );
}

export default App;
