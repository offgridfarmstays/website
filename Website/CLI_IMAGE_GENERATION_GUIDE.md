# Command-Line Image Generation Guide
## CLI Tools & Commands for Offgrid Farmstays Visual Assets

---

# OVERVIEW

This guide provides executable command-line instructions for generating all visual assets using various CLI-based tools. These commands can be run locally on your machine or via scripts.

---

# SETUP: INSTALL REQUIRED TOOLS

## Option 1: Stable Diffusion (Local, Free, Full Control)

### Installation (macOS/Linux):

```bash
# Install Python 3.10+ if not already installed
brew install python@3.10

# Create virtual environment
python3.10 -m venv ~/sd-env
source ~/sd-env/bin/activate

# Install Stable Diffusion Web UI (AUTOMATIC1111)
cd ~/
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git
cd stable-diffusion-webui

# Run setup script
./webui.sh

# This will:
# - Download dependencies
# - Download base model (Stable Diffusion v1.5 or SDXL)
# - Start local web server at http://127.0.0.1:7860
```

### CLI Usage (via API):

```bash
# Start the web UI with API enabled
cd ~/stable-diffusion-webui
./webui.sh --api --listen

# Generate image via curl
curl -X POST http://127.0.0.1:7860/sdapi/v1/txt2img \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "modern luxury mini-home cabin nestled in Montana mountain landscape at golden hour, large floor-to-ceiling windows with warm interior lighting, dark metal roof with solar panels, natural wood siding, wooden deck with Adirondack chairs, couple by fire pit, dramatic mountain peaks background, vibrant sunset sky, professional architectural photography, 8k, highly detailed",
    "negative_prompt": "ugly, blurry, low quality, distorted, cartoon, anime",
    "width": 1920,
    "height": 1080,
    "steps": 30,
    "cfg_scale": 7,
    "sampler_name": "DPM++ 2M Karras",
    "seed": -1
  }' \
  -o homepage_hero.json

# Extract base64 image from JSON and save
cat homepage_hero.json | jq -r '.images[0]' | base64 -d > homepage_hero.png
```

### Batch Generation Script:

```bash
#!/bin/bash
# save as: generate_banners.sh

API_URL="http://127.0.0.1:7860/sdapi/v1/txt2img"

# Function to generate image
generate_image() {
  local prompt="$1"
  local filename="$2"
  local width="${3:-1920}"
  local height="${4:-1080}"

  curl -s -X POST "$API_URL" \
    -H "Content-Type: application/json" \
    -d "{
      \"prompt\": \"$prompt, professional photography, 8k, highly detailed, photorealistic\",
      \"negative_prompt\": \"ugly, blurry, low quality, distorted, cartoon, anime, text, watermark\",
      \"width\": $width,
      \"height\": $height,
      \"steps\": 30,
      \"cfg_scale\": 7,
      \"sampler_name\": \"DPM++ 2M Karras\"
    }" | jq -r '.images[0]' | base64 -d > "$filename"

  echo "Generated: $filename"
}

# Generate all hero banners
generate_image "modern luxury mini-home cabin nestled in Montana mountain landscape at golden hour, large floor-to-ceiling windows with warm interior lighting, dark metal roof with solar panels, natural wood siding, wooden deck with Adirondack chairs, couple by fire pit, dramatic mountain peaks, vibrant sunset sky" "banners/homepage_hero.png" 2400 800

generate_image "engineering team standing at construction site of off-grid cabin, male engineer with hard hat reviewing blueprints on tablet with female landowner, partially constructed cabin with timber framing and solar panels being installed, rural Montana landscape with mountains, professional documentary photography" "banners/about_hero.png" 2400 800

generate_image "three different mini-home architectural styles side by side, LEFT: modern minimalist black metal exterior with large glass windows and flat roof solar panels in desert landscape, CENTER: rustic mountain timber frame cabin with stone chimney and wood siding in forest, RIGHT: contemporary farmhouse white board-and-batten with black metal roof in rolling hills, all at dusk with interior lights on" "banners/what_we_build_hero.png" 2400 600

# Run script
chmod +x generate_banners.sh
./generate_banners.sh
```

---

## Option 2: ComfyUI (Node-based, Advanced)

### Installation:

```bash
# Clone ComfyUI
git clone https://github.com/comfyanonymous/ComfyUI.git
cd ComfyUI

# Install dependencies
pip install -r requirements.txt

# Download models to models/checkpoints/
# Get SDXL from: https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0

# Start ComfyUI
python main.py

# Access at http://127.0.0.1:8188
```

### CLI Workflow Execution:

```bash
# Save workflow as JSON from ComfyUI interface
# Then execute via API:

curl -X POST http://127.0.0.1:8188/prompt \
  -H "Content-Type: application/json" \
  -d @workflow_homepage_hero.json
```

---

## Option 3: Replicate API (Cloud, Paid, Easy)

### Setup:

```bash
# Install Replicate CLI
pip install replicate

# Set API token (get from replicate.com)
export REPLICATE_API_TOKEN="r8_your_token_here"
```

### Generate Images via CLI:

```bash
# Generate with SDXL
replicate run stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b \
  --input prompt="modern luxury mini-home cabin nestled in Montana mountain landscape at golden hour, large floor-to-ceiling windows with warm interior lighting, dark metal roof with solar panels, natural wood siding, wooden deck with Adirondack chairs, couple by fire pit, dramatic mountain peaks, vibrant sunset sky, professional architectural photography, 8k, highly detailed" \
  --input negative_prompt="ugly, blurry, low quality, distorted, cartoon" \
  --input width=1920 \
  --input height=1080 \
  --input num_outputs=1 \
  > homepage_hero.png

# Batch script for all banners
#!/bin/bash
# save as: replicate_generate.sh

generate() {
  replicate run stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b \
    --input prompt="$1, professional photography, 8k, highly detailed" \
    --input width=$2 \
    --input height=$3 \
    > "$4"
  echo "Generated: $4"
}

# Homepage hero
generate "modern luxury mini-home cabin nestled in Montana mountain landscape at golden hour, large floor-to-ceiling windows with warm interior lighting, dark metal roof with solar panels, natural wood siding, wooden deck, couple by fire pit, dramatic peaks, sunset" 2400 800 "homepage_hero.png"

# About page
generate "engineering team at construction site of off-grid cabin, engineer with hard hat reviewing blueprints with landowner, partially constructed cabin with solar panels, Montana landscape" 2400 800 "about_hero.png"

# Execute
chmod +x replicate_generate.sh
./replicate_generate.sh
```

**Cost**: ~$0.002-0.01 per image (SDXL), paid per generation

---

## Option 4: OpenAI DALL-E 3 API (Cloud, Paid, Simple)

### Setup:

```bash
# Install OpenAI CLI
pip install openai

# Set API key
export OPENAI_API_KEY="sk-your-key-here"
```

### Generate via Python CLI Script:

```python
#!/usr/bin/env python3
# save as: dalle_generate.py

import openai
import requests
import os

openai.api_key = os.getenv("OPENAI_API_KEY")

def generate_image(prompt, filename, size="1792x1024"):
    """Generate image with DALL-E 3"""
    response = openai.Image.create(
        model="dall-e-3",
        prompt=prompt,
        size=size,
        quality="hd",
        n=1,
    )

    image_url = response.data[0].url

    # Download image
    img_data = requests.get(image_url).content
    with open(filename, 'wb') as f:
        f.write(img_data)

    print(f"Generated: {filename}")

# Homepage hero
generate_image(
    "Modern luxury mini-home cabin in Montana mountain landscape at golden hour. Large floor-to-ceiling windows with warm interior lighting, dark metal roof with integrated solar panels, natural wood siding, wooden deck with Adirondack chairs. Couple sitting by fire pit in foreground. Dramatic mountain peaks with snow in background. Vibrant sunset sky with oranges and purples. Professional architectural photography style, warm and inviting.",
    "homepage_hero.png",
    "1792x1024"  # DALL-E 3 max size
)

# About page hero
generate_image(
    "Engineering team of 4-5 diverse people at construction site of off-grid cabin. Male engineer (40s, hard hat) reviewing blueprints on tablet with female landowner (50s, casual wear). Partially constructed cabin with timber framing and solar panels being installed in background. Rural Montana landscape with mountains. Documentary photography style, natural lighting, authentic work environment.",
    "about_hero.png",
    "1792x1024"
)

# Energy systems technical diagram
generate_image(
    "Technical illustration showing cutaway cross-section view of modern mini-home revealing integrated energy systems. Solar panels on roof with visible wiring, geothermal heat pump in mechanical room with pipes going underground, immersion cooling tank with bitcoin miners in glowing blue liquid, heat exchanger connecting to hot water tank, battery storage on wall, radiant floor heating pipes visible through transparent floor. Underground geothermal loops illustrated outside. Clean technical illustration style with color coding: orange for heat flow, blue for cooling, yellow for electricity. Annotated with simple labels.",
    "energy_systems_diagram.png",
    "1792x1024"
)
```

**Run**:
```bash
chmod +x dalle_generate.py
./dalle_generate.py
```

**Cost**: $0.04 per image (standard), $0.08 per image (HD)

---

# DIAGRAM GENERATION (CLI Tools)

## Option 1: Graphviz (Flowcharts, Diagrams)

### Installation:

```bash
brew install graphviz  # macOS
# or
sudo apt-get install graphviz  # Linux
```

### Generate Flowcharts:

```bash
# Create permitting flowchart
cat > permitting_flow.dot << 'EOF'
digraph PermittingProcess {
    rankdir=TB;
    node [shape=box, style=filled, fillcolor=lightblue];

    start [label="Start Here", shape=ellipse, fillcolor=green];
    preapp [label="Pre-Application\nMeeting"];
    zoning [label="Zoning Allows?", shape=diamond, fillcolor=yellow];
    variance [label="Apply for\nVariance"];
    building [label="Submit Building\nPermit"];
    review [label="Engineering\nReview"];
    approved [label="Approved?", shape=diamond, fillcolor=yellow];
    revise [label="Submit\nRevisions"];
    septic [label="Septic\nApproval"];
    electrical [label="Electrical\nPermit"];
    final [label="Final Approval", fillcolor=lightgreen];
    end [label="Construction\nCan Begin!", shape=ellipse, fillcolor=green];

    start -> preapp [label="Week 1"];
    preapp -> zoning [label="Week 2"];
    zoning -> variance [label="NO"];
    zoning -> building [label="YES"];
    variance -> building [label="Week 4"];
    building -> review [label="Week 4-8"];
    review -> approved;
    approved -> revise [label="REVISIONS"];
    revise -> review;
    approved -> septic [label="APPROVED"];
    approved -> electrical [label="APPROVED"];
    septic -> final [label="Week 12"];
    electrical -> final [label="Week 12"];
    final -> end;

    label="Permitting Process Flowchart\nOffgrid Farmstays handles this entire process";
    labelloc="t";
}
EOF

# Generate PNG
dot -Tpng permitting_flow.dot -o permitting_flowchart.png

# Generate SVG (scalable)
dot -Tsvg permitting_flow.dot -o permitting_flowchart.svg

# Generate PDF
dot -Tpdf permitting_flow.dot -o permitting_flowchart.pdf
```

### Generate Timeline Diagram:

```bash
cat > construction_timeline.dot << 'EOF'
digraph Timeline {
    rankdir=LR;
    node [shape=circle, fixedsize=true, width=1.5];

    discovery [label="Discovery\nWeek 1-2", fillcolor=gray, style=filled];
    design [label="Design\nWeek 3-6", fillcolor=lightblue, style=filled];
    permitting [label="Permitting\nWeek 7-18", fillcolor=orange, style=filled];
    construction [label="Construction\nWeek 19-34", fillcolor=green, style=filled];
    launch [label="Launch\nWeek 35-38", fillcolor=gold, style=filled];

    discovery -> design -> permitting -> construction -> launch;
}
EOF

dot -Tpng construction_timeline.dot -o construction_timeline.png
```

---

## Option 2: Matplotlib/Python (Charts, Graphs)

### Installation:

```bash
pip install matplotlib numpy pandas
```

### Generate ROI Chart:

```python
#!/usr/bin/env python3
# save as: generate_roi_chart.py

import matplotlib.pyplot as plt
import numpy as np

# Data
years = np.array([0, 1, 2, 3, 4, 5, 6, 7])
investment = np.array([87000, 87000, 87000, 87000, 87000, 87000, 87000, 87000])
cumulative_revenue = np.array([0, 50400, 100800, 151200, 201600, 252000, 302400, 352800])
net_position = cumulative_revenue - 87000

# Create figure
fig, ax = plt.subplots(figsize=(12, 6))

# Plot investment line (horizontal)
ax.plot(years, investment, 'r-', linewidth=2, label='Initial Investment')

# Plot cumulative revenue
ax.plot(years, cumulative_revenue, 'g-', linewidth=2, label='Cumulative Revenue')

# Find breakeven point (approximately year 2.1)
breakeven_year = 87000 / 50400  # 1.73 years
ax.axvline(x=breakeven_year, color='blue', linestyle='--', linewidth=1)
ax.annotate('Breakeven\n1.7 years', xy=(breakeven_year, 87000),
            xytext=(breakeven_year+0.5, 100000),
            arrowprops=dict(arrowstyle='->', color='blue'),
            fontsize=12, fontweight='bold')

# Fill profitable zone
ax.fill_between(years[years >= breakeven_year],
                investment[years >= breakeven_year],
                cumulative_revenue[years >= breakeven_year],
                alpha=0.3, color='green', label='Net Profit Zone')

# Labels and formatting
ax.set_xlabel('Years', fontsize=12)
ax.set_ylabel('Dollars ($)', fontsize=12)
ax.set_title('Investment Payback Timeline - $87K Montana Ranch Retreat', fontsize=14, fontweight='bold')
ax.legend(loc='upper left')
ax.grid(True, alpha=0.3)

# Format y-axis as currency
ax.yaxis.set_major_formatter(plt.FuncFormatter(lambda x, p: f'${x/1000:.0f}K'))

# Add annotations
ax.annotate(f'5-Year Return: ${cumulative_revenue[5] - 87000:,.0f}',
            xy=(5, cumulative_revenue[5]), xytext=(5.2, cumulative_revenue[5]+20000),
            fontsize=10, bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.5))

plt.tight_layout()
plt.savefig('roi_payback_chart.png', dpi=300, bbox_inches='tight')
plt.savefig('roi_payback_chart.svg', format='svg', bbox_inches='tight')
print("Generated: roi_payback_chart.png and .svg")
```

**Run**:
```bash
chmod +x generate_roi_chart.py
./generate_roi_chart.py
```

---

### Generate Pie Chart (Cost Breakdown):

```python
#!/usr/bin/env python3
# save as: generate_cost_breakdown.py

import matplotlib.pyplot as plt

# Data
categories = [
    'Structure & Shell',
    'Solar System',
    'Interior Finishes',
    'Foundation & Site',
    'Geothermal HVAC',
    'Permitting & Soft',
    'Bitcoin Equipment'
]

costs = [24000, 18000, 15000, 12000, 8000, 5000, 5000]
colors = ['#8B7355', '#FFD700', '#D2B48C', '#8B4513', '#4682B4', '#9370DB', '#F7931A']

# Create pie chart
fig, ax = plt.subplots(figsize=(10, 8))

wedges, texts, autotexts = ax.pie(costs,
                                    labels=categories,
                                    colors=colors,
                                    autopct=lambda pct: f'${costs[int(pct/100*sum(costs))/1000]:.0f}K\n({pct:.0f}%)',
                                    startangle=90,
                                    textprops={'fontsize': 10})

# Make percentage text bold
for autotext in autotexts:
    autotext.set_color('white')
    autotext.set_fontweight('bold')

ax.set_title('Investment Breakdown - $87,000 Total\nMontana Ranch Mini-Home',
             fontsize=14, fontweight='bold', pad=20)

plt.tight_layout()
plt.savefig('cost_breakdown_pie.png', dpi=300, bbox_inches='tight')
plt.savefig('cost_breakdown_pie.svg', format='svg', bbox_inches='tight')
print("Generated: cost_breakdown_pie.png and .svg")
```

---

## Option 3: D3.js via Node.js (Interactive Charts)

### Installation:

```bash
npm install -g d3-node
npm install canvas
```

### Generate Interactive Timeline:

```javascript
// save as: generate_timeline.js
const D3Node = require('d3-node');
const fs = require('fs');

const d3n = new D3Node();
const d3 = d3n.d3;

// SVG dimensions
const width = 2000;
const height = 400;
const svg = d3n.createSVG(width, height);

// Timeline data
const phases = [
  { name: 'Discovery', start: 0, end: 2, color: '#888888' },
  { name: 'Design', start: 3, end: 6, color: '#4682B4' },
  { name: 'Permitting', start: 7, end: 18, color: '#FF8C00' },
  { name: 'Construction', start: 19, end: 34, color: '#228B22' },
  { name: 'Launch', start: 35, end: 38, color: '#FFD700' }
];

// Scale
const xScale = d3.scaleLinear()
  .domain([0, 38])
  .range([50, width - 50]);

// Draw timeline
phases.forEach((phase, i) => {
  const x = xScale(phase.start);
  const width = xScale(phase.end) - xScale(phase.start);

  // Phase box
  svg.append('rect')
    .attr('x', x)
    .attr('y', 150)
    .attr('width', width)
    .attr('height', 60)
    .attr('fill', phase.color)
    .attr('rx', 5);

  // Phase label
  svg.append('text')
    .attr('x', x + width/2)
    .attr('y', 185)
    .attr('text-anchor', 'middle')
    .attr('fill', 'white')
    .attr('font-size', '16px')
    .attr('font-weight', 'bold')
    .text(phase.name);

  // Week range
  svg.append('text')
    .attr('x', x + width/2)
    .attr('y', 205)
    .attr('text-anchor', 'middle')
    .attr('fill', 'white')
    .attr('font-size', '12px')
    .text(`Week ${phase.start}-${phase.end}`);
});

// Axis
const axis = d3.axisBottom(xScale).ticks(10);
svg.append('g')
  .attr('transform', 'translate(0, 250)')
  .call(axis);

// Title
svg.append('text')
  .attr('x', width/2)
  .attr('y', 30)
  .attr('text-anchor', 'middle')
  .attr('font-size', '20px')
  .attr('font-weight', 'bold')
  .text('Construction Timeline: 6-8 Months from Consultation to First Guest');

// Save
fs.writeFileSync('construction_timeline.svg', d3n.svgString());
console.log('Generated: construction_timeline.svg');
```

**Run**:
```bash
node generate_timeline.js
```

---

# ICON GENERATION

## Option 1: ImageMagick (Convert, Resize, Compose)

### Installation:

```bash
brew install imagemagick  # macOS
# or
sudo apt-get install imagemagick  # Linux
```

### Create Simple Icons:

```bash
# Create solar panel icon (simple geometric)
convert -size 64x64 xc:transparent \
  -fill '#FFD700' -draw 'rectangle 10,10 54,54' \
  -fill 'none' -stroke black -strokewidth 2 \
  -draw 'line 32,10 32,54' -draw 'line 10,32 54,32' \
  icons/solar_panel.png

# Create bitcoin symbol icon
convert -size 64x64 xc:transparent \
  -font Arial-Bold -pointsize 48 -fill '#F7931A' \
  -gravity center -annotate +0+0 '₿' \
  icons/bitcoin.png

# Create batch of simple geometric icons
for icon in solar battery house lightning chart; do
  convert -size 64x64 xc:transparent \
    -fill '#4A7C59' -draw 'circle 32,32 32,16' \
    icons/${icon}_base.png
done
```

### Resize and Format Batch:

```bash
#!/bin/bash
# Resize all icons to multiple sizes

for size in 32 64 128 256; do
  mkdir -p icons/${size}x${size}
  for icon in icons/*.png; do
    filename=$(basename "$icon")
    convert "$icon" -resize ${size}x${size} "icons/${size}x${size}/${filename}"
  done
done

echo "Icons resized to multiple sizes"
```

---

## Option 2: Font Awesome CLI (Download Icons)

```bash
# Install Font Awesome CLI
npm install -g @fortawesome/fontawesome-free

# Download specific icons as SVG
curl -O https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/solar-panel.svg
curl -O https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/house.svg
curl -O https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/bolt.svg
curl -O https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/chart-line.svg

# Move to icons folder
mv *.svg icons/
```

---

# BATCH PROCESSING SCRIPTS

## Master Generation Script

```bash
#!/bin/bash
# save as: generate_all_assets.sh

echo "======================================"
echo "Offgrid Farmstays Asset Generation"
echo "======================================"

# Create directory structure
mkdir -p assets/{banners,diagrams,charts,icons,backgrounds}

# 1. Generate banners (using Stable Diffusion API - assumes running)
echo "Generating banners..."
./generate_banners.sh

# 2. Generate diagrams (using Graphviz)
echo "Generating flowcharts..."
dot -Tpng permitting_flow.dot -o assets/diagrams/permitting_flowchart.png
dot -Tpng construction_timeline.dot -o assets/diagrams/construction_timeline.png

# 3. Generate charts (using Python)
echo "Generating charts..."
python3 generate_roi_chart.py
python3 generate_cost_breakdown.py
mv *.png *.svg assets/charts/

# 4. Download/generate icons
echo "Downloading icons..."
# Add icon download/generation commands here

# 5. Optimize all images
echo "Optimizing images..."
find assets -name "*.png" -exec optipng -o7 {} \;

echo "======================================"
echo "Asset generation complete!"
echo "Check assets/ directory for outputs"
echo "======================================"
```

**Run**:
```bash
chmod +x generate_all_assets.sh
./generate_all_assets.sh
```

---

# IMAGE OPTIMIZATION (Post-Generation)

## OptiPNG (Lossless PNG compression)

```bash
# Install
brew install optipng

# Optimize single file
optipng -o7 homepage_hero.png

# Batch optimize all PNGs
find ./assets -name "*.png" -exec optipng -o7 {} \;
```

## JPEGoptim (JPEG compression)

```bash
# Install
brew install jpegoptim

# Optimize with 85% quality
jpegoptim --max=85 --strip-all *.jpg

# Batch
find ./assets -name "*.jpg" -exec jpegoptim --max=85 --strip-all {} \;
```

## ImageMagick (Format conversion, resizing)

```bash
# Convert PNG to WebP (better compression)
convert homepage_hero.png -quality 85 homepage_hero.webp

# Batch convert and resize for web
for img in assets/banners/*.png; do
  filename=$(basename "$img" .png)
  # Create WebP version
  convert "$img" -quality 85 "assets/banners/${filename}.webp"
  # Create 2x and 1x versions
  convert "$img" -resize 50% "assets/banners/${filename}_1x.png"
done
```

---

# AUTOMATED WORKFLOW EXAMPLE

## GitHub Actions Workflow (Auto-generate on commit)

```yaml
# save as: .github/workflows/generate-assets.yml

name: Generate Visual Assets

on:
  push:
    paths:
      - 'prompts/**'
  workflow_dispatch:

jobs:
  generate:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.10'

    - name: Install dependencies
      run: |
        pip install matplotlib numpy pandas openai replicate
        sudo apt-get install -y graphviz optipng

    - name: Generate charts
      run: |
        python scripts/generate_roi_chart.py
        python scripts/generate_cost_breakdown.py

    - name: Generate diagrams
      run: |
        dot -Tpng -Tsvg diagrams/permitting_flow.dot -o assets/permitting_flowchart
        dot -Tpng -Tsvg diagrams/timeline.dot -o assets/construction_timeline

    - name: Generate AI images (if API keys set)
      env:
        REPLICATE_API_TOKEN: ${{ secrets.REPLICATE_API_TOKEN }}
      run: |
        python scripts/generate_banners_replicate.py

    - name: Optimize images
      run: |
        find assets -name "*.png" -exec optipng -o7 {} \;

    - name: Commit generated assets
      run: |
        git config --local user.email "action@github.com"
        git config --local user.name "GitHub Action"
        git add assets/
        git commit -m "Auto-generate visual assets" || echo "No changes"
        git push
```

---

# COST COMPARISON

| Tool | Setup Cost | Per Image Cost | Quality | Control | Speed |
|------|-----------|----------------|---------|---------|-------|
| **Stable Diffusion (Local)** | Free | $0 | High | Maximum | Medium |
| **Replicate API** | Free | $0.002-0.01 | High | High | Fast |
| **DALL-E 3 API** | Free | $0.04-0.08 | Very High | Medium | Fast |
| **Midjourney** (via API) | $10/mo | Included | Very High | High | Fast |
| **Graphviz** | Free | $0 | Good (diagrams) | Maximum | Very Fast |
| **Matplotlib** | Free | $0 | Good (charts) | Maximum | Very Fast |

---

# RECOMMENDED WORKFLOW

## For Initial Launch (Budget: <$100):

```bash
# 1. Install free local tools
brew install graphviz imagemagick optipng

# 2. Generate diagrams/charts locally (free)
./generate_diagrams.sh
python3 generate_charts.py

# 3. Use Replicate for hero images (pay per use, ~$0.20 total)
./replicate_generate.sh

# 4. Download icons from Font Awesome (free)
./download_icons.sh

# 5. Optimize everything
./optimize_all.sh
```

## For Ongoing Production (Budget: $30/month):

```bash
# 1. Maintain local tools

# 2. Subscribe to Midjourney ($10/mo) for best photorealistic images
# Use Discord bot or API

# 3. Use Replicate for quick iterations ($10-20/mo)

# 4. Automate via GitHub Actions (free tier sufficient)
```

---

**Next Steps**:
1. Choose your preferred tool (recommend starting with Replicate for ease)
2. Set up API keys as environment variables
3. Run batch generation scripts
4. Review outputs, iterate prompts as needed
5. Optimize and deploy to website

Would you like me to create ready-to-run scripts for any specific tool?
