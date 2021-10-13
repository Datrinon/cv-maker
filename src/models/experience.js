class Experience {
  position;
  company;
  city;
  state;
  from;
  to;
  responsibilties;

  constructor(position, company, city, state, from, to = null, responsibilties) {
    this.position = position ?? "";
    this.company = company ?? "";
    this.city = city ?? "";
    this.state = state ?? "";
    this.from = from ?? "";
    this.to = to ?? "";  
    this.responsibilties = responsibilties ?? "";
  }

}