import { Component } from "react";

const FormSectionHeader = (props) => {
  return (
    <h1 className="section-title">{props.title}</h1>
  )
}

/**
 * Returns an input element with a label. Accepts a prop, which contains the following
 * props.
 * @param {string} forValue - Value for attribute 'for', provide as a camelCase.
 * @param {string} labelText - The label for the input.
 * @param {string} type - The type of the element.
 * @returns 
 */
const Input = ({forValue, labelText, type, onChange, value}) => {
  let hyphenRegex = /-(.)/g;
  let nameValue = forValue.replaceAll(hyphenRegex, (match, c1) => {
    return c1.toUpperCase();
  });

  return (
    <label htmlFor={forValue}>
      {labelText}
      <input id={forValue} name={nameValue} type={type} onChange={onChange} value={value} />
    </label>
  );
}

/**
 * For sections which do not have repeating components, e.g. a 
 */
const PersonalSection = (props) => {
  return (
    <div className="personal-section">
      <FormSectionHeader title="1. Personal Section"/>
      <Input forValue="first-name" labelText="First Name"
          type="text" onChange={props.onChange} value={props.data.firstName} />
    </div>
  )
}

class Form extends Component{
  render() {
    return (
      <form className="form">
        <PersonalSection
          data={this.props.resume.personal}
          onChange={this.props.onChange.bind(null, "personal")}/>
      </form>
    );
  }
}

export default Form;