import React from 'react';
import styles from './Person.module.css';
// import Radium from 'radium';

// this is a stateless component 
// uses function, not class
// best practice is to use stateless as much as possible

// props.click is func passed from Person component in App.js
// props.children excutes whatever is before the "normal" 
// closing of the component - either text or {js}
const person = (props) => {
    // const style = {
    //     '@media (min-width: 500px)': {
    //         width: '450px'
    //     }
    // };

    return (
        // <div className='Person' style={style}>
        // <div className='Person'>
        <div className={styles.Person}>
            <p onClick={props.click}>I'm {props.name} and {props.age} years old</p>
            <p>{props.children}</p>
            <input type='text' onChange={props.changed} value={props.name} />
        </div>
    );

};

// export default Radium(person);
export default person;
