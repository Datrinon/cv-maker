import "../styles/StartScreen.css";

import demo from "../images/resume.jpg";

import { Component } from "react";

class StartScreen extends Component{
  render() {
    if (this.props.hasStarted) {
      return null;
    }

    let previousResume = window.localStorage.getItem(this.props.storageKey);
    console.log(this.props.storageKey);
    console.log(previousResume);

    return (
      <div className="start-screen">
        <div className="menu">
          <h2 className="value-prop">Create a modern resume in minutes.</h2>
          <button className="begin" data-key="no-state" onClick={this.props.start}>
            Create a New Resume
          </button>
          <button className="previous" data-key="previous-state" onClick={this.props.start} 
            disabled={previousResume === null}>
            Continue Previous Resume
          </button>
          <button className="load-default" data-key="default-state" onClick={this.props.start}>
            Load Sample Resume
          </button>
        </div>
        <img
          className="sample-image"
          src={demo}
          alt="An example resume generated from the program."></img>
      </div>
    )
  }
}

export default StartScreen;