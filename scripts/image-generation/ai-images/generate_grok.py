#!/usr/bin/env python3
"""
Grok Image Generation Script for Offgrid Farmstays
Generates hero banners and marketing images using xAI's Grok API
"""

import os
import sys
import requests
from pathlib import Path
from openai import OpenAI

# Initialize Grok client (uses OpenAI-compatible API)
client = OpenAI(
    api_key=os.getenv('XAI_API_KEY'),
    base_url="https://api.x.ai/v1"
)

# Output directory
OUTPUT_DIR = Path(__file__).parent.parent.parent.parent / 'assets' / 'banners'
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Image prompts for key visuals
PROMPTS = {
    'homepage_hero': {
        'prompt': """Modern luxury mini-home cabin in Montana mountain landscape at golden hour.
        Large floor-to-ceiling windows with warm interior lighting glowing from within,
        dark metal roof with integrated solar panels that blend aesthetically into the design,
        natural wood siding (cedar), wooden deck with Adirondack chairs.
        In foreground, couple sitting by fire pit enjoying mountain views.
        Background shows dramatic mountain peaks with some snow.
        Vibrant sunset sky with oranges and purples.
        Professional architectural photography style, warm and inviting, aspirational but achievable.
        Lighting: Golden hour, soft shadows, interior lights creating ambiance.""",
        'size': '1792x1024',
        'quality': 'hd'
    },

    'about_hero': {
        'prompt': """Engineering team of 4-5 diverse people standing at construction site of off-grid cabin.
        Male engineer (40s, wearing hard hat) reviewing blueprints on tablet with female landowner (50s, casual outdoor wear).
        In midground, partially constructed cabin with exposed timber framing and solar panels being installed on roof.
        Background shows rural Montana landscape with mountains.
        Professional documentary photography style, natural lighting, authentic work environment (not staged corporate).
        Include construction equipment subtly: excavator, solar panel boxes, building materials.""",
        'size': '1792x1024',
        'quality': 'hd'
    },

    'what_we_build_modern': {
        'prompt': """Modern minimalist off-grid cabin with black metal exterior,
        large glass windows, flat roof with solar panels, desert landscape background (New Mexico style).
        Shown at dusk with interior lights on.
        Architectural digest quality, professional photography, 400-500 sq ft, clearly off-grid aesthetic.""",
        'size': '1024x1024',
        'quality': 'hd'
    },

    'what_we_build_rustic': {
        'prompt': """Rustic mountain cabin with timber frame construction, stone chimney,
        gable metal roof, natural wood siding, mountain forest background (Montana/Wyoming style).
        Shown at dusk with interior lights on.
        Architectural digest quality, professional photography, 400-500 sq ft, clearly off-grid aesthetic.""",
        'size': '1024x1024',
        'quality': 'hd'
    },

    'what_we_build_farmhouse': {
        'prompt': """Contemporary farmhouse style mini-home with white board-and-batten siding,
        black metal roof, large porch, rolling hills background (Vermont/New England style).
        Shown at dusk with interior lights on.
        Architectural digest quality, professional photography, 400-500 sq ft, clearly off-grid aesthetic.""",
        'size': '1024x1024',
        'quality': 'hd'
    },

    'bitcoin_landing': {
        'prompt': """Off-grid cabin at night with brilliant starry sky and Milky Way visible.
        Cabin has warm glow from windows. Solar panels on roof have subtle high-tech appearance.
        On wooden deck, laptop screen shows bitcoin mining dashboard with hash rate and earnings (subtle, not prominent).
        Blend of realistic photography and light digital/cyber elements (not heavy-handed),
        inspirational and futuristic but grounded.
        Color palette: Deep blues (night), warm oranges (cabin lights), subtle bitcoin orange accents.""",
        'size': '1792x1024',
        'quality': 'hd'
    },

    'immersion_cooling': {
        'prompt': """Bitcoin mining immersion cooling system for off-grid retreat.
        Professional industrial photography showing immersion cooling tank setup.
        Reference Fog Hashing immersion cooling equipment design.
        Clear mineral oil or dielectric fluid with ASIC miners submerged inside transparent tank.
        Visible heat exchanger pipes and fluid circulation system.
        Clean, professional installation in modern mechanical room.
        Technical equipment with industrial aesthetic, pipes and valves visible.
        Warm LED lighting highlighting the fluid and equipment.
        Professional product photography style, sharp focus on technical details.
        Color palette: Clear fluid, metallic equipment, copper pipes, industrial gray/silver tones.
        No outdoor elements, pure technical equipment focus.""",
        'size': '1792x1024',
        'quality': 'hd'
    },
}


def generate_image(name, config):
    """Generate a single image using Grok"""
    print(f"\nGenerating: {name}")
    print(f"Prompt: {config['prompt'][:100]}...")

    try:
        response = client.images.generate(
            model="grok-2-image-1212",
            prompt=config['prompt'],
            # Note: Grok doesn't support 'size' or 'quality' parameters
            # Images are generated at standard resolution
        )

        image_url = response.data[0].url

        # Download image
        img_data = requests.get(image_url).content
        output_path = OUTPUT_DIR / f"{name}.png"

        with open(output_path, 'wb') as f:
            f.write(img_data)

        print(f"✓ Saved to: {output_path}")
        return True

    except Exception as e:
        print(f"✗ Error generating {name}: {e}")
        return False


def main():
    """Main generation function"""
    print("=" * 60)
    print("Grok Image Generation for Offgrid Farmstays")
    print("=" * 60)

    # Check for API key
    if not os.getenv('XAI_API_KEY'):
        print("\n❌ Error: XAI_API_KEY environment variable not set")
        print("\nSet it with:")
        print("  export XAI_API_KEY='your-xai-api-key-here'")
        print("\nGet your API key from: https://console.x.ai/")
        sys.exit(1)

    # Generate images
    if len(sys.argv) > 1:
        # Generate specific image
        name = sys.argv[1]
        if name in PROMPTS:
            generate_image(name, PROMPTS[name])
        else:
            print(f"Unknown image name: {name}")
            print(f"Available: {', '.join(PROMPTS.keys())}")
    else:
        # Generate all images
        print(f"\nGenerating {len(PROMPTS)} images...")
        print(f"Output directory: {OUTPUT_DIR}\n")

        success_count = 0
        for name, config in PROMPTS.items():
            if generate_image(name, config):
                success_count += 1

        print("\n" + "=" * 60)
        print(f"Generation complete: {success_count}/{len(PROMPTS)} successful")
        print(f"Images saved to: {OUTPUT_DIR}")
        print("=" * 60)


if __name__ == '__main__':
    main()
