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
const Input = ({forValue, labelText, type}) => {
  let hyphenRegex = /-(.)/g;
  let nameValue = forValue.replaceAll(hyphenRegex, (match, c1) => {
    return c1.toUpperCase();
  });

  return (
    <label htmlFor={forValue}>
      {labelText}
      <input id={forValue} name={nameValue} type={type} />
    </label>
  );
}

/**
 * For sections which do not have repeating components, e.g. a 
 */
const PersonalSection = () => {
  return (
    <div className="personal-section">
      <FormSectionHeader title="1. Personal Section"/>
      <Input forValue="first-name" labelText="First Name" type="text" />
    </div>
  )
}

class ResumeForm extends Component {
  render() {
    return (
      <form className="form">
        <PersonalSection />
      </form>
    );
  }
}


class Form extends Component{
  render() {
    return (
    <section className="resume-maker">
      <ResumeForm />
    </section>
    );
  }
}

export default Form;