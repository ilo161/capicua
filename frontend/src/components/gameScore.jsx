import React from "react";
import '../stylesheets/gameScore.css';
const currentPlayer = {username: "sergio", score: 68}
const names = [
    {username: "sergio", score: 68},
    {username: "yangel", score: 63},
    {username: "chris", score: 62},
    {username: "steven", score: 61}

]
 
class Score extends React.Component {

    render(){
        return(
            <div className="score-box-container">
            
                <div className="current-player">{currentPlayer.username} </div>
                
                <div className="score-container">
                {names.map((name) => (
                    <ul className="name-score-conatainer">
                        <li className="name-score" key={name.username}>Player: {name.username}</li>
                        <li className="name-score" key={name.score}> Score: {name.score}</li>
                    </ul>
                ))}
                
                    
                </div>
        
            </div>
        )
    }
}

export default Score