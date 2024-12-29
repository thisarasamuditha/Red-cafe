import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <section id="contact" className="contact">
      <h2>Contact Us</h2>
      <p>Email: <a href="mailto:thellamburavithanagethisarasam@gmail.com">thellamburavithanagethisarasam@gmail.com</a></p>
      <p>Phone: +94763454539</p>
      <form className="contact-form">
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" required></textarea>
        <button type="submit">Send</button>
      </form>
    </section>
  );
}

export default Contact;
