

import React, { useState } from 'react';

export default function AboutUs() {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFeedback(''); // Clear feedback after submission
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>About Our Art Gallery</h2>
      <p>
        Welcome to the Art Attack Gallery! We are passionate about showcasing emerging and established artists from around the world. Our goal is to create a space where art enthusiasts can explore, enjoy, and purchase art in a dynamic and inspiring environment.
      </p>

      <section>
        <h3>Our Mission</h3>
        <p>
          Our mission is to promote creativity and expression through visual art. We aim to provide a platform for artists to display their work and for art lovers to discover new and exciting pieces that resonate with them.
        </p>
      </section>

      <section>
        <h3>Gallery History</h3>
        <p>
          Established in 2024, Art Attack Gallery started as a small local space and has now grown into an international hub for artists and collectors. Over the years, we have hosted numerous exhibitions and connected artists with audiences across the globe.
        </p>
      </section>

      <section>
        <h3>Featured Artists</h3>
        <ul>
          <li>Emily Brown - Contemporary Abstract Painter</li>
          <li>James White - Sculptor and Installation Artist</li>
          <li>Maria Gonzales - Digital and Multimedia Artist</li>
          <li>Samuel Lee - Traditional Oil Painter</li>
        </ul>
      </section>

      <section>
        <h3>Upcoming Exhibitions</h3>
        <ul>
          <li>October 2024 - "Colors of the Soul" by Emily Brown</li>
          <li>November 2024 - "Sculpting the Future" by James White</li>
          <li>December 2024 - "Digital Dreams" by Maria Gonzales</li>
        </ul>
      </section>

      <section>
        <h3>Follow Us</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
          <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
          <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
        </ul>
      </section>

      <section>
        <h3>Leave Us Your Feedback</h3>
        <p>We would love to hear your thoughts on our gallery and the exhibitions we host. Please feel free to share your experience with us!</p>
        <form onSubmit={handleSubmit}>
          <textarea
            value={feedback}
            onChange={handleFeedbackChange}
            placeholder="Write your feedback here"
            rows="4"
            cols="50"
            required
            style={{ padding: '10px', width: '100%', marginBottom: '10px' }}
          />
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}>
            Submit Feedback
          </button>
        </form>
        {submitted && <p style={{ color: 'green' }}>Thank you for your feedback!</p>}
      </section>

      <br/>
    </div>
  );
}
