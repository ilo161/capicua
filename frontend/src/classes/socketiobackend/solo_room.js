import BoardObject from "../board"
// const BoardObject = require("../board")

class SoloRoom {
    constructor(roomName, io){
        this.roomName = roomName
        this.io = io
        this.board = undefined

    }


    createGame(){
        console.log("new room new solo game")
        this.board = new BoardObject(playerData, 900, this.roomName, this.io)
    }
}

// module.exports = SoloRoom;
export default SoloRoom;