import React from "react";
import {constructBone} from "./constructBoneB";



class Hand extends React.Component {


    render(){
        // const {board, allDominos, boneValToString, offSetCenter,
        // boneWidth, boneHeight} = this.props;
        const {gameState, hand, socket, allDominos, boneValToString, offSetCenter,
        boneWidth, boneHeight} = this.props;


        // this will need to be changed to the axios player ID. 
        // SOLELY FOR TESTING...
        let renderedHand = [];

        // if (board){
        if (hand){

            renderedHand = gameState.currentPlayer.hand.map((bone,idx) => {

               const singleBoneVal =  boneValToString(bone.boneVal)[0]
               const reactKeyVal = parseInt(singleBoneVal)

               //width of domino plus spacing
               const width = (boneWidth + (boneWidth / 3));

               const pos = (width * idx);

                // constructBone FN -> reactKey, draggable?, x, y, width, height, source, rotation, inArena?, 
                //offSetCenter, boneIdx, updateGameFN

                return constructBone(reactKeyVal, true,
                pos, 0, boneWidth, boneHeight, allDominos[singleBoneVal],
                0, false, 0, 0, offSetCenter, idx, this.props.updateGame, gameState.arena, gameState)

                
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