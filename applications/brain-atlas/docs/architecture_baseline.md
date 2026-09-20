# Brain Atlas 3D (Medical & Neuroanatomy Suite) — Architecture & Codebase Baseline

**Document Version:** 1.0.0  
**Date:** 2026-09-20  
**Target Audience:** Secondary / High School Students (Ages 13–18, ม.4–ม.6 วิทยาศาสตร์ชีวภาพ / ระบบประสาท) & Pre-Med Explorers  
**Educational Focus:** Human Neuroanatomy, Clinical & Sensory Correlation, Medical Imaging Literacy (Axial/Coronal/Sagittal MPR, MNI Coordinates), Diagnostic Case Studies.

---

## 1. Executive Summary

"Brain Atlas 3D" is a high-performance WebGL/Three.js interactive neuroanatomy atlas and medical imaging simulator. It combines high-resolution 3D surface meshes (FreeSurfer Clinical Pial segmentation derived from 7T MRI) with procedurally generated internal deep-brain nuclei, ventricles, and cerebral vascular trees (TopCoW Circle of Willis). 

The platform allows learners to seamlessly dissect and peel cortical layers, position dynamic 3D cutting planes, synchronize multi-planar reconstruction (MPR) scans across Axial, Coronal, and Sagittal planes, and inspect anatomical and clinical data.

---

## 2. Technical Stack & Codebase Topology

| Module | Source File | Key Responsibilities |
|---|---|---|
| **Core 3D Engine & Slicer** | `app.js` | Three.js scene management, OrbitControls, WebGLRenderer with local clipping planes, raycasting hit-testing, peel slider, MPR canvas rendering, event bus. |
| **Neuroanatomy Knowledgebase** | `brain-data.js` | 20+ anatomical structures with MNI coordinates, Thai/English nomenclatures, physiological functions, clinical pathology notes, and educational preset tours. |
| **3D Asset Pipeline** | `models/brain-atlas.glb` | FreeSurfer pial cortex lobes (Frontal, Parietal, Temporal, Occipital), Cerebellum, Brainstem, Corpus Callosum, Hippocampus, Amygdala. |
| **Offline Fallback** | `models/brain-model-data.js` | Optional Base64-encoded GLTF geometry allowing standalone `file://` execution without CORS issues. |
| **User Interface & Layout** | `index.html`, `style.css` | Obsidian glassmorphic workstation UI, floating island toolbar, search autocomplete, camera views dock, 3-plane MPR window, inspector card. |
| **Build Bundler** | `build.js` | Fast zero-config esbuild script compiling ES modules into a minified, high-performance IIFE `bundle.js`. |

---

## 3. 3D Mesh Structure & Layer Pipeline

### 3.1 Structural Hierarchy (`scene` in `app.js`)
```
Scene
└── BrainRoot (THREE.Group centered at [0, 0, 0])
    ├── FreeSurferClinicalGroup (THREE.Group from GLTF)
    │   ├── frontal-lobe (Left & Right via vertex point split)
    │   ├── prefrontal-cortex
    │   ├── parietal-lobe
    │   ├── temporal-lobe
    │   ├── occipital-lobe
    │   ├── cerebellum
    │   ├── brain-stem (Midbrain, Pons, Medulla by Y threshold)
    │   ├── corpus-callosum
    │   ├── hippocampus
    │   └── amygdala
    └── InternalStructuresGroup (Parametric Procedural Meshes)
        ├── thalamus (Bilateral ovoids, SphereGeometry scaled 1.0, 1.45, 0.95)
        ├── lateral_ventricles (Bilateral C-shaped CatmullRom curves with TubeGeometry)
        ├── third_fourth_ventricles (3rd slit, Aqueduct tube, 4th ventricle cone)
        ├── circle_of_willis (Closed looped CatmullRom tube around skull base)
        ├── basilar_vertebral_artery (Vertebral junction to Basilar apex)
        ├── middle_cerebral_artery (M1 trunk + M2 superior/inferior branches)
        ├── anterior_cerebral_artery (ACoA + ACA arch over corpus callosum)
        └── venous_sinuses (Superior Sagittal Sinus arched tube)
```

### 3.2 Dynamic Peeling & Material Opacity Pipeline
- **Cortex Peeling**: The peel slider (`#cortex-opacity-slider`) adjusts `state.cortexOpacity` from `0.0` (completely stripped) to `1.0` (opaque cortical surface).
- **Depth-Write Decoupling**: When $0.02 < \text{opacity} < 0.98$, materials set `transparent = true`, `opacity = cortexOpacity`, and critically set `depthWrite = false`. This prevents the translucent outer brain shell from masking or occluding internal structures (Ventricles, Thalamus, Arteries).
- **Dual Color Modes**:
  - `realistic`: Cortical gray matter (`#ded4c5`), cerebellar folia (`#cbbeab`), ivory brainstem (`#e2d7c7`), crimson vasculature (`#e11d48`), cyan ventricles (`#38bdf8`).
  - `functional`: Sapphire blue frontal lobe (`#3b82f6`), emerald parietal lobe (`#10b981`), royal purple temporal lobe (`#8b5cf6`), sunset orange occipital lobe (`#f97316`), teal cerebellum (`#14b8a6`), rose brainstem (`#f43f5e`).

### 3.3 3D Cross-Section Clipping Plane Pipeline
- Three.js `renderer.localClippingEnabled = true`.
- `clippingPlane = new THREE.Plane(normal, constant)`.
- When a plane mode is selected (`axial`, `coronal`, `sagittal`):
  - **Axial (Horizontal)**: Normal vector $\mathbf{n} = (0, 0, \pm 1)$, cutting at coordinate $Z$.
  - **Coronal (Frontal)**: Normal vector $\mathbf{n} = (0, \pm 1, 0)$, cutting at coordinate $Y$.
  - **Sagittal (Side)**: Normal vector $\mathbf{n} = (\pm 1, 0, 0)$, cutting at coordinate $X$.
- Dynamic normal flipping via `#btn-flip-plane` toggles the visible hemisphere.
- A glowing helper plane (`PlaneGeometry(160, 160)` with cyan wireframe edges) visually displays the exact slice location in 3D space.

---

## 4. Multi-Planar Reconstruction (MPR) 2D Slicing Engine

### 4.1 2D Canvas Slicing Engine
Three synchronized $220 \times 220\text{ px}$ HTML5 canvases render synthetic high-contrast T1-weighted MRI slices:
1. **Axial Canvas (`#mpr-axial-canvas`)**: Slices through the $Z$ plane (Superior-Inferior), showing skull calvarium, cortical ribbon, subcortical white matter, and dynamic cross-sections of the lateral ventricles modulated by $\cos\left(\frac{z}{30}\cdot \frac{\pi}{2}\right)$.
2. **Coronal Canvas (`#mpr-coronal-canvas`)**: Slices through the $Y$ plane (Anterior-Posterior), showing bilateral hemispheric symmetry, longitudinal fissure, and temporal horn positions.
3. **Sagittal Canvas (`#mpr-sagittal-canvas`)**: Slices through the $X$ plane (Left-Right), displaying the curved arch of the Corpus Callosum on midline cuts ($|x| < 14\text{ mm}$), cerebellum in the posterior fossa, and brainstem profile.

### 4.2 Bi-Directional Interactive Synchronization
- **Canvas Dragging $\to$ 3D Section**: Clicking or scrubbing on any of the 3 MPR canvases updates the global `state.sliceCoord` $(x, y, z)$ and immediately moves the active 3D clipping plane and helper mesh.
- **3D Section Slider $\to$ 2D Crosshair**: Adjusting the 3D plane slider updates the dashed cyan crosshairs on the 2D MPR canvases and calculates the corresponding MNI coordinates in the status HUD.

---

## 5. Knowledgebase Schema

Each anatomical structure in `brain-data.js` adheres to the following typed schema:
```javascript
{
  id: string,               // Unique slug (e.g. 'frontal_lobe_left', 'circle_of_willis')
  nameEn: string,           // Formal English anatomical term
  nameTh: string,           // Standard Thai neuroanatomy term (ราชบัณฑิตยสภา / กายวิภาคศาสตร์สากล)
  system: string,           // Category: 'cerebrum' | 'limbic' | 'ventricles' | 'brainstem' | 'cerebellum' | 'vasculature'
  systemNameTh: string,     // Thai system category display name
  color: string,            // Hex color code for UI badges and functional rendering
  center: [x, y, z],        // FreeSurfer / MNI 3D coordinate centroid [mm]
  descriptionEn: string,    // English overview
  descriptionTh: string,    // Thai student-friendly conceptual overview
  functionsTh: string[],    // Bulleted core physiological and cognitive functions
  clinicalTh: string        // Clinical significance (e.g. stroke, lesions, historical cases like Phineas Gage)
}
```

---

## 6. Identified Pain Points for High School Learners (Ages 13–18)

1. **Lack of Gamified Inquiry & Challenges (Passive Viewer Syndrome)**:
   - The current application is purely reference-based. Students click structures without a learning goal, challenge, or scoring mechanism.
   - *Target Solution:* Introduce an interactive **"Neuro-Detective" / Clinical Diagnosis Challenge Mode** where students are presented with real-world patient symptoms (e.g., sudden speech arrest, loss of balance, vision hemianopia) and must locate and pinpoint the culprit brain region on the 3D model.

2. **Cognitive Overload & Text-Dense Modals**:
   - The Inspector Card presents wall-of-text clinical jargon without interactive scaffolding, pronunciation aids, or relatable real-life analogies (e.g., comparing the Thalamus to a railway relay hub or Circle of Willis to an electrical bypass circuit).
   - *Target Solution:* Format content with bite-sized takeaway badges, high-impact "Did You Know?" micro-insights, and visual cause-and-effect toggles.

3. **Absence of Functional Cause-and-Effect Simulation (Lesion Simulator)**:
   - While the clinical text describes conditions like "Broca's Aphasia" or "Hemispatial Neglect", students cannot see an animated or visual manifestation of what happens when that area ceases functioning.
   - *Target Solution:* Add an interactive **"Virtual Lesion & Stimulation Lab"** allowing students to toggle simulated stroke/injury states, highlighting the affected vascular territory and displaying symptom cards with interactive speech/vision/motor previews.

4. **Game Feel & Audio Feedback Missing**:
   - Navigation and slicing currently produce zero acoustic or tactile feedback. 
   - *Target Solution:* Incorporate procedural Web Audio synthesizer cues (micro-clicks on slicing, resonant neural chimes on correct identification, diagnostic pulse for vascular flow).

5. **Touch & Tablet UX Constraints**:
   - On school iPads and Chromebooks, the 3-view MPR PiP takes up a large percentage of the screen and can block 3D raycasting touch events.
   - *Target Solution:* Provide collapsible drawer states and optimized mobile layout modes for the MPR window and challenge HUDs.
