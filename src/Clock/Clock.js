import React from "react";
import "./Clock.css";

// Stateful component must be class (has stateful object)
class Clock extends React.Component {
  // same as function name + extends React.Component
  constructor(props) {
    // always pass props to constructor, to pass use in super()
    super(props); // Super allows use of parent props from React.Component (parent constructor doesnt care of name)
    this.state = {
      date: new Date(),
      seconds: new Date(),
      counter: this.props.initial,
      isToggleOn: false
    };
    this.add = 1;
    this.handleClick = this.handleClick.bind(this); //bind to make 'this.handleClick' available in callback
  }

  componentDidMount() {
    // lifecycle hook called to update state after first render
    this.timerID = setInterval(() => this.tick(), 1000); //create ID and call tick every second
    this.timerID = setInterval(() => this.addNumber(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  addNumber() {
    if (this.state.isToggleOn === false) {
      this.setState((prevState, props) => ({
        counter: prevState.counter + this.add
      }));
    }
  }

  tick() {
    if (this.state.isToggleOn === false) {
      this.setState({
        // setState = render again
        date: new Date(),
        seconds: new Date()
      });
    }
  }

  zeroSecs(id) {
    if (this.state.isToggleOn === false && id === "counter") {
      this.setState(prevState => ({
        counter: 0
      }));
    }
  }

  render() {
    // Renders after constructor and calls componentDidMount after seeing 'state'
    const toggle = this.state.isToggleOn;
    const clock = this.state.date.toLocaleTimeString();
    const seconds = this.state.seconds.getSeconds();
    const counter = this.state.counter;
    return (
      // call this.state to indicate update
      <div className="timers row">
        <GetClock toggle={toggle} clock={clock} />
        <GetSeconds toggle={toggle} seconds={seconds} />
        <GetCounter toggle={toggle} counter={counter} />
        <div className="clock-buttons">
          <Toggle toggle={toggle} handleClick={this.handleClick} />
          <button
            className="btn btn-primary btn-sm"
            onClick={this.zeroSecs.bind(this, "counter")}
          >
            Reset sec counter
          </button>
        </div>
      </div>
    );
  }
}

function GetClock(props) {
  if (props.toggle) {
    return <h2> clock off </h2>;
  } else {
    return <h2> {props.clock} </h2>;
  }
}
function GetSeconds(props) {
  if (props.toggle) {
    return <h2> seconds off </h2>;
  } else {
    return <h2> {props.seconds}s </h2>;
  }
}
function GetCounter(props) {
  if (props.toggle) {
    return null; // dont render
  } else {
    return <h2 id="counter"> {props.counter} </h2>;
  }
}
function Toggle(props) {
  return (
    <button className="btn btn-primary btn-sm" onClick={props.handleClick}>
      {props.toggle ? "ON" : "OFF"}
    </button>
  );
}

export default Clock;
