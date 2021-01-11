// const Boneyard = require("./boneyard")
// const Player = require("./player")
import Boneyard from "./boneyard"
import Player from "./player"

class Board {
    constructor(axiosPlayerData){
        this.boneyard = new Boneyard(this);
        this.arena = [];
        this.players = this.generatePlayers(axiosPlayerData);
        this.currentPlayer = undefined;
        this.aIFirstMove = undefined;


        this.inSession = true;
        this.runningGame()


    }

    //axiosPlayerData comes in as in Array
    generatePlayers(axiosPlayerData){
        const players = axiosPlayerData.map((playerData) => {

            if (playerData.isAI){
                return new Player(playerData.username, this, true );
            }
            return new Player(playerData.username, this );
        })

        return players
    }

    init(){
        //distribute 7 bones to each player
        this.startingHand();

        // if boneyard has all 7 double Dominos. create new Boneyard obj
        if (this.sevenDoubles()){
            this.restartBoneYard();
            this.init();
        }

        //set the currentPlayer to...
        // returns playerIdx => boneIdxInHandOfDouble
        let playerAndBoneIdx = this.decideFirstPlayer();

        //check if player is AI
        if (this.players[playerAndBoneIdx[0]].isAI){
            // ****************
            // ****************
            // ****************
            //works...
        }

        return playerAndBoneIdx



    }

    /*
    ********************************INITIALIZE BOARD FUNCTIONS START HERE**************
    ********************************INITIALIZE BOARD FUNCTIONS START HERE**************
    ********************************INITIALIZE BOARD FUNCTIONS START HERE**************
    ********************************INITIALIZE BOARD FUNCTIONS START HERE**************
    ********************************INITIALIZE BOARD FUNCTIONS START HERE**************
    */

    restartBoneYard(){

        //empty boneyard and make new bones
        this.boneyard = new Boneyard(this);
    }

    startingHand(){
        //this function will iterate through the players in the game 
        // and distribute 7 bones to each player at random

        this.players.forEach((player) => {
            player.hand = [];

            for(let i = 0; i < 7; i++){  
                player.hand.push(this.boneyard.bones.pop());
            }
            
            
            //TESTING ONLY -- DELETE FOR PRODUCTION
            console.log(`${player.username} below`)
                player.hand.forEach(boneObj => {
                    console.log(boneObj.boneVal);
                })
        });
    }

    //Checks to make sure at least one player has one double
    sevenDoubles() {
        let doubleBoneCounter = 0;
        this.boneyard.bones.forEach(boneObj => {
            if (boneObj.isDouble()) {
                doubleBoneCounter++;
            }
        })
        return doubleBoneCounter === 7 ? true : false;
    }

    decideFirstPlayer(){
        //Automatically pick lowest Double Domino with => playerIdx => boneIdxInHand
        let playerWithHighestDouble = ([[0, 0], null, null]);

        this.players.forEach((player, playerIdx) => {
            player.hand.forEach((bone, boneIdx) => {
                // test only doubles
                if (bone.isDouble()){
                    playerWithHighestDouble = this.highestDouble(bone,
                        playerWithHighestDouble,
                        playerIdx,
                        boneIdx)
                    }
                })
            })

        this.currentPlayer = this.players[playerWithHighestDouble[1]]

        //                  => playerIdx => boneIdxInHand
        return [playerWithHighestDouble[1], playerWithHighestDouble[2]]

    }

    highestDouble(bone, currentHigh, currentPlayerIdx, boneIdx) {

      if (bone.topNumber >= currentHigh[0][0]){
        currentHigh = ([bone.boneVal, currentPlayerIdx, boneIdx]);
        return currentHigh;
      }
      return currentHigh;
    }

    /*
    ********************************INITIALIZE BOARD FUNCTIONS END HERE**************
    ********************************INITIALIZE BOARD FUNCTIONS END HERE**************
    ********************************INITIALIZE BOARD FUNCTIONS END HERE**************
    ********************************INITIALIZE BOARD FUNCTIONS END HERE**************
    ********************************INITIALIZE BOARD FUNCTIONS END HERE**************
    */



    /*
    ********************************RUNNING GAMEPLAY FUNCTIONS START HERE**************
    ********************************RUNNING GAMEPLAY FUNCTIONS START HERE**************
    ********************************RUNNING GAMEPLAY FUNCTIONS START HERE**************
    ********************************RUNNING GAMEPLAY FUNCTIONS START HERE**************
    ********************************RUNNING GAMEPLAY FUNCTIONS START HERE**************
    */

    //Ensures currentPlayer plays highest Double
    firstMoveAndCorrectBone(mandatoryBoneIdxToPlay){
        this.arena.push(this.currentPlayer.hand.splice(mandatoryBoneIdxToPlay[1],1)[0]);
        this.renderArena();
    }

    runningGame(){
        //force an initial play of the highest double when arena is empty.
        if (this.arena.length === 0){
            const mandatoryBoneIdxToPlay = this.init()
            this.firstMoveAndCorrectBone(mandatoryBoneIdxToPlay)
        } else {

        }

    }

    //function checks in advance if the currPlayer has a playable piece
    isBonePlayable(bone){
        const arenaLeftBoneVal = this.arena[0].boneVal[0];
        const arenaRightBoneVal = this.arena[this.arena.length-1].boneVal[1];

        const leftSidePlayable  = ((bone.boneVal[0] === arenaLeftBoneVal ) || (bone.boneVal[1] === arenaLeftBoneVal));
        const rightSidePlayable = ((bone.boneVal[0] === arenaRightBoneVal) || (bone.boneVal[1] === arenaRightBoneVal));

        if (leftSidePlayable || rightSidePlayable) return true;
        return false
    }



    //Changes currentPlayer to the next player
    nextPlayerAssignTurn(){
       // Or curry sum here??

        let idxCurrPlayer ;
        idxCurrPlayer = this.players.indexOf(this.currentPlayer)   

        this.currentPlayer = this.players[((idxCurrPlayer + 1) % this.players.length)]
        // debugger


        // TESTING PURPOSES ONLY DELETE LATER //
        console.log("*************");
        console.log("NEW CURRENT PLAYER && Hand");
        console.log(this.currentPlayer.username);
        this.currentPlayer.revealHand()
        console.log("*************");

        // if NEW currentPlayer CANNOT make a valid move... 
        if(!this.currentPlayer.hasPlayableBones()){
            // debugger
            
            // If boneyard empty, changePlayer to nextPlayer
            if (this.boneyard.bones.length === 0){
                console.log("curry addition here for skip turn ++")
                this.nextPlayerAssignTurn()
                //insert currying function here
                // **** VERY IMPORTANT ****
            } else {
                //currentPlayer draws from boneyard
                // auto draw feature. (no animation yet)
                while ((!this.currentPlayer.hasPlayableBones()) && (this.boneyard.bones.length > 0)){
                    // debugger
                    this.currentPlayer.drawBone()
                }

                //player draws all bones && still has no valid move
                if((this.boneyard.bones.length === 0) && (!this.currentPlayer.hasPlayableBones())){
                    // debugger
                    this.nextPlayerAssignTurn()
                }
                
            }
        }

        

        return true;
    }

    makeMove(xPosPlay, center, bone){
        // 
        // extracting the far left number on the arena
        const arenaLeftBoneVal = this.arena[0].boneVal[0];
        // extracting the far right number on the arena
        const arenaRightBoneVal = this.arena[this.arena.length-1].boneVal[1];
        
        // Player plays left side
        if(xPosPlay < center){
            
            //we use this return of play in update Game in Game.jsx
           return this.playerPlaysLeft(arenaLeftBoneVal, bone);
        } else {
            
            // Player plays right side
            return this.playerPlaysRight(arenaRightBoneVal, bone)

        }
        // make move ought to return a boolean and then we use that boolean
        // to determine a draw or a skip or a commitMove
        // draw(this.currentPlayer)
    }

    playerPlaysLeft(arenaLeftBoneVal, bone){
        // 
        //check bottom number of player hand bone first
        // second test checks top number of player hand bone second
        //orig below
        // if(bone.boneVal[1] !== arenaLeftBoneVal && bone.boneVal[0] === arenaLeftBoneVal){
        if((bone.boneVal[1] !== arenaLeftBoneVal) && (bone.boneVal[0] === arenaLeftBoneVal)){
            
            bone.boneReverse();
            this.arena.unshift(bone);
            console.log("played left successfully");
            console.log("rotate SVG +90 degrees");

            return true;
        } else if(bone.boneVal[1] === arenaLeftBoneVal){
            
            //bone bottom val playable on left - as is. just rotate svg -90
            this.arena.unshift(bone);
            console.log("played left successfully");
            console.log("rotate SVG -90 degrees");

            return true;
        } else {
            
            // left play not playable - make player draw
            //******************************* */
            //******************************* */
            //******************************* */
            return false
        }
    }

    playerPlaysRight(arenaRightBoneVal, bone){
        
        //orig below
        // if(bone.boneVal[0] !== arenaRightBoneVal && bone.boneVal[1] === arenaRightBoneVal){
        if((bone.boneVal[0] !== arenaRightBoneVal) && (bone.boneVal[1] === arenaRightBoneVal)){
            
                bone.boneReverse();
                this.arena.push(bone);
                console.log("played right successfully");
                console.log("rotate SVG +90 degrees");

                return true;
            } else if(bone.boneVal[0] === arenaRightBoneVal){
                
                this.arena.push(bone);
                console.log("played right successfully");
                console.log("rotate SVG -90 degrees");

                return true;
            } else {
                
                // right play not playable - make player draw
                //******************************* */
                //******************************* */
                //******************************* */
                return false;
            }
    }

    //this function will draw a bone/domino from the boneyard into the currentPlayerHand
    // draw(player) {
    //    let pickedBone = this.boneyard.bone 
    // }
    /*
    ********************************RUNNING GAMEPLAY FUNCTIONS END HERE**************
    ********************************RUNNING GAMEPLAY FUNCTIONS END HERE**************
    ********************************RUNNING GAMEPLAY FUNCTIONS END HERE**************
    ********************************RUNNING GAMEPLAY FUNCTIONS END HERE**************
    ********************************RUNNING GAMEPLAY FUNCTIONS END HERE**************
    */

    //Might need AI CLASS of PLAYER
    firstMoveAI(){

    }

    //Renders Arena for Terminal
    renderArena(){
        if (this.arena.length === 0){

            console.log("THE~~~ARENA");
            console.log("[]");
            return "[]"

        }else{
            let arenaString = ""

            console.log("THE~~~~ARENA");

            this.arena.forEach(bone => {
                arenaString += `[${bone.boneVal[0]}, ${bone.boneVal[1]}] ${bone.isReversed}, `
            })
            console.log(`Arena Len: ${this.arena.length} IDX is ${this.arena.length - 1} `)
            console.log(`Boneyard Remaining: ${this.boneyard.bones.length}`)
            return arenaString
        }

    }

}

export default Board;
