

import React, { useState } from "react";
import "../styles/ImageGeneration.css";

const BACKEND_URL = "https://08114afc9213.ngrok-free.app";

const ImageGeneration = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedImages, setGeneratedImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (data.image_b64) {
        const dataUrl = `data:image/png;base64,${data.image_b64}`;
        setGeneratedImages((prev) => [{ image: dataUrl, prompt }, ...prev]); // prepend
      } else {
        alert(data.error || "Image generation failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Could not reach the server.");
    } finally {
      setLoading(false);
      setPrompt("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      generate();
    }
  };

  const handleDownload = (image) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = "generated-image.png";
    a.click();
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Prompt copied to clipboard!");
    });
  };

  return (
    <div className="image-gen-container">
      <div className="fixed-input-area">
        <div className="input-area">
          <textarea
            rows={2}
            placeholder="Enter your prompt..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <div className="button-group">
            {/* Removed Upload Image button */}
            <button onClick={generate} disabled={loading}>
              {loading ? "Generating…" : "Generate Image"}
            </button>
          </div>
        </div>
      </div>

      <div className="image-display">
        {generatedImages.length > 0 ? (
          generatedImages.map((item, idx) => (
            <div key={idx} className="image-block">
              <img src={item.image} alt={`Generated ${idx + 1}`} />
              <div className="prompt-display">
                <span>{item.prompt}</span>
                <button onClick={() => copyToClipboard(item.prompt)}>Copy</button>
              </div>
              <button
                className="download-under-image"
                onClick={() => handleDownload(item.image)}
              >
                Download
              </button>
            </div>
          ))
        ) : (
          <p>No image generated yet.</p>
        )}
      </div>
    </div>
  );
};

export default ImageGeneration;
