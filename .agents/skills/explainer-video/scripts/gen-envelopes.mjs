// Bundle the per-beat loudness envelopes (public/mouth/*.json) into one module the bundler can import.
import fs from "node:fs";
const out = {};
for (const f of fs.readdirSync("public/mouth").filter((n) => n.endsWith(".json")).sort()) {
  out[f.replace(".json", "")] = JSON.parse(fs.readFileSync(`public/mouth/${f}`, "utf8")).env;
}
fs.mkdirSync("src", { recursive: true });
fs.writeFileSync("src/envelopes.json", JSON.stringify(out));
console.log("envelopes:", Object.keys(out).length);
