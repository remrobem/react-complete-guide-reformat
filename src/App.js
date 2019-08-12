import React, { Component } from 'react';
// import Radium, { StyleRoot } from 'radium';
// import './App.css';
// this will use css-components
import styles from './App.module.css';
import Person from './Person/Person';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';
import InputText from './InputText/InputText';
import ValidationComponent from './ValidationComponent/ValidationComponent';
import CharComponent from './CharComponent/CharComponent';


// this is a statelful component 
// uses class, not function
// best practice is to use stateless as much as possible
// and have as few stateful components as possible
class App extends Component {
  state = {
    persons: [
      { id: '1', name: 'Rob', age: 888 },
      { id: '2', name: 'Sammy', age: 555 },
      { id: '3', name: 'Wanda', age: 333 }
    ],
    userName: 'Willie',
    showPersons: false,
    text: '',

  };

  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        { name: newName, age: 200 },
        { name: 'Sam', age: 300 },
        { name: 'Wanda', age: 400 }
      ]
    })
  }

  nameChangeHandler = (event, id) => {
    // get index of person changed
    const personIndex = this.state.persons.findIndex(person => {
      return person.id === id;
    });
    // older alternative to spread to get new copy of an object
    // const person = Object.assign({}, this.state.persons[personIndex]);

    // get copy of a person object
    const person = {
      ...this.state.persons[personIndex]
    };

    // new name in copy
    person.name = event.target.value;

    // new array contains original persons
    const persons = [...this.state.persons];
    // update new array with name
    persons[personIndex] = person;

    // setState to force page display
    this.setState({ persons: persons });

    // this.setState(
    //   {
    //     persons: [
    //       { name: 'Rob', age: 888 },
    //       { name: event.target.value, age: 555 },
    //       { name: 'Wanda', age: 333 }
    //     ]
    //   }
    // )
  };
  // id used to update correct entry in the persons array
  userNameChangeHandler = (event) => {
    this.setState({ userName: event.target.value })
  };

  togglePersonsHandler = () => {
    const doesShowPersons = this.state.showPersons;
    this.setState({ showPersons: !doesShowPersons });
    // this.setState({ showPersons: !this.state.showPersons });
  };

  deletePersonHandler = (personIndex) => {
    // best practice is to not create a reference
    // and change the original state which should be treated
    // as immutable
    // instead,
    // use spread or slice to create new array
    // const persons = this.state.persons;
    // const persons = this.state.person.slice();
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

  // render is executed whenever screen 
  // use normal js in render - return uses jsx
  render() {

    // const style = {
    //   backgroundColor: 'green',
    //   color: 'white',
    //   font: 'inherit',
    //   border: '1px solid blue',
    //   padding: '8px',
    //   cursor: 'pointer',
    //   // use Radium to allow use of psudeoselectors
    //   // ':hover': {
    //   //   backgroundColor: 'lightgreen',
    //   //   color: 'black'
    //   // }
    // };

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
    let btnClass = '';
    if (this.state.showPersons) {
      btnClass = styles.Red;
      persons = (
        <div>
          {
            this.state.persons.map((person, index) => {
              return <Person
                name={person.name}
                age={person.age}
                key={person.id}
                click={() => this.deletePersonHandler(index)}
                changed={(event) => this.nameChangeHandler(event, person.id)}>
                My Hobby is eating {console.log('test')}
              </Person>
            })
          }
          {/* <Person
            name={this.state.persons[0].name}
            age={this.state.persons[0].age} />
          <Person
            name={this.state.persons[1].name}
            age={this.state.persons[1].age}
            click={this.switchNameHandler.bind(this, 'Rob!')}
            changed={this.nameChangeHandler}
          >My Hobby is eating
          {console.log('test')}</Person>
          <Person
            name={this.state.persons[2].name}
            age={this.state.persons[2].age} /> */}

        </div>

      );
      // style.backgroundColor = 'red';
      // style[':hover'] = {
      //   backgroundColor: 'lightred',
      //   color: 'black'
      // }
    }
    // dynamically assign classes
    let classes = [];

    if (this.state.persons.length <= 2) {
      // classes.push('red')
      classes.push(styles.red)
    };

    if (this.state.persons.length <= 1) {
      // classes.push('bold')
      classes.push(styles.bold)
    };

    return (
      // wrap entire app in StyleRoot when @media used via Radium
      // <StyleRoot>
      // <div className="App">
      // use css-components
      <div className={styles.App}>
        <h1>I am a React App</h1>
        <p className={classes.join(' ')}>This works!</p>
        {/* don't use () in OnClick function name */}
        {/* need to bind to pass data */}
        <button className={btnClass}
          // style={style}
          // uses a reference to the method (function to execute)
          onClick={this.togglePersonsHandler}>Toggle Persons0</button>
        {/* <button
          style={style}
          // passes actual function to execute (arrow notation)
          onClick={() => this.togglePersonsHandler()}>Toggle Persons1</button>
        <button
          style={style}
          // if parameters are needed, passes actual function to execute (arrow notation)
          // alternative to bind but React may render more often then needed(perfromance problem)
          onClick={() => this.switchNameHandler('Rob-0')}>Switch Name0</button>
           */}
        {/* <button
          style={style}
          // best practice with React, bind this and parameters to reference of method
          // alternative to bind but React may render more often then needed(perfromance problem)
          onClick={this.switchNameHandler.bind(this, 'Rob-1')}>Switch Name1</button> */}

        {/* { */}
        {/* ternary check replaced with if in render, wrapped in {} because it is a simple js statement */}
        {/* block level js expressions not allowed in jsx */}
        {/* this.state.showPersons ? */}
        {/* div below was added to persons var in render and replaced with {persons}*/}
        {/* <div>
              <Person
                name={this.state.persons[0].name}
                age={this.state.persons[0].age} />
              <Person
                name={this.state.persons[1].name}
                age={this.state.persons[1].age}
                click={this.switchNameHandler.bind(this, 'Rob!')}
                changed={this.nameChangeHandler}
              >My Hobby is eating {console.log('test')}</Person>
              <Person
                name={this.state.persons[2].name}
                age={this.state.persons[2].age} />
              <UserInput changed={this.userNameChangeHandler} userName={this.state.userName} style={userInputStyle} />
              <UserOutput userName={this.state.userName} />
            </div> */}
        {/* : null */}
        {persons}
        {/* } */}

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

      </div>
      // </StyleRoot>
    );
  }
}

// export default Radium(App);
export default App;