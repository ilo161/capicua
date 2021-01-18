import React, { useState } from 'react';
import { Link } from "react-router-dom";
import io from "socket.io-client";
import HOST from "../../util/host";

import './join.css';

// const Join = (props) => {
class Join extends React.Component{
    constructor(props){
      super(props)

      this.state = {
        title: undefined,
        gameType: undefined,
        buttonText: undefined,
        roomName: "",
        phase: "prelobby"
        
      }

      this.socket = null;
    }

  componentDidMount(){
    this.socket =  io(HOST);
    debugger

    this.socket.on('connect', socket => {

      console.log("hooray")
    })

    this.setState({title: this.props.location.state.title,
                   gameType: this.props.location.state.gameType,
                   buttonText: this.props.location.state.buttonText
                  }) 
  }

  handleStartSolo() {
    this.socket.emit("startSoloGame");
    this.setState({ roomName: this.socket.id });
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
                    <input placeholder="Choose your Username" className="joinInput" type="text" />
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

          switch(this.state.phase){
              case "prelobby":
                return (
                  <div className="joinOuterContainer">
                    <div className="joinInnerContainer">
                      <h1 className="heading">{this.state.title}</h1>
                      {showInputField}
                      <Link to={`/lobby`} >
                        <button className={'button mt-20'} 
                        type="submit">{this.state.buttonText}</button>
                      </Link>
                    </div>
                  </div>
                )
              


          }
      }
      
      showInputField = chooseGameType();
      displayPhase = displayPhaseFn();
      debugger

      return (
        <>
        {displayPhase}
        </>
      );
  }
}

export default Join;