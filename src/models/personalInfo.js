class PersonalInfo {

  firstName;
  lastName;
  address;
  city;
  state;
  zip;
  email;
  phone;

  constructor(firstName, lastName, address, city, state, zip, email, phone) {
    this.firstName = firstName ?? "" ;
    this.lastName = lastName ?? "" ;
    this.address = address ?? "" ;
    this.city = city ?? "" ;
    this.state = state ?? "" ;
    this.zip = zip ?? "" ;
    this.email = email ?? "" ;
    this.phone = phone ?? "" ;
  }
}

export default PersonalInfo;