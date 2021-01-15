import React from "react";
import Board from "./board"
import BoardObject from "../classes/board"
// const BoardObject = require("../classes/board")

//one player game below
// const axiosPlayerObj = [{username: "Steven"}]


// two player below
// const axiosPlayerObj = [{username: "Steven"}, {username: "TinyPigOink!"}]

// three player below
// const axiosPlayerObj = [{username: "Steven"}, {username: "TinyPigOink!"}, {username: "idrakeUfake"} ]

//4 player below
const axiosPlayerObj = [{username: "Steven"}, {username: "TinyPigOink!"}, 
{username: "idrakeUfake!"},
{username: "prophecy!"}]

class Game extends React.Component {
    constructor(props){
        super(props)
        const board = new BoardObject(axiosPlayerObj)
        this.state = {board: board}
        this.updateGame = this.updateGame.bind(this);
    }

    componentDidMount(){
        console.log(this.state.board)

    }

    updateGame(xPosPlay, center, boneIdx) { {/* connected to Tile Component line 8 */}
        // here to check state. of playable Bone
        // ...
        const currentBone = this.state.board.currentPlayer.hand.splice(boneIdx,1)[0];
        const verifyMove = this.state.board.makeMove(xPosPlay, center, currentBone);
        this.setState({ state: this.state });

        if(verifyMove){
            // possible WS
            // debugger
            this.state.board.nextPlayerAssignTurn()
            this.setState({ board: this.state.board });

        }else {
            // debugger
            this.state.board.currentPlayer.hand.splice(boneIdx,0, currentBone); 
            this.setState({ board: this.state.board });

            // this.forceUpdate();
        }
        
        //three arguments xPos, center, bone)
        console.log(this.state.board.renderArena())
        console.log("Arena ^..hand below")
        console.log(this.state.board.currentPlayer.revealHand())
    }

    render(){

        return (
            <div className="board-container">
                <Board board={this.state.board} updateGame={this.updateGame}/>
            </div>
        )
    }

}

export default Game;