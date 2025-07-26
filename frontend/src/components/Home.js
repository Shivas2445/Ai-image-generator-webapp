// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../styles/Home.css';

// const Home = () => {
//   return (
//     <div className="home-container" style={{
//       backgroundImage: "url('/assets/home.jpeg')",
//       backgroundSize: 'cover',
//       backgroundPosition: 'center',
//       backgroundRepeat: 'no-repeat'
//     }}>
//       <div className="home-content">
//         <h1>Welcome to the AI Image Generator</h1>
//         <div className="buttons">
//           <Link to="/login">
//             <button className="btn-login">Login</button>
//           </Link>
//           <Link to="/register">
//             <button className="btn-register">Register</button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <>
      <div
        className="home-container"
        style={{
          backgroundImage: "url('/assets/home.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="home-content">
          <h1>Welcome to the AI Image Generator</h1>
          <div className="buttons">
            <Link to="/login">
              <button className="btn-login">Login</button>
            </Link>
            <Link to="/register">
              <button className="btn-register">Register</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="about-section">
        <h2>About Our AI Image Generator</h2>
        <p>
          Transform your imagination into stunning visuals! Our AI Image
          Generator turns any text prompt into high-quality images instantly.
          Whether you're a designer, artist, or just exploring creativity, this
          tool makes your ideas come alive effortlessly.
        </p>
      </div>

      <div className="contact-section">
        <h2>Contact Us</h2>
        <p>
          📞 <strong>63608 23410</strong>
        </p>
        <p>
          📧 <a href="mailto:shivas2445@gmail.com">shivas2445@gmail.com</a>
        </p>
      </div>
    </>
  );
};

export default Home;
