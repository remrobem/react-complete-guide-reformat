import React, { Component } from 'react';
// import Radium, { StyleRoot } from 'radium';
// import './App.css';
// this will use css-components
import styles from './App.module.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import UserInput from '../components/UserInput/UserInput';
import UserOutput from '../components/UserOutput/UserOutput';
import InputText from '../components/InputText/InputText';
import ValidationComponent from '../components/ValidationComponent/ValidationComponent';
import CharComponent from '../components/CharComponent/CharComponent';
import WithClass from '../hoc/WithClass';
import withClass from '../hoc/withClass1';
import Aux from '../hoc/Auxillary';
import AuthContext from '../context/auth-context';


// this is a statelful component 
// uses class, not function
// best practice is to use stateless as much as possible
// and have as few stateful components as possible
class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] constructor')
  }
  // this is more modern way of setting state initially
  // it does call super props when used this way
  // could do it in constructor using this.state = .....
  state = {
    persons: [
      { id: '1', name: 'Rob', age: 888, changeCounter: 0 },
      { id: '2', name: 'Sammy', age: 555, changeCounter: 0 },
      { id: '3', name: 'Wanda', age: 333, changeCounter: 0 }
    ],
    userName: 'Willie',
    showPersons: false,
    text: '',
    showCockpit: true,
    authenticated: false,
  };

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps state: ', state);
    console.log('[App.js] getDerivedStateFromProps props: ', props);
    return state;
  };

  componentDidMount() {
    console.log('[App.js]componentDidMount', this.props, this.state);
  }

  shouldComponentUpdate(nextProps, nextState, snapshot) {
    console.log('[App.js] shouldComponentUpdate', this.props, nextProps);
    console.log('[App.js] shouldComponentUpdate', this.state, nextState);
    return true;
  }

  //setState should not depend on value in prior state
  // do not: counter = this.state.counter + 1
  switchNameHandler = (newName) => {
    this.setState((prevState, props) => {
      return {
        persons: [
          { name: newName, age: 200, changeCounter: 0 },
          { name: 'Sam', age: 300, changeCounter: 0 },
          { name: 'Wanda', age: 400, changeCounter: 0 }
        ]
      };
    });
  };

  nameChangeHandler = (event, id) => {

    const personIndex = this.state.persons.findIndex(person => {
      return person.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    // new name in copy
    person.name = event.target.value;
    person.changeCounter = person.changeCounter + 1;
    // new array contains original persons
    const persons = [...this.state.persons];
    // update new array with name
    persons[personIndex] = person;


    // setState to force page display
    this.setState((prevState, props) => {
      return { persons: persons };
    });
  };
  // id used to update correct entry in the persons array
  userNameChangeHandler = (event) => {
    this.setState({ userName: event.target.value })
  };

  togglePersonsHandler = () => {
    const doesShowPersons = this.state.showPersons;
    this.setState({ showPersons: !doesShowPersons });
  };

  deletePersonHandler = (personIndex) => {

    const persons = [...this.state.persons];

    persons.splice(personIndex, 1);
    // be sure to setState after changing array
    this.setState({ persons: persons })
  };

  textChangedHandler = (event) => {
    this.setState({ text: event.target.value });
  };

  deleteCharacterHandler = (charIndex) => {
    let characters = this.state.text.split('');
    characters.splice(charIndex, 1)
    characters = characters.join('');
    this.setState({ text: characters });
  };

  handleLogin = () => {
    this.setState({ authenticated: true })
  }

  render() {

    console.log('[App.js] render');

    const userInputStyle = {
      backgroundColor: 'lightSkyBlue',
      font: 'inherit',
      padding: '8px',
      cursor: 'pointer'
    };

    const textStyle = {
      backgroundColor: 'lightSkyBlue',
      font: 'inherit',
      padding: '8px',
      cursor: 'pointer',
      margin: '10px',
    };

    const charStyle = {
      display: 'inline-block',
      padding: '16px',
      textAlign: 'center',
      margin: '16px',
      border: '1px solid black',
    };

    const characters =
      this.state.text.split('').map((char, index) => {
        return <CharComponent
          char={char}
          style={charStyle}
          click={() => this.deleteCharacterHandler(index)}
          key={index}
        />
      }
      )

    let persons = null;

    if (this.state.showPersons) {

      persons =
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangeHandler}
          isAuthenticated={this.state.authenticated} />
    };

    return (

      // <div className={styles.App}>
      // replace div with WithClass as a wrapper to add html, styling, js code,...
      // <WithClass styles={styles.App}>
      // another way is with wrapped component. Uses an hoc component
      <Aux>
        {/* add this button to control disply of cockpit  */}
        {/* so the hooks unmount will run in Cockpit.js */}
        <button
          onClick={() => {
            this.setState({ showCockpit: false })
          }}>
          Remove Cockpit
        </button>
        {/* use context to avoid having to pass props down multi levels
        almost like a global prop */}
        <AuthContext.Provider value={
          {
            authenticated: this.state.authenticated,
            login: this.handleLogin
          }
        }>
          {this.state.showCockpit ?
            <Cockpit
              showPersons={this.state.showPersons}
              // add length to props so Cockpit can use React.memo to detect changes
              personsLength={this.state.persons.length}
              toggle={this.togglePersonsHandler}
            />
            : null
          }

          {persons}
        </AuthContext.Provider>

        <InputText
          changed={this.textChangedHandler}
          style={textStyle}
          textLength={this.state.text.length}
          text={this.state.text}
        />

        <ValidationComponent
          textMessageLength={this.state.text.length}
        />

        {characters}

        <UserInput
          changed={this.userNameChangeHandler}
          userName={this.state.userName}
          style={userInputStyle}
        />

        <UserOutput
          userName={this.state.userName}
        />

        {/* </WithClass> */}
      </Aux>
    );
  }
}

// export default Radium(App);
// export default App;
// using the wrappedComponent function
export default withClass(App, styles.App);
