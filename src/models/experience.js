class Experience {
  position;
  company;
  location;
  state;
  from;
  to;
  responsibilities;

  constructor(position, company, location, state, from, to = "", responsibilities) {
    this.position = position ?? "";
    this.company = company ?? "";
    this.location = location ?? "";
    this.from = from ?? "";
    this.to = to ?? "";  
    this.responsibilities = responsibilities ?? [""];
  }

}

export default Experience;