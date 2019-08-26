import React from 'react';


const inputText = (props) => {
    return (
        <div>
            <p>Text Length: {props.textLength}</p>
            <textarea
                type='text'
                placeholder='Enter text'
                onChange={props.changed}
                value={props.text}
                style={props.style}
                rows="4"
                cols="50"
            />
        </div>
    )
}

export default inputText;