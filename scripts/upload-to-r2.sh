#!/usr/bin/env bash
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
VIDEOS_DIR="$ROOT/videos"
ENDPOINT="https://74e2f46f7731fe62c83d8fb8c59fbd68.r2.cloudflarestorage.com"
BUCKET="${BUCKET:-yourone-videos}"

export AWS_ACCESS_KEY_ID="76da0ba68627b23c6fe4dec32f2fe79e"
export AWS_SECRET_ACCESS_KEY="795e24dde3731370ffa7730bccee75aefc22efbd903c8224a272df0657e63a73"
export AWS_DEFAULT_REGION="auto"

echo "=== Uploading to R2 bucket: $BUCKET ==="
ok=0; fail=0

for f in "$VIDEOS_DIR"/*.mp4; do
  [ -f "$f" ] || continue
  name="$(basename "$f")"
  mb=$(du -m "$f" | cut -f1)
  printf "  ↑ %-30s %3dMB … " "$name" "$mb"
  if aws s3 cp "$f" "s3://$BUCKET/$name" \
      --endpoint-url "$ENDPOINT" \
      --content-type "video/mp4" \
      --cache-control "public, max-age=31536000, immutable" \
      --no-progress 2>/dev/null; then
    echo "✓"; ((ok++))
  else
    echo "✗"; ((fail++))
  fi
done

echo ""
echo "Done: $ok uploaded, $fail failed"
echo "URL: https://pub-558ced66b1054a088b11443d1cd1ea5d.r2.dev/{filename}.mp4"
