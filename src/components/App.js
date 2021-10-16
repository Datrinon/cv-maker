// css
import '../styles/App.css';
// react
import { Component } from 'react';
// components
import Header from "./Header";
import StartScreen from "./StartScreen";
import ProgressBar from "./ProgressBar";
import Form from "./Form";
import PreviewPane from "./PreviewPane";
import Navigation from "./Navigation";
// models
import PersonalInfo from '../models/personalInfo';
import Education from '../models/education';
import Experience from '../models/experience';
import Skills from '../models/skills';


import _, { indexOf } from "lodash";


/**
 * Mimics the state the app will maintain.
 */
 const DEFAULT_STATE = {
  resume: {
    personal: {
      firstName: "Gerry",
      lastName: "Haley",
      address: "252 Autumn Place",
      city: "Maple",
      state: "Washington",
      zip: "83554",
      email: "gerry.haley@gmail.com",
      phone: "5551432123"
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
      {
        category: "Biological Systems",
        skills: [
          "Plant genetics and gene regulation",
          "PCR, DNA and RNA extraction",
          "RT-qPCR"
        ]
      },
      {
        category: "Programming Languages",
        skills: [
          "R",
          "Matlab",
          "Python"
        ]
      },
    ]
  },
  get sections() { 
    let sections = Object.keys(this.resume);
    sections.push("review");
    return sections;
  },
  activeSection: "personal",
  progress: "start",
  started: false,
  usingDefault: false
}

class App extends Component {

  static storageKey = "USER_RESUME";

  constructor(props) {
    super(props);

    this.state = DEFAULT_STATE;

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
    this.setActiveSection = this.setActiveSection.bind(this);
    
    this.saveBeforeExit = this.saveBeforeExit.bind(this);

    this.resetForm = this.resetForm.bind(this);

    window.onbeforeunload = this.saveBeforeExit;
  }

  saveBeforeExit() {
    if (!this.state.usingDefault) {
      let resume = JSON.stringify(this.state.resume);

      window.localStorage.setItem(App.storageKey, resume);
    }
  }

  resumePrevSection() {
    this.setState(state => {
      let curIndex = state.sections.indexOf(state.activeSection);
      let activeSection = state.sections[curIndex - 1];

      let progressUpdate = this.determineProgress(curIndex - 1, state.sections);

      return {
        activeSection: activeSection,
        progress: progressUpdate
      }

    });
  }

  resumeNextSection() {
    this.setState(state => {
      let curIndex = state.sections.indexOf(state.activeSection);
      let activeSection = state.sections[curIndex + 1];

      let progressUpdate = this.determineProgress(curIndex + 1, state.sections);

      return {
        activeSection: activeSection,
        progress: progressUpdate
      }
    });
  }

  jumpToSection(curIndex) {
    this.setState(state => {
      let activeSection = state.sections[curIndex];

      let currentProgress = this.determineProgress(curIndex, state.sections);
      // edit this shit into a value bruh. its an object rn

      return {
        activeSection: activeSection,
        progress: currentProgress
      }
    })
  }

  resumeOnChange(section, event) {
    this.setState((state) => {
      let field = event.target.name;
      let value = event.target.value;
      

      let resume = _.cloneDeep(state.resume);

      resume[section][field] = value;

      return {resume: resume};
    });
  }

  resumeMultiSectionOnChange(section, index, event) {
    this.setState((state) => {
      let field = event.target.name;
      let value = event.target.value;
      
      let resume = _.cloneDeep(state.resume);

      resume[section][index][field] = value;

      return {resume: resume};
    });
  }

  resumeMultiSectionListOnChange(section, subsectionIndex, bulletIndex, event) {
    this.setState((state) => {
      let field = event.target.name;
      let value = event.target.value;

      
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
        case "skills":
          resume.skills.push(new Skills());
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
        case "skills":
          resume.skills.splice(index, 1);
          break;
        default:
          console.log("Not implemented yet.");
          break;
      }

      return {resume: resume};
    });
  }

  setActiveSection(section) {
    this.setState((state) => {
      let pos = state.sections.indexOf(section);

      let currentProgress = this.determineProgress(pos, state.sections);

      return {
        activeSection: section,
        currentProgress: currentProgress
      };
    });    
  }

  determineProgress(pos, sections) {
    let current;
    if (pos === 0) {
      current = "start";
    } else if (pos === sections.length-2) {
      current = "end";
    } else if (pos === sections.length-1) {
      current = "review";
    } else {
      current = "mid";
    }

    return current;
  }

  startApp(ev) {
    let state = ev.target.dataset.key;
    switch(state) {
      case "no-state":
        // set state.
        this.setState({
          resume: {
            personal: new PersonalInfo(),
            education: [new Education()],
            experience: [new Experience()],
            skills: [new Skills()]
          },
          started: true,
          usingDefault: false
        });
        break;
      case "default-state":
        // load dummy data.
        // leave it be, just set started to true.
        this.setState({
          started: true,
          usingDefault: true
        });
        break;
      case "previous-state":
        // load the previous data.
        this.setState({
          resume: JSON.parse(window.localStorage.getItem(App.storageKey)),
          started: true,
          usingDefault: false
        })
        break;
      default:
        break;
      }
  }

  resetForm() {
    this.setState({
      resume: {
        personal: new PersonalInfo(),
        education: [new Education()],
        experience: [new Experience()],
        skills: [new Skills()]
      }
    });
  }

  render() {
    return (
      <div>
        <Header />
        <StartScreen 
          storageKey={App.storageKey}
          hasStarted={this.state.started}
          start={this.startApp.bind(this)}/>
        {this.state.started
         && (<section className="app-section">
              <ProgressBar
              activeSection={this.state.activeSection}
              sections={this.state.sections}
              jumpToSection={this.jumpToSection.bind(this)}
              />
              <Form
                resume={this.state.resume}
                onChange={this.resumeOnChange}
                onMultiChange={this.resumeMultiSectionOnChange}
                onMultiListChange={this.resumeMultiSectionListOnChange}
                onMultiListAdd={this.resumeMultiSectionListOnAdd}
                onMultiListRemove={this.resumeMultiSectionListOnRemove}
                onSubsectionAdd={this.resumeOnSubsectionAdd}
                onSubsectionRemove={this.resumeOnSubsectionRemove}
                setActiveSection={this.setActiveSection}
                activeSection={this.state.activeSection}
                usingDefault={this.state.usingDefault}
                resetForm={this.resetForm}
              />
              <Navigation progress={this.state.progress}
                clickPrev={this.resumePrevSection.bind(this)}
                clickNext={this.resumeNextSection.bind(this)}
              />
              <PreviewPane resume={this.state.resume}/>
          </section>)
        }
      </div>
    );
  }
}



export default App;


