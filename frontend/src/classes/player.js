// import bone from './bone'
// const Bone = require('bone')





class Player {
    constructor(username, board, isAI) {
      this.username = username;
      this.points = 0;
      this.hand = [];
      this.isAI = isAI ? true : false;
      this.board = board;
      this.playerInput = undefined;
      // this.getPlayerInput()

     
    }

    

      // probably the master function
      //update NOT THE MASTER FUNCTON. node is async
    getPlayerInput(correctAnswer){
        this.revealHand();
        this.playerInput = correctAnswer

    }

    
    revealHand(){
      let handString = ""
        this.hand.forEach(bone => {
          handString += `[${bone.boneVal[0]}, ${bone.boneVal[1]}], `
        })

        console.log(`${this.username}'s Hand: `)

        console.log(`${handString}`)
        
    }
}

// let p1 = new Player("Mike", "board")


  module.exports = Player;


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

