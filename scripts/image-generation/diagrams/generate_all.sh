#!/bin/bash
# Generate all Graphviz diagrams for Offgrid Farmstays

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUTPUT_DIR="$SCRIPT_DIR/../../../assets/diagrams"

# Create output directory
mkdir -p "$OUTPUT_DIR"

echo "======================================"
echo "Generating Graphviz Diagrams"
echo "======================================"

# Generate each diagram in multiple formats
for dot_file in "$SCRIPT_DIR"/*.dot; do
    if [ -f "$dot_file" ]; then
        filename=$(basename "$dot_file" .dot)
        echo "Generating: $filename"

        # PNG (web use)
        dot -Tpng "$dot_file" -o "$OUTPUT_DIR/${filename}.png"
        echo "  ✓ PNG created"

        # SVG (scalable)
        dot -Tsvg "$dot_file" -o "$OUTPUT_DIR/${filename}.svg"
        echo "  ✓ SVG created"

        # PDF (print)
        dot -Tpdf "$dot_file" -o "$OUTPUT_DIR/${filename}.pdf"
        echo "  ✓ PDF created"

        echo ""
    fi
done

echo "======================================"
echo "Diagram generation complete!"
echo "Output directory: $OUTPUT_DIR"
echo "======================================"
echo ""
echo "Generated files:"
ls -lh "$OUTPUT_DIR"
