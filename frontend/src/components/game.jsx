import React from "react";
import Board from "./board"
import BoardObject from "../classes/board"
import { set } from "mongoose";
import {allDominos} from "./allDominos"
import Chat from './chat/chat';
import Score from './gameScore.jsx';


//one player game below
// const axiosPlayerObj = [{username: "Steven"}]


// two player below
// const axiosPlayerObj = [{username: "Steven"}, {username: "TinyPigOink!"}]
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
const axiosPlayerObj = [{username: "Steven", isAi: true}, {username: "TinyPigOink!", isAi: true}
, {username: "idrakeUfake", isAi: true}, {username: "prophecy!", isAi: true}]

class Game extends React.Component {
    _isMounted = false;

    constructor(props){
        super(props)
        const board = new BoardObject(axiosPlayerObj, 900)
        this.state = {
            board: board,
            previousPlayersArr: undefined
        }
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
    

    componentDidUpdate(prevProps) {

        if(this.state.board.inSession){
            this.oldTimeIds.push(setTimeout(()=>{
                this.forceAiAutoPlay();
            },500))
            
        }
        
        
    }

    forceAiAutoPlay(){
        if(this.state.board.currentPlayer.isAi === true){
                debugger
                if(!this.hasAiGone){
                    this.oldArenaLen = this.state.board.arena.length;

                    while(this.state.board.arena.length === this.oldArenaLen && this.state.board.inSession){
                        // debugger
                        this.updateGame(...this.state.board.currentPlayer.aiAutoPlay("easy"))
                    }
                    this.hasAiGone = true;
                }
                debugger
                this.hasAiGone = false;
        }
    }

    countdown(e, isNewGame = undefined){
        // while(this.countdownTicker >= 0){
        // }
        this.countdownTicker = (this.countdownTicker - 1)
        // debugger
        setTimeout(() =>{
            this.countdown()
        }, 1000).bind(this);
        console.log(this.countdownTicker)
        
        if (this.countdownTicker === 0){
            if (isNewGame) {
                this.restartGame(e, true)
            } else {
                this.restartGame()
            }
            this.countdownTicker = 10;
        }
        // return this.countdownTicker;
    }

    componentDidMount(){
        if(this.state.board.inSession && this.state.board.arena.length === 1){
            this.oldTimeIds.push(setTimeout(()=>{
                this.forceAiAutoPlay();
            },500))
            
        }
        // debugger
        this._isMounted = true;
        // this.autoStartNextRound = setTimeout(this.restartGame, 10000); 
        // clearTimeout(this.autoStartNextRound);
        // debugger
        console.log(this.state.board)

    }

    componentWillUnmount(){
        debugger
        this._isMounted = false;
        this.oldTimeIds.forEach((id) => {
            clearTimeout(id)
        })
        // clearTimeout(this.autoStartNextRound);
    }

    restartGame(e, isNewGame = undefined) {

        //start a brand new game with everything reset
        if(isNewGame){
            // debugger
            this.setState({ board: new BoardObject(axiosPlayerObj, 900) })    
        } else {
            // debugger
            // continue on to next round.
            this.previousPlayersArr = this.state.board.players;
            const board = new BoardObject(axiosPlayerObj, 900)

            
            this.giveBackPointsToPlayers(board);
            this.setState({ board: board })
        }
       
        
        if(this._isMounted){
            // debugger
            // this.setState({ board: board });
        }
    }

    giveBackPointsToPlayers (board) {
        this.previousPlayersArr.forEach((oldPlayerObj, idx) => {
            board.players[idx].restorePoints(oldPlayerObj.points)
        })
       
    }

    updateGame(posPlay, center, boneIdx) { 
        // here to check state. of playable Bone
        // ...
        const currentBone = this.state.board.currentPlayer.hand.splice(boneIdx,1)[0];
        // debugger
        const verifyMove = this.state.board.makeMove(posPlay, center, currentBone);

        if(this.state.board.currentPlayer.isAi === false){
            this.setState({ state: this.state });
        }

        if(verifyMove){
            // for testing REMOVE 
            // this.state.board.endGame()
            // for testing REMOVE

            const isCurrentGameOver = this.state.board.isCurrentGameOver();
            if (isCurrentGameOver){
                this.setState({ board: this.state.board });
                return;
            }

            this.state.board.resetSkipCounter();

            if (this.state.board.inSession === true){    

                this.state.board.nextPlayerAssignTurn()

                //should the game reach the min for the skip counter. End the Game
                // if(this.state.board.lockedGame === true){
                //     // debugger
                //     const aPlayerHasWonRound = this.state.board.endGame();

                //     if (aPlayerHasWonRound){
                //         debugger
                //     } else {
                //         debugger
                //         // this.restartGame();
                //     }
                    ////return what? why? to escape the game loop?
                    // return
                // }

                this.setState({ board: this.state.board });
            } else {
                // const aPlayerHasWonRound = this.state.board.endGame();

                // if (aPlayerHasWonRound){
                //     debugger
                // } else {
                //     debugger
                //     // this.restartGame();
                // }
                
                this.setState({ board: this.state.board });
            }
        } else {
            // debugger
            this.state.board.currentPlayer.hand.splice(boneIdx,0, currentBone); 
            
            if(this.state.board.currentPlayer.isAi === false){
                this.setState({ board: this.state.board });
            }


        }
        

        console.log(this.state.board.renderArena())
        console.log("Arena ^..hand below")
        this.state.board.currentPlayer.revealHand()
        // console.log(this.state.board.currentPlayer.revealHand())
        // debugger
        console.log(`^^'s points: ${this.state.board.currentPlayer.points}`)
    }

    render(){
        let modal;
        let button;
        let endGameButton;
        // let autoStartNextRound = setTimeout(this.restartGame, 10000); 
        if (this.state.board.winningPlayer) {
            // debugger
            //testing. EndGame for For
            const endGame = this.state.board.endGame()
            {/* using logic from Board logic class */ }
            const text = this.state.board.lockedGame ? `${this.state.board.winningPlayer.username}
             wins the Round via lockout! ` :  endGame ? `${this.state.board.winningPlayer.username} wins the Game!` :
            `${this.state.board.winningPlayer.username} wins the Round!`;

            const text2 = `Total Points: ${this.state.board.winningPlayer.points}`

            button = this.state.board.lockedGame ? 
                <button className="modal-win-button" onClick={(e) => this.countdown(e, true)}>Next Round</button> :
            null

            endGameButton = endGame ? <button className="modal-win-button" 
                onClick={(e) => this.countdown()}>Gameover - Play Again?</button> :
            null
                modal =
                <div className='modal-float-container-win'>
                    <div className='modal-container-win flex-row-start'>
                        <img className="capicua-domino" src={allDominos["cd"]}></img>
                        <div className='modal-content'>
                            <p>{text}</p>
                            <p>{text2}</p>
                            {endGameButton ? endGameButton : button}
                        </div>
                        <img className="capicua-domino" src={allDominos["cd"]}></img>
                    </div>
                </div>;
        }
                   

        return (
            <>
                <div className="board-score-container flex-row-start">
                    {modal}
                    { this.state.board ? <Board board={this.state.board} updateGame={this.updateGame} /> : null }
                    <div className="flex-col-start">
                        <Chat key={"chat"}/>
                        <Score board={this.state.board} key={999}/>
                    </div>
                </div>
            </>
        )
    }

}

export default Game;