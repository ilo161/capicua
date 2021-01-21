import React, { useState } from 'react';
import { Link } from "react-router-dom";
import io from "socket.io-client";
import HOST from "../../util/host";
import {GameViewComponent} from '../gameViewB';
import Lobby from "./lobby"

import './join.css';

// const Join = (props) => {
class Join extends React.Component{
    constructor(props){
      super(props)

      this.state = {
        gameType: undefined,
        title: undefined,
        username: "",
        totalPlayers: undefined,
        roomName: "",
        inOnline: "",
        buttonText: undefined,
        phase: "prelobby",
        gameState: "",
        aiMove: ""
        
      }

      this.socket = null;

      this.update = this.update.bind(this);
      this.handleStartSolo = this.handleStartSolo.bind(this);
      this.handlePhaseChange = this.handlePhaseChange.bind(this);
      this.receiveGameState = this.receiveGameState.bind(this);
      this.handleGameStart = this.handleGameStart.bind(this);
      this.receiveAiAutoPlayData = this.receiveAiAutoPlayData.bind(this);
    }

  componentDidMount(){
    // this.socket = io(HOST);
    // debugger
    
    if(this.props.location.state.isOnline === true){
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
    // console.log(this.state.username)
     return e => this.setState({[field]: e.currentTarget.value})
  }

  handleStartSoloServer(e, pingServer) {
    // debugger
    if(pingServer){
      this.socket.emit("startSoloGame", {username: this.state.username});
      this.setState({ roomName: this.socket.id });  
    } else {
      // this.setState
    }
    
  }

  handleGameStart(){
    this.socket.emit("gameStartRender")
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

    render(){

      let showInputField;
      let displayPhase;

      const chooseGameType = () => {
        if(this.state.gameType){
            switch(this.state.gameType){
              case "solo":
                return (
                  <div>
                    <input placeholder="Choose your Username"
                    value={this.state.username}
                    onChange={this.update("username")} className="joinInput" type="text" />
                  </div>
                )

                case "multiplayer":
                  return (
                    <>
                    <div>
                      <input placeholder="Choose your Username" className="joinInput" type="text" />
                    </div>
                    <div>
                      <input placeholder="Room" className="joinInput mt-20" type="text" />
                    </div>
                    </>
                  )
          }
        }
          
      }

      const displayPhaseFn = () => {
          const buttonToServer = <button className={'button mt-20'} 
                        onClick={(e) => this.handleStartSoloServer(e, true)}
                        type="submit">{this.state.buttonText}</button>

          const buttonToOfflineGame = <button className={'button mt-20'} 
                        onClick={(e) => this.handleStartSoloServer(e, false)}
                        type="submit">{this.state.buttonText}</button>
          switch(this.state.phase){
              case "prelobby":
                return (
                  <div className="joinOuterContainer">
                    <div className="joinInnerContainer">
                      <h1 className="heading">{this.state.title}</h1>
                      {showInputField}
                      {/* <Link to={`/lobby`} > */}
                      {/* {this.state.isOnline ? buttonToServer : } */}
                        <button className={'button mt-20'} 
                        onClick={this.handleStartSolo}
                        type="submit">{this.state.buttonText}</button>
                      {/* </Link> */}
                    </div>
                  </div>
                )

              case "soloLobby":
                // debugger

                if(this.state.gameState){
                    return (
                      // <GameViewComponent board={this.state.gameState}/>
                      <Lobby players={this.state.gameState.players}
                      totalPlayers={this.state.totalPlayers}
                      handleGameStart={this.handleGameStart}/>
                  )
                }

              case "soloGameStart":
                if(this.state.gameState){
                    // debugger
                    return(<GameViewComponent socket={this.socket} gameState={this.state.gameState}/>)
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