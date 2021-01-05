import React from "react";
import Konva from "konva"
import { Stage, Layer, Group} from 'react-konva';
import Bone from "./bone"
import Hand from "./hand"
import Arena from "./arena"
import OtherHands from "./otherHands"

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
        const boneIsRevYPos = (boneWidth / 2);
        const boneNotRevYPos = ((boneWidth / 2) * 3);

        const {board} = this.props;

        const capDom = [<Bone key={"cd"}
                    draggable={true}
                    x={0}
                    width={boneWidth}
                    height={boneHeight}
                    src={allDominos["cd"]}
                    rotation={0}
                    inArena={true} />]

        

        // these 3 lines are required to center the arena in the middle of the board
        // for Konva Group
        const currArenaLength = board.arena.length
        const offSetCenterArena = ((currArenaLength / 2) * boneWidth)  // mult by 40
        const startBoxforArena = ((boardDimen / 2) - offSetCenterArena)

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

        

            
        // These will determine the length of the playerID owner's hand and render them
        // centered in the right place. We use startBoxforHand to pick a 
        // startX for the rendering of <Hand></Hand>
        const currHandLength = board.currentPlayer.hand.length
        // mult by 40 because width of bone is 30 plus 10 more pixels of space
        const offSetCenter = ((currHandLength / 2) * boneWidth + 10)  

        const startBoxforHand = ((boardDimen / 2) - offSetCenter)

            
           
            // the arena is simply to show the current pieces in play
        return (
            <div className="board-game-container">
            <Stage width={boardDimen} height={boardDimen}>
                <Layer>
                    <Group x={startBoxforArena} y={(boardDimen / 2) - boneHeight}>
                        <Arena board={board} boardDimen={boardDimen}
                         allDominos={allDominos} boneValToString={boneValToString}
                         boneWidth={boneWidth} boneHeight={boneHeight}
                         boneIsRevYPos={boneIsRevYPos}
                         boneNotRevYPos={boneNotRevYPos}/>
                    </Group>
                    <Group x={startBoxforArena} y={(boardDimen / 2) + 60}>
                        {capDom}
                    </Group>
                    <OtherHands board={board} boardDimen={boardDimen} allDominos={allDominos}
                    boneWidth={boneWidth} boneHeight={boneHeight} boneValToString={boneValToString}/>
                    <Group x={startBoxforHand} y={boardDimen - boneHeight}>

                        <Hand offSetCenter={offSetCenter} board={board}
                        boneWidth={boneWidth} boneHeight={boneHeight} 
                        updateGame={this.props.updateGame} allDominos={allDominos}
                        boneValToString={boneValToString}  />
                    </Group>
                </Layer>
            </Stage>
          </div>
        );
    }
}






export default Board;