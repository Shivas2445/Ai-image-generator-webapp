from flask import Flask, render_template, request, jsonify
from diffusers import StableDiffusionPipeline
import torch
import os
from PIL import Image

app = Flask(__name__)

# Ensure that the 'static' directory exists
if not os.path.exists('static'):
    os.makedirs('static')

# Path to your saved model
model_path = r"D:\MINER\web2\my-ai-image-generator\backend\stable_diffusion_output\saved_model"

# Load the model once when the app starts
print("Loading model...")
pipe = StableDiffusionPipeline.from_pretrained(
    model_path,
    torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32
)
pipe = pipe.to("cuda" if torch.cuda.is_available() else "cpu")
pipe.safety_checker = lambda images, **kwargs: (images, [False] * len(images))  # Disable safety checks

print("Model loaded successfully!")

# Home route for the web interface
@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        prompt = request.form.get("prompt")
        if prompt:
            try:
                # Generate image using preloaded model
                with torch.autocast("cuda" if torch.cuda.is_available() else "cpu"):
                    image = pipe(prompt).images[0]
                # Save image to static folder
                image_path = os.path.join("static", "generated_image.png")
                image.save(image_path)
                return render_template("index.html", prompt=prompt, image_path=image_path)
            except Exception as e:
                return render_template("index.html", error=str(e), prompt=prompt)
        else:
            return render_template("index.html", error="No prompt provided!")
    return render_template("index.html", prompt=None, image_path=None, error=None)

# API route for Postman or API requests
@app.route("/api/generate", methods=["POST"])
def generate_api():
    data = request.get_json()  # Get JSON data from the POST request
    prompt = data.get("prompt")  # Extract the prompt from the data

    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400

    try:
        # Generate image using preloaded model
        with torch.autocast("cuda" if torch.cuda.is_available() else "cpu"):
            image = pipe(prompt).images[0]

        # Save image to static folder
        image_path = os.path.join("static", "generated_image.png")
        image.save(image_path)

        # Return the image URL as a response
        return jsonify({
            "prompt": prompt,
            "image_url": request.host_url + "static/generated_image.png"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
