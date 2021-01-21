import React from "react";
import Board from "./board"
import BoardObject from "../classes/board"
import { set } from "mongoose";
import { allDominos } from "./allDominos"
import Chat from './chat/chat';
import Score from './gameScore.jsx';
import CountDown from './countdown';


//one player game below
// const axiosPlayerObj = [{username: "Steven"}]


// two player below
// const axiosPlayerObj = [{username: "Steven"}, {username: "TinyPigOink!"}]

// three player below
// const axiosPlayerObj = [{username: "Steven"}, {username: "TinyPigOink!"}, {username: "idrakeUfake"} ]

//4 player below
const axiosPlayerObj = [{ username: "Steven" }, { username: "TinyPigOink!" },
{ username: "idrakeUfake!" },
{ username: "prophecy!" }]

class Game extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props)
        const board = new BoardObject(axiosPlayerObj, 900)
        this.state = {
            board: board,
        }
        this.previousPlayersArr = undefined;
        this.updateGame = this.updateGame.bind(this);
        this.restartGame = this.restartGame.bind(this);
       
    }

    

    componentDidMount() {


      

    }

    componentWillUnmount() {
        this._isMounted = false;

    }

    restartGame(e, isNewGame = undefined) {

        //start a brand new game with everything reset
        if (isNewGame) {
            // debugger
            this.setState({ board: new BoardObject(axiosPlayerObj, 900) })

            // isNewGame = undefined;
        } else {
            // debugger
            // continue on to next round.
            this.previousPlayersArr = this.state.board.players;
            const board = new BoardObject(axiosPlayerObj, 900)
            this.giveBackPointsToPlayers(board);
            this.setState({ board: board })
        }


        
    }

    giveBackPointsToPlayers(board) {
        this.previousPlayersArr.forEach((oldPlayerObj, idx) => {
            board.players[idx].restorePoints(oldPlayerObj.points)
        })

    }

    updateGame(xPosPlay, center, boneIdx) {
        // here to check state. of playable Bone
        // ...
        const currentBone = this.state.board.currentPlayer.hand.splice(boneIdx, 1)[0];
        const verifyMove = this.state.board.makeMove(xPosPlay, center, currentBone);
        this.setState({ state: this.state });

        if (verifyMove) {
            // for testing REMOVE 
            // this.state.board.endGame()
            // for testing REMOVE

            const isCurrentGameOver = this.state.board.isCurrentGameOver();
            if (isCurrentGameOver) {
                this.setState({ board: this.state.board });
                return;
            }

            this.state.board.resetSkipCounter();

            if (this.state.board.inSession === true) {

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
            this.state.board.currentPlayer.hand.splice(boneIdx, 0, currentBone);
            this.setState({ board: this.state.board });


        }


        console.log(this.state.board.renderArena())
        console.log("Arena ^..hand below")
        this.state.board.currentPlayer.revealHand()
        // console.log(this.state.board.currentPlayer.revealHand())
        // debugger
        console.log(`^^'s points: ${this.state.board.currentPlayer.points}`)
    }

    render() {
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
             wins the Round via lockout! ` : endGame ? `${this.state.board.winningPlayer.username} wins the Game!` :
                    `${this.state.board.winningPlayer.username} wins the Round!`;

            const text2 = `Total Points: ${this.state.board.winningPlayer.points}`

            button = this.state.board.lockedGame ?
                <button className="modal-win-button" onClick={(e) => this.restartGame(e, true)}>Next Round</button> :
                null

            endGameButton = endGame ? <button className="modal-win-button"
                onClick={(e) => this.restartGame(null, true)}>Gameover - Play Again?</button> :
                null
            modal =
                <div className='modal-float-container-win'>
                    <div className='modal-container-win flex-row-start'>
                        <img className="capicua-domino" src={allDominos["cd"]}></img>
                        <div className='modal-content'>
                            <p>{text}</p>
                            <p>{text2}</p>
                            {/* <p>{this.state.countdownStatus}</p> */}
                            <p> {endGame ? null : <CountDown restartGame={this.restartGame} endGame= {endGame} />}</p>
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
                    {this.state.board ? <Board board={this.state.board} updateGame={this.updateGame} /> : null}
                    <div className="flex-col-start">
                        <Chat key={"chat"} />
                        <Score board={this.state.board} key={999} />
                    </div>
                </div>
            </>
        )
    }

}

export default Game;
