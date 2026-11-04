# Circuit Lab — interactive DC circuit simulator

A static, no-build educational website for **GitHub Pages**, intended for classroom exploration of simple DC electrical circuits. No accounts, libraries, CDNs, API keys, or server are required.

## Install on GitHub Pages

1. Download and unzip `circuit-lab-github-pages.zip`.
2. Create a folder such as `projects/circuit-lab/` inside your GitHub Pages repository.
3. Upload **all five files** (`index.html`, `style.css`, `app.js`, `solver.js`, `lessons.js`) into that same folder.
4. Commit the changes. Open `https://YOUR-USERNAME.github.io/projects/circuit-lab/` after GitHub Pages publishes the commit.

**For the apisit-man.github.io site:** this application resides at `applications/circuit-lab/`. The live URL is `https://apisit-man.github.io/applications/circuit-lab/`.

Modern browser required. ES modules do not work reliably from `file://`; test using GitHub Pages or a small local web server (`python3 -m http.server 8000` then open `http://localhost:8000`).

## Features

- Six draggable or tap-to-add components: battery, bulb, resistor, switch, ammeter and voltmeter.
- Click a yellow terminal, then a second yellow terminal, to connect wires. Multiple wires can share a terminal.
- Reposition by dragging a component; choose a component to edit its resistance/voltage, rotate or delete.
- Double-click switches or change their state in the inspector.
- DC nodal analysis gives signed currents, potential differences and dissipated power, including series/parallel networks.
- Five learning challenges, six examples, animated current indicator, undo/redo, zoom/pan and keyboard shortcuts.
- Browser autosave and manual save, circuit JSON export/import, SVG/PNG image exports.
- Responsive desktop/tablet/mobile layout. Mobile users can tap to add and tap terminals to wire.

## Teacher guidance

Suggested routine: **Predict → Build → Test → Measure → Explain**. Have students draw and predict an open circuit, a complete loop, two bulbs in series, and two in parallel before using the simulator. Compare measurements and discuss model limits. Suggested questions: What happens if the switch opens? What changes if we double the resistance? Is current used up by a bulb? Why is an ammeter placed in series and a voltmeter connected in parallel?

## Model and limitations (important)

- **DC steady-state only**; no AC, capacitance, inductance, transients, nonlinear diodes or realistic thermal filament behavior.
- Wires have zero resistance and nodes joined by wires share the same potential.
- Batteries are modeled as ideal voltage sources **with fixed 0.2 Ω internal series resistance**; this avoids singularities for short-circuits and produces approximate loaded terminal voltage.
- Ammeter resistance: 0.02 Ω. Voltmeter input resistance: 100 MΩ. Switch resistance when closed: 0.005 Ω; when open: infinite.
- Bulbs use **constant resistance**, so brightness is estimated from electrical power relative to a fixed visual scale of 1.5 W; real lamps change resistance as the filament heats up.
- The moving particles on wires represent **solved local branch/wire current directions and relative magnitudes** via KCL on each wire cluster, with a toggle between **Conventional Current ($+ \to -$)** and **Electron Flow ($- \to +$)**. Wires on open branches or high-impedance voltmeter leads ($100\,\text{M}\Omega$) accurately show zero particle flow.
- In parallel combinations of multiple voltage sources, conflicting batteries are represented via their internal resistances.
- Very large/short currents are warned about, but this is an educational simulation and not an electrical safety tool. Never connect components to mains electricity.
- The series challenge checks for a shared wire node and equal currents; use circuit discussion to verify that there are no unintended bypasses.

## Troubleshooting

- **Blank screen:** check that all five files are in the same directory and the site is loaded via HTTPS or HTTP, not from disk.
- **A bulb will not light:** two terminals of a battery must form a complete conductive loop through the bulb; the switch must be closed.
- **An incorrect connection:** click the wire, press Delete, then reconnect.
- **Lost your project:** exported JSON files can be imported. Autosaved local browser data may be erased by browser settings.

## Rights and scope

This is an original, independently implemented educational circuit simulator, created as an alternative to an interactive SciMath circuit resource. It does not copy the source website's scripts, graphics, or source assets. All app source is editable.
