import React from "react";
import '../stylesheets/chatbox.css';
//this where user input text press send button

class Chatbox extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <form className="form-container">
                <div className="textarea-button-container">
                    <textarea 
                    className="send-textarea"
                    placeholder="Type a message..."
                    >

                    </textarea>
                    <button className="send-button">Send</button>
                </div>
            </form>
        )
    }
}
export default Chatbox;
