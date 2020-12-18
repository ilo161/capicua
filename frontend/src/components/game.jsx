import React from "react";
import Board from "./board"

const BoardObject = require("../classes/board")
const axiosPlayerObj = [{username: "Steven"}, {username: "TinyPigOink!"}]

class Game extends React.Component {
    constructor(props){
        super(props)
        const board = new BoardObject(axiosPlayerObj)
        this.state = {board: board}

        
    }

    componentDidMount(){
        console.log(this.state.board)

    }

    updateGame(boneIndex, side) { {/* connected to Tile Component line 8 */}
        
        this.setState({ board: this.state.board });
    }

    render(){
        

        return (
            <div className="board-container">
                <Board board={this.state.board}/>
            </div>
        )
    }

}

export default Game;