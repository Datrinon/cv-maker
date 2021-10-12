import '../styles/App.css';
import { Component } from 'react';
import ProgressBar from "./ProgressBar";
import Form from "./Form";
import Navigation from "./Navigation";

/**
 * Mimics the state the app will maintain.
 */
 const DUMMY_RESUME = {
  resume: {
    personal: {
      firstName: "Gerrick",
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
        subject: "Biological and Systems Engineering",
        degree: "M.S.",
        gpa: 3.5,
        name: "University of California, Davis",
        city: "Davis, CA",
        graduateDate: "06/2021",
      },
      {
        name: "University of California, Davis",
        city: "Davis, CA",
        degree: "B.S.",
        subject: "Biochemical Engineering",
        graduateDate: "06/2019",
        gpa: 3.6
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

    this.state = {resume: DUMMY_RESUME}
  }

  render() {
    return (
      <div>
        <header>
          <h1 className="logo">Resume Creator.</h1>
        </header>
        <section className="app-section">
          <ProgressBar />
          <Form />
          <Navigation />
        </section>
      </div>
    );
  }
}



export default App;


