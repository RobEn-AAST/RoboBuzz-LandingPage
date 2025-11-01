#!/usr/bin/env bash
set -euo pipefail

SITE_DIR="/home/darn/RoboBuzz-LandingPage"
INDEX_FILE="$SITE_DIR/index.html"

if [ ! -f "$INDEX_FILE" ]; then
  echo "ERROR: index.html not found at $INDEX_FILE"
  exit 1
fi

timestamp=$(date +%s)
echo "Bumping asset versions with timestamp: $timestamp"

# Use perl in-place edits to safely replace or add ?v=<timestamp>
# 1) css links
perl -pi -e "s/(href=\")([^\"]+\.css)(\?v=\d+)?(\")/\$1\$2?v=$timestamp\$4/g" "$INDEX_FILE"

# 2) js scripts
perl -pi -e "s/(src=\")([^\"]+\.js)(\?v=\d+)?(\")/\$1\$2?v=$timestamp\$4/g" "$INDEX_FILE"

# 3) common image formats (png,jpg,jpeg,gif,svg,webp)
perl -pi -e "s/(src=\")([^\"]+\.(?:png|jpg|jpeg|gif|svg|webp))(\?v=\d+)?(\")/\$1\$2?v=$timestamp\$4/gi" "$INDEX_FILE"

echo "index.html updated. New preview (first 30 lines):"
sed -n '1,30p' "$INDEX_FILE"

# optional: update mtime of other files if you want
# touch "$SITE_DIR"/*

# reload nginx to ensure any server-level caches are cleared and config is valid
sudo nginx -t && sudo systemctl reload nginx

echo "Done. nginx reloaded."
