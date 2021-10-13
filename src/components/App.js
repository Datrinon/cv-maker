import '../styles/App.css';
import { Component } from 'react';
// components
import ProgressBar from "./ProgressBar";
import Form from "./Form";
import Navigation from "./Navigation";
// models
import Education from '../models/education';
import Experience from '../models/experience';


import _ from "lodash";


/**
 * Mimics the state the app will maintain.
 */
 const DUMMY_STATE = {
  resume: {
    personal: {
      firstName: "Gerry",
      lastName: "Haley",
      address: "252 Autumn Place",
      city: "Maple",
      state: "Washington",
      zip: "83554",
      email: "gerry.haley@gmail.com",
      phone: "9501432123"
    },
    education: [
      {
        school: "University of California, Davis",
        location: "Davis, CA",
        major: "Biological Systems Engineering",
        degree: "M.S.",
        gpa: 3.5,
        to: "06/2021",
        from: "09/2019"
      },
      {
        school: "University of California, Davis",
        location: "Davis, CA",
        major: "Biochemical Engineering",
        degree: "B.S.",
        gpa: 3.6,
        to: "06/2019",
        from: "09/2015"
      },
    ],
    experience: [
      {
        position: "Chemist Manager",
        company: "Hill Farms, Inc.",
        location: "Sausalito, CA",
        from: "06/2021",
        to: "",
        responsibilities: [
          "Perform experiments to develop, validate, verify, and troubleshoot analytical methods such as methods based on HPLC and other analytical instruments.",
          "Provide technical oversight of analytical development activities",
          "Perform and oversee all analysis for optimum performance of all plating applications"
        ]
      },
      {
        position: "Research Associate",
        company: "University of California",
        location: "Davis, CA",
        from: "11/2020",
        to: "06/2021",
        responsibilities: [
          "Identify and characterize the mechanisms, genes, QTL, molecular markers, and traits underlying salt stress tolerance in lettuce.",
          "Conduct QTL mapping and study the fatty acids/gene expression",
          "Collaborate with regents to incorporate beneficial traits into lettuce cultivars"
        ]
      }
    ],
    skills: [
      "Plant genetics and gene regulation",
      "PCR, DNA and RNA extraction",
      "RT-qPCR"
    ]

  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = DUMMY_STATE;

    this.resumeOnChange = this.resumeOnChange.bind(this);
    this.resumeMultiSectionOnChange = this.resumeMultiSectionOnChange.bind(this);
    this.resumeOnSubsectionAdd = this.resumeOnSubsectionAdd.bind(this);
    this.resumeOnSubsectionRemove = this.resumeOnSubsectionRemove.bind(this);
    this.resumeMultiSectionListOnChange = this.resumeMultiSectionListOnChange
        .bind(this);
    this.resumeMultiSectionListOnAdd = this.resumeMultiSectionListOnAdd
        .bind(this);
    this.resumeMultiSectionListOnRemove = this.resumeMultiSectionListOnRemove
        .bind(this);
                                        
  }

  resumeOnChange(section, event) {
    this.setState((state) => {
      let field = event.target.name;
      let value = event.target.value;
      
      console.log({field, value});

      let resume = _.cloneDeep(state.resume);

      resume[section][field] = value;
      console.log(resume);

      return {resume: resume};
    });
  }

  resumeMultiSectionOnChange(section, index, event) {
    this.setState((state) => {
      let field = event.target.name;
      let value = event.target.value;
      
      let resume = _.cloneDeep(state.resume);

      resume[section][index][field] = value;
      console.log(resume);

      return {resume: resume};
    });
  }

  resumeMultiSectionListOnChange(section, subsectionIndex, bulletIndex, event) {
    this.setState((state) => {
      let field = event.target.name;
      let value = event.target.value;
      console.log({section, subsectionIndex, bulletIndex, field, value});

      
      let resume = _.cloneDeep(state.resume);

      resume[section][subsectionIndex][field][bulletIndex] = value;

      return {resume: resume};
    });
  }

  resumeMultiSectionListOnAdd(section, subsectionIndex, event) {
    this.setState((state) => {
      let field = event.target.dataset.field;
      
      let resume = _.cloneDeep(state.resume);

      resume[section][subsectionIndex][field].push("");

      return {resume: resume};
    });
  }

  resumeMultiSectionListOnRemove(section, subsectionIndex, event) {
    this.setState((state) => {
      let field = event.target.dataset.field;
      
      let resume = _.cloneDeep(state.resume);

      resume[section][subsectionIndex][field].pop();

      return {resume: resume};
    });
  }

  resumeOnSubsectionAdd(section) {
    this.setState((state) => {
      let resume = _.cloneDeep(state.resume);
      switch(section) {
        case "education":
          resume.education.push(new Education());
          break;
        case "experience":
          resume.experience.push(new Experience());
          break;
        default:
          console.log("Not implemented yet.")
          break;
      }

      return {resume: resume};
    });
  }

  resumeOnSubsectionRemove(section, index) {
    this.setState((state) => {
      let resume = _.cloneDeep(state.resume);
      switch(section) {
        case "education":
          resume.education.splice(index, 1);
          break;
        case "experience":
          resume.experience.splice(index, 1);
          break;
        default:
          console.log("Not implemented yet.");
          break;
      }

      return {resume: resume};
    });
  }

  // for debug purposes
  componentDidUpdate() {
    console.log(this.state.resume.experience);
  }

  render() {
    return (
      <div>
        <header>
          <h1 className="logo">Resume Creator.</h1>
        </header>
        <section className="app-section">
          <ProgressBar />
          <Form resume={this.state.resume}
            onChange={this.resumeOnChange}
            onMultiChange={this.resumeMultiSectionOnChange}
            onMultiListChange={this.resumeMultiSectionListOnChange}
            onMultiListAdd={this.resumeMultiSectionListOnAdd}
            onMultiListRemove={this.resumeMultiSectionListOnRemove}
            onSubsectionAdd={this.resumeOnSubsectionAdd}
            onSubsectionRemove={this.resumeOnSubsectionRemove}
          />
          <Navigation />
        </section>
      </div>
    );
  }
}



export default App;


