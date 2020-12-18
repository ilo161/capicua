import React from "react";

import {Group} from 'react-konva';
// import useImage from 'use-image';
import Bone from "./bone"



class Hand extends React.Component {
    // constructor(props){
    //     super(props)



    // }

    render(){
        const {board, allDominos, boneValToString, offSetCenter} = this.props;

        // this will need to be changed to the axios player ID. 
        // SOLELY FOR TESTING...
        let renderedHand = [];

        if (board){

            renderedHand = board.currentPlayer.hand.map((bone,idx) => {
               // ["34"]
               const singleBoneVal =  boneValToString(bone.boneVal)[0]
               const reactKeyVal = parseInt(singleBoneVal)
               const initialX = 0;

               //width of domino plus spacing
               const width = 30 + 10;

                const pos = initialX + (width * idx);

                return <Bone 
                x={pos} 
                offSetCenter={offSetCenter}
                draggable={true}
                key={reactKeyVal}
                src={allDominos[singleBoneVal]}/>    
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