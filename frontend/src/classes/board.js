const Boneyard = require("./boneyard")
const Player = require("./player")

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
         const mandatoryBoneIdxToPlay = this.init()
         this.firstMoveAndCorrectBone(mandatoryBoneIdxToPlay)

    }

    //Changes currentPlayer to the next player
    nextPlayerAssignTurn(){
       
        let idxCurrPlayer ;
        idxCurrPlayer = this.players.indexOf(this.currentPlayer)   


        this.currentPlayer = this.players[((idxCurrPlayer + 1) % this.players.length)]

        console.log("NEW CURRENT PLAYER");
        console.log(this.currentPlayer.username);
        this.currentPlayer.revealHand()
        console.log("*************");
    }

    makeMove(xPos, center, bone){

        // extracting the far left number on the arena
        const arenaLeftBoneVal = this.arena[0].boneVal[0];
        // extracting the far right number on the arena
        const arenaRightBoneVal = this.arena[this.arena.length-1].boneVal[1];
        
        // Player plays left side
        if(xPos < center){
            //we use this return of play in update Game in Game.jsx
           return this.playerPlaysLeft(arenaLeftBoneVal, bone);
        } else {
            // Player plays right side
            return this.playerPlaysRight(arenaRightBoneVal, bone)

        }
    }

    playerPlaysLeft(arenaLeftBoneVal, bone){
        //check bottom number of player hand bone first
        // second test checks top number of player hand bone second
        if(bone.boneVal[1] !== arenaLeftBoneVal && bone.boneVal[0] === arenaLeftBoneVal){
            bone.boneReverse();
            this.arena.unshift(bone);
            console.log("played left successfully");
            console.log("rotate SVG -90 degrees");

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
        if(bone.boneVal[0] !== arenaRightBoneVal && bone.boneVal[1] === arenaRightBoneVal){
                bone.boneReverse();
                this.arena.push(bone);
                console.log("played right successfully");
                console.log("rotate SVG -90 degrees");

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

            console.log("THE~~~ARENA");

            this.arena.forEach(bone => {
                arenaString += `[${bone.boneVal[0]}, ${bone.boneVal[1]}], `
            })

            console.log(`${arenaString}`)

            // return this.arena.map((bone) => {
            //     return bone.boneVal;
            // })


        }
        // this.currentPlayer.getPlayerInput()
    }

}
// one player
// let axiosPlayerObj = [{username: "Steven"}]


//Two players - without AI
// let axiosPlayerObj = [{username: "Steven"}, {username: "TinyPigOink!"}]

//with AI
// let axiosPlayerObj = [{username: "Steven"}, {username: "TinyPigOink!"}, {username: "Robot!", isAI: true } ]
// let axiosPlayerObj = [{username: "TinyPigOink!"}]
// let b1 = new Board(axiosPlayerObj)


module.exports = Board;