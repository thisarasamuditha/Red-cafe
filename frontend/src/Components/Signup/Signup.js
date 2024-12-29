import React, { useState } from 'react';
import './Signup.css';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState(null); // To capture and display errors
  const [loading, setLoading] = useState(false); // To show loading status

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    setLoading(true); // Start loading
    setError(null); // Clear any previous errors

    try {
      const response = await fetch('http://localhost:5001/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          EmailAddress: formData.email,
          password: formData.password,
          isAdmin: false, // Default to non-admin users
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Signup successful!');
        // Redirect or clear the form
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
      } else {
        // Extract the message from result or use a fallback error message
        setError(result.message || 'Signup failed');
      }
    } catch (error) {
      console.error(error);
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <section id="signup" className="signup">
      <div className="signup-container">
        <h2>Create an Account</h2>
        {error && <div className="error-message">{String(error)}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Signup;
