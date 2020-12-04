import React, { Component } from "react";

class Value extends Component {

    constructor(props) { 
        super(props);
        this.state = {};
    }
    
 
    
    render() {
        const arr = [3,1]
        return (
            <td dValue={arr} ></td>
        );
    }
    
    
  
}

export default Value;