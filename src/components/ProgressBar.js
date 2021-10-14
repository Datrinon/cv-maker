import "../styles/ProgressBar.css"

import { Component } from "react";

class ProgressBar extends Component{
  render() {
    
    const sections = this.props.sections.map((section, index) => {
      const isActive =  (this.props.activeSection === section) ? "active" : "";
      return (
        <div
        key={index + "-" + section}
        className={"section " + isActive}
        onClick={this.props.jumpToSection.bind(null, index)}
        >
          <span className="index">{index + 1}</span>
          <p className="name">{section}</p>
        </div>
      )
    });

    return (
    <div className="progress-bar">
      {sections}
    </div>
    );
  }
}

export default ProgressBar;