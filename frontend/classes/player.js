// import bone from './bone'

class Player {
  constructor(username, game) {
    this.username = username;
    this.points = 0;
    this.hand = [];
    this.game = game;
  }



}
module.exports = Player;
//game.js - class
  //set up - not a method
    //boneYard
    //board
    //createHand

  //rules - not a method
    //validMoves
    //firstMove
    //isWinner
    //gameOver

//player.js - class
  //points
  //createTeam 
  //currentPlayer

  //look at MS to see how to capture move 

  // removeFromHand(bone) {
  //   for(let idx in this.hand) {
  //     let bone = this.hand[idx];

  //     if ((domino.top_number == domino.top_number && domino.bottom_number == domino.bottom_number)
  //         // board [1:n] == hand [1:n] && board [n:2] == hand [n:2]  hand [[],[],[],[],[],[]]
  //       ||
  //       (domino.top_number == domino.bottom_number && domino.bottom_number == domino.top_number)) {
  //         delete domino;
  //       }
  //   }
  // }

