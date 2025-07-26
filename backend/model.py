import torch
from diffusers import StableDiffusionPipeline
import uuid
import os

# Absolute path to the saved model directory
model_path = os.path.join(os.path.dirname(__file__), "stable_diffusion_output")

pipe = StableDiffusionPipeline.from_pretrained(
    model_path,
    torch_dtype=torch.float16,
    local_files_only=True
).to("cuda" if torch.cuda.is_available() else "cpu")


def generate_image(prompt):
    image = pipe(prompt).images[0]
    output_dir = os.path.join(os.path.dirname(__file__), "generated_images")
    os.makedirs(output_dir, exist_ok=True)

    filename = f"{uuid.uuid4().hex}.png"
    file_path = os.path.join(output_dir, filename)
    image.save(file_path)

    return file_path
