import React from "react";
import { Stage, Layer, Group} from 'react-konva';
import Bone from "./bone"
import Hand from "./hand"

import { allDominos } from "./allDominos"


class Board extends React.Component {
    constructor(props){
        super(props)


    }

    componentDidMount(){
        // this.getNums()
    }

    attachImages(){
        // const
    }

    

    render(){
        const boardDimen = 600;

        const {board} = this.props;
            // const bone1 =  <Bone src={allDominos["01"]} x={200} y={100}/>
            // const allDominosArr = Object.values(allDominos);

            // we need the keys of the master obj
        const allDominosArr = Object.keys(allDominos);

        const boneValToString = (boneVal) => {
            let firstNumStr = boneVal[0].toString();
            let secondNumStr = boneVal[1].toString();
            let boneValStrA = firstNumStr + secondNumStr;
            let boneValStrB = secondNumStr + firstNumStr;

            // The Idea here is the Top num is always on the left even when
            // rotated -90 Degrees.
            // ~
            // If the bone has been rotated then it is boneValStrB and we
            // can add rotational Logic to the front End.
            return [boneValStrA, boneValStrB]
        }
            
            
        const arena = board.arena.map(bone => {

            let boneStrArr = boneValToString(bone.boneVal);

            const singleBoneVal =  boneStrArr[0]
            const reactKeyVal = parseInt(singleBoneVal)
        

            if(bone.isDouble()){

                return <Bone key={reactKeyVal}
                draggable={false}
                src={allDominos[boneStrArr[0]]}
                rotation={0} />
            }
            else if(allDominosArr.includes(boneStrArr[0])){
                //rotate once -90 degrees
                return <Bone key={reactKeyVal} src={allDominos[boneStrArr[0]]} />
            } else {
                //boneVal has been reversed. Rotate 90 Degrees
                return <Bone key={reactKeyVal} src={allDominos[boneStrArr[1]]} />
            }

        })
            
            // [src,src,src,src,src,src,src]
        const currHandLength = board.currentPlayer.hand.length
        const offSetCenter = ((currHandLength / 2) * 40)  // mult by 40

        const startBoxforHand= ((boardDimen/2) - offSetCenter)

            
           


            // the arena is simple to show the current pieces in play
        return (
            <div className="board-game-container">
            <Stage width={boardDimen} height={boardDimen}>
                <Layer>
                    <Group x={285} y={270}>
                        {arena}
                    </Group>
                    <Group x={startBoxforHand} y={540}>

                        <Hand offSetCenter={offSetCenter} board={board} updateGame={this.props.updateGame} allDominos={allDominos}  boneValToString={boneValToString}  />
                    </Group>
                </Layer>
            </Stage>
          </div>
        );
    }
}

 //         // <img src={process.env.PUBLIC_URL + 'images/profile.svg'} />
            //     // return <Bone src={domino66}/>
            //     // return <Bone key={`${bone.boneVal[0]}${bone.boneVal[1]}`} src={process.env.PUBLIC_URL +'images/dominos_pieces_vector_svg/dominos_bone_6:6.svg'}/>
            //     // return <Bone key={`${bone.boneVal[0]}${bone.boneVal[1]}`} src={"%PUBLIC_URL%/images/dominos_pieces_vector_svg/dominos_bone_6:6.svg"}/>
            // })






// const dominoPathA = "/Users/Phidias/Documents/aaobReact/MERN/dominos_pieces_vector-svg"
// const dominoPathB = "../dominos_pieces_vector-svg"


// let allFileNames = []
// let allDominos = []

// fs.readdir(dominoPathA, (err, files) => {
//   if (err) {
//     console.error("Could not list the directory.", err);
//     process.exit(1);
//   }
  
//   files.forEach(file => {
//     allFileNames.push(file.toString())
//     let str = file.split(":")
//     let top = parseInt(str[0][str[0].length-1])
//     let bottom = parseInt(str[1][0])
//     let dValue = [top,bottom]
//     console.log(dValue)
    
//     // console.log(str.split())
//     // allDominos.push(str)
//     // console.log(allDominos)




//     // arr = [3,1]
//     // allDominos.forEach(domino => {
//     // <Bone className="domino-size" value={dValue} dValue={domino} src={dominoFile} draggable="true" x={190}  />
//     // })
//   })


// // TEstbone.props.dValue ==> array [3,1]
// //   console.log(newFileNames)
// })

export default Board;