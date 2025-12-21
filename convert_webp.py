import os
from PIL import Image

def convert_to_webp(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.lower().endswith(('.jpg', '.jpeg', '.png')):
                filepath = os.path.join(root, file)
                webp_path = os.path.splitext(filepath)[0] + '.webp'
                try:
                    img = Image.open(filepath)
                    if img.mode in ("RGBA", "P"):
                        img = img.convert("RGB")
                    img.save(webp_path, 'WEBP', quality=80)
                    print(f"Converted {filepath} to {webp_path}")
                except Exception as e:
                    print(f"Error converting {filepath}: {e}")

convert_to_webp('static/images')