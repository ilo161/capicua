class Player {
    constructor(username, board, isAI) {
      this.username = username;
      this.webSocketId = undefined
      this.points = 0;
      this.hand = [];
      this.isAI = isAI ? true : false;
      this.board = board;
      this.playerInput = undefined;
      this.winningPlayerPoints = 0;
      // this.getPlayerInput()
    }

    

      
    aiAutoPlay(difficulty){
      let randomBoneIdx;

      let posPlay = [1,3]
      let center = 2;

      switch(difficulty){
          case "easy":
              randomBoneIdx = Math.floor((Math.random() * (this.hand.length)));
              const currentBone = this.board.currentPlayer.hand.splice(randomBoneIdx,1)[0];

          case "smart":

          default:

      }  

      // this.revealHand();
      //   this.playerInput = correctAnswer

    }

    // let removedBone = player.hand.splice(randomMathFloorIdx, 1)

    //replaced canMove with hasPlayableBone()
    hasPlayableBones(){
        const canMakeMove = this.hand.some((bone) =>{
            return this.board.isBonePlayable(bone);
        });

        if (!canMakeMove) return false;
        return true
    }

    drawBone(){
      this.hand.push(this.board.boneyard.bones.pop())
      console.log(`Player drew ${this.hand[this.hand.length-1].boneVal}`)
    }

    
    revealHand(){
      let handString = ""
        this.hand.forEach(bone => {
          handString += `[${bone.boneVal[0]}, ${bone.boneVal[1]}], `
        })

        console.log(`${this.username}'s Hand: `)

        console.log(`${handString}`)
        
    }

    restorePoints(num){
      this.points = num
    }
  }


export default Player;
  

