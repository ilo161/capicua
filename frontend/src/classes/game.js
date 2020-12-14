// import Player from './player';

// import Bone from "./bone.js";
const Bone = require("./bone.js")
const Player = require("./player.js")

Array.prototype.myFlatten = function () {
  let flattened = [];

  this.forEach((el) => {
    if (el instanceof Array) {
      flattened = flattened.concat(el.myFlatten());
    } else {
      flattened.push(el);
    }
  });

  return flattened;
}; 

class Game{
    constructor(){

        // this.board = [[2,2],[3,4],[1,0]];
        this.board = [];
        this.bones = { bones:[] };
        // this.players = [{name:"Steven", points: 0, hand: []}, {name:"Yangel", points: 0, hand: []}, {name:"Luke noArmwalker", points: 0, hand: []}, {name:"Yoda", points: 0, hand: []}]
        // this.players = [new Player("Steven!", this), new Player("Yangel!", this)]
        this.players = [new Player("Steven!"), new Player("Yangel!"), new Player("Tim!"), new Player("The Chad")]
       
        
        //Distribute bones
        this.restartBoneYard()
        
        this.flagLeft = true;
        this.inSession = true;




        // this.players = [{name:"steven"}, {name:"Yangel"}]

        // this.players = [{name:"Steven", points: 79, hand: []}, {name:"Yangel", points: 0, hand: [[1,2]]}, {name:"Luke noArmwalker", points: 0, hand: [[1,3]]}, {name:"Yoda", points: 0, hand: [[1,4]]}]
        this.currentPlayer = this.players[0]
        this.previousPlayer;

        // sets the counter for if all players have been skipped, IF this.players.length === skipcounter => GAME OVER
        this.skipCounter = 0;
    }
 
    // createBoneYard() {
    //     //This function will create all of the 27 pieces of the game and assign it to the graveyard pile
    //     let i;
    //     let j;
    //     for (i = 0; i < 7; i++) {
    //         for (j = i; j < 7; j++) {
    //             // // if (!this.bones.bones.includes([i, j])) {
                    // this.bones.bones.push(new Bone([i, j]));
    //             // };
    //         }
    //     }
    //     return this.bones
    // }

    // shuffleBoneYard(boneyard){
    //     //This function will shuffle all 27 bones. In a randomized order


    //         for(let i = boneyard.length - 1; i > 0; i--){
    //             const randomMathFloorIdx = Math.floor(Math.random() * i)
    //             const lastIdx = boneyard[i]
    //             const temp = boneyard[randomMathFloorIdx]  
    //             boneyard[i] = temp;
    //             boneyard[randomMathFloorIdx] = lastIdx
    //         }
    //             return boneyard
    //     }

    // startingHand(){
    //     //this function will iterate through the players in the game and distribute 7 bones to each player at random

    //     this.players.forEach((player) => {
    //         let playerHand = [];
    //         for(let i = 0; playerHand.length < 7; i++){  
    //             playerHand.push(this.bones.bones.pop());
    //         }
            
    //         player.hand = playerHand;
    //         console.log(`${player.username} below`)
    //             player.hand.forEach(boneObj => {
    //                 console.log(boneObj.boneVal)

    //             })
    //     });
    // }

    // restartBoneYard(){
    //     this.bones.bones = []
    //     this.players.forEach(player => {
    //         player.hand = []
    //     })
    //     this.createBoneYard();
    //     this.shuffleBoneYard(this.bones.bones);
    //     this.startingHand();
        
    //     if(this.sevenDoubles()){
    //         this.restartBoneYard()
    //     }
    // }

    // sevenDoubles() {
    //     debugger
    //     let doubleBoneCounter = 0
    //     this.bones.bones.forEach(boneObj => {
    //         if (boneObj.isDouble()) {
    //             doubleBoneCounter++;
    //         }
    //     })
    //     return doubleBoneCounter === 7 ? true : false;
    // }


    // highestDouble(bone, currentPlayerIdx, currentHigh, boneIdx) {

    //   if (bone.isDouble() && bone.topNumber >= currentHigh[0][0]){
    //     currentHigh = ([bone.boneVal, currentPlayerIdx, boneIdx])
    //     return currentHigh;
    //   }
    //   return currentHigh;
    // }

    firstMove(){
        debugger

        // static highDouble is double 0's and null player
        let playerWithHighestDouble = ([[0, 0], null, null]);
        /////Board is empty
        if (this.board.length === 0) {
            // this.players.forEach((player, playerIdx) => {
            //     player.hand.forEach((bone, boneIdx) => {
            //         playerWithHighestDouble = this.highestDouble(bone, playerIdx,
            //             playerWithHighestDouble, boneIdx)
            //     })
            // })
            this.currentPlayer = this.players[playerWithHighestDouble[1]]
            let boneIndex = playerWithHighestDouble[2]
            let boneToPlay = this.currentPlayer.hand.splice(boneIndex,1)

            this.makeMove(boneToPlay)
        }
    }
   
    validMove(bone) {
        
        console.log("# checking all bones in hand for validity")
        // let firstBone = this.board[0]                           // [2,2]
        // let lastBone = this.board[this.board.length - 1]        // [3,4]
        let firstBone = this.board[0][0]                           // [2,2]
        let lastBone = this.board[this.board.length - 1][0]        // [3,4]
        debugger
        //   if (bone.boneVal[1] != tempBone.boneVal[0] && bone.boneVal[0] === tempBone.boneVal[0]) {
        let checksLeft = ((bone.boneVal[0] === firstBone.boneVal[0] )|| (bone.boneVal[0] === lastBone.boneVal[1]))
        // let checksRight = ((bone[1] === firstBone[0]) || (bone[1] === lastBone[1]))
        let checksRight = ((bone.boneVal[1] === firstBone.boneVal[0]) || (bone.boneVal[1] === lastBone.boneVal[1]))
        if (checksLeft || checksRight) {
            //here
            console.log("HAS VALID MOVE")
            return true;
        } else {
            return false;
        } 
        // return (bone[0] === board[0][0])
    }
     //TESTED AND TRUE
    canMove(player) {

        console.log("#1 - canMove()")

        //playerhand comes in as an array of bones [[1,2],[2,3]]
        debugger
        let canMakeMove = player.hand.some((bone) =>{
    
            return this.validMove(bone);
        })
        if (!canMakeMove) {

            this.draw(player)
        } else {
            return canMakeMove
        }
    }

    //ISEMPTY-BONEYARD TESTED AND TRUE
    // isEmpty(){
    //     debugger
    //     console.log("# 3/4 - isEmpty?()")

    //      if (this.bones.bones.length === 0){
    //       return true;
    //     } else {
    //       return false;
    //     } 
    // }

    // BONEYARD METHOD ^^^^^^

    //SKIP TURN -- GAME CLASS -- TESTED AND TRUE
    // skipTurn(){
    //     debugger
    //     console.log("# 3/4 - skipTurn()")

    //     if (this.previousPlayer != this.currentPlayer){
    //         this.skipCounter += 1
    //     }
        


    //     let idxCurrPlayer ;
    //     // for( let player of this.players){
    //         idxCurrPlayer = this.players.indexOf(this.currentPlayer)   
    //     // }

    //     this.currentPlayer = this.players[((idxCurrPlayer + 1) % this.players.length)]

    //     debugger
    //     console.log("NEW CURRENT PLAYER");
    //     console.log(this.currentPlayer.username);
    //     console.log(this.currentPlayer.hand.length);
    //     console.log("*************");
    // }
    //^^ SKIP TURN -- GAME CLASS - TESTED AND TRUE


    // GAME CLASS!!!!
    playerTurn(player) {
        console.log("start of new player Turn")
       
        if (this.board.length === 0) {
            console.log("about to invoke firstMove()")
            this.firstMove()
        }

        else if (this.board.length > 0 && (this.inSession === true && this.canMove(player))){
            console.log("AI Think Player can play a bone")
            let randomMathFloorIdx = Math.floor(Math.random() * (player.hand.length - 1))
            if (randomMathFloorIdx === undefined){
                debugger
                randomMathFloorIdx = 0
            }
            this.skipCounter = 0
            let removedBone = player.hand.splice(randomMathFloorIdx, 1)

            console.log("removed Bone below")
            debugger
            // console.log(removedBone)
            // console.log(removedBone[0])
            this.makeMove(removedBone);

            // removedBone[0].boneVal[0]
            // player picks from hand
            // validMove(player pick) 
            // Select bone graphic from hand
                 // game.currentPlayer.makeMove
            // make move should remove bone from hand 
                    // NEED GOOD FUNC TO SPLICE
        } 

        
        console.log("--------")
        // this.board.forEach(arrIdx =>{
        //     arrIdx.forEach(bone => {
        //         console.log(bone.boneVal)
        //     })
        // })
        this.board.forEach(box => {
            console.log("?")
            debugger
            console.log(box[0].boneVal)
            })
        
        console.log("----curr play hand----" + this.currentPlayer.username)
        this.currentPlayer.hand.forEach(bone => {
            console.log(bone.boneVal)
        })
        console.log("--------")
        
    }
    
    makeMove(bone){
        console.log("start of #makeMove")
        
        console.log("--------")
        console.log("board length")
        console.log(this.board.length)
        console.log("--------")
        // player picks left side of board but bone is reverse
                    //  onMouseUP....
        // let goingLeft = (bone.x < (stage.width / 2) ? true : false )
        if (this.board.length === 0){
            this.board.push(bone);
            console.log(this.board.length)
        } else {
                console.log('board no longer empty')
                let goingLeft = false;

                if (this.flagLeft) {
                    goingLeft = true;
                }
                //players places bone in beginning
                //player selects left (x coordinate on canvas i less than 50% width)
                // debugger
                let actualBone = bone[0]
                // debugger
                if (goingLeft) {
                    //grab first bone
                    let tempBone = this.board[0][0]
                    // let actualBone = bone[0]

                    console.log("--- temp bone below")
                    console.log(bone[0].boneVal)
                    console.log(tempBone.boneVal)
                    console.log("length of hand curr player")
                    console.log(this.currentPlayer.hand.length)
                    
                
                        // debugger
                    if (actualBone.boneVal[1] != tempBone.boneVal[0] && actualBone.boneVal[0] === tempBone.boneVal[0]) {
                        // debugger
                        console.log("boneVal Activated A")

                       
                        bone[0].boneReverse()


                        


                        console.log("bone is reversed and placed in start")

                        this.board.unshift(bone)

                        if (this.currentPlayer.hand.length === 0) {
                            this.isWinner();
                        }

                        // debugger
                    } else if (actualBone.boneVal[1] === tempBone.boneVal[0]){
                            // if bone does not need flipping -> place in board
                            
                                console.log("boneVal Activated B")
                                this.board.unshift(bone)

                                if (this.currentPlayer.hand.length === 0) {
                                    this.isWinner();
                                }

                                // debugger
                                console.log("bone placed. newState of Board ^^^")

                            } else {
                                //deselect bone
                                console.log("about to recurse 2")
                                // this.currentPlayer.hand.push(bone)
                                this.currentPlayer.hand.push(bone[0])

                                this.draw(this.currentPlayer)
                                this.playerTurn(this.currentPlayer)

                            }
                        //Player picks right side of board
                     } else {
                        // select last bone on board (right side)
                        
                        
                        let tempBone = this.board[this.board.length-1][0]
                        
                        
                        // if (bone[0] != tempBone[1] && bone[1] === tempBone[1]) {
                            if (bone.boneVal[0] != tempBone.boneVal[1] && bone.boneVal[1] === tempBone.boneVal[1]) {
                                console.log("boneVal Activated C")
                               

                                bone[0].boneReverse()
                                // debugger

                                console.log("right side placed and reversed")

                                this.board.push(bone)

                                if(this.currentPlayer.hand.length === 0){
                                    this.isWinner();
                                }
                                // debugger
                            } else if (bone.boneVal[0] === tempBone.boneVal[1]){
                                // if bone does not need flipping -> place in board
                                // if (this.validMove(bone)) {
                                        console.log("boneVal Activated D")
                                    // if(bone.boneVal[0] === tempBone.boneVal[1]){
                                        this.board.push(bone)

                                        if (this.currentPlayer.hand.length === 0) {
                                            this.isWinner();
                                        }
                                        // debugger
                                        console.log("bone placed. END of newState of Board ^^^")

                            } else {
                                //deselect bone
                                console.log("about to recurse 1")
                                // this.currentPlayer.hand.push(bone)
                                this.draw(this.currentPlayer)
                                this.currentPlayer.hand.push(bone[0])
                                this.playerTurn(this.currentPlayer)
                            }
                        }


            }
            // debugger
            (this.flagLeft ? false :true); 
            console.log("Made a move")


        
    }

    runningGame(){
        while(!this.inSession === false){
            this.previousPlayer = this.currentPlayer;
            console.log("BRAND NEW RUNNING GAME LOOP")
            console.log(this.currentPlayer.username)
            debugger
            this.playerTurn(this.currentPlayer)

            this.gameOver()
            this.skipTurn()
        }
        console.log("THE GAME IS OVER")
    }

    // TESTED AND TRUE -- GAME CLASS
    gameOver(){
        debugger

        console.log("#LAST - In Game over")
        // console.log(this.currentPlayer.hand.length)
        // players hand is empty
        // > this.players.length
        if (this.skipCounter > 1000){
            // if (true){
            console.log("In Skip Counter")
            console.log(this.skipCounter)
            this.inSession = false;
            let allScores = [];
            
            let min = 10000;
            //iterate through all players and see who has the lowest score
            this.players.forEach((player) => {
                let squishThis = []
                player.hand.forEach(boneObj => {
                    squishThis.push(boneObj.boneVal)
                })
                // let playerTotal = player.hand.myFlatten().reduce((a, b) => a + b, 0);
                let playerTotal = squishThis.myFlatten().reduce((a, b) => a + b, 0);
                debugger
                if (playerTotal < min){
                    min = playerTotal
                }
                allScores.push(playerTotal)
            })

            let winningPlayerIdx = allScores.indexOf(min)
            
            let totalWinningPoints = 0
            allScores.forEach(score => {
                totalWinningPoints += score;
            })
            debugger
            this.players[winningPlayerIdx].points += (totalWinningPoints - allScores[winningPlayerIdx])
        }
        else if (this.currentPlayer.hand.length === 0 ){
            console.log("In HAND IS EMPTY FOR CURR PLAYER")
            this.inSession = false;
            // concat arr.flat
           let allHands = [];
            this.players.forEach(player =>{
               player.hand.forEach(bone =>{
                    // allHands.push(bone);
                    allHands.push(bone[0]);
                    // allHands.myFlatten().reduce((a, b) => a + b, 0);
               })
           }) 
           const totalScore = allHands.myFlatten().reduce((a, b) => a + b, 0);
           this.currentPlayer.points += totalScore;

        //    console.log(allHands);
           console.log(totalScore);
        }

        if (this.inSession === false && this.currentPlayer.points >= 80){
            console.log("gracias por jugar " + this.currentPlayer.username + " with total points: " + this.currentPlayer.points)
            // new Game()
            
        } else if (this.inSession === true && this.currentPlayer.points < 80) {
            console.log('new turn')
        }
   }
   // TESTED AND TRUE -- GAME CLASS
    isWinner() {
        debugger
     console.log("gracias por jugar " + this.currentPlayer.username + " with total points: " + this.currentPlayer.points)
     this.inSession = false;

    }



    // ENTIRE GAME OR TEAM BATTLE witll game over ends when pointes hit treshold
    // round over ends with currPlayer has no bones in the hand
   

    draw(player) {
        debugger
        console.log("curr player below")
        // console.log(player)
        console.log("# 2/3 - draw()")
        // if the boneyard is empty
        if(this.isEmpty()){
            console.log("this.bones.bones is empty. Cant Draw")
            // console.log("skip turn")
            this.skipTurn()

        } else{
            debugger
            console.log("about to draw")
            // Draw from the boneyard
            // player.hand.push(this.boneyard.pop())
            player.hand.push(this.bones.bones.pop())
            // console.log(player.hand)
            this.canMove(player)
        }
        //concat from boneyard.pop() to player.hand arr??
    }
}

let game = new Game();

// game.playerTurn(game.currentPlayer)
// console.log(game.board)
// 
console.log(game.runningGame())
