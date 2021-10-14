import { Component } from "react";
import Skills from "../models/skills";
import '../styles/PreviewPane.css';

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
      <article className="resume">
        <section className="personal">
          <h1>{personal.firstName + " " + personal.lastName}</h1>
          <div className="address">
            <p>{personal.address}</p>
            <p>{personal.city}</p>
            <p>{personal.state}</p>
            <p>{personal.zip}</p>
          </div>
          <div className="contact-info">
            <p>{personal.email}</p>
            <p>{personal.phone}</p>
          </div>
        </section>
        <section className="education">
          {education.map(degree => {
            return (
              <div className="degree" key={JSON.stringify(degree)}>
                <p>{degree.degree} {degree.major}</p>
                <p>{degree.school}</p>
                <p>{degree.location}</p>
                <p>{degree.gpa}</p>
                <p>{degree.from} - {degree.to}</p>
              </div>
            );
          })}
        </section>
        <section className="experience">
          {experience.map(job => {
              return (
                <div className="job" key={JSON.stringify(job)}>
                  <p>{job.position} - {job.company}</p>
                  <p>{job.location}</p>
                  <p>{job.from} - {job.to}</p>
                  <ul>
                  {job.responsibilities.map((note, index) => <li key={index}>{note}</li>)}
                  </ul>
                </div>
              );
            })}
        </section>
        <section className="skills">
          {skills.map(skillTree => {
            return (
              <div className="skill" key={skillTree.category}>
                <h2>{skillTree.category}</h2>
                <ul>
                  {skillTree.skills.map((skill, index) => <li key={index}>{skill}</li>)}
                </ul>
              </div>
            );
          })

          }
        </section>
      </article>
    </section>
    );
  }
}

export default PreviewPane;