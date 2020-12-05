
import './App.css';
// import Drawing from "./drawing.jsx"
import Bone from "./bone.jsx"
// import Hueso from "./hueso.jsx"




function App() {
  //   let allDominoesStr = []
  //   // console.log(allDominoes)
  
  //   const createDominoStringArray = () => {

  //     let i;
  //     let j;
  //     for (i = 0; i < 7; i++) {
  //       for (j = i; j < 7; j++) {
  //         let temp;
  //         // let str = "domino"
  //         temp += `domnio${i}${j}`
  //         allDominoesStr.push(temp) 

  //       }
  //     }

  // }
  // createDominoStringArray()
  // console.log(allDominoesStr)

  // const allDominoesComp = allDominoesStr.map(domino => {
  //   return <Bone src={domino}/>
  // })

  // console.log(allDominoesComp)

  



  return (
    <div className="App">
      <header className="App-header">

        {/* <Drawing></Drawing> */}
        {/* { twoPlayers} */}
        {/* <Bone src={domino34} /> */}
        <Bone />
        {/* <Hueso/> */}
 
      </header>
    </div>
  );
}

export default App;
