import { Component } from "react";

import "../styles/navigation.css";


class Navigation extends Component{
  buttons;

  getButtonElements() {
    console.log(this.props.progress);
    switch(this.props.progress) {
      case "start":
        this.buttons = (
          <div className="buttons">
            <button onClick={this.props.clickNext}>Next</button>
          </div>
        )
        break;
      case "mid":
        this.buttons = (
          <div className="buttons">
            <button onClick={this.props.clickPrev}>Prev</button>
            <button onClick={this.props.clickNext}>Next</button>
          </div>
        )
        break;
      case "end":
        this.buttons = (
          <div className="buttons">
            <button onClick={this.props.clickPrev}>Prev</button>
            <button onClick={this.props.clickNext}>Finish</button>
          </div>
        )
        break;
      case "review":
      default:
        this.buttons = null;
        console.log("No buttons shown.");
        break;
    }
  }
  
  render() {
    this.getButtonElements();

    return (
    <div className="navigation">
      {this.buttons}
    </div>
    );
  }
}

export default Navigation;