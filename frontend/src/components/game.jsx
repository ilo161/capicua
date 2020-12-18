import React from "react";
import Board from "./board"
import BoardObject from "../classes/board"
// const BoardObject = require("../classes/board")

const axiosPlayerObj = [{username: "Steven"}, {username: "TinyPigOink!"}]

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

        // console.log(`OG === ${this.state.board.currentPlayer.hand[boneIdx].boneVal}`)
        // const originIdx = this.state.board.currentPlayer.hand[boneIdx]
        // const bonePlay = originIdx.slice(0)
        // bonePlay.boneReverse()  
        // console.log(`NEWG === ${bonePlay.boneVal}`)
        // console.log(`OG2 === ${this.state.board.currentPlayer.hand[boneIdx].boneVal}`)
        debugger
               //three arguments xPos, center, bone)
        // this.state.board.makeMove(xPosPlay, center)
        this.setState({ board: this.state.board });
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