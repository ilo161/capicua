import React, { useState } from 'react';
import { Link } from "react-router-dom";
import io from "socket.io-client";
import HOST from "../../util/host";
import {GameViewComponent} from '../gameViewB';
import ChooseAi from "../chooseAi"
import Lobby from "./lobby"
import {capitalize, truncate} from "../../util/strUtil"
import bodega from "../../assets/img/La_Bodega.jpg"

import './join.css';


class Join extends React.Component{
    constructor(props){
      super(props)

      this.state = {
        gameType: undefined,
        title: undefined,
        players: null,
        username: "",
        totalPlayers: undefined,
        roomName: "",
        isOnline: undefined,
        buttonText: undefined,
        phase: "prelobby",
        gameState: "",
        aiMove: "",
        numAiPlayers: undefined,
        joinOrCreate: undefined,
        placeholderError: "Choose your Username"
        
      }

      this.socket = null;

      this.update = this.update.bind(this);
      this.handlePhaseChange = this.handlePhaseChange.bind(this);
      this.receiveGameState = this.receiveGameState.bind(this);
      this.handleGameStart = this.handleGameStart.bind(this);
      this.handleSetJoinOrCreate = this.handleSetJoinOrCreate.bind(this);

      //testing
      this.handleStartSoloServer = this.handleStartSoloServer.bind(this);
      this.receiveAiAutoPlayData = this.receiveAiAutoPlayData.bind(this);

      //Offline settings
      this.handleSetAiPlayers = this.handleSetAiPlayers.bind(this);
    }

  componentDidMount(){
    // this.socket = io(HOST);
    // debugger
    
    if(this.props.location.state.isOnline === true){
      debugger
      this.socket = io(HOST);
      this.socket.on('connect', socket => {

      console.log("hooray")

      
      this.socket.on("changePhase", this.handlePhaseChange)
      this.socket.on("receiveGameState", this.receiveGameState)
      this.socket.on("AiAutoPlayData", this.receiveAiAutoPlayData)

      
      })
    }
    

    this.setState({title: this.props.location.state.title,
                   gameType: this.props.location.state.gameType,
                   buttonText: this.props.location.state.buttonText,
                   totalPlayers: this.props.location.state.totalPlayers,
                   isOnline: this.props.location.state.isOnline
                  }) 

    // if(this.state.phase === "solo"){
    //     this.socket.emit("askingForGameState", this.roomName)
    // }
  }

  componentDidUpdate(prevProps) {
    // debugger
    // if(prevProps.history.location.state.phase == "prelobby"){
    //   if(prevProps.history.location.state.phase !== this.state.phase){
    //     debugger
    //     this.socket.emit("askingForGameState", this.roomName)
    //   }
    // }

    // if(this.state.phase === "soloLobby"){
    //   debugger
    //   this.socket.emit("askingForGameState", this.roomName)
    // }
  }

  update(field){
    let truncated; 
    return e => {
      if(e.currentTarget.value.length > 12){
          truncated = truncate(e.currentTarget.value, 12);
      } else if(e.currentTarget.value.length > 0){
          this.setState({[field]: truncated ? capitalize(truncated) : capitalize(e.currentTarget.value)})
      }else{
        this.setState({[field]:e.currentTarget.value})
      }
     }
  }

  handleStartSoloServer(e, isOnline) {
    debugger
    if(this.state.username != ""){
        if(isOnline){
          debugger
          this.socket.emit("startSoloGame", {username: this.state.username});
          this.setState({ roomName: this.socket.id });  
      } else {
          debugger
          this.setState({phase: "soloLobby"})
      }
    }else if(this.state.username === ""){
      this.setState({placeholderError: "Username cannot be empty"})
    }
    
    
  }

  handleGameStart(){
    if (this.state.isOnline){
      this.socket.emit("gameStartRender")
    } else {
      this.setState({phase: "soloGameStart"})
    }
  }

  handlePhaseChange(phase){
    // debugger
    this.setState({phase: phase})
    // debugger
    // this.receiveGameState()

  }

  receiveGameState(gameState) {
    // debugger
    this.setState({ gameState: gameState });
    debugger
  }
  
  receiveAiAutoPlayData(aiMove) {
      debugger
    this.setState({aiMove: aiMove})
  }

  handleSetAiPlayers(num){
    debugger
    this.setState({numAiPlayers: num})
  }

  handleSetJoinOrCreate(str){
    this.setState({joinOrCreate: str})
  }

    render(){

      let showInputField;
      let displayPhase;
      let players = [];

      
      
      // FN to generate AI Player objects 
      const generateAiPlayers = () => {
        // players.push({username: this.state.username})
        // debugger
        players.push({username: capitalize(this.state.username)})

        const superHeroes = ["Peter Parker", "Bruce Wayne", "Clark Kent", "Diane Prince", 
          "Barbara Gordon", "Kara Danvers", "Carol Danvers", "Wally West",
          "Jon Stewart", "Virgil Hawkins"]

        // const superHeroes = ["Peter Parker", "Bruce Wayne", "Clark Kent"]

          let aiPlayer;
          const existingUsernames = {}

          existingUsernames[this.state.username.toLowerCase()] = this.state.username.toLowerCase()

          //FN prevent duplicate names for iterative solution
          // const isDuplicate = (existingPlayer) => existingPlayer.username === aiPlayer.username
          
          
          for(let i = 0; i < this.state.numAiPlayers; i++){
              let randomIdx = Math.floor(Math.random() * superHeroes.length);
              let aiUsername = superHeroes[randomIdx];
              aiPlayer = {username: aiUsername, isAi: true}
            
              //hash access solution
                while(existingUsernames[aiPlayer.username.toLowerCase()] === aiPlayer.username.toLowerCase()){
                  debugger
                    randomIdx = Math.floor(Math.random() * superHeroes.length);
                    aiUsername = superHeroes[randomIdx];
                    aiPlayer = {username: aiUsername, isAi: true}
                }

              existingUsernames[aiPlayer.username.toLowerCase()] = aiPlayer.username.toLowerCase()
              players.push(aiPlayer)

          }

          this.setState({players: players}, ()=> {
            return players;
          })

      }

      // this sets the State with Random AI usernames
      if(!this.state.players && this.state.numAiPlayers){
        players = generateAiPlayers()
      }

      const chooseGameType = () => {
        const userAndRoomInput =
                    <>
                    <div>
                      <input placeholder={this.state.placeholderError}
                      value={this.state.username} 
                      onChange={this.update("username")} className="joinInput" type="text" />
                    </div>
                    <div>
                      <input placeholder="Room" 
                      value={this.state.roomName}
                      onChange={this.update("roomName")}
                      className="joinInput mt-20" type="text" />
                    </div>
                    </>
                  

        if(this.state.gameType){
            switch(this.state.gameType){
              case "solo":
                return (
                  <div>
                    <input placeholder={this.state.placeholderError}
                    value={this.state.username}
                    onChange={this.update("username")} className="joinInput" type="text" />
                  </div>
                )

                case "multiplayer":
                  // plus lobby phase
                  switch(this.state.joinOrCreate){

                    default: 
                      return(userAndRoomInput)

                  }
              
                  // return (
                  //   <>
                  //   <div>
                  //     <input placeholder={this.state.placeholderError}
                  //     value={this.state.username} 
                  //     onChange={this.update("username")} className="joinInput" type="text" />
                  //   </div>
                  //   <div>
                  //     <input placeholder="Room" className="joinInput mt-20" type="text" />
                  //   </div>
                  //   </>
                  // )
          }
        }
          
      }

      const displayPhaseFn = () => {
          let joinAndCreateText = ["Join Room", "Create Room"];
          let buttonToJoinServer;
          let buttonToCreateServer;
          let buttonToOfflineGame;

          if(this.state.buttonText){
            debugger
            buttonToJoinServer = <button className={'button mt-20'} 
                        onClick={(e) => this.handleStartSoloServer(e, true)}
                        type="submit">{this.state.buttonText[0]}</button>

            buttonToCreateServer = <button className={'button mt-20'} 
                        onClick={(e) => this.handleStartSoloServer(e, true)}
                        type="submit">{this.state.buttonText[1]}</button>

            buttonToOfflineGame = <button className={'button mt-20'} 
                        onClick={(e) => this.handleStartSoloServer(e, false)}
                        type="submit">{this.state.buttonText}</button>
          }
          

          // Simple dual button - Join - Create
          const joinAndCreateArr = joinAndCreateText.map(text => {
            let callbackFn;
            if(text === "Join Room"){
                callbackFn = (e) =>{
                 this.handleSetJoinOrCreate("join") 
                 this.handlePhaseChange("startServer")
                }
            }else {
                callbackFn = (e) => {
                  this.handleSetJoinOrCreate("create")
                  this.handlePhaseChange("startServer")
                }
            }
            return (
                    <button className={'button mt-20 mlr-5'} 
                        onClick={callbackFn}
                        type="submit">{text}
                    </button>
            )
          })

          switch(this.state.phase){
              case "prelobby":
                return (
                  <div className="joinOuterContainer">
                    <div className="joinInnerContainer">
                      <h1 className="heading">{this.state.title}</h1>
                        {/* <div className="flex-row-start evenly">  */}
                        {/* this.state.joinOrCreate === "join" */}
                        {this.state.isOnline ? 
                          <div className="flex-row-start evenly">{joinAndCreateArr}</div> : showInputField}

                        {this.state.isOnline ? null : buttonToOfflineGame}
                        
                    </div>
                    <img src={bodega} alt="bodega" className="bodega-img-splash" ></img>
                  </div>
                )

              case "startServer":
                      return(
                        <div className="joinOuterContainer">
                          <div className="joinInnerContainer">
                            <h1 className="heading">{this.state.title}</h1>
                              {showInputField}
                              {this.state.joinOrCreate === "join" ? 
                        buttonToJoinServer : buttonToCreateServer }
                          </div>
                          <img src={bodega} alt="bodega" className="bodega-img-splash" ></img>
                        </div>
                      )


              case "soloLobby":
                // debugger

                if(this.state.gameState){
                  //this starts an online Lobby
                    return (
                      // <GameViewComponent board={this.state.gameState}/>
                      <Lobby players={this.state.gameState.players}
                      totalPlayers={this.state.totalPlayers}
                      handleGameStart={this.handleGameStart}/>
                   )
                } else if(!this.state.isOnline && !this.state.numAiPlayers){
                    return (<ChooseAi handleSetAiPlayers={this.handleSetAiPlayers} 
                      username={this.state.username}/>)

                    
                } else if(this.state.players){
                  // debugger
                    return (<Lobby username={this.state.username} 
                        players={this.state.players}
                        totalPlayers={this.state.numAiPlayers + 1}
                        handleGameStart={this.handleGameStart}/> )
                }

              case "soloGameStart":
                debugger
                if(this.state.gameState){
                    // debugger
                    return(<GameViewComponent socket={this.socket} gameState={this.state.gameState}/>)
                } else if (!this.state.isOnline && this.state.players){
                  debugger
                }

              

                
              


          }
      }
      
      showInputField = chooseGameType();
      displayPhase = displayPhaseFn();
      // debugger

      return (
        <>
        {displayPhase}
        </>
      );
  }
}

export default Join;