import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "./index.css";
import Clock from "./Clock/Clock";
import NameForm from "./NameForm";
import Calculator from "./Conversion";
import jQuery from "jquery";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
window.jQuery = jQuery;
require("bootstrap");
// import registerServiceWorker from './registerServiceWorker';

// const users = [
//   {id: 1, firstName: 'Artur', lastName: 'Maslov', avatarUrl: logo},
//   {id: 2, firstName: 'Marko', lastName: 'Other', avatarUrl: logo},
//   {id: 3, firstName: 'Gabriela', lastName: 'Maslova', avatarUrl: logo}
// ];

class NameFormsGen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rowsInput: "",
      rowsSubmitClicked: false
    };
    this.handleRowInput = this.handleRowInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleRowInput(e) {
    this.setState({ rowsInput: e.target.value });
    this.setState({ rowsSubmitClicked: false });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ rowsSubmitClicked: true });
  }

  render() {
    var submitClicked = this.state.rowsSubmitClicked;
    return (
      <span>
        <FormRow
          handleSubmit={this.handleSubmit}
          handleRowInput={this.handleRowInput}
          inputValue={this.state.rowsInput}
          labelText={"How many rows to render?"}
          submitClicked={submitClicked}
        />
        <FormResults
          submitClicked={submitClicked}
          inputValue={this.state.rowsInput}
        />
      </span>
    );
  }
}

function FormRow(props) {
  return (
    <form onSubmit={props.handleSubmit} className="row nameform-form">
      <label>
      {props.labelText + " "}
      <input
          type="text"
          value={props.inputValue}
          onChange={props.handleRowInput}
          maxLength="3"
        />
      </label>
      {isNaN(props.inputValue) ? (
        <p>Please input 3 digit number!</p>
      ) : (
        <input
          type="submit"
          value="Submit"
          className="btn btn-primary btn-sm"
        />
      )}
    </form>
  );
}
FormRow.propTypes = {
  handleSubmit: PropTypes.func,
  labelText: PropTypes.string,
  inputValue: PropTypes.string,
  handleRowInput: PropTypes.func
};

function FormResults(props) {
  if (
    props.submitClicked &&
    !isNaN(props.inputValue) &&
    props.inputValue !== ""
  ) {
    var nameForms = new Array(parseInt(props.inputValue, 10));
    for (var i = 0; i < nameForms.length; i++) {
      nameForms[i] = <NameForm key={i} />;
    }
    return <div className="nameforms">{nameForms}</div>;
  } else {
    return null;
  }
}
FormResults.propTypes = {
  submitClicked: PropTypes.bool,
  inputValue: PropTypes.string
};

// Always start React component with capital, ex. 'Greeting'
// Only DOM elements <div /> start with lowercase
class App extends React.Component {
  render() {
    return (
      <div className="App container">
        <b>
          <p className="props-class">{this.props.passprop}</p>
        </b>
        <Clock initial={1} />
        <NameFormsGen />
        <Calculator />
      </div>
    );
  }
}
App.propTypes = {
  passprop: PropTypes.string
};

ReactDOM.render(
  <App passprop="Hello React!" />,
  document.getElementById("root")
);
