# Image Generation Tools for Offgrid Farmstays

Complete toolkit for generating marketing visuals, diagrams, and charts.

## 🎨 Tools Included

1. **Grok** (AI-generated images via xAI) - Requires API key
2. **Graphviz** (Flowcharts & diagrams) - Free, local
3. **Matplotlib** (Charts & graphs) - Free, local
4. **D3.js** (Interactive SVG graphics) - Free, local

## 📁 Directory Structure

```
scripts/image-generation/
├── ai-images/          # Grok AI generation scripts
├── diagrams/           # Graphviz .dot files
├── charts/             # Matplotlib & D3.js scripts
└── README.md          # This file

assets/
├── banners/           # AI-generated hero images
├── diagrams/          # Flowcharts, timelines, energy flow
└── charts/            # ROI charts, cost breakdowns
```

## 🚀 Quick Start

### Free Tools (No API Key Required)

**Generate all diagrams:**
```bash
cd scripts/image-generation/diagrams
./generate_all.sh
```

**Generate ROI chart:**
```bash
cd scripts/image-generation/charts
python3 generate_roi_chart.py
```

**Generate cost breakdown:**
```bash
cd scripts/image-generation/charts
python3 generate_cost_breakdown.py
```

**Generate dual revenue diagram:**
```bash
cd scripts/image-generation/charts
node generate_dual_revenue.js
```

### Grok Setup (Requires xAI API Key)

1. **Get an API key:**
   - Visit https://console.x.ai/
   - Sign in with your X/Twitter account
   - Navigate to API Keys section
   - Create a new API key
   - Copy the key (starts with `xai-...`)

2. **Set environment variable:**
   ```bash
   export XAI_API_KEY='xai-your-key-here'
   ```

   Or add to `~/.zshrc` for persistence:
   ```bash
   echo 'export XAI_API_KEY="xai-your-key-here"' >> ~/.zshrc
   source ~/.zshrc
   ```

3. **Generate images:**
   ```bash
   cd scripts/image-generation/ai-images

   # Generate all images
   python3 generate_grok.py

   # Generate specific image
   python3 generate_grok.py homepage_hero
   python3 generate_grok.py montana_ranch
   python3 generate_grok.py bitcoin_landing
   ```

**Available image prompts:**
- `homepage_hero` - Main hero banner (1792x1024)
- `about_hero` - About page banner (1792x1024)
- `montana_ranch` - Ranch-style cabin (1792x1024)
- `modern_mountain` - Modern mountain retreat (1792x1024)
- `rustic_charm` - Rustic A-frame cabin (1792x1024)
- `bitcoin_landing` - Bitcoin/solar hybrid landing (1792x1024)

## 📊 Generated Assets

### Diagrams (Graphviz)
- **construction_timeline** - 5-phase build process
- **permitting_flowchart** - Permit approval decision tree
- **energy_flow** - Solar energy distribution diagram

### Charts (Matplotlib)
- **roi_payback_chart** - Investment vs revenue timeline (7 years)
- **cost_breakdown_pie** - $87K investment allocation

### Interactive Graphics (D3.js)
- **dual_revenue_model** - Guest bookings + Bitcoin earnings

## 🔧 Troubleshooting

**Grok authentication error:**
```bash
# Verify API key is set
echo $XAI_API_KEY

# Check if key is valid (should start with xai-)
```

**Graphviz not found:**
```bash
brew install graphviz
```

**Python packages missing:**
```bash
pip3 install openai matplotlib numpy pandas pillow requests
```

**Node packages missing:**
```bash
cd scripts/image-generation
npm install
```

## 💰 Pricing

- **Graphviz**: Free, unlimited
- **Matplotlib**: Free, unlimited
- **D3.js**: Free, unlimited
- **Grok**: Check current pricing at https://console.x.ai/pricing

## 📝 Customization

### Modify Graphviz diagrams:
Edit `.dot` files in `diagrams/` directory and run `./generate_all.sh`

### Modify chart data:
Edit Python scripts in `charts/` directory:
- `generate_roi_chart.py` - Update `investment` and `monthly_revenue` parameters
- `generate_cost_breakdown.py` - Update `categories` and `costs` arrays

### Create new Grok prompts:
Add to `PROMPTS` dictionary in `ai-images/generate_grok.py`

## 🎯 Output Formats

All diagrams and charts generate in multiple formats:
- **PNG** - High-res (300 DPI) for web use
- **SVG** - Scalable vector for logos/print
- **PDF** - Print-ready documents

## 📧 Support

Questions? Contact: [Your contact info]

Documentation: See `Website/CLI_IMAGE_GENERATION_GUIDE.md` for detailed CLI usage
