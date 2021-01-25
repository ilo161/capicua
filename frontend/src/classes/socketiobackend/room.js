const BoardObject = require("../boardB");
const Player = require("../player");

class Room {
    constructor(numPlayers, roomName, io,){
        this.numPlayers = numPlayers
        this.roomName = roomName;
        this.io = io;
        this.gameState = {

        }
        this.players = [];
    }

    addPlayer(data){
        const player = {username: data.username, id: data.id};
        this.players.push(player);
    }

    createGame(){
        console.log("new room new multiplayer game")
        this.board = new BoardObject(this.players, 900, this.roomName, this.io)

        // console.log(this.board)
    }

    sendGameState(){

        let showModalBoolean;
        const removeProp = 'board';

        const { [removeProp]: remove, 
            ...currentPlayer } = this.board.currentPlayer;

        const players = []
        for(let i = 0; i < this.board.players.length; i++){
            let playerObj = {};
            let player = this.board.players[i];
            playerObj["username"] = player.username;
            playerObj["hand"] = player.hand;
            playerObj["points"] = player.points;
            playerObj["isAi"] = player.isAi;
            playerObj["id"] = player.id
            players.push(playerObj)
        }

        showModalBoolean = (!this.board.inSession || this.board.lockedGame)
        console.log(`Show modal:? ${showModalBoolean}`)

        return {arena: this.board.arena,
                boneyard: this.board.boneyard,
                players: players,
                currentPlayer: {username: this.board.currentPlayer.username,
                     isAi: this.board.currentPlayer.isAi,
                    hand: this.board.currentPlayer.hand},
                inSession: this.board.inSession,
                lockedGame: this.board.lockedGame,
                winningPlayer: this.board.winningPlayer,
                skipCounter: this.board.skipCounter,
                boardDimen: this.board.boardDimen,
                roomName: this.roomName,

        }

    }
}

module.exports = Room;