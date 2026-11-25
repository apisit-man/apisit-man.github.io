#!/usr/bin/env bash
# Create an empty explainer project that follows SCHEMA.md (layout schema v1).
#
#   new-project.sh <name> ["<one-line description>"]
#
# The project is made in ${EXPLAINER_ROOT:-~/explainer}/<name>/.
# It renders a blank 5 s composition at once, and check-layout.py passes on it.
set -euo pipefail

name="${1:?usage: new-project.sh <name> [\"description\"]}"
desc="${2:-new explainer}"
root="${EXPLAINER_ROOT:-$HOME/explainer}"
skill="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
dir="$root/$name"

[[ "$name" =~ ^[a-z0-9][a-z0-9-]*$ ]] || { echo "name: lowercase letters, digits, hyphens only" >&2; exit 2; }
[[ -e "$dir" ]] && { echo "$dir exists; not touched" >&2; exit 1; }

mkdir -p "$dir"/{in/storyboards,in/ref,assets/{voice,voice-norm,music},src,scripts,work,out}
mkdir -p "$dir"/public/{voice-norm,mouth,sfx,brand,fonts,characters,backgrounds,props,screens,faces}
cp -r "$skill/starter/." "$dir/"
# -i.bak works with both GNU and BSD (macOS) sed
sed -i.bak "s/\"name\": \"explainer-starter\"/\"name\": \"$name\"/" "$dir/package.json"
rm "$dir/package.json.bak"
printf '{\n "gap_s": 0.4,\n "voices": {},\n "beats": []\n}\n' > "$dir/storyboard.json"
# a silent placeholder, replaced by fit-music.py: the layout check wants every staticFile() to exist
ffmpeg -nostdin -y -v error -f lavfi -i anullsrc=r=44100:cl=mono -t 1 -b:a 128k "$dir/public/music.mp3"

# the shared tools, as copies (check-layout.py and new-project.sh stay in the skill)
for f in "$skill"/scripts/*; do
  case "$(basename "$f")" in
    check-layout.py|new-project.sh|new-project.py|__pycache__) ;;
    *) cp "$f" "$dir/scripts/" ;;
  esac
done

today="$(date +%F)"
cat > "$dir/CLAUDE.md" <<EOF
<!-- router: $desc — status: started $today, no video yet -->
# $name — $desc

## What it is

Topic, language, voices, brand, length. (Fill in.)

## Compositions

| Id | Storyboard | Output |
|---|---|---|
| \`Full\` | \`storyboard.json\` | \`out/$name-full.mp4\` |

## Status

- $today: project created with \`new-project.sh\`.

## Render

\`\`\`bash
cd $dir
npm install
npx remotion still src/index.ts Full work/stills/f45.png --frame=45
npx remotion render src/index.ts Full out/$name-full.mp4
\`\`\`

## Layout

Follows \`SCHEMA.md\` of the explainer-video skill (layout schema v1).
Check it: \`python3 $skill/scripts/check-layout.py $dir\`.

Deviations: none.

## Decisions

(Choices that the user made, with the date and the reason.)
EOF

echo "created $dir"
python3 -I "$skill/scripts/check-layout.py" "$dir"
cat <<EOF
next:
  cd $dir && npm install
  write in/brief.md, then the storyboard (SKILL.md step 1)
EOF
