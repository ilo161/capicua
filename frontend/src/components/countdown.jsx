import React from "react"

class Countdown extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            countdownStatus: undefined
        }
        this.countdownTicker = 10;
        this.countdown = this.countdown.bind(this);
        this.countdownID = undefined;
    }
    countdown() {
        this.setState({countdownStatus: this.countdownTicker})
        this.countdownTicker = (this.countdownTicker - 1)
        // debugger
        this.countdownID = setTimeout(this.countdown, 1000);
        if (this.countdownTicker === -1) {
            if (this.props.endGame) {
                this.props.restartGame(null, true)
                // debugger
                // clearTimeout(this.countdownID);
                // debugger
            } else {
                this.props.restartGame()
                // clearTimeout(this.countdownID);
            }
            this.countdownTicker = 10;
        }
        this.setState({ state: this.state });
        // return this.countdownTicker
    }

    componentDidMount() {
        this.countdown();
    }
    componentWillUnmount(){
        clearTimeout(this.countdownID);
        // fixes Warning: Can't perform a React state update on an unmounted component
        this.setState = (state, callback) => {
            return;
        }
    }
    render(){
        return(
            <>
                New Round begins in: {this.state.countdownStatus}
            </>
        )
    }
}

export default Countdown;