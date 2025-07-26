import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const video = videoRef.current;
    
    // Try Google Drive video first
    const videoSources = [
      "https://drive.google.com/uc?export=download&id=1GwGtEH8e1YSVuNUdnmrY1dH_DhgFREWN",
      process.env.PUBLIC_URL + "/assets/login.mp4", // Local fallback
      "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" // Sample backup
    ];

    let currentSourceIndex = 0;

    const tryNextSource = () => {
      if (currentSourceIndex < videoSources.length - 1) {
        currentSourceIndex++;
        video.src = videoSources[currentSourceIndex];
        video.load();
      } else {
        setVideoError(true); // All sources failed
      }
    };

    video.src = videoSources[currentSourceIndex];
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = "auto";

    const handleCanPlay = () => {
      video.play().catch(err => {
        console.log("Autoplay prevented:", err);
        // Try again on user interaction
        const handleFirstClick = () => {
          video.play();
          document.removeEventListener('click', handleFirstClick);
        };
        document.addEventListener('click', handleFirstClick);
      });
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', tryNextSource);
    video.load();

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', tryNextSource);
    };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }
    setError("");
    navigate("/image-generator");
  };

  return (
    <div className="login-container">
      {!videoError ? (
        <video
          ref={videoRef}
          className="video-bg"
          poster={process.env.PUBLIC_URL + "/assets/poster.jpg"}
        >
          Your browser does not support HTML5 video.
        </video>
      ) : (
        <div className="video-fallback"></div>
      )}

      <div className="login">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
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
          <button type="submit">Login</button>
        </form>
        <p className="register-text">
          If you have not created an account?{" "}
          <Link to="/register" className="register-link">Create account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;