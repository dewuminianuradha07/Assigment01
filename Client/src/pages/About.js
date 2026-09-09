import React from "react";
import "../style/About.css";

function About() {
  return (
    <div className="about">
      {/* Optional background image */}
      {/* <div
        className="aboutTop"
        style={{ backgroundImage: `url(${MultiplePizzas})` }}
      ></div> */}
      <div className="aboutBottom">
       

        <h2>Our Vision</h2>
        <p>
          At [Your Company/Project Name], we envision a world where individuals are empowered to manage and reduce their stress effectively. We believe in leveraging technology to create innovative solutions that promote mental well-being and enhance quality of life.
        </p>

        <h2>Our Mission</h2>
        <p>
          Our mission is to provide a cutting-edge stress detection system that seamlessly integrates into everyday life. We aim to deliver actionable insights and personalized recommendations through our user-friendly platform. By harnessing advanced data analytics and machine learning, we strive to support our users in understanding and managing their stress levels more effectively.
        </p>

        <h2>Our Objectives</h2>
        <ul>
          <li>Innovative Stress Detection: Develop and maintain an accurate, real-time stress detection system using state-of-the-art technology.</li>
          <li>User-Centric Design: Ensure our platform is intuitive and accessible, catering to diverse user needs and preferences.</li>
          <li>Personalized Insights: Offer tailored recommendations and strategies based on individual stress patterns and lifestyle.</li>
          <li>Educational Resources: Provide valuable information and tools to help users learn about stress management and mental wellness.</li>
          <li>Continuous Improvement: Regularly update and refine our system based on user feedback and the latest research in stress management.</li>
        </ul>

        <h2>About Us</h2>
        <p>
          Founded in [Year], [Your Company/Project Name] is dedicated to advancing the field of stress detection and management. Our team is composed of experts in technology, psychology, and design, all working together to create a solution that makes a real difference. We are committed to transparency, privacy, and the highest standards of user support.
        </p>
      </div>
    </div>
  );
}

export default About;
