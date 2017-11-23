import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import logo from './logo.svg';

function formatName(props) {
  return props.firstName + ' ' + props.lastName;
}

function formatFruits(props) {
  return props.join(", ");
}

function Greeting(props) {
  return (
    <div className="col-md-6">
        <img className="greet-img" alt="logo" src={props.avatarUrl} />
        <h1>Hello, {formatName(props)}!</h1>
        <span>Your fruits: {formatFruits(props.fruits)}</span>
    </div>
  );
  // return <Goodbye firstName={props.firstName}/>;
}

function Goodbye(props) {
  return (
    <div className="bordered row">
      <span>Sorry, not 'Maslov'</span>
      <h1>Goodbye, {props.firstName}!</h1>
    </div>  
  );  
}

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	valueInput: '',
    	valueSelect: [],
    	submitClicked: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.options = [
      { value: 'apple', label: 'Apple' },
      { value: 'orange', label: 'Orange' },
      { value: 'grapes', label: 'Grapes' },
      { value: 'kivi', label: 'Kivi' }
    ];
    this.selectResult = [];
  }

  handleSelectChange(value) {
		this.setState({valueSelect: value});
		this.selectResult = value.map(a => a.value);
  }

  handleInputChange(event) {
  		this.setState({valueInput: event.target.value})
  }
  
  handleSubmit(event) {
  	// alert('Name: ' + this.state.valueInput + '\n' +
  	// 	  'Fruits: ' + this.selectResult + '\n');
    event.preventDefault(); // Prevents default HTML form submit behavior of opening new page
    this.setState({ submitClicked: true });
  }

  render() {
  	const valueInput = this.state.valueInput;
  	const valueSelect = this.state.valueSelect;
  	var inputSplit = this.state.valueInput.split(" ");
    var firstName = inputSplit[0];
    var lastName = inputSplit[1];
    var submitClicked = this.state.submitClicked;
    return (
      <div className="row">
      <form onSubmit={this.handleSubmit} className="name-form col-md-6">
	        <label>
	          Full Name (ex. John Johnson):
	          <input type="text" value={valueInput} onChange={this.handleInputChange}
	                 name="first-name" />
	        </label>
	        <label>
	          Pick your favorite fruits:
	          <Select
	            name="form-field-name"
	            value={valueSelect}
	            options={this.options}
	            onChange={this.handleSelectChange}
	            multi
	          />
	        </label>
	        <input type="submit" value="Submit" className="btn btn-primary btn-sm" />
      </form>
      { submitClicked && valueInput !== "" && valueSelect.length !== 0 ? 
	        	<Greeting firstName={firstName} lastName={lastName} 
	        	avatarUrl={logo} fruits={this.selectResult}/> 
	        	: null }
      </div>
    );
  }
}

export default NameForm;