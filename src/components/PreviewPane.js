import { Component } from "react";
import Skills from "../models/skills";
import '../styles/PreviewPane.css';

import "@fortawesome/fontawesome-free/js/all.js";
import "@fortawesome/fontawesome-free/css/all.css";

class PreviewPane extends Component {
  render() {
    const resume = this.props.resume;
    const personal = resume.personal;
    const education = resume.education;
    const experience = resume.experience;
    const skills = resume.skills;

    return (
    <section className="preview">
      <h1 className="preview-title">Preview</h1>
      <article id="section-to-print" className="resume">
        <section className="personal">
          <h1 className="fullname">{personal.firstName + " " + personal.lastName}</h1>
          <div className="contact-address">
            <p><i className="icon fas fa-envelope"></i>{personal.email}</p>
            <p><i className="icon fas fa-phone"></i>{personal.phone}</p>
            <p className="address-line1"><i className="icon fas fa-map-marker-alt"></i>{personal.address} {personal.city}, {personal.state} {personal.zip}</p>
          </div>
        </section>
        <section className="education resume-section">
          <h1 className="title"><i className="title-icon fas fa-graduation-cap"></i>Education</h1>
          <div className="contents">
          {education.map(degree => {
            return (
              <div className="degree item" key={JSON.stringify(degree)}>
                <div className="header">
                  <p className="header-title">{degree.degree} {degree.major}</p>
                  <p className="header-dates">{degree.from} - {degree.to}</p>
                </div>
                <p className="school-name">{degree.school}</p>
                <p className="school-location">{degree.location}</p>
                <p className="degree-gpa">GPA: {degree.gpa}</p>
              </div>
            );
          })}
          </div>
        </section>
        <section className="experience resume-section">
          <h1 className="title"><i className="title-icon fas fa-building"></i>Experience</h1>
          <div className="contents">
          {experience.map(job => {
              return (
                <div className="job item" key={JSON.stringify(job)}>
                  <div className="header">
                    <p className="header-title">{job.position}</p>
                    <p className="header-dates">{job.from} - {job.to}</p>
                  </div>
                  <p>{job.company}</p>
                  <p>{job.location}</p>
                  <ul className="responsibilities list">
                  {job.responsibilities.map((note, index) => 
                    <li key={index} className="list-item">{note}</li>)}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
        <section className="skills resume-section">
          <h1 className="title"><i className="title-icon fas fa-toolbox"></i>Skills</h1>
          <div className="skills-section">
          {skills.map(skillTree => {
            return (
              <div className="skill" key={skillTree.category}>
                <h2 className="skill-category">{skillTree.category}</h2>
                <ul className="skills">
                  {skillTree.skills.map((skill, index) =>
                    <li key={index} className="skill-item">{skill}</li>)}
                </ul>
              </div>
              );
            })
          }
          </div>
        </section>
      </article>
    </section>
    );
  }
}

export default PreviewPane;