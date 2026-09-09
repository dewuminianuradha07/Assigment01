import React, { useState } from 'react';
import '../style/Contact.css'; // Path to your CSS file

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="contact-container">
      <div className="contact-info">
        <h2>Contact Us</h2>
        <p>If you have any questions about our Stress Detection Web Project, or if you need assistance with understanding how our stress detection algorithms work, please don't hesitate to reach out. We are here to help you. </p>
        <ul>
          <li>
            <i className="fa fa-map-marker"></i>
            <p>Address :</p>
            <span>4671 Sugar Camp Road, Owatonna, Minnesota, 55060</span>
          </li>
          <li>
            <i className="fa fa-phone"></i>
            <p>Phone :</p>
            <span>011 5673456</span>
          </li>
          <li>
            <i className="fa fa-envelope"></i>
            <p>Email :</p>
            <span>stressdetec0@gmail.com</span>
          </li>
        </ul>
      </div>
      <div className="contact-form">
        <h2>Send Message</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            placeholder="Type your Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
