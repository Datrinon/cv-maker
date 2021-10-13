import '../styles/App.css';
import { Component } from 'react';
import ProgressBar from "./ProgressBar";
import Form from "./Form";
import Navigation from "./Navigation";

import Education from '../models/education';


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
        city: "Sausalito",
        state: "CA",
        from: "06/2021",
        to: null,
        description: [
          "Perform experiments to develop, validate, verify, and troubleshoot analytical methods such as methods based on HPLC and other analytical instruments.",
          "Provide technical oversight of analytical development activities",
          "Perform and oversee all analysis for optimum performance of all plating applications"
        ]
      },
      {
        position: "Research Associate",
        company: "University of California",
        city: "Davis",
        state: "CA",
        from: "11/2020",
        to: "06/2021",
        description: [
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
      
      console.log({field, value});

      let resume = _.cloneDeep(state.resume);

      resume[section][index][field] = value;
      console.log(resume);

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
        default:
          console.log("Not implemented yet.")
          break;
      }

      return {resume: resume};
    })
  }

  // for debug purposes
  componentDidUpdate() {
    console.log(this.state.resume.education);
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
          onSubsectionAdd={this.resumeOnSubsectionAdd}
          />
          <Navigation />
        </section>
      </div>
    );
  }
}



export default App;


