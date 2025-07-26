import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import "../styles/Registration.css";

const Registration = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate(); // For redirection

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleRegister = (e) => {
    e.preventDefault();

    // Validation
    if (!firstName || !lastName || !email || !password || !confirmPassword || !country) {
      setError("Please fill in all fields.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    if (!agree) {
      setError("You must agree to the terms.");
      return;
    }

    // Clear error and simulate registration
    setError("");
    console.log("Registration details:", {
      firstName,
      lastName,
      email,
      password,
      country,
    });

    // Clear form
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setCountry("");
    setAgree(false);

    // Redirect to login
    navigate("/login");
  };

  return (
    <div className="registration-bg">
      <video autoPlay loop muted className="video-bg">
        <source src="/assets/blue.mov" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="registration-container">
        <div className="registration-box">
          <h2>Register</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Select Country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="Germany">Germany</option>
            </select>
            <div className="checkbox-wrapper">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                />
                I agree to the terms and conditions
              </label>
            </div>

            <button type="submit" className="submit">Register</button>
          </form>

          <p className="login-text">
            Already have an account?{" "}
            <Link to="/login" className="login-link">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
