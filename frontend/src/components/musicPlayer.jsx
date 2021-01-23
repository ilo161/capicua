import React from "react";
import '../stylesheets/music.css';
import basic from'../assets/music/BasicMusic.mp3'
import mild from'../assets/music/mildMusic.mp3'
import Caliente from'../assets/music/calienteMusic.mp3'
const track1 = basic;
const track2 = mild;
const track3 = Caliente;

class Music extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedTrack: "null",
            player: "stopped",
            value: null
        }

        this.soundCheck =this.soundCheck.bind(this);
        this.playMusic =this.playMusic.bind(this);
    }


    componentDidUpdate(prevProps, prevState){
        if (this.state.selectedTrack !== prevState.selectedTrack) {
            let track;
            switch (this.state.selectedTrack) {
                case "Plain":
                    track = track1
                    break;
                case "Mild":
                    track = track2
                    break;
                case "Caliente":
                    track = track3
                    break;
                default:
                    break;
            }
            
            if (track) {
                this.player.src = track;
                this.player.play();
                
                this.setState({ player: "playing"})
            }
        }
        if (this.state.player !== prevState.player) {
            if (this.state.player === "paused") {
              this.player.pause();
            } else if (this.state.player === "stopped") {
              this.player.pause();
              this.setState({ selectedTrack: null });
            } else if (
              this.state.player === "playing" &&
              prevState.player === "paused"
            ) {
              this.player.play();
            }
          }
    }
    soundCheck(event) {
        // debugger
        this.setState({value: event.target.value});
        this.player.volume = this.state.value
        console.log(this.state.value)
    }

    playMusic(){
        debugger
        
        if ((this.state.player === "stopped" || this.state.player === "paused")){
            this.setState({ player: "playing", selectedTrack: this.state.selectedTrack })
            debugger
        }
        debugger
    }


    render(){
        const musicList = [
            { id: 1, title: "Plain" },
            { id: 2, title: "Mild" },
            { id: 3, title: "Caliente"}
        ].map(item => {
            {/* this is where i change and insert a photo */ }
            return(
                <li
                className="song1"
                key={item.id}
                onClick={() => this.setState({selectedTrack: item.title})}
                >
                    {item.title} 
                </li>
            )
        })

    
        
        return(
        <div className="music-container">
            <h1 className="music-title">Play Song</h1>
            <div className="songs-container">
                <ul className="songs">{musicList}</ul>
            </div>
            <div>
                {this.state.player === "paused" && (
                    <button onClick={() => this.setState({ player: "playing" })}>
                        Play
                    </button>
                )}

                
                    {/* <button onClick={this.state.player === "paused" && (() => this.setState({ player: "playing" }))}>
                        Play
                    </button>
              */}



                    {/* <button onClick={this.playMusic}>
                        Play
                    </button> */}
                {this.state.player === "playing" && (
                    <button onClick={() => this.setState({ player: "paused" })}>
                        Pause
                    </button>
                )}
                {this.state.player === "playing" || this.state.player === "paused" ? (
                    <button onClick={() => this.setState({ player: "stopped" })}>
                        Stop
                    </button>
                ) : (
                    ""
                )} 
             </div>
            <audio ref={ref => (this.player = ref)} />
            <div className="music-vol-container">

                <input 
                className="music-vol"
                type="range" 
                min="-0.0" 
                max="1" 
                defaultValue="1" 
                className="volume-slider"
                step="0.01"
                onChange={this.soundCheck} 
                />
            </div>
        </div>)
    }
}

export default Music;