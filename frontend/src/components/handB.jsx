import React from "react";
import {constructBone} from "./constructBoneB";



class Hand extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            gameState: undefined
        }

        // this.renderedHand = [];
        // this.thisPlayerIdx;
    }

    componentDidMount(){
        this.setState({gameState: this.props.gameState})
        // debugger
    }

    componentDidUpdate(prevProps, prevState){

        if(prevState.gameState !== undefined){
            // debugger
            if(prevState.gameState.players != this.props.gameState.players){
                debugger
                this.setState({gameState: this.props.gameState })
            }
        }
    }



    findPlayerOnThisSocket = () => {
            let num;
            // gameState.players.forEach((player, idx) => {
            for(let i = 0; i < this.state.gameState.players.length; i++){
                // debugger
                if (this.state.gameState.players[i].id === this.props.socket.id){
                    // debugger
                    num = i;
                }
            }
            return num;
            
    }

    render(){
        // const {board, allDominos, boneValToString, offSetCenter,
        // boneWidth, boneHeight} = this.props;
        const {gameState, hand, socket, allDominos, boneValToString, offSetCenter,
        boneWidth, boneHeight} = this.props;

        let renderedHand;
        let thisPlayerIdx;


        // this will need to be changed to the axios player ID. 
        // SOLELY FOR TESTING...



        // if (board){
        if (this.state.gameState){
            thisPlayerIdx = this.findPlayerOnThisSocket()
            // debugger
            // renderedHand = gameState.currentPlayer.hand.map((bone,idx) => {
            renderedHand = gameState.players[thisPlayerIdx].hand.map((bone,idx) => {
                // debugger

               const singleBoneVal =  boneValToString(bone.boneVal)[0]
               const reactKeyVal = parseInt(singleBoneVal)

               //width of domino plus spacing
               const width = (boneWidth + (boneWidth / 3));

               const pos = (width * idx);

                // constructBone FN -> reactKey, draggable?, x, y, width, height, source, rotation, inArena?, 
                //offSetCenter, boneIdx, updateGameFN

                if(gameState.currentPlayer.id === socket.id){
                    // debugger
                    return constructBone(reactKeyVal, true,
                    pos, 0, boneWidth, boneHeight, allDominos[singleBoneVal],
                    0, false, 0, 0, offSetCenter, idx, this.props.updateGame, gameState.arena, gameState)
                } else {
                    // debugger
                    return constructBone(reactKeyVal, false,
                    pos, 0, boneWidth, boneHeight, allDominos[singleBoneVal],
                    0, false, 0, 0, offSetCenter, idx, this.props.updateGame, gameState.arena, gameState)
                }
                

                
            })

        }
        debugger
         return(
                <>          
                 {renderedHand}
                </>
         )

    }

}
export default Hand;