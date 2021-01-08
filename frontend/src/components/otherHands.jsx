import React from "react";
import {Group} from 'react-konva';
import Bone from "./bone"



class OtherHands extends React.Component {


    render() {
        const {board, boardDimen, boneWidth,
            boneHeight, boneValToString, allDominos} = this.props;

        const renderHandFn = (player, offSetCenter, playerIdx, currPlayerIdx) => {
            // debugger
            
         const renderedHand = player.hand.map((bone,idx) => {

            const singleBoneVal =  boneValToString(bone.boneVal)[0]
            const reactKeyVal = parseInt(singleBoneVal + playerIdx)
            const initialX = 0;
            const initialY = 0;

            //width of domino plus spacing
            const width = boneWidth + 10;

            let pos = initialX + (width * idx);

            // debugger
            
            // if ((((currPlayerIdx % board.players.length) + 1) % board.players.length)  === playerIdx % board.players.length){
            if (((currPlayerIdx + 1) % board.players.length)  === playerIdx % board.players.length){

                pos = initialY + (width * idx);

                // width and height are reversed because the bone is flat
                return <Bone 
                x={0}
                y={pos} 
                width={boneHeight}
                height={boneWidth}
                boneIdx={idx}
                offSetCenter={offSetCenter}
                draggable={true}
                key={reactKeyVal}
                src={allDominos["cdl"]}
                inArena={true}/> 
            } 
            else if(((currPlayerIdx + 2) % board.players.length) === playerIdx % board.players.length){
            
                return <Bone 
                x={pos}
                y={0} 
                width={boneWidth}
                height={boneHeight}
                boneIdx={idx}
                offSetCenter={offSetCenter}
                draggable={true}
                key={reactKeyVal}
                src={allDominos["cdt"]}
                inArena={true}/> 
            }
            else if(((currPlayerIdx + 3) % board.players.length) === playerIdx % board.players.length){
                pos = initialY + (width * idx);

                return <Bone 
                x={0}
                y={pos} 
                width={boneHeight}
                height={boneWidth}
                boneIdx={idx}
                offSetCenter={offSetCenter}
                draggable={true}
                key={reactKeyVal}
                src={allDominos["cdr"]}
                inArena={true}/> 
            }
               
        })

            return renderedHand
        }

        const currPlayerIdx = board.players.indexOf(board.currentPlayer);

        const blankDominoToCoveredHands = (numPlayers, currPlayerIdx) => {
            let player2Idx = null;
            let player3Idx = null;
            switch(numPlayers){
                case 2:
                    player2Idx = ((currPlayerIdx + 1) % board.players.length);
                    return {[player2Idx]: "cdt",
                            [currPlayerIdx]: "cdt"}
                case 3:
                     player2Idx = ((currPlayerIdx + 1) % board.players.length);
                     player3Idx = ((currPlayerIdx + 2) % board.players.length);
                    return {[player2Idx]: "cdl",
                            [player3Idx]: "cdt",
                            [currPlayerIdx]: "cdt"}
                case 4:

                default:
                    return
            }
        }
        
        // allPlayers[someIdx]
        //The important thing here is that the index to access allPlayers Obj will
        // always match the index of the next player (p2) and beyond regardless of
        // where the currentPlayer index is...
        const allPlayersDataObj = (numPlayers, currPlayerIdx) => {
            let allPlayers = {};

            /* all the metadata necessary to populate the hidden hands
               - offSetCenter is the midpoint of board minus the total width of all bones
                   to center the hand on the board regardless of length
                - startBoxforPlayerHand is the start x or start y of this div on
                  the board. relative to board (x,y) @ (0,0)
                - renderedHandPlayer is a collection of ImageNodes of the count 
                  of all bones in that players hand.
            */
            for(let i = currPlayerIdx; i < (currPlayerIdx + numPlayers); i++){
                allPlayers[i % numPlayers] = {
                    playerIdx: null,
                    player: null,
                    playerHand: null,
                    offSetCenter: null,
                    startBoxforPlayerHand: null,
                    renderedHandPlayer: null
                         
                }
            }

            // this for loop builds out metadata per player to be accessed later 
            //by the function gnerateHands
            for(let j = currPlayerIdx; j < (currPlayerIdx + numPlayers); j++){

                allPlayers[j % numPlayers].playerIdx = (j % numPlayers);
                allPlayers[j % numPlayers].player = board.players[allPlayers[j % numPlayers].playerIdx];
                allPlayers[j % numPlayers].playerHand = allPlayers[j % numPlayers].player.hand;
                allPlayers[j % numPlayers].offSetCenter = ((allPlayers[j % numPlayers].playerHand.length / 2) * 40);
                allPlayers[j % numPlayers].startBoxforPlayerHand = ((boardDimen / 2) - allPlayers[j % numPlayers].offSetCenter);
                allPlayers[j % numPlayers].renderedHandPlayer = renderHandFn(allPlayers[j % numPlayers].player,
                         allPlayers[j % numPlayers].offSetCenter,
                         allPlayers[j % numPlayers].playerIdx, currPlayerIdx)
                
                }

            return allPlayers;

        }

        const allPlayers = allPlayersDataObj(board.players.length, currPlayerIdx)

        const generateHands = (numPlayers, websocketsId) => {
                // debugger
            
            // const player2Idx = ((currPlayerIdx + 1) % board.players.length);
            // const player2 = board.players[player2Idx];
            // const player2Hand = player2.hand;
            // const offSetCenterP2 = ((player2Hand.length / 2) * 40);
            // const startBoxforPlayer2Hand = ((boardDimen / 2) - offSetCenter);  

            // const renderedHandplayer2 = renderHandFn(player2, offSetCenter, player2Idx, "cdt")
            const player2Idx = ((currPlayerIdx + 1) % board.players.length);
            const player3Idx = ((currPlayerIdx + 2) % board.players.length);
            const player4Idx = ((currPlayerIdx + 3) % board.players.length);
            switch(numPlayers){
                case 2:
        
                    return <Group x={0} y={allPlayers[player2Idx].startBoxforPlayerHand}> 
                                {allPlayers[player2Idx].renderedHandPlayer}

                            </Group>
                case 3:
                    
                     return <Group x={0} y={0}>
                                {/* player on left of board below */}
                                <Group x={0} y={allPlayers[player2Idx].startBoxforPlayerHand}> 
                                    {allPlayers[player2Idx].renderedHandPlayer}
                                </Group>
                                {/* player on top of board below */}
                                <Group x={allPlayers[player3Idx].startBoxforPlayerHand} y={0}>
                                    {allPlayers[player3Idx].renderedHandPlayer}
                                </Group>
                            </Group>
                case 4:
                
                    return <Group x={0} y={0}>
                                {/* player on left of board below */}
                                <Group x={0} y={allPlayers[player2Idx].startBoxforPlayerHand}> 
                                    {allPlayers[player2Idx].renderedHandPlayer}
                                </Group>
                                {/* player on top of board below */}
                                <Group x={allPlayers[player3Idx].startBoxforPlayerHand} y={0}>
                                    {allPlayers[player3Idx].renderedHandPlayer}
                                </Group>
                                {/* player on right of board below */}
                                <Group x={boardDimen - boneHeight} y={allPlayers[player4Idx].startBoxforPlayerHand}>
                                    {allPlayers[player4Idx].renderedHandPlayer}
                                </Group>
                           </Group>

                default:
                    return <Group></Group>
            }

        }
        let handsToGenerate = null;
        if(board){
            handsToGenerate = generateHands(board.players.length);

        }

        return (
            <>
            {handsToGenerate}
            </>
        )
    }
}
 export default OtherHands;
