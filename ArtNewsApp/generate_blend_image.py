import replicate
import os
import sys
import json

# Set your API token

from dotenv import load_dotenv
load_dotenv()
os.environ["REPLICATE_API_TOKEN"] = os.getenv('REPLICATE_API_TOKEN')


def generate_blend_image(image1, image2):
    output = replicate.run(
        "lambdal/image-mixer:23d37d119ed3149e1135564d1cb5551c16dac1026e9deb972df42810a0f68c2f",
        input={"image1": image1, "image2": image2}
    )
    print(json.dumps(output))

if __name__ == "__main__":
    image1 = sys.argv[1]
    image2 = sys.argv[2]
    generate_blend_image(image1, image2)

