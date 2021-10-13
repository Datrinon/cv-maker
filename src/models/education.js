class Education {

  school;
  location;
  degree;
  major;
  to;
  gpa;

  constructor(school, location, major, degree, gpa, to, from) {
    this.school = school ?? "";
    this.location = location ?? "";
    this.major = major ?? "";
    this.degree = degree ?? "";
    this.gpa = gpa ?? "";
    this.to = to ?? "";
    this.from = from ?? "";
  }
}

export default Education;