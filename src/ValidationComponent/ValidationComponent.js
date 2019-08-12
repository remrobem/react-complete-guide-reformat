import React from "react";

const viewComponent = (props) => {
    const textMessage = props.textMessageLength < 5 ? "Text too Short" : "Text long enough";
    return (
        <div>
            {textMessage}
        </div>
    )
};

export default viewComponent;