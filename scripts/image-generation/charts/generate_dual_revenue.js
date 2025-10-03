#!/usr/bin/env node
/**
 * Dual Revenue Model Diagram using D3.js
 * Generates SVG visualization of guest bookings + bitcoin earnings
 */

const { D3Node } = require('d3-node');
const fs = require('fs');
const path = require('path');

// Output directory
const outputDir = path.join(__dirname, '../../../assets/diagrams');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Create D3 node instance
const d3n = new D3Node();
const d3 = d3n.d3;

// SVG dimensions
const width = 1200;
const height = 600;
const svg = d3n.createSVG(width, height);

// Data
const revenueData = {
  guests: { amount: 2800, percentage: 67, label: 'Guest Bookings' },
  bitcoin: { amount: 1400, percentage: 33, label: 'Bitcoin Earnings' }
};
const total = revenueData.guests.amount + revenueData.bitcoin.amount;

// Colors
const colors = {
  guests: '#4682B4',
  bitcoin: '#F7931A',
  property: '#4A7C59',
  background: '#F5F5F0'
};

// Title
svg.append('text')
  .attr('x', width / 2)
  .attr('y', 40)
  .attr('text-anchor', 'middle')
  .attr('font-size', '24px')
  .attr('font-weight', 'bold')
  .attr('fill', '#2C2C2C')
  .text('Dual Revenue Model');

svg.append('text')
  .attr('x', width / 2)
  .attr('y', 65)
  .attr('text-anchor', 'middle')
  .attr('font-size', '14px')
  .attr('fill', '#5A5A5A')
  .text('Two Income Streams, One Property');

// Center property box
const propX = width / 2;
const propY = height / 2;
const propWidth = 160;
const propHeight = 120;

svg.append('rect')
  .attr('x', propX - propWidth / 2)
  .attr('y', propY - propHeight / 2)
  .attr('width', propWidth)
  .attr('height', propHeight)
  .attr('fill', colors.property)
  .attr('rx', 10)
  .attr('stroke', '#2C2C2C')
  .attr('stroke-width', 2);

svg.append('text')
  .attr('x', propX)
  .attr('y', propY - 25)
  .attr('text-anchor', 'middle')
  .attr('font-size', '16px')
  .attr('font-weight', 'bold')
  .attr('fill', 'white')
  .text('Your Retreat');

svg.append('text')
  .attr('x', propX)
  .attr('y', propY)
  .attr('text-anchor', 'middle')
  .attr('font-size', '12px')
  .attr('fill', 'white')
  .text('Solar Powered');

svg.append('text')
  .attr('x', propX)
  .attr('y', propY + 20)
  .attr('text-anchor', 'middle')
  .attr('font-size', '12px')
  .attr('fill', 'white')
  .text('Off-Grid');

// Left side - Guest bookings
const guestX = 180;
const guestY = propY;

// Guest box
svg.append('rect')
  .attr('x', guestX - 120)
  .attr('y', guestY - 80)
  .attr('width', 240)
  .attr('height', 160)
  .attr('fill', colors.guests)
  .attr('rx', 10)
  .attr('stroke', '#2C2C2C')
  .attr('stroke-width', 2);

svg.append('text')
  .attr('x', guestX)
  .attr('y', guestY - 45)
  .attr('text-anchor', 'middle')
  .attr('font-size', '18px')
  .attr('font-weight', 'bold')
  .attr('fill', 'white')
  .text('Guest Bookings');

svg.append('text')
  .attr('x', guestX)
  .attr('y', guestY - 20)
  .attr('text-anchor', 'middle')
  .attr('font-size', '24px')
  .attr('font-weight', 'bold')
  .attr('fill', 'white')
  .text(`$${revenueData.guests.amount.toLocaleString()}`);

svg.append('text')
  .attr('x', guestX)
  .attr('y', guestY)
  .attr('text-anchor', 'middle')
  .attr('font-size', '12px')
  .attr('fill', 'white')
  .text('per month');

svg.append('text')
  .attr('x', guestX)
  .attr('y', guestY + 25)
  .attr('text-anchor', 'middle')
  .attr('font-size', '11px')
  .attr('fill', 'white')
  .text('60-75% occupancy');

svg.append('text')
  .attr('x', guestX)
  .attr('y', guestY + 45)
  .attr('text-anchor', 'middle')
  .attr('font-size', '11px')
  .attr('fill', 'white')
  .text('via AirBTC');

// Arrow from guest to property
svg.append('path')
  .attr('d', `M ${guestX + 120} ${guestY} L ${propX - propWidth/2 - 20} ${propY}`)
  .attr('stroke', colors.guests)
  .attr('stroke-width', 3)
  .attr('fill', 'none')
  .attr('marker-end', 'url(#arrowGuest)');

// Arrow marker for guest
svg.append('defs')
  .append('marker')
  .attr('id', 'arrowGuest')
  .attr('markerWidth', 10)
  .attr('markerHeight', 10)
  .attr('refX', 9)
  .attr('refY', 3)
  .attr('orient', 'auto')
  .append('path')
  .attr('d', 'M0,0 L0,6 L9,3 z')
  .attr('fill', colors.guests);

// Right side - Bitcoin earnings
const bitcoinX = width - 180;
const bitcoinY = propY;

// Bitcoin box
svg.append('rect')
  .attr('x', bitcoinX - 120)
  .attr('y', bitcoinY - 80)
  .attr('width', 240)
  .attr('height', 160)
  .attr('fill', colors.bitcoin)
  .attr('rx', 10)
  .attr('stroke', '#2C2C2C')
  .attr('stroke-width', 2);

svg.append('text')
  .attr('x', bitcoinX)
  .attr('y', bitcoinY - 45)
  .attr('text-anchor', 'middle')
  .attr('font-size', '18px')
  .attr('font-weight', 'bold')
  .attr('fill', 'white')
  .text('Bitcoin Earnings');

svg.append('text')
  .attr('x', bitcoinX)
  .attr('y', bitcoinY - 20)
  .attr('text-anchor', 'middle')
  .attr('font-size', '24px')
  .attr('font-weight', 'bold')
  .attr('fill', 'white')
  .text(`$${revenueData.bitcoin.amount.toLocaleString()}`);

svg.append('text')
  .attr('x', bitcoinX)
  .attr('y', bitcoinY)
  .attr('text-anchor', 'middle')
  .attr('font-size', '12px')
  .attr('fill', 'white')
  .text('per month');

svg.append('text')
  .attr('x', bitcoinX)
  .attr('y', bitcoinY + 25)
  .attr('text-anchor', 'middle')
  .attr('font-size', '11px')
  .attr('fill', 'white')
  .text('24/7 passive');

svg.append('text')
  .attr('x', bitcoinX)
  .attr('y', bitcoinY + 45)
  .attr('text-anchor', 'middle')
  .attr('font-size', '11px')
  .attr('fill', 'white')
  .text('Solar powered');

// Arrow from property to bitcoin
svg.append('path')
  .attr('d', `M ${propX + propWidth/2 + 20} ${propY} L ${bitcoinX - 120} ${bitcoinY}`)
  .attr('stroke', colors.bitcoin)
  .attr('stroke-width', 3)
  .attr('fill', 'none')
  .attr('marker-end', 'url(#arrowBitcoin)');

// Arrow marker for bitcoin
svg.append('defs')
  .append('marker')
  .attr('id', 'arrowBitcoin')
  .attr('markerWidth', 10)
  .attr('markerHeight', 10)
  .attr('refX', 9)
  .attr('refY', 3)
  .attr('orient', 'auto')
  .append('path')
  .attr('d', 'M0,0 L0,6 L9,3 z')
  .attr('fill', colors.bitcoin);

// Total revenue box at bottom
const totalY = height - 80;
svg.append('rect')
  .attr('x', width / 2 - 180)
  .attr('y', totalY - 35)
  .attr('width', 360)
  .attr('height', 70)
  .attr('fill', '#90EE90')
  .attr('rx', 10)
  .attr('stroke', '#228B22')
  .attr('stroke-width', 3);

svg.append('text')
  .attr('x', width / 2)
  .attr('y', totalY - 10)
  .attr('text-anchor', 'middle')
  .attr('font-size', '14px')
  .attr('font-weight', 'bold')
  .text('TOTAL MONTHLY REVENUE');

svg.append('text')
  .attr('x', width / 2)
  .attr('y', totalY + 20)
  .attr('text-anchor', 'middle')
  .attr('font-size', '28px')
  .attr('font-weight', 'bold')
  .attr('fill', '#228B22')
  .text(`$${total.toLocaleString()}/month`);

// Arrows to total
svg.append('path')
  .attr('d', `M ${guestX} ${guestY + 85} L ${guestX} ${totalY - 38} L ${width/2 - 100} ${totalY - 38}`)
  .attr('stroke', colors.guests)
  .attr('stroke-width', 2)
  .attr('fill', 'none')
  .attr('stroke-dasharray', '5,5');

svg.append('path')
  .attr('d', `M ${bitcoinX} ${bitcoinY + 85} L ${bitcoinX} ${totalY - 38} L ${width/2 + 100} ${totalY - 38}`)
  .attr('stroke', colors.bitcoin)
  .attr('stroke-width', 2)
  .attr('fill', 'none')
  .attr('stroke-dasharray', '5,5');

// Save SVG
const outputPath = path.join(outputDir, 'dual_revenue_model.svg');
fs.writeFileSync(outputPath, d3n.svgString());
console.log(`✓ Generated dual revenue diagram: ${outputPath}`);
