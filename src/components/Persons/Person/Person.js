// import React from 'react';
import React, { Component } from 'react';
import Aux from '../../../hoc/Auxillary';
import styles from './Person.module.css';
import withClass from '../../../hoc/withClass1'
import PropTypes from 'prop-types';
import AuthContext from '../../../context/auth-context';
// import Radium from 'radium';

// this is a stateless component 
// uses function, not class
// best practice is to use stateless as much as possible

// props.click is func passed from Person component in App.js
// props.children excutes whatever is before the "normal" 
// closing of the component - either text or {js}
// const person = (props) => {

//     console.log(`[Person.js] render props: ${props}`);

//     return (
//         <div className={styles.Person}>
//             <p onClick={props.click}>I'm {props.name} and {props.age} years old</p>
//             <p>{props.children}</p>
//             <input type='text' onChange={props.changed} value={props.name} />
//         </div>
//     );
// };

// modified to be a Class so that lifecycle hooks can be used
class Person extends Component {
    // constructor added to use createRef. Used when handling arrays and want to
    // do something to one item in array.
    // can also be used for any html items
    constructor(props) {
        super(props);
        this.inputElementRef = React.createRef();
    };

    componentDidMount() {
        this.inputElementRef.current.focus();
        console.log('[Person.js] context ', this.context)
    };

    static contextType = AuthContext;

    render() {
        console.log(`[Person.js] render props: ${this.props}`);

        return (
            // <div className={styles.Person}>
            //     <p onClick={this.props.click}>I'm {this.props.name} and {this.props.age} years old</p>
            //     <p>{this.props.children}</p>
            //     <input type='text' onChange={this.props.changed} value={this.props.name} />
            // </div>

            // use of [] allows use of adjacent jsx(fon't need div wrapper)
            // note that need ending , (since it is an array) and key on each element
            // [
            //     <p key='k1' onClick={this.props.click}>I'm {this.props.name} and {this.props.age} years old</p>,
            //     <p key='k2'>{this.props.children}</p>,
            //     <input key='k3' type='text'
            //         onChange={this.props.changed}
            //         value={this.props.name} />
            // ]

            // use hoc (high-order component) method Aux
            // also allows adjacent elements (does not need div wrapper)
            // <Aux>
            //  //   <div className={styles.Person}>
            //         <p onClick={this.props.click}>I'm {this.props.name} and {this.props.age} years old</p>
            //         <p>{this.props.children}</p>
            //         <input type='text' onChange={this.props.changed} value={this.props.name} />
            //  //   </div>
            // </Aux>

            // React.Fragment is built into React and works same as <Aux> above
            <React.Fragment>
                {/* not needed when use contextType */}
                {/* <AuthContext.Consumer>
                    {context => context.authenticated ? <p>Logged On</p> : <p>Please Login</p>}
                </AuthContext.Consumer> */}

            { this.context.authenticated ? <p>Logged On</p> : <p>Please Login</p> }

                <p>Change Counter: {this.props.changeCounter}</p>
                <p onClick={this.props.click}>
                    I'm {this.props.name} and {this.props.age} years old
                </p>
                <p>{this.props.children}</p>
                <input type='text'
                    onChange={this.props.changed}
                    value={this.props.name}
                    ref={this.inputElementRef} />
            </React.Fragment>

        );
    }
};
// npm install --save prop-types
// console warning if data types don't match
Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func,
}
// export default Radium(person);
export default withClass(Person, styles.Person);
