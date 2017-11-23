import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './index.css';
import Clock from './Clock/Clock';
import NameForm from './NameForm';
import Calculator from './Conversion';
import jQuery from 'jquery';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
window.jQuery = jQuery;
require('bootstrap');
// import registerServiceWorker from './registerServiceWorker';

// const users = [
//   {id: 1, firstName: 'Artur', lastName: 'Maslov', avatarUrl: logo},
//   {id: 2, firstName: 'Marko', lastName: 'Other', avatarUrl: logo},
//   {id: 3, firstName: 'Gabriela', lastName: 'Maslova', avatarUrl: logo}
// ];

// Always start React component with capital, ex. 'Greeting'
// Only DOM elements <div /> start with lowercase
class App extends React.Component {
  render() {
      return (
        <div className="App container">
          <b><p className="props-class">{this.props.passprop}</p></b>
          <Clock initial={1} />
          <NameForm />
          <NameForm />
          <Calculator />
        </div>
      );
    }
}


ReactDOM.render(
  <App passprop='Hello React!'/>,
  document.getElementById('root')
);

