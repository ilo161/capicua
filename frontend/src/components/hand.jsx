import React from "react";
import {Group} from 'react-konva';
import Bone from "./bone"



class Hand extends React.Component {


    render(){
        const {board, allDominos, boneValToString, offSetCenter,
        boneWidth, boneHeight} = this.props;


        // this will need to be changed to the axios player ID. 
        // SOLELY FOR TESTING...
        let renderedHand = [];

        if (board){

            renderedHand = board.currentPlayer.hand.map((bone,idx) => {

               const singleBoneVal =  boneValToString(bone.boneVal)[0]
               const reactKeyVal = parseInt(singleBoneVal)
               const initialX = 0;

               //width of domino plus spacing
               const width = (boneWidth + 10);

                const pos = initialX + (width * idx);

                return <Bone 
                x={pos} 
                width={boneWidth}
                height={boneHeight}
                updateGame={this.props.updateGame}
                boneIdx={idx}
                offSetCenter={offSetCenter}
                draggable={true}
                key={reactKeyVal}
                src={allDominos[singleBoneVal]}
                inArena={false}/>    
            })

        }

         return(
                <>          
                 {renderedHand}
                </>
         )

    }

}
export default Hand;