class Experience {
  position;
  company;
  city;
  state;
  from;
  to;
  description;

  constructor(position, company, city, state, from, to = null, description) {
    this.position = position;
    this.company = company;
    this.city = city;
    this.state = state;
    this.from = from;
    this.to = to;  
    this.description = description;
  }

}