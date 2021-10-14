import { Component } from "react";


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
            <button onClick={this.props.clickPrev}>Previous</button>
            <button onClick={this.props.clickNext}>Next</button>
          </div>
        )
        break;
      case "end":
        this.buttons = (
          <div className="buttons">
            <button onClick={this.props.clickPrev}>Previous</button>
            <button>Finish</button>
          </div>
        )
        break;
      default:
        console.log("Start.");
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