import React from "react";
import Board from "./boardB"
import BoardObject from "../classes/board"
import { set } from "mongoose";
import {allDominos} from "./allDominos"
import Chat from './chat/chat';
import Score from './gameScore.jsx';
import Countdown from "./countdownS";

class GameB extends React.Component {
    constructor(props){
        super(props)
       
        this.state = {
            board: "",
            gameState: undefined
            }
        
        this.socket = this.props.socket
        this.previousPlayersArr = undefined;
        this.updateGame = this.updateGame.bind(this);
        this.restartGame = this.restartGame.bind(this);
        // this.countdownTicker = 10;
        // this.countdown = this.countdown.bind(this)
        // this.hasAiGone = false;
        // this.oldArenaLen = undefined;
        // this.oldTimeIds = [];
    }

    // autoStartNextRound(e, isNewGame = undefined){
    //     setTimeout(()=>{
    //         if (isNewGame){
    //             this.restartGame(e, true)
    //         }else {
    //             this.restartGame()
    //         }
    //     }, 5000);
    // }

    // findCurrentPlayer(username){
    //     let currentPlayer;
    //     this.state.gameState.players.forEach(player => {
    //         if(player.username === username){
    //             currentPlayer = player
    //         }
    //     })

    //     return currentPlayer
    // }

//     shouldComponentUpdate(nextProps) { 
   
//         // if what is coming in is different from what is already there
//         if (nextProps.value !== this.props.value) { 
//             // debugger
//             return true; 
//         } else { 
//             // debugger
//             // this.socket.emit("askForAiPlay", this.state.gameState.currentPlayer.username)
//         return false; 
//         } 

//   } 


    componentDidUpdate(prevProps) {
        // debugger

        if(prevProps.gameState.arena !== this.props.gameState.arena){
            // debugger
            this.setState({gameState: this.props.gameState})
        }
        if(prevProps.gameState.inSession !== this.props.gameState.inSession){
            this.setState({gameState: this.props.gameState})
        }

        



        //old
        // if(this.state.gameState.inSession){
        // if(prevProps.gameState.arena !== this.props.gameState.arena){
        //     console.log("update Arena State")
            
        //     if(prevProps.gameState.inSession === this.props.gameState.inSession){
        //         this.setState({gameState: this.props.gameState}, () => {
        //         console.log(this.state.gameState.inSession)

        //         if(this.state.gameState.inSession){
                 
        //             // this.oldTimeIds.push(setTimeout(()=>{
        //                 this.forceAiAutoPlay();
        //             // },500))
                    
        //         }
        //     })

        //     }
            
            
            


       
        
        
    }

    // forceAiAutoPlay(){
    //     // if(this.state.board.currentPlayer.isAi === true){
    //     // this.oldArenaLen = this.state.board.arena.length;
    //     //             while(this.state.board.arena.length === this.oldArenaLen && this.state.board.inSession){
    //     //                 this.updateGame(...this.state.board.currentPlayer.aiAutoPlay("easy"))
    //     // debugger
    //     if(this.state.gameState.currentPlayer.isAi === true){
    //             // debugger
    //             if(!this.hasAiGone){
        
    //                 this.oldArenaLen = this.state.gameState.arena.length;

        
    //                 // while(this.state.gameState.arena.length === this.oldArenaLen && this.state.gameState.inSession){
    //                 if(this.state.gameState.inSession){
    //                         if(this.state.gameState.arena.length === this.oldArenaLen && this.state.gameState.inSession){
    //                             debugger
    //                             console.log("re-emit")
    //                               this.socket.emit("askForAiPlay", this.state.gameState.currentPlayer.username)
    
    //                     // this.updateGame(...this.state.gameState.currentPlayer.aiAutoPlay("easy"))
    //                     }
    //                 }
                  
    //                 this.hasAiGone = true;
    //             }
    //             // debugger
    //             this.hasAiGone = false;
    //     }
    // }

    componentDidMount(){
        this.setState({gameState: this.props.gameState})    
    }

    componentWillUnmount(){


        // this.oldTimeIds.forEach((id) => {
        //     clearTimeout(id)
        // })
    }

    restartGame(e, isNewGame = undefined) {

        //start a brand new game with everything reset
        if(isNewGame){
            // debugger
            // this.setState({ board: new BoardObject(axiosPlayerObj, 900) })    

            //emit new game Request
            debugger
        } else {
            // debugger
            // continue on to next round.

            // this.previousPlayersArr = this.state.board.players;
            // const board = new BoardObject(axiosPlayerObj, 900)


            // multiplayer Function Here.
            debugger
            this.previousPlayersArr = this.state.gameState.players;
            //emit this data back to server!
            // const board = new BoardObject(axiosPlayerObj, 900)

            //use this multiplayer
            // this.giveBackPointsToPlayers(board);
            // this.setState({ board: board })
        }
       
        
    }

    giveBackPointsToPlayers (board) {
        // this.previousPlayersArr.forEach((oldPlayerObj, idx) => {
        //     board.players[idx].restorePoints(oldPlayerObj.points)
        // })
       
    }

    updateGame(posPlay, center, boneIdx) {
        // debugger 
        this.socket.emit("sentPlayerInput", {posPlay: posPlay,
        center: center, boneIdx: boneIdx, roomName: this.state.gameState.roomName})
        // // here to check state. of playable Bone
        // // ...
        // const currentBone = this.state.board.currentPlayer.hand.splice(boneIdx,1)[0];
        // // debugger
        // const verifyMove = this.state.board.makeMove(posPlay, center, currentBone);

        // if(this.state.board.currentPlayer.isAi === false){
        //     this.setState({ state: this.state });
        // }

        // if(verifyMove){
        //     // for testing REMOVE 
        //     // this.state.board.endGame()
        //     // for testing REMOVE

        //     // const isCurrentGameOver = this.state.board.isCurrentGameOver();
        //     // if (isCurrentGameOver){
        //     //     this.setState({ board: this.state.board });
        //     //     return;
        //     // }

        //     //emit here
        //     this.state.board.resetSkipCounter();

        //     // if (this.state.board.inSession === true){    
        //     if(this.state.gameState.inSession === true){

        //         this.state.board.nextPlayerAssignTurn()

        //         //should the game reach the min for the skip counter. End the Game
        //         // if(this.state.board.lockedGame === true){
        //         //     // debugger
        //         //     const aPlayerHasWonRound = this.state.board.endGame();

        //         //     if (aPlayerHasWonRound){
        //         //         debugger
        //         //     } else {
        //         //         debugger
        //         //         // this.restartGame();
        //         //     }
        //             ////return what? why? to escape the game loop?
        //             // return
        //         // }

        //         this.setState({ board: this.state.board });
        //     } else {
        //         // const aPlayerHasWonRound = this.state.board.endGame();

        //         // if (aPlayerHasWonRound){
        //         //     debugger
        //         // } else {
        //         //     debugger
        //         //     // this.restartGame();
        //         // }
                
        //         this.setState({ board: this.state.board });
        //     }
        // } else {
        //     // debugger
        //     this.state.board.currentPlayer.hand.splice(boneIdx,0, currentBone); 
            
        //     if(this.state.board.currentPlayer.isAi === false){
        //         this.setState({ board: this.state.board });
        //     }


        // }
        

        // console.log(this.state.board.renderArena())
        // console.log("Arena ^..hand below")
        // this.state.board.currentPlayer.revealHand()
        // console.log(this.state.board.currentPlayer.revealHand())
        // debugger
        // console.log(`^^'s points: ${this.state.board.currentPlayer.points}`)
    }

    render(){
        let modal;
        // let button;
        // let endGameButton;
        
        //Modal stuffs
        if (this.state.gameState){
            if(this.state.gameState.winningPlayer){
                debugger
                const {endGame, winningPlayer, lockedGame} = this.state.gameState;
        //     // debugger
        //     //testing. EndGame for For
        //     const endGame = this.state.board.endGame()
        //     {/* using logic from Board logic class */ }
                const text = lockedGame ? 
                `${winningPlayer.username} wins the Round via lockout! ` : 
                endGame ? `${winningPlayer.username} wins the Game!` :
                `${winningPlayer.username} wins the Round!`;

                const text2 = `Total Points: ${winningPlayer.points}`

            // button = this.state.board.lockedGame ? 
            //     <button className="modal-win-button" onClick={(e) => this.countdown(e, true)}>Next Round</button> :
            // null

        //     endGameButton = endGame ? <button className="modal-win-button" 
        //         onClick={(e) => this.countdown()}>Gameover - Play Again?</button> :
        //     null
                modal =
                <div className='modal-float-container-win'>
                    <div className='modal-container-win flex-row-start'>
                        <img className="capicua-domino" src={allDominos["cd"]}></img>
                        <div className='modal-content'>
                            <p>{text}</p>
                            <p>{text2}</p>
                            <Countdown restartGame={this.restartGame} endGame={this.state.gameState.endGame} />
                            {/* {endGameButton ? endGameButton : button} */}
                        </div>
                        <img className="capicua-domino" src={allDominos["cd"]}></img>
                    </div>
                </div>;
            }

            
        }
                   
        // debugger
        return (
            <>
                <div className="board-score-container flex-row-start">
                    {modal}
                    { this.state.gameState ? <Board gameState={this.state.gameState}
                    socket={this.props.socket} updateGame={this.updateGame} /> : null }
                    <div className="flex-col-start">
                        {/* <Chat key={"chat"}/> */}
                        {/* <Score board={this.state.board} key={999}/> */}
                    </div>
                </div>
            </>
        )
    }

}

export default GameB;