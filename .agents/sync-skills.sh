#!/usr/bin/env bash
# Sync Skills, Rules & Plugins from Workspace (.agents/) to Global (~/.gemini/config/)
# Usage: bash .agents/sync-skills.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE_SKILLS="${SCRIPT_DIR}/skills"
WORKSPACE_RULES="${SCRIPT_DIR}/rules"
WORKSPACE_PLUGINS="${SCRIPT_DIR}/plugins-bundle"

GLOBAL_SKILLS="${HOME}/.gemini/config/skills"
GLOBAL_RULES="${HOME}/.gemini/config/rules"
GLOBAL_PLUGINS="${HOME}/.gemini/config/plugins"

mkdir -p "${GLOBAL_SKILLS}" "${GLOBAL_RULES}" "${GLOBAL_PLUGINS}"

echo "==> Installing skills from ${WORKSPACE_SKILLS} to ${GLOBAL_SKILLS}..."
for skill_dir in "${WORKSPACE_SKILLS}"/*/; do
  [ -d "${skill_dir}" ] || continue
  skill_name="$(basename "${skill_dir}")"
  rm -rf "${GLOBAL_SKILLS:?}/${skill_name}"
  cp -R "${skill_dir}" "${GLOBAL_SKILLS}/${skill_name}"
  echo "  [+] Skill installed: ${skill_name}"
done

if [ -d "${WORKSPACE_RULES}" ]; then
  echo "==> Installing rules from ${WORKSPACE_RULES} to ${GLOBAL_RULES}..."
  cp -R "${WORKSPACE_RULES}/." "${GLOBAL_RULES}/"
fi

if [ -d "${WORKSPACE_PLUGINS}" ]; then
  echo "==> Installing bundled plugins from ${WORKSPACE_PLUGINS} to ${GLOBAL_PLUGINS}..."
  for plugin_dir in "${WORKSPACE_PLUGINS}"/*/; do
    [ -d "${plugin_dir}" ] || continue
    plugin_name="$(basename "${plugin_dir}")"
    rm -rf "${GLOBAL_PLUGINS:?}/${plugin_name}"
    cp -R "${plugin_dir}" "${GLOBAL_PLUGINS}/${plugin_name}"
    echo "  [+] Plugin installed: ${plugin_name}"
  done
fi

echo ""
echo "Done! All skills, rules, and plugins are now installed globally in ~/.gemini/config/"
