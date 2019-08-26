// useEffect replaces lifecycle hooks/methods for functions when using hooks
// other main hook is useState
import React, { useEffect, useRef, useContext } from 'react';
import styles from './Cockpit.module.css';
import AuthContext from '../../context/auth-context';

const cockpit = (props) => {

    // auto toggle/click button when app opens
    // [] = do first time only
    const toggleButtonRef = useRef(null);
    useEffect(() => {
        toggleButtonRef.current.click();
    }, []);

    const authContext = useContext(AuthContext);

    // executes every render cycle
    // will only execute if cockpit changes
    // run useEffect when cockpit changes - 
    // replaces component methods componentDidMount, componentDidUpdate
    useEffect(() => {
        console.log('[Cockpit.js] useEffect');
        // example to simulate http call
        setTimeout(() => {
            // alert('timeout!')
        }, 1000);
        // return executes same as componentWillUnmount
        return () => {
            console.log('[Cockpit.js] useEffect cleanup')
        }
        // run when persons changes
    }, [props.persons]);
    // empty array indicates useEffect should run only first time
    // }, []);

    // the return runs on all changes. can be used to reset any data every time
    useEffect(() => {
        console.log('[Cockpit.js] 2nd useEffect');
        return () => {
            console.log('[Cockpit.js] useEffect 2nd cleanup')
        }
    });

    const classes = [];
    let btnClass = '';

    if (props.showPersons) {
        btnClass = styles.Red;

        if (props.personsLength <= 2) {
            classes.push(styles.red)
        };

        if (props.personslength <= 1) {
            classes.push(styles.bold)
        };
    };

    return (
        <div className={styles.Cockpit}>
            <h1>I am a React App</h1>
            <p className={classes.join(' ')}>This works!</p>
            <button ref={toggleButtonRef} className={btnClass}
                onClick={props.toggle}>Toggle Persons
            </button>
            {/* <authContext.Consumer> */}
                {/* {context => <button onClick={context.login}>Log In</button>} */}
            {/* </authContext.Consumer> */}

            <button onClick={authContext.login}>Log In</button>

        </div>

    )
};


// export default cockpit;
// React.memo used to detect changes instead of class method shouldComponentUpdate
// pesronsLength checked above to see if anything changed
export default React.memo(cockpit);
