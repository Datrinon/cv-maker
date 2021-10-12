import { Component } from "react";

/**
 * Convert a camel-cased word into a spaced word.
 * @param {string} word 
 */
 const toHyphenCase = (word) => {
  word = word.toLowerCase();
  word = word.replace(" ", "-");

  return word;
}

/**
 * Convert a word into a camel-cased word.
 * @param {string} word 
 * @returns 
 */
const toCamelCase = (word) => {
  if (!word.includes(" ")) {
    return word.toLowerCase();
  }
  
  let hyphenRegex = /(-|\s)(.)/g;
  
  word = word.replaceAll(hyphenRegex, (match, c1, c2) => {
    return c2.toUpperCase();
  })

  word = word[0].toLowerCase() + word.slice(1, word.length);

  return word;
}


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
 * @param {string} onChange - handler to sync the value with the state.
 * @param {string} value - The value for the element to start off with.
 * @param {boolean} required - Is input for the element required? True by default.
 * @param {{atrributeName : value}} others - 
 * Any other attribute to give to the element. Provide this as an object. e.g.
 * {minlength: 0}.
 * @returns 
 */
const Input = ({forValue, labelText, type, onChange, value, ...others}) => {

  forValue = toHyphenCase(labelText);

  let nameValue = toCamelCase(labelText);

  return (
    <label htmlFor={forValue}>
      <span>{labelText}</span>
      <input id={forValue} name={nameValue} type={type}
      onChange={onChange} value={value} required={true} {...others}/>
    </label>
  );
}

const inputToElement = (array, props) => {
  return array.map((elem, index) => {
    let input = <Input
      key = {index}
      forValue={elem.label}
      labelText={elem.label}
      type={elem.type}
      onChange={props.onChange}
      value={props["data"][toCamelCase(elem.label)]}
      {...elem.other}
    />;

    return input;
  })


}


/**
 * For sections which do not have repeating components, e.g. a 
 */
const PersonalSection = (props) => {
  let inputs = [
    {label: "First Name", type: "text", other: {placeholder:"Danny"}},
    {label: "Last Name", type: "text"},
    {label: "Address", type: "text"},
    {label: "City", type: "text"},
    {label: "State", type: "text"},
    {label: "ZIP", type: "text"},
    {label: "Email", type: "email"},
    {label: "Phone", type: "text"}
  ];

  const inputElements = inputToElement(inputs, props);

  return (
    <div className="personal-section">
      <FormSectionHeader title="1. Personal Section"/>
      {inputElements}
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