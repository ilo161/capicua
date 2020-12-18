
import './stylesheets/App.css';


import Game from "./components/game"
import bodega from "./assets/img/La_Bodega.jpg"
import Chatbox from "./components/chatBox";
// for heroku deployment
const path = require('path');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}



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
