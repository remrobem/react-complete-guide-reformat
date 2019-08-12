import React from 'react';
// props changed is function passed from UserInput component
const userInput = (props) => {
    return (
        <div>
            <input type='text' onChange={props.changed} value={props.userName} style={props.style} />
        </div>
    )
}

export default userInput;