import '../styles/App.css';

function App() {
  return (
    <div>
    </div>
  );
}

/**
 * Mimics the state the app will maintain.
 */
 const DUMMY_STATE = {
  resume: {
    personal : {
      firstName: "Phil",
      lastName: "Haley",
      address: "252 Autumn Place",
      city: "Maple",
      state: "Washington",
      zip: "83554",
      email: "phil.haley@gmail.com",
      phone: "9501432123"
    },
    education : [
      {
        name: "University of California, Davis",
        city: "Davis, CA",
        degree: "M.S.",
        subject: "Biological and Systems Engineering",
        graduateDate: "06/2021",
        gpa: 3.5
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
    experience : [
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
    skills : [
      "Plant genetics and gene regulation",
      "PCR, DNA and RNA extraction",
      "RT-qPCR"
    ]

  }
}

export default App;


