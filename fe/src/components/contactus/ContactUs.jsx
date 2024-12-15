import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import './ContactUs.css';

const ContactUs = () => {
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [show, setShow] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Email validation function with detailed error messages
  const validateEmail = (email) => {
    if (!email) {
      return 'Email address is required.';
    }
    if (!email.includes('@')) {
      return 'Please enter a valid email address.';
    }
    if (email.startsWith('@') || email.endsWith('@')) {
      return 'Please enter a valid email address.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Please enter a valid email address.';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the email format and show specific error messages
    const emailError = validateEmail(email);
    if (emailError) {
      setSuccessMessage(emailError);
      setShow(true);
      return;
    }

    const contactData = {
      email,
      title,
      text,
    };

    try {
      const response = await fetch('/api/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      if (response.ok) {
        setSuccessMessage('Thank you for your message!');
        setShow(true);
        setEmail('');
        setTitle('');
        setText('');
      } else {
        setSuccessMessage('Something went wrong. Please try again.');
        setShow(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setSuccessMessage('Error: Unable to send message.');
      setShow(true);
    }
  };

  const handleClose = () => setShow(false);

  return (
    <div className="contact-form-container">
      <h2 className="contact-heading">Contact Us</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail" className="form-group-custom">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="text" 
            placeholder="Enter Your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formTitle" className="form-group-custom">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Message Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formText" className="form-group-custom">
          <Form.Label>Message:</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Write Your Message"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </Form.Group>

        <div className="submit-button-container">
          <Button variant="primary" type="submit">
            Send
          </Button>
        </div>
      </Form>

      {/* Modal for success or error messages */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Message Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>{successMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ContactUs;
