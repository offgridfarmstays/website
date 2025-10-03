#!/usr/bin/env python3
"""
ROI Payback Chart Generator for Offgrid Farmstays
Creates investment vs cumulative revenue visualization
"""

import matplotlib.pyplot as plt
import matplotlib.ticker as ticker
import numpy as np
from pathlib import Path

# Output directory
OUTPUT_DIR = Path(__file__).parent.parent.parent.parent / 'assets' / 'charts'
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

def format_currency(x, pos):
    """Format tick labels as currency"""
    return f'${x/1000:.0f}K'

def generate_roi_chart(investment=87000, monthly_revenue=4200):
    """Generate ROI payback timeline chart"""

    # Calculate data points
    years = np.array([0, 1, 2, 3, 4, 5, 6, 7])
    investment_line = np.full_like(years, investment, dtype=float)
    annual_revenue = monthly_revenue * 12
    cumulative_revenue = years * annual_revenue
    net_position = cumulative_revenue - investment

    # Calculate breakeven point
    breakeven_year = investment / annual_revenue

    # Create figure with nice size
    fig, ax = plt.subplots(figsize=(14, 7))
    fig.patch.set_facecolor('white')

    # Plot investment line (horizontal red line)
    ax.plot(years, investment_line, 'r-', linewidth=3, label='Initial Investment',
            marker='o', markersize=6, zorder=3)

    # Plot cumulative revenue (ascending green line)
    ax.plot(years, cumulative_revenue, 'g-', linewidth=3, label='Cumulative Revenue',
            marker='o', markersize=6, zorder=3)

    # Fill profitable zone (area between lines after breakeven)
    profitable_years = years[years >= breakeven_year]
    if len(profitable_years) > 0:
        ax.fill_between(
            years[years >= breakeven_year],
            investment_line[years >= breakeven_year],
            cumulative_revenue[years >= breakeven_year],
            alpha=0.3, color='#90EE90', label='Net Profit Zone', zorder=1
        )

    # Breakeven vertical line
    ax.axvline(x=breakeven_year, color='#4682B4', linestyle='--',
               linewidth=2, label=f'Breakeven ({breakeven_year:.1f} years)', zorder=2)

    # Annotations
    # Breakeven annotation
    ax.annotate(
        f'Breakeven\n{breakeven_year:.1f} years',
        xy=(breakeven_year, investment),
        xytext=(breakeven_year + 0.7, investment + 30000),
        arrowprops=dict(arrowstyle='->', color='#4682B4', lw=2),
        fontsize=12, fontweight='bold',
        bbox=dict(boxstyle='round,pad=0.5', facecolor='#E8F4F8', edgecolor='#4682B4', lw=2)
    )

    # 5-year return annotation
    if len(cumulative_revenue) > 5:
        five_year_return = cumulative_revenue[5] - investment
        ax.annotate(
            f'5-Year Return\n${five_year_return:,.0f}',
            xy=(5, cumulative_revenue[5]),
            xytext=(5.3, cumulative_revenue[5] + 20000),
            fontsize=11,
            bbox=dict(boxstyle='round,pad=0.5', facecolor='wheat', alpha=0.8)
        )

    # 7-year return annotation
    seven_year_return = cumulative_revenue[7] - investment
    ax.annotate(
        f'7-Year Return\n${seven_year_return:,.0f}',
        xy=(7, cumulative_revenue[7]),
        xytext=(6.3, cumulative_revenue[7] - 30000),
        fontsize=11,
        bbox=dict(boxstyle='round,pad=0.5', facecolor='#90EE90', alpha=0.8)
    )

    # Labels and formatting
    ax.set_xlabel('Years', fontsize=14, fontweight='bold')
    ax.set_ylabel('Dollars ($)', fontsize=14, fontweight='bold')
    ax.set_title(
        f'Investment Payback Timeline - ${investment/1000:.0f}K Montana Ranch Retreat\n' +
        f'Monthly Revenue: ${monthly_revenue:,} (${ monthly_revenue*12:,}/year)',
        fontsize=16, fontweight='bold', pad=20
    )

    # Format y-axis as currency
    ax.yaxis.set_major_formatter(ticker.FuncFormatter(format_currency))

    # Grid
    ax.grid(True, alpha=0.3, linestyle=':', zorder=0)

    # Legend
    ax.legend(loc='upper left', fontsize=12, framealpha=0.95)

    # Set axis limits
    ax.set_xlim(-0.3, 7.3)
    ax.set_ylim(0, max(cumulative_revenue) * 1.1)

    # Tight layout
    plt.tight_layout()

    # Save in multiple formats
    output_base = OUTPUT_DIR / 'roi_payback_chart'
    plt.savefig(f'{output_base}.png', dpi=300, bbox_inches='tight', facecolor='white')
    plt.savefig(f'{output_base}.svg', format='svg', bbox_inches='tight')
    plt.savefig(f'{output_base}.pdf', format='pdf', bbox_inches='tight')

    print(f"✓ Generated ROI chart:")
    print(f"  - {output_base}.png")
    print(f"  - {output_base}.svg")
    print(f"  - {output_base}.pdf")

    plt.close()

if __name__ == '__main__':
    print("=" * 60)
    print("Generating ROI Payback Chart")
    print("=" * 60)
    generate_roi_chart()
    print("=" * 60)
