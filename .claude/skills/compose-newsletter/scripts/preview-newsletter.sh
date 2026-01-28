#!/bin/bash
# Opens newsletter HTML preview in default browser
# Usage: ./preview-newsletter.sh <html-file-path>

if [ $# -eq 0 ]; then
  echo "Usage: ./preview-newsletter.sh <html-file-path>"
  exit 1
fi

HTML_FILE="$1"

if [ ! -f "$HTML_FILE" ]; then
  echo "Error: File not found: $HTML_FILE"
  exit 1
fi

echo "Opening newsletter preview in browser..."

# Detect OS and open appropriately
if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS
  open "$HTML_FILE"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
  # Linux
  xdg-open "$HTML_FILE"
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
  # Windows
  start "$HTML_FILE"
else
  echo "Error: Unsupported OS: $OSTYPE"
  exit 1
fi

echo "✓ Preview opened in default browser"
