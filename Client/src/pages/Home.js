import React from 'react';
import '../style/Home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
      <header className="header">
        <h1>Welcome to the Stress Detection Website</h1>
      </header>
      <main className="main">
        <section className="project-details">
          
          <p>
            Our stress detection project aims to analyze user input, such as text or voice recordings,
            to provide insights into their stress levels. Using machine learning algorithms,
            we can detect patterns and indicators of stress in the input data.
            This project is designed to help individuals become more aware of their stress levels
            and take appropriate steps for managing stress.
          </p>
        </section>
      </main>

          <Link to = "/login">
          <button className="check-button">Check Now</button>
          </Link>
          </div>
    
         
  );
}

export default Home;