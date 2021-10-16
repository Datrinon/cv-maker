import { Component } from "react";
import _ from "lodash";
import "../styles/print.css";
import "../styles/form.css";

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
 * props:
 * @param {string} forValue - Value for attribute 'for', provide as a camelCase.
 * @param {string} labelText - The label for the input.
 * @param {string} type - The type of the element.
 * @param {string} onChange - handler to sync the value with the state.
 * @param {string} value - The value for the element to start off with.
 * @param {boolean} required - Is input for the element required? True by default.
 * @param {{atrributeName : value}} others - 
 * Any other attribute to give to the element. Provide this as an object. e.g.
 * {minlength: 0}.
 * @returns {JSXElement}
 */
const Input = ({ forValue, labelText, type, onChange, onFocus, value, ...others }) => {

  forValue = toHyphenCase(labelText);

  let nameValue = toCamelCase(labelText);

  return (
    <label className="label" htmlFor={forValue}>
      <span className="label-display">{labelText}</span>
      <input className="input"
      id={forValue} name={nameValue} type={type} onFocus={onFocus}
        onChange={onChange} value={value} required={true} {...others} />
    </label>
  );
}

/**
 * Returns an input list-like element with a label. Suited for attributes that 
 * have array-like values. It accepts a prop, which contains the following
 * props:
 * @param {string} forValue - Value for attribute 'for', provide as a camelCase.
 * @param {string} labelText - The label for the input.
 * @param {string} onChange - handler to sync the value with the state.
 * @param {[]} values - The value for the element to start off with.
 * @param {boolean} required - Is input for the element required? True by default.
 * @param {{atrributeName : value}} others - 
 * Any other attribute to give to the element. Provide this as an object. e.g.
 * {minlength: 0}.
 * @returns {JSXElement}
 */
const ListInput = ({ forValue, labelText, onFocus, onChange, onAdd, onRemove, values, ...others }) => {

  forValue = toHyphenCase(labelText);

  // in this case, value is an array.
  let bullets = values.map((value, index) => {
    return (<input
      className="input-list"
      key={labelText + index}
      name={toCamelCase(labelText)}
      type={"text"}
      value={value}
      onFocus={onFocus}
      onChange={onChange.bind(null, index)}
      required={false}
      {...others}
    />
    );
  });

  return (
    <div className="input-list-container">
      <label className="label-list" htmlFor={forValue}>
        <span className="label-display">{labelText}</span>
        {bullets}
      </label>
      <button data-field={toCamelCase(labelText)} type="button" onClick={onAdd}>Add +</button>
      <button data-field={toCamelCase(labelText)} type="button" onClick={onRemove}>Remove -</button>
    </div>
  );
}


const inputToElement = (array, props) => {
  return array.map((elem, index) => {
    let input = <Input
      key={elem.label.replace(" ", "") + index}
      forValue={elem.label}
      labelText={elem.label}
      type={elem.type}
      onChange={props.onChange}
      onFocus={props.onFocus}
      value={props["data"][toCamelCase(elem.label)]}
      {...elem.other}
    />;

    return input;
  })
}


/**
 * Convert inputs to elements; meant for sections where there are multiple 
 * details allowed (e.g. Education, Skills). In such instances, the array
 * is 2-dimensional.
 */
const inputsToElementSubsection = (array, props) => {
  let wrapper;
  let elements = [];

  array.forEach((inputSection, index) => {
    let inputElements = inputSection.map((elem, inputIndex) => {
      let key = elem.label.replace(" ", "") + index.toString() + inputIndex.toString()
      let input;
      if (elem.type === "list") {
        input = <ListInput
          key={key}
          forValue={elem.label}
          labelText={elem.label}
          onFocus={props.onFocus}
          onChange={props.onSubsectionListChange.bind(null, index)}
          onAdd={props.onSubsectionListAdd.bind(null, index)}
          onRemove={props.onSubsectionListRemove.bind(null, index)}
          values={props["data"][index][toCamelCase(elem.label)]}
          {...elem.other}
        />
      } else {
        input = <Input
          key={key}
          forValue={elem.label}
          labelText={elem.label}
          type={elem.type}
          onChange={props.onChange.bind(null, index)}
          onFocus={props.onFocus}
          value={props["data"][index][toCamelCase(elem.label)]}
          {...elem.other}
        />;
      }

      return input;
    });

    let RemoveButton = () => {
      if (props.data.length <= 1) { return null; }
      return (
        <button
          className="remove-subsection"
          type="button"
          onClick={props.onSubsectionRemove.bind(null, props.section, index)}>
          Remove Subsection
        </button>
      );
    }

    let key = "section" + index;
    let subsection = (
      <div key={key} className={key}>
        <div className="inputs">
          {inputElements}
        </div>
        <RemoveButton />
      </div>
    );

    elements.push(subsection);
  });

  wrapper = (
    <div className="subsections">
      {elements}
    </div>
  )

  return wrapper;
}


/**
 * The personal section of the resume.
 */
const PersonalSection = (props) => {
  if (props.activeSection !== props.section) {
    return null;
  }

  const inputs = [
    { label: "First Name", type: "text"},
    { label: "Last Name", type: "text" },
    { label: "Address", type: "text" },
    { label: "City", type: "text" },
    { label: "State", type: "text" },
    { label: "ZIP", type: "text" },
    { label: "Email", type: "email" },
    { label: "Phone", type: "text" }
  ];

  const inputElements = inputToElement(inputs, props);

  return (
    <div className="form-section personal-section">
      <FormSectionHeader title="Personal Information" />
      {inputElements}
    </div>
  )
}

/**
 * Generic wrapper for a section with has repeatable subsections. Like skills,
 * education, or experience.
 * @param {*} props 
 * @returns 
 */
function SectionWithSubsections(props) {
  if (props.activeSection !== props.section) {
    return null;
  }
  // template
  // section title
  let inputs = [];

  // clone input element for the number of states in there.
  for (let i = 0; i < props.data.length; i++) {
    inputs.push(_.cloneDeep(props.template));
  }

  let inputElements = inputsToElementSubsection(inputs, props);

  let addSubsection = async (ev) => {
    inputs.push(_.cloneDeep(props.template));
    // insert callback to push a new object here.
    await props.onSubsectionAdd(props.section)
    // turns out we didn't even need to update inputElements... it automatically rerenders.
  }

  let AddSubsectionButton = () => (
    <button className="add-subsection" type="button" onClick={addSubsection}>Add Subsection</button>
  );

  return (
    <div className={props.section + "-section" + " form-section"} >
      <FormSectionHeader title={props.section} />
      {inputElements}
      <AddSubsectionButton />
    </div>
  );
}

function FinishSection(props) {
  if (props.activeSection !== props.section) {
    return null;
  }

  return (
    <div className="review-section section">
      <h2 className="caption">Ready to use your resume?</h2>
      <div className="controls">
        <button className="print" type="button" onClick={getPDF}>Save to PDF</button>
        <button className="reset"
          type="button"
          disabled={props.usingDefault}
          onClick={props.resetForm}>
            Reset All Fields
        </button>
      </div>
    </div>
  )
}

function getPDF() {
  window.print();
}

class Form extends Component {

  constructor(props) {
    super(props);

    this.educationSection = {
      title: "education",
      template: [
        { label: "Degree", type: "text" },
        { label: "Major", type: "text" },
        { label: "School", type: "text" },
        { label: "Location", type: "text" },
        { label: "GPA", type: "text" },
        { label: "From", type: "text" },
        { label: "To", type: "text" }
      ]
    }

    this.experienceSection = {
      title: "experience",
      template: [
        { label: "Position", type: "text" },
        { label: "Company", type: "text" },
        { label: "Location", type: "text" },
        { label: "From", type: "text" },
        { label: "To", type: "text" },
        { label: "Responsibilities", type: "list" }
      ]
    }

    this.skillsSection = {
      title: "skills",
      template: [
        { label: "Category", type: "text" },
        { label: "Skills", type: "list" }
      ]
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="form">
        <PersonalSection
          data={this.props.resume.personal}
          section={"personal"}
          onChange={this.props.onChange.bind(null, "personal")}
          onFocus={this.props.setActiveSection.bind(null, "personal")}
          activeSection={this.props.activeSection}
        />
        <SectionWithSubsections
          section={this.educationSection.title}
          template={this.educationSection.template}
          data={this.props.resume.education}
          onChange={this
            .props
            .onMultiChange
            .bind(null, this.educationSection.title)}
          onSubsectionAdd={this.props.onSubsectionAdd}
          onSubsectionRemove={this.props.onSubsectionRemove}
          onFocus={this
            .props
            .setActiveSection
            .bind(null, this.educationSection.title)}
          activeSection={this.props.activeSection}
        />
        <SectionWithSubsections
          section={this.experienceSection.title}
          template={this.experienceSection.template}
          data={this.props.resume.experience}
          onChange={this
            .props
            .onMultiChange
            .bind(null, this.experienceSection.title)}
          onSubsectionAdd={this.props.onSubsectionAdd}
          onSubsectionRemove={this.props.onSubsectionRemove}
          onSubsectionListChange={this
            .props
            .onMultiListChange
            .bind(null, this.experienceSection.title)}
          onSubsectionListAdd={this
            .props
            .onMultiListAdd
            .bind(null, this.experienceSection.title)}
          onSubsectionListRemove={this
            .props
            .onMultiListRemove
            .bind(null, this.experienceSection.title)}
          onFocus={this
            .props
            .setActiveSection
            .bind(null, this.experienceSection.title)}
          activeSection={this.props.activeSection}
        />
        <SectionWithSubsections
          section={this.skillsSection.title}
          template={this.skillsSection.template}
          data={this.props.resume.skills}
          onChange={this
            .props
            .onMultiChange
            .bind(null, this.skillsSection.title)}
          onSubsectionAdd={this.props.onSubsectionAdd}
          onSubsectionRemove={this.props.onSubsectionRemove}
          onSubsectionListChange={this
            .props
            .onMultiListChange
            .bind(null, this.skillsSection.title)}
          onSubsectionListAdd={this
            .props
            .onMultiListAdd
            .bind(null, this.skillsSection.title)}
          onSubsectionListRemove={this
            .props
            .onMultiListRemove
            .bind(null, this.skillsSection.title)}
          onFocus={this
            .props
            .setActiveSection
            .bind(null, this.skillsSection.title)}
          activeSection={this.props.activeSection}
        />
        <FinishSection
          activeSection={this.props.activeSection}
          section={"review"}
          usingDefault={this.props.usingDefault}
          resetForm={this.props.resetForm}
        />
      </div>
    );
  }
}

export default Form;