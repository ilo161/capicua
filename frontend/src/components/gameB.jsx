import React from "react";
import Board from "./boardB"
import BoardObject from "../classes/board"
import { set } from "mongoose";
import {allDominos} from "./allDominos"
import Chat from './chat/chat';
import Score from './gameScore.jsx';


//one player game below
// const axiosPlayerObj = [{username: "Steven"}]


// two player below
const axiosPlayerObj = [{username: "Steven"}, {username: "TinyPigOink!"}]
// two player AI below
// const axiosPlayerObj = [{username: "Steven", isAi: true}, {username: "TinyPigOink!", isAi: true}]

// three player below
// const axiosPlayerObj = [{username: "Steven"}, {username: "TinyPigOink!"}, {username: "idrakeUfake"} ]

//three player AI below
// const axiosPlayerObj = [{username: "Steven", isAi: true}, {username: "TinyPigOink!", isAi: true}
// , {username: "idrakeUfake", isAi: true}]

//4 player below
// const axiosPlayerObj = [{username: "Steven"}, {username: "TinyPigOink!"}, 
// {username: "idrakeUfake!"},
// {username: "prophecy!"}]

// 4 player ai below
// const axiosPlayerObj = [{username: "Steven", isAi: true}, {username: "TinyPigOink!", isAi: true}
// , {username: "idrakeUfake", isAi: true}, {username: "prophecy!", isAi: true}]

class GameB extends React.Component {
    _isMounted = false;

    constructor(props){
        super(props)
        // const board = new BoardObject(axiosPlayerObj, 900)

        // arena: this.board.arena,
        //         boneyard: this.board.boneyard,
        //         players: players,
        //         currentPlayer: this.board.currentPlayer.username,
        //         inSession: this.board.inSession,
        //         lockedGame: this.board.lockedGame,
        //         winningPlayer: this.board.winningPlayer,
        //         skipCounter: this.board.skipCounter,
        //         boardDimen: this.board.boardDimen

        // board.arena = this.props.gameState.arena
        // board.boneyard = this.props.gameState.boneyard
        // board.players = this.props.gameState.players
        // board.currentPlayer = this.findCurrentPlayer(this.props.gameState.currentPlayer)
        // board.inSession = this.props.gameState.inSession
        // board.lockedGame = this.props.gameState.lockedGame
        // board.winningPlayer = this.props.gameState.winningPlayer
        // board.skipCounter = this.props.gameState.skipCounter


        this.state = {
            board: "",
            gameState: undefined
            }
        
        this.socket = this.props.socket
        this.previousPlayersArr = undefined;
        this.updateGame = this.updateGame.bind(this);
        this.restartGame = this.restartGame.bind(this);
        this.countdownTicker = 10;
        this.countdown = this.countdown.bind(this)
        this.hasAiGone = false;
        this.oldArenaLen = undefined;
        this.oldTimeIds = [];
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
        debugger

        if(prevProps.gameState.arena != this.props.gameState.arena){
            debugger
            this.setState({gameState: this.props.gameState})
        }

        // if( prevProps.gameState.currentPlayer.userName != this.props.gameState.currentPlayer.username){
        // //     debugger
        // if(this.props.gameState.currentPlayer.isAi){
        //     debugger
        //     this.socket.emit("askForAiPlay", this.state.gameState.currentPlayer.username)
        // }
        // }
        // this.forceAiAutoPlay();




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
            
            
            
        //     if(this.state.gameState.inSession){
        //          console.log("B")
                 
        //     // this.oldTimeIds.push(setTimeout(()=>{
        //         this.forceAiAutoPlay();
        //     // },500))
            
        // }
        // }

       
        
        
    }

    forceAiAutoPlay(){
        // if(this.state.board.currentPlayer.isAi === true){
        // this.oldArenaLen = this.state.board.arena.length;
        //             while(this.state.board.arena.length === this.oldArenaLen && this.state.board.inSession){
        //                 this.updateGame(...this.state.board.currentPlayer.aiAutoPlay("easy"))
        // debugger
        if(this.state.gameState.currentPlayer.isAi === true){
                // debugger
                if(!this.hasAiGone){
        
                    this.oldArenaLen = this.state.gameState.arena.length;

        
                    // while(this.state.gameState.arena.length === this.oldArenaLen && this.state.gameState.inSession){
                    if(this.state.gameState.inSession){
                            if(this.state.gameState.arena.length === this.oldArenaLen && this.state.gameState.inSession){
                                debugger
                                console.log("re-emit")
                                  this.socket.emit("askForAiPlay", this.state.gameState.currentPlayer.username)
    
                        // this.updateGame(...this.state.gameState.currentPlayer.aiAutoPlay("easy"))
                        }
                    }
                  
                    this.hasAiGone = true;
                }
                // debugger
                this.hasAiGone = false;
        }
    }

    countdown(e, isNewGame = undefined){
        // while(this.countdownTicker >= 0){
        // }
        // this.countdownTicker = (this.countdownTicker - 1)
        // // debugger
        // setTimeout(() =>{
        //     this.countdown()
        // }, 1000).bind(this);
        // console.log(this.countdownTicker)
        
        // if (this.countdownTicker === 0){
        //     if (isNewGame) {
        //         this.restartGame(e, true)
        //     } else {
        //         this.restartGame()
        //     }
        //     this.countdownTicker = 10;
        // }
        // return this.countdownTicker;
    }

    componentDidMount(){
        // if(this.props.gameState){
        //     this.setState(board:{arena: this.props.gameState.arena,
        //         boneyard: this.props.gameState.boneyard,
        //         players: this.props.gameState.players,
        //         currentPlayer: this.findCurrentPlayer(this.props.gameState.currentPlayer),
        //         inSession: this.props.gameState.inSession,
        //         lockedGame: this.props.gameState.lockedGame,
        //         winningPlayer: this.props.gameState.winningPlayer,
        //         skipCounter: this.props.gameState.skipCounter})
        // }
        this.setState({gameState: this.props.gameState})
        // , ()=> {
        //     debugger
        //     this.socket.emit("askForAiPlay", this.state.gameState.currentPlayer.username)
        //     this.setState({state: this.state})
        // })
        // debugger

        // if(this.state.board.inSession && this.state.board.arena.length === 1){
            if(this.state.gameState){
                // debugger
                if(this.state.gameState.inSession && this.state.gameState.arena.length === 1){
                    // this.oldTimeIds.push(setTimeout(()=>{
                        this.forceAiAutoPlay();
                    // },500))
                }
            }
        
            
        // }
        // debugger
        // this._isMounted = true;
        // this.autoStartNextRound = setTimeout(this.restartGame, 10000); 
        // clearTimeout(this.autoStartNextRound);
        // debugger
        // console.log(this.state.board)
        
    }

    componentWillUnmount(){
        // clear for AI guesses
        this._isMounted = false;
        this.oldTimeIds.forEach((id) => {
            clearTimeout(id)
        })

        // this.condownID = [1,2,3,4,5]

    }

    restartGame(e, isNewGame = undefined) {

        // //start a brand new game with everything reset
        // if(isNewGame){
        //     // debugger
        //     this.setState({ board: new BoardObject(axiosPlayerObj, 900) })    
        // } else {
        //     // debugger
        //     // continue on to next round.
        //     this.previousPlayersArr = this.state.board.players;
        //     const board = new BoardObject(axiosPlayerObj, 900)

            
        //     this.giveBackPointsToPlayers(board);
        //     this.setState({ board: board })
        // }
       
        
        // if(this._isMounted){
        //     // debugger
        //     // this.setState({ board: board });
        // }
    }

    giveBackPointsToPlayers (board) {
        // this.previousPlayersArr.forEach((oldPlayerObj, idx) => {
        //     board.players[idx].restorePoints(oldPlayerObj.points)
        // })
       
    }

    updateGame(posPlay, center, boneIdx) {
        debugger 
        this.socket.emit("sentPlayerInput", {posPlay: posPlay,
        center: center, boneIdx: boneIdx})
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
        // if (this.state.board.winningPlayer) {
        //     // debugger
        //     //testing. EndGame for For
        //     const endGame = this.state.board.endGame()
        //     {/* using logic from Board logic class */ }
        //     const text = this.state.board.lockedGame ? `${this.state.board.winningPlayer.username}
        //      wins the Round via lockout! ` :  endGame ? `${this.state.board.winningPlayer.username} wins the Game!` :
        //     `${this.state.board.winningPlayer.username} wins the Round!`;

        //     const text2 = `Total Points: ${this.state.board.winningPlayer.points}`

        //     button = this.state.board.lockedGame ? 
        //         <button className="modal-win-button" onClick={(e) => this.countdown(e, true)}>Next Round</button> :
        //     null

        //     endGameButton = endGame ? <button className="modal-win-button" 
        //         onClick={(e) => this.countdown()}>Gameover - Play Again?</button> :
        //     null
        //         modal =
        //         <div className='modal-float-container-win'>
        //             <div className='modal-container-win flex-row-start'>
        //                 <img className="capicua-domino" src={allDominos["cd"]}></img>
        //                 <div className='modal-content'>
        //                     <p>{text}</p>
        //                     <p>{text2}</p>
        //                     {endGameButton ? endGameButton : button}
        //                 </div>
        //                 <img className="capicua-domino" src={allDominos["cd"]}></img>
        //             </div>
        //         </div>;
        // }
                   
        // debugger
        return (
            <>
                <div className="board-score-container flex-row-start">
                    {modal}
                    {/* { this.state.board ? <Board board={this.state.board} updateGame={this.updateGame} /> : null } */}
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