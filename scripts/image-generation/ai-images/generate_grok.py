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

    'hot_tub_heat_reuse': {
        'prompt': """Remote off-grid mountain hot tub at dusk with steam rising, surrounded by wilderness.
        Wooden hot tub on elevated deck overlooking forested mountain valley with dramatic sunset sky.
        In the technical cutaway/overlay section: immersion cooling tank with ASIC miners visible through transparent panel,
        heat exchanger pipes connecting underground to the hot tub, showing the heat flow path with subtle glowing orange lines.
        Split composition: 60% scenic natural beauty (hot tub, mountains, steam, golden hour lighting),
        40% technical illustration (Fog Hashing-style immersion tank, copper heat exchange pipes, thermal flow arrows).
        Atmospheric steam and mist blend the two sections together naturally.
        Professional architectural photography merged with technical diagram aesthetic.
        Color palette: Warm wood tones, deep blue water, golden sunset light, orange/copper heat flow indicators,
        silver/metallic equipment, misty atmospheric elements.
        Style: Aspirational lifestyle photography meets engineering diagram, both beautiful and educational.""",
        'size': '1792x1024',
        'quality': 'hd'
    },

    'bitcoin_mining_heat_luxury': {
        'prompt': """Off-grid luxury retreat at twilight showing the complete bitcoin heat reuse system in context.
        Modern cabin with large windows glowing warmly, solar panels on roof, mountains in background.
        Foreground: Steaming outdoor hot tub with person relaxing, surrounded by natural stone and wood decking.
        Middle ground: Semi-transparent technical overlay showing underground immersion cooling system,
        with Fog Hashing-style tanks visible, heat exchanger coils, and thermal energy flow paths illustrated with subtle orange glow lines
        connecting the mining equipment to hot water systems, radiant floor heating, and the hot tub.
        Background: Mountain landscape fading to dusk with first stars appearing.
        Composition balances luxury lifestyle with technical sophistication.
        Not overly technical - maintain aspirational, inviting aesthetic while showing the innovation.
        Color palette: Warm cabin lights (golden), hot tub steam (white/blue), heat flow (orange/amber),
        equipment (industrial silver), natural elements (wood, stone, mountain blues/purples).
        Atmospheric lighting: Twilight hour with both natural and artificial light, steam adding mystery and comfort.
        Photography style: Architectural Digest meets WIRED magazine - beautiful, sophisticated, technically impressive.""",
        'size': '1792x1024',
        'quality': 'hd'
    },

    'heat_flow_lifestyle': {
        'prompt': """Hero banner showing off-grid retreat hot tub experience powered by bitcoin mining heat.
        Wide landscape format: Left side shows wooden hot tub on mountain deck with couple enjoying sunset views,
        steam rising beautifully into golden hour sky, dramatic mountain vista background.
        Right side transitions into cutaway/technical view showing the heat source:
        Fog Hashing immersion cooling tanks in mechanical room below deck,
        ASIC miners submerged in clear dielectric fluid, heat exchanger coils visible,
        copper pipes running upward with subtle animated-style heat flow indicators (orange glow, rising wave pattern).
        Center section blends both worlds: deck structure, plumbing, and thermal system integration visible but elegant.
        The technical elements should be sophisticated and clean, not cluttered - think Apple product reveal aesthetic
        combined with National Geographic nature photography.
        Steam from hot tub creates natural transition between lifestyle and technical zones.
        Lighting: Golden hour warmth on left, subtle industrial LED lighting on right, heat glow connecting both.
        Overall feel: This is where cutting-edge technology meets ultimate relaxation.
        Inspirational, luxurious, innovative, warm, inviting, yet clearly demonstrates the technical innovation.""",
        'size': '1792x1024',
        'quality': 'hd'
    },

    'winter_hot_tub_bitcoin_heated': {
        'prompt': """Winter night scene: Off-grid cabin covered in snow, warm lights glowing from windows.
        Outdoor hot tub on snow-covered deck, steam billowing dramatically into cold night air,
        person relaxing in hot tub under starry sky with Northern Lights or Milky Way visible.
        Technical overlay showing underground/basement mining operation:
        Fog Hashing immersion cooling system with bitcoin miners generating heat,
        insulated pipes carrying hot water to surface, heating the hot tub year-round.
        The contrast between freezing mountain winter and steaming hot comfort demonstrates the power of heat reuse.
        Subtle technical diagram elements: heat flow arrows, temperature gradients, equipment labels (minimal, elegant).
        Mood: Magical winter solitude meets innovative engineering.
        Snow and steam create atmospheric depth and mystery.
        Color palette: Cool blues (night, snow, water), warm oranges (cabin lights, heat flow, equipment glow),
        white (steam, snow), silver (mining equipment).
        Photography style: Outdoor lifestyle magazine cover meets technical innovation showcase.
        Both beautiful and impressive from engineering perspective.""",
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
