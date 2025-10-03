#!/usr/bin/env python3
"""
Cost Breakdown Pie Chart Generator for Offgrid Farmstays
Creates investment allocation visualization
"""

import matplotlib.pyplot as plt
from pathlib import Path

# Output directory
OUTPUT_DIR = Path(__file__).parent.parent.parent.parent / 'assets' / 'charts'
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

def generate_cost_breakdown():
    """Generate cost breakdown pie chart"""

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
    total = sum(costs)

    # Color palette (warm, professional)
    colors = ['#8B7355', '#FFD700', '#D2B48C', '#8B4513',
              '#4682B4', '#9370DB', '#F7931A']

    # Create figure
    fig, ax = plt.subplots(figsize=(12, 9))
    fig.patch.set_facecolor('white')

    # Create pie chart
    wedges, texts, autotexts = ax.pie(
        costs,
        labels=categories,
        colors=colors,
        autopct=lambda pct: f'${int(pct/100*total/1000)}K\n({pct:.0f}%)',
        startangle=90,
        textprops={'fontsize': 12, 'weight': 'bold'},
        pctdistance=0.75,
        labeldistance=1.15
    )

    # Styling for percentage text
    for autotext in autotexts:
        autotext.set_color('white')
        autotext.set_fontsize(11)
        autotext.set_fontweight('bold')

    # Styling for labels
    for text in texts:
        text.set_fontsize(12)
        text.set_fontweight('bold')

    # Title
    ax.set_title(
        f'Investment Breakdown - ${total/1000:.0f}K Total\n' +
        'Montana Ranch Mini-Home (450 sq ft)',
        fontsize=16, fontweight='bold', pad=20
    )

    # Legend with cost details
    legend_labels = [f'{cat}: ${cost/1000:.0f}K ({cost/total*100:.0f}%)'
                     for cat, cost in zip(categories, costs)]
    ax.legend(legend_labels, loc='center left', bbox_to_anchor=(1, 0, 0.5, 1),
              fontsize=10)

    # Equal aspect ratio ensures that pie is drawn as a circle
    ax.axis('equal')

    # Tight layout
    plt.tight_layout()

    # Save
    output_base = OUTPUT_DIR / 'cost_breakdown_pie'
    plt.savefig(f'{output_base}.png', dpi=300, bbox_inches='tight', facecolor='white')
    plt.savefig(f'{output_base}.svg', format='svg', bbox_inches='tight')
    plt.savefig(f'{output_base}.pdf', format='pdf', bbox_inches='tight')

    print(f"✓ Generated cost breakdown chart:")
    print(f"  - {output_base}.png")
    print(f"  - {output_base}.svg")
    print(f"  - {output_base}.pdf")

    plt.close()

if __name__ == '__main__':
    print("=" * 60)
    print("Generating Cost Breakdown Pie Chart")
    print("=" * 60)
    generate_cost_breakdown()
    print("=" * 60)
