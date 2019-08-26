// import React from 'react'
// import React, { Component } from 'react';
// PureComponent auto checks to see if there are any changes
// and removes need for shouldComponentUpdate
import React, { PureComponent } from 'react';
import Person from './Person/Person';
import AuthContext from '../../context/auth-context';

// const persons = (props) => {
//     console.log('[Persons.js] rendering...', props);
//     return (
//         props.persons.map((person, index) => {
//             return <Person
//                 name={person.name}
//                 age={person.age}
//                 key={person.id}
//                 click={() => props.clicked(index)}
//                 changed={(event) => props.changed(event, person.id)}>
//                 My Hobby is eating {console.log('test')}
//             </Person>
//         })
//     );
// };

// converted to Class to allow use of lifecycle hooks
// class Persons extends Component {
class Persons extends PureComponent {

    static getDerivedStateFromProps(props, state) {
        console.log('[Persons.js] getDerivedStateFromProps', props, state)
        return state;
    };
    // not needed if PureComponent used. 
    // PureComponent auto checks to see if there are any changes

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('[Persons.js] shouldComponentUpdate props: ', this.props, nextProps);
    //     console.log('[Persons.js] shouldComponentUpdate state: ', this.state, nextState);
    //     // prevent render if nothing changed
    //     return nextProps.persons !== this.props.persons ||
    //     // changed/clicked checked in case the function referenced may have changed 
    //     nextProps.changed !== this.props.changed ||
    //     nextProps.clicked !== this.props.clicked;
    //     // return true;
    // };

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('[Persons.js] getSnapshotBeforeUpdate] props: ', prevProps, this.props);
        console.log('[Persons.js] getSnapshotBeforeUpdate] state: ', prevState, this.state);
        return ({ message: 'snapshot worked' });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[Persons.js] componentDidUpdate props: ', prevProps, this.props);
        console.log('[Persons.js] componentDidUpdate state: ', prevState, this.state);
        console.log('[Persons.js] componentDidUpdate snapshot', snapshot);

    };

    componentWillUnmount() {
        console.log('[Persons.js] componentWillUnmount');
    };

    render() {
        console.log('[Persons.js] rendering...', this.props);
        return (
            this.props.persons.map((person, index) => {
                return <div><p>Changes: {this.props.changeCounter}</p>
                    <Person
                        name={person.name}
                        age={person.age}
                        key={person.id}
                        // isAuth={this.props.isAuthenticated}
                        changeCounter={person.changeCounter}
                        click={() => this.props.clicked(index)}
                        changed={(event) => this.props.changed(event, person.id)}>
                        My Hobby is eating {console.log('test')}
                    </Person>
                </div>
            })
        );
    };

};

// export default persons;
export default Persons;
