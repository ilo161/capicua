import React from "react";
import '../stylesheets/music.css';


const track1 = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3";
const track2 = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3";
const track3 = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3";

class Music extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedTrack: null,
            player: "stopped",
            value: null
        }

        this.soundCheck =this.soundCheck.bind(this);
    }
    // state = {
    //     selectedTrack: null,
    //     player: "stopped",
    //     value: 100

    // }

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


    render(){
        const musicList = [
            { id: 1, title: "Plain" },
            { id: 2, title: "Mild" },
            { id: 3, title: "Caliente"}
        ].map(item => {
            return(
                <li
                key={item.id}
                onClick={() => this.setState({selectedTrack: item.title})}
                >
                    {item.title} {/* this is where i change and insert a photo */}
                </li>
            )
        })
        return(
        <div className="music-container">
            <h1>Play Song</h1>
            <div className="songs-container">
                <ul className="songs">{musicList}</ul>
            </div>
            <div>
                {this.state.player === "paused" && (
                    <button onClick={() => this.setState({ player: "playing" })}>
                        Play
                    </button>
                )}
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
            <input 
            type="range" 
            min="0" 
            max="1" 
            defaultValue="1" 
            className="volume-slider"
            step="0.01"
            onChange={this.soundCheck} 
            />
        </div>)
    }
}

export default Music;