import React from "react";
import Konva from "konva"
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
        const boneWidth = 30;
        const boneHeight = 60;
        const boneIsRevYPos = (boneWidth / 2)
        const boneNotRevYPos = ((boneWidth / 2) * 3)

        const {board} = this.props;
        const capDom = [<Bone key={"cd"}
                    draggable={true}
                    x={0}
                    src={allDominos["cd"]}
                    rotation={0}
                    inArena={true} />]

            // we need the keys of all possible dominos to be rendered
            // allDominosArr is then keyed into with boneValToString to retrieve
            // The appropriate Domino Image
        const allDominosArr = Object.keys(allDominos);

        // these 3 lines are required to center the arena in the middle of the board
        // for Konva Group
        const currArenaLength = board.arena.length
        const offSetCenterArena = ((currArenaLength / 2) * 30)  // mult by 40
        const startBoxforArena = ((boardDimen/2) - offSetCenterArena)

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

        //this function returns a bone with the x position always at zero
        //unless the bone is Reversed. then X is +60 because Konva
        //offsets +90 degree rotation in the negative x-axis.
        const isFirstBone = (isDouble, isReversed, boneStrArr, reactKeyVal) => {
            if (isDouble){
                return <Bone key={reactKeyVal}
                draggable={true}
                x={0}
                src={allDominos[boneStrArr[0]]}
                rotation={0}
                inArena={true} />
            } else if (isReversed){
                //boneVal has been reversed. Rotate 90 Degrees
                // prop x is shifted 60 pixels to the right because rotation
                // auto-shifts it 60 pixels to the left??? (due to Konva)
                return <Bone key={reactKeyVal} 
                    draggable={true}
                    x={boneHeight}
                    y={boneIsRevYPos}
                    src={allDominos[boneStrArr[1]]} 
                    rotation={90}
                    inArena={true} /> 
            } else {
                //boneVal is NOT reversed. Rotate -90 Degrees
                 return <Bone key={reactKeyVal}
                    draggable={true}
                    x={0}
                    y={boneNotRevYPos}
                    src={allDominos[boneStrArr[0]]}
                    rotation={-90}
                    inArena={true} />
            }
        }

        const xLengthAllBones = (boneDimenArr, currIdx) => {
            let totalXPos = 0;

            for(let i = 0; i < currIdx; i++){
                totalXPos += boneDimenArr[i].x;
            }

            return totalXPos;
        }
        
        const boneDimenArr = [];

        const arena = board.arena.map((bone, idx) => {
            const boneStrArr = boneValToString(bone.boneVal);

            const singleBoneVal =  boneStrArr[0];
            const reactKeyVal = parseInt(singleBoneVal);

            const boneXnY = (
                bone.isDouble() ? {
                    isDouble: true,
                    isReversed: false,
                    boneStrArr: boneStrArr,
                    reactKeyVal: reactKeyVal,
                    x: boneWidth,
                    y: 0} :
                (bone.isReversed ? {
                    isDouble: false,
                    isReversed: true,
                    boneStrArr: boneStrArr,
                    reactKeyVal: reactKeyVal,
                    x: boneHeight,
                    y: boneIsRevYPos } : 
                    {
                    isDouble: false,
                    isReversed: false,
                    boneStrArr: boneStrArr,
                    reactKeyVal: reactKeyVal, 
                    x: boneHeight, 
                    y: boneNotRevYPos
                    })
                );

            boneDimenArr.push(boneXnY);

        
            if (idx === 0){
                debugger
                return isFirstBone(
                     boneDimenArr[0].isDouble,
                     boneDimenArr[0].isReversed,
                     boneDimenArr[0].boneStrArr,
                     boneDimenArr[0].reactKeyVal)
            } else {

                if (bone.isDouble()){
                    const totalXPos = xLengthAllBones(boneDimenArr, idx);
                    console.log(`totalXPOS: ${totalXPos}`)

                    debugger
                    return <Bone key={reactKeyVal}
                    draggable={true}
                    x={totalXPos}
                    src={allDominos[boneStrArr[0]]}
                    rotation={0}
                    inArena={true} />
                }
                else if(allDominosArr.includes(boneStrArr[0])){
                    // bone is NOT reversed
                    //rotate once -90 degrees
                    const totalXPos = xLengthAllBones(boneDimenArr, idx);
                    debugger
                    return <Bone key={reactKeyVal} 
                    draggable={true}
                    x={totalXPos}
                    y={boneNotRevYPos}
                    src={allDominos[boneStrArr[0]]}
                    rotation={-90}
                    inArena={true} />
                } else {
                    //boneVal has been reversed. Rotate 90 Degrees
                    const totalXPos = xLengthAllBones(boneDimenArr, idx) + 60;
                    
                    debugger
                    return <Bone key={reactKeyVal}
                    draggable={true}
                    x={totalXPos}
                    y={boneIsRevYPos}
                    src={allDominos[boneStrArr[1]]}
                    rotation={90}
                    inArena={true} />
                }
            }

        })

            
        // These will determine the length of the players hand and render them
        // centered in the right place. We use startBoxforHand to pick a 
        // startX for the rendering of <Hand></Hand>
        const currHandLength = board.currentPlayer.hand.length
        const offSetCenter = ((currHandLength / 2) * 40)  // mult by 40

        const startBoxforHand = ((boardDimen/2) - offSetCenter)

            
           


            // the arena is simply to show the current pieces in play
        return (
            <div className="board-game-container">
            <Stage width={boardDimen} height={boardDimen}>
                <Layer>
                    <Group x={startBoxforArena} y={270}>
                         {arena}
                    </Group>
                    <Group x={startBoxforArena} y={340}>
                        {capDom}
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






export default Board;