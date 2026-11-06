---
name: website-article-publishing
description: >-
  Create, format, style, and publish scholarly and pedagogical articles or research publications for Dr. Apisit's personal website
  (apisit-man.github.io) and synchronize new publications with the master Google Doc CV and GitHub PDF (`assets/docs/apisit_cv.pdf`).
  Follows the signature design template of pinn-physics-informed-ai.html: Tailwind CSS, dark mode support, reading progress bar,
  KaTeX math typesetting, interactive Canvas simulations, code snippets, pedagogical classroom activities, social sharing, and strict independent author branding.
---

# Website Article Publishing Skill

This skill provides comprehensive guidelines, structural blueprints, and component templates for authoring and publishing articles on **Dr. Apisit Tongchai's personal website** (`apisit-man.github.io/articles/`).

It encodes the exact design system, styling, layout hierarchy, and features pioneered in [`articles/pinn-physics-informed-ai.html`](file:///articles/pinn-physics-informed-ai.html).

---

## 1. Design System & Core Specifications

* **Styling Framework**: Tailwind CSS (via CDN) with dark mode class configuration and custom `brand` purple palette (`#8b5cf6`).
* **Typography**:
  * Headings & Body: `'Plus Jakarta Sans'`, `'Prompt'`, sans-serif.
  * Math Formulas: KaTeX (`cdn.jsdelivr.net/npm/katex`) with auto-render for `$$...$$` (block) and `$...$` (inline).
  * Monospace Code: Pre-formatted blocks with dark slate background (`bg-slate-900 text-slate-100`).
* **Palette Highlights**:
  * Brand Accent: Purple / Indigo spectrum (`from-brand-600 via-indigo-600 to-purple-600`).
  * Dark Mode: Deep slate background (`bg-slate-950`), subtle borders (`border-slate-800/60`).
  * Light Mode: Clean off-white surface (`bg-[#fafafa]`), high-contrast text (`text-slate-800`).
* **Interactive Elements**:
  * Reading Progress Indicator (`#reading-progress` top-fixed gradient bar).
  * Light / Dark Mode Toggle with localStorage persistence.
  * Interactive 2D Canvas concept simulation widget (High-DPI Retina aware).
  * Social Sharing buttons (LINE, Facebook, X, and Instant Clipboard Copy).
* **Strict Author Branding**:
  * Follow [`author-branding-rules`](file:///.agents/skills/author-branding-rules/SKILL.md) strictly.
  * Independent scholarly persona: `ดร.อภิสิทธิ์ ธงไชย` (Dr. Apisit Tongchai), `นักวิจัยและนักการศึกษา`.
  * **Zero institutional affiliation branding** (no employer logos or institutional titles).

---

## 2. Article Structure & Content Flow

Every published article must follow this pedagogical, reader-friendly sequence:

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Header (Sticky Nav: Home, Articles, About, Theme Toggle) │
├─────────────────────────────────────────────────────────────┤
│ 2. Reading Progress Bar (Top fixed gradient)                │
├─────────────────────────────────────────────────────────────┤
│ 3. Article Metadata & Badges (Tags, Date, Estimated Read)   │
├─────────────────────────────────────────────────────────────┤
│ 4. Impactful H1 Title (with Gradient Highlight)             │
├─────────────────────────────────────────────────────────────┤
│ 5. Author Card (Avatar, Name, Scholarly Badge, Subtitle)    │
├─────────────────────────────────────────────────────────────┤
│ 6. "สรุปสั้น ๆ" (TL;DR Executive Summary Callout Box)       │
├─────────────────────────────────────────────────────────────┤
│ 7. Core Narrative (Divided into numbered sections 1..N):    │
│    - Section 1: Hook / Framing / Real-world Dilemma         │
│    - Section 2: Theoretical or Mathematical Formulation     │
│    - Section 3: Step-by-step Explainer (Numbered Cards)     │
│    - Section 4: Code Implementation / Architecture          │
│    - Section 5: Interactive Simulation / Conceptual Widget  │
│    - Section 6: Pedagogical & Classroom Inquiry Activity    │
│    - Section 7: Limitations & Critical Caveats              │
│    - Section 8: Classroom Integration & Teacher Takeaways   │
├─────────────────────────────────────────────────────────────┤
│ 8. Related Articles Navigation (3-Card Grid)                │
├─────────────────────────────────────────────────────────────┤
│ 9. References & Further Reading (APA Style citations)       │
├─────────────────────────────────────────────────────────────┤
│ 10. Social Share Bar (LINE, Facebook, X, Copy Link)         │
├─────────────────────────────────────────────────────────────┤
│ 11. Minimal Independent Footer                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. HTML Master Template

Save new articles inside the `articles/` directory (e.g. `articles/your-topic-slug.html`).

```html
<!DOCTYPE html>
<html lang="th" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{TITLE_TH}} - ดร.อภิสิทธิ์ ธงไชย</title>

    <!-- SEO & Metadata -->
    <meta name="description" content="{{DESCRIPTION}}">
    <meta name="keywords" content="{{KEYWORDS}}, ดร.อภิสิทธิ์ ธงไชย">
    <meta name="author" content="ดร.อภิสิทธิ์ ธงไชย">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://apisit-man.github.io/articles/{{SLUG}}.html">

    <!-- Open Graph / Social Media -->
    <meta property="og:type" content="article">
    <meta property="og:title" content="{{TITLE_TH}} - ดร.อภิสิทธิ์ ธงไชย">
    <meta property="og:description" content="{{DESCRIPTION}}">
    <meta property="og:image" content="https://apisit-man.github.io/assets/images/profile.jpg">
    <meta property="og:url" content="https://apisit-man.github.io/articles/{{SLUG}}.html">

    <!-- Twitter Card -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:title" content="{{TITLE_TH}}">
    <meta property="twitter:description" content="{{DESCRIPTION}}">
    <meta property="twitter:image" content="https://apisit-man.github.io/assets/images/profile.jpg">

    <!-- Schema.org JSON-LD -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "ScholarlyArticle",
      "headline": "{{TITLE_TH}}",
      "author": {
        "@type": "Person",
        "name": "ดร.อภิสิทธิ์ ธงไชย",
        "jobTitle": "นักวิชาการและนักวิจัยด้านการศึกษา (Educator & Researcher)",
        "url": "https://apisit-man.github.io/about.html"
      },
      "datePublished": "{{DATE_ISO}}",
      "dateModified": "{{DATE_ISO}}",
      "description": "{{DESCRIPTION}}",
      "publisher": { "@type": "Person", "name": "ดร.อภิสิทธิ์ ธงไชย" },
      "mainEntityOfPage": "https://apisit-man.github.io/articles/{{SLUG}}.html"
    }
    </script>

    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Prompt:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

    <!-- KaTeX for Math Equations (if applicable) -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js" onload="renderMathInElement(document.body, {delimiters: [{left: '$$', right: '$$', display: true}, {left: '$', right: '$', display: false}]});"></script>

    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Plus Jakarta Sans', 'Prompt', 'sans-serif'],
                        prompt: ['Prompt', 'sans-serif'],
                    },
                    colors: {
                        brand: {
                            50: '#f5f3ff', 100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd', 400: '#a78bfa',
                            500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9', 800: '#5b21b6', 900: '#4c1d95',
                        },
                    }
                }
            }
        }
    </script>

    <script>
        if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    </script>

    <style>
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        .dark ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 9999px; }
        .dark ::-webkit-scrollbar-thumb { background: #334155; }
        .formula { font-family: 'Cambria Math', 'Times New Roman', serif; }
    </style>
</head>
<body class="bg-[#fafafa] dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-sans antialiased transition-colors duration-300">

    <!-- Reading Progress Bar -->
    <div id="reading-progress" class="fixed top-0 left-0 h-1 bg-gradient-to-r from-brand-500 via-indigo-500 to-purple-600 z-50 transition-all duration-150" style="width: 0%"></div>

    <!-- Header Navigation -->
    <header class="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/60 dark:border-slate-800/60 transition-colors duration-300">
        <nav class="container mx-auto px-4 sm:px-6 py-3.5 sm:py-4 flex justify-between items-center">
            <div class="text-lg sm:text-xl font-bold tracking-tight bg-gradient-to-r from-brand-600 to-indigo-600 dark:from-brand-400 dark:to-indigo-400 bg-clip-text text-transparent hover:scale-105 transition-transform">
                <a href="../index.html" class="flex items-center gap-2">
                    <span class="text-2xl leading-none">🏠</span>
                    <span>หน้าแรก</span>
                </a>
            </div>
            <div class="flex items-center gap-3 sm:gap-4">
                <a href="../index.html#innovations" class="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors hidden md:inline">สื่อและนวัตกรรม</a>
                <a href="../index.html#articles" class="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">บทความทั้งหมด</a>
                <a href="../about.html" class="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">เกี่ยวกับฉัน</a>
                <a href="../index.html#contact" class="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors hidden sm:inline">ติดต่อ</a>
                <button id="theme-toggle" type="button" aria-label="สลับโหมดมืด/สว่าง" class="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">🌓</button>
            </div>
        </nav>
    </header>

    <main class="container mx-auto px-4 md:px-6 py-8 sm:py-10 max-w-4xl space-y-10">
        <article class="space-y-10">

            <!-- Metadata & Tags -->
            <div class="space-y-4">
                <div class="flex flex-wrap items-center gap-2 text-xs font-semibold">
                    <span class="px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border border-brand-200/60 dark:border-brand-800/60">{{TAG_1}}</span>
                    <span class="px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200/60 dark:border-purple-800/60">{{TAG_2}}</span>
                    <span class="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">{{TAG_3}}</span>
                    <span class="text-slate-400 dark:text-slate-500">•</span>
                    <span class="text-slate-500 dark:text-slate-400">{{DATE_TH}}</span>
                    <span class="text-slate-400 dark:text-slate-500">•</span>
                    <span class="text-slate-500 dark:text-slate-400">เวลาอ่านประมาณ {{READING_TIME}} นาที</span>
                </div>

                <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.25]">
                    {{TITLE_PREFIX}} <span class="bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">{{TITLE_HIGHLIGHT}}</span>: {{TITLE_SUFFIX}}
                </h1>

                <!-- Author Profile Card -->
                <div class="flex items-center gap-4 pt-4 border-b border-slate-200/60 dark:border-slate-800/60 pb-6">
                    <img src="../assets/images/profile-transparent.png" alt="ดร.อภิสิทธิ์ ธงไชย" class="w-12 h-12 object-contain drop-shadow-md">
                    <div>
                        <div class="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                            <span>ดร.อภิสิทธิ์ ธงไชย</span>
                            <span class="text-brand-600 dark:text-brand-400 text-xs px-1.5 py-0.5 rounded bg-brand-50 dark:bg-brand-950 border border-brand-200 dark:border-brand-800">นักวิจัยและนักการศึกษา</span>
                        </div>
                        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Ph.D. วิทยาศาสตร์และเทคโนโลยีศึกษา • ผู้เชี่ยวชาญการจัดการเรียนรู้ด้านวิทยาศาสตร์และ AI</p>
                    </div>
                </div>
            </div>

            <!-- Executive Summary (สรุปสั้น ๆ) -->
            <div class="p-6 rounded-2xl bg-gradient-to-br from-brand-50/80 via-white to-indigo-50/80 dark:from-brand-950/30 dark:via-slate-900/60 dark:to-indigo-950/30 border border-brand-200/60 dark:border-brand-900/50 shadow-sm">
                <div class="flex items-center gap-2 mb-3">
                    <span class="text-xl">💡</span>
                    <h2 class="font-bold text-slate-900 dark:text-white">สรุปสั้น ๆ</h2>
                </div>
                <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {{EXECUTIVE_SUMMARY_TEXT}}
                </p>
            </div>

            <!-- Section 1: Introduction / Dilemma -->
            <section class="space-y-4">
                <h2 class="text-2xl font-bold text-slate-900 dark:text-white">1. เริ่มจากคำถามชวนคิด</h2>
                <p class="leading-relaxed text-slate-700 dark:text-slate-300">
                    {{INTRO_PARAGRAPH}}
                </p>
                <div class="grid sm:grid-cols-3 gap-4">
                    <div class="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
                        <div class="text-2xl mb-2">📊</div>
                        <h3 class="font-bold text-sm mb-1">{{CARD_1_TITLE}}</h3>
                        <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{{CARD_1_DESC}}</p>
                    </div>
                    <div class="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
                        <div class="text-2xl mb-2">📐</div>
                        <h3 class="font-bold text-sm mb-1">{{CARD_2_TITLE}}</h3>
                        <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{{CARD_2_DESC}}</p>
                    </div>
                    <div class="p-4 rounded-xl bg-brand-50 dark:bg-brand-950/30 border border-brand-200/60 dark:border-brand-800/60">
                        <div class="text-2xl mb-2">🤝</div>
                        <h3 class="font-bold text-sm mb-1">{{CARD_3_TITLE}}</h3>
                        <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{{CARD_3_DESC}}</p>
                    </div>
                </div>
            </section>

            <!-- Section 2: Mathematical / Conceptual Formulation -->
            <section class="space-y-4">
                <h2 class="text-2xl font-bold text-slate-900 dark:text-white">2. ทฤษฎีและสมการที่เกี่ยวข้อง</h2>
                <div class="py-6 px-4 rounded-xl bg-slate-900 text-slate-100 text-center text-xl sm:text-2xl overflow-x-auto shadow-inner">
                    $$\mathcal{L}_{\text{total}} = \mathcal{L}_{\text{data}} + \lambda \, \mathcal{L}_{\text{physics}}$$
                </div>
                <p class="leading-relaxed text-slate-700 dark:text-slate-300">
                    {{THEORY_EXPLANATION}}
                </p>
            </section>

            <!-- Section 3: Step-by-Step Mechanism -->
            <section class="space-y-4">
                <h2 class="text-2xl font-bold text-slate-900 dark:text-white">3. ขั้นตอนการทำงาน</h2>
                <ol class="space-y-3">
                    <li class="flex gap-3 p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
                        <span class="flex-none w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-sm">1</span>
                        <div><h3 class="font-bold">{{STEP_1_TITLE}}</h3><p class="text-sm text-slate-600 dark:text-slate-400">{{STEP_1_DESC}}</p></div>
                    </li>
                    <li class="flex gap-3 p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
                        <span class="flex-none w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-sm">2</span>
                        <div><h3 class="font-bold">{{STEP_2_TITLE}}</h3><p class="text-sm text-slate-600 dark:text-slate-400">{{STEP_2_DESC}}</p></div>
                    </li>
                </ol>
            </section>

            <!-- Section 4: Code Implementation Snippet -->
            <section class="space-y-4">
                <h2 class="text-2xl font-bold text-slate-900 dark:text-white">4. ตัวอย่างโค้ดและแกนสำคัญ</h2>
<pre class="p-4 rounded-xl bg-slate-900 text-slate-100 text-xs sm:text-sm overflow-x-auto leading-relaxed"><code># Core Implementation Example
{{CODE_SNIPPET}}</code></pre>
            </section>

            <!-- Section 5: Interactive Simulation / Conceptual Lab -->
            <section class="space-y-4" id="sim-section">
                <h2 class="text-2xl font-bold text-slate-900 dark:text-white">ลองเล่น: การทดลองเชิงปฏิสัมพันธ์</h2>
                <p class="leading-relaxed text-slate-700 dark:text-slate-300">
                    {{SIM_EXPLANATION}}
                </p>
                <div class="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 space-y-4">
                    <canvas id="interactive-canvas" class="w-full rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800" style="height:320px" role="img" aria-label="Interactive Simulation"></canvas>
                    <div class="grid sm:grid-cols-2 gap-4">
                        <label class="block text-sm font-semibold">
                            พารามิเตอร์ 1 = <span id="param1-val">1.0</span>
                            <input id="param1-slider" type="range" min="0" max="2" step="0.1" value="1.0" class="w-full accent-brand-600">
                        </label>
                    </div>
                </div>
            </section>

            <!-- Section 6: Pedagogical Classroom Activity (จับผิด/ชวนคุย) -->
            <section class="space-y-4">
                <h2 class="text-2xl font-bold text-slate-900 dark:text-white">5. กิจกรรมชวนคิดและจับผิดสำหรับห้องเรียน</h2>
                <div class="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40">
                    <p class="leading-relaxed text-slate-700 dark:text-slate-300">
                        {{ACTIVITY_CONTEXT}}
                    </p>
                    <p class="mt-3 font-semibold text-amber-800 dark:text-amber-300">ชวนผู้เรียนคิดและทดลอง</p>
                    <ul class="list-disc pl-6 mt-1 space-y-1 text-slate-700 dark:text-slate-300">
                        <li>{{QUESTION_1}}</li>
                        <li>{{QUESTION_2}}</li>
                    </ul>
                </div>
            </section>

            <!-- Section 7: Caveats and Limitations -->
            <section class="space-y-4">
                <h2 class="text-2xl font-bold text-slate-900 dark:text-white">6. ข้อจำกัดและข้อควรระวัง</h2>
                <div class="grid sm:grid-cols-2 gap-4">
                    <div class="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
                        <h3 class="font-bold text-sm mb-1">⚠️ {{CAVEAT_1_TITLE}}</h3>
                        <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{{CAVEAT_1_DESC}}</p>
                    </div>
                    <div class="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
                        <h3 class="font-bold text-sm mb-1">🎯 {{CAVEAT_2_TITLE}}</h3>
                        <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{{CAVEAT_2_DESC}}</p>
                    </div>
                </div>
            </section>

            <!-- Section 8: Related Articles -->
            <section class="space-y-4 pt-6">
                <h2 class="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2"><span>📖</span> บทความที่เกี่ยวข้อง</h2>
                <div class="grid md:grid-cols-3 gap-4">
                    <a href="physics-water-wave-python.html" class="block p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-brand-400 dark:hover:border-brand-500 transition-all hover:-translate-y-0.5 group">
                        <span class="text-xs text-cyan-600 dark:text-cyan-400 font-semibold">🌊 Physics Lab</span>
                        <h3 class="font-bold text-sm text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors mt-1">เปลี่ยนคลิปวิดีโอเป็นแล็บฟิสิกส์</h3>
                        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">วิเคราะห์คลื่นน้ำด้วย Python บน Google Colab</p>
                    </a>
                    <a href="brain-first-ai-second.html" class="block p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-brand-400 dark:hover:border-brand-500 transition-all hover:-translate-y-0.5 group">
                        <span class="text-xs text-brand-600 dark:text-brand-400 font-semibold">🧠 Brain First, AI Second</span>
                        <h3 class="font-bold text-sm text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors mt-1">สมองนำทาง AI ตามหลัง</h3>
                        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">มนุษย์ยังเป็นผู้คิด และ AI เป็นคู่คิด</p>
                    </a>
                    <a href="pinn-physics-informed-ai.html" class="block p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-brand-400 dark:hover:border-brand-500 transition-all hover:-translate-y-0.5 group">
                        <span class="text-xs text-purple-600 dark:text-purple-400 font-semibold">⚡ PINN</span>
                        <h3 class="font-bold text-sm text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors mt-1">เมื่อ AI เรียนรู้ฟิสิกส์</h3>
                        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Physics-Informed Neural Network สำหรับครู</p>
                    </a>
                </div>
                <p class="text-sm"><a href="../index.html#articles" class="text-brand-600 dark:text-brand-400 font-semibold hover:underline">← กลับไปดูบทความทั้งหมด</a></p>
            </section>

            <!-- References -->
            <section class="space-y-3 pt-6 border-t border-slate-200/60 dark:border-slate-800/60">
                <h2 class="text-xl font-bold text-slate-900 dark:text-white">แหล่งอ้างอิงและศึกษาต่อ</h2>
                <ul class="list-disc pl-6 space-y-1.5 text-sm text-slate-600 dark:text-slate-400">
                    <li>{{REFERENCE_1}}</li>
                    <li>{{REFERENCE_2}}</li>
                </ul>
            </section>

            <!-- Social Share Bar -->
            <section class="flex flex-wrap items-center gap-3 pt-4">
                <span class="text-sm font-semibold text-slate-600 dark:text-slate-400">แชร์บทความ:</span>
                <button type="button" onclick="shareToLine()" class="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold transition-colors">LINE</button>
                <button type="button" onclick="shareToFacebook()" class="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors">Facebook</button>
                <button type="button" onclick="shareToX()" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold transition-colors">X</button>
                <button type="button" onclick="copyToClipboard()" class="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 text-xs font-semibold transition-colors">คัดลอกลิงก์</button>
            </section>
        </article>
    </main>

    <!-- Footer -->
    <footer class="bg-slate-100 dark:bg-slate-950 border-t border-slate-200/50 dark:border-slate-800/50 text-slate-500 dark:text-slate-400 text-center py-10 space-y-2">
        <p class="text-sm font-medium">© 2026 ดร.อภิสิทธิ์ ธงไชย. All Rights Reserved.</p>
        <p class="text-xs"><a href="../index.html" class="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">หน้าแรก</a> • <a href="../about.html" class="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">เกี่ยวกับผู้จัดทำ</a> • <a href="../sitemap.html" class="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">แผนผังเว็บไซต์</a></p>
    </footer>

    <!-- Standard Scripts -->
    <script>
        // Reading progress
        window.addEventListener('scroll', function () {
            const h = document.documentElement;
            const p = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
            const bar = document.getElementById('reading-progress');
            if (bar) bar.style.width = p + '%';
        });

        // Theme toggle
        const toggleBtn = document.getElementById('theme-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', function () {
                const isDark = document.documentElement.classList.toggle('dark');
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
            });
        }

        // Social Share functions
        const pageUrl = window.location.href;
        const pageTitle = document.title;
        function shareToLine() { window.open('https://social-plugins.line.me/lineit/share?url=' + encodeURIComponent(pageUrl), '_blank'); }
        function shareToFacebook() { window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(pageUrl), '_blank'); }
        function shareToX() { window.open('https://twitter.com/intent/tweet?url=' + encodeURIComponent(pageUrl) + '&text=' + encodeURIComponent(pageTitle), '_blank'); }
        function copyToClipboard() { navigator.clipboard.writeText(pageUrl); alert('คัดลอกลิงก์เรียบร้อยแล้ว'); }
    </script>
</body>
</html>
```

---

## 4. Checklists Before Publishing

When generating an article with this skill:

1. **Brand Independence Check**: Ensure author is named `ดร.อภิสิทธิ์ ธงไชย`, with role `นักวิจัยและนักการศึกษา` or `ผู้เชี่ยวชาญด้านการจัดการเรียนรู้วิทยาศาสตร์และ AI`. No institutional affiliations in badges or headers.
2. **Reading Progress Bar**: Verify `#reading-progress` element is positioned fixed at `top-0 left-0`.
3. **KaTeX Inclusions**: If math formulas exist, include KaTeX CSS & JS and format equations with `$$...$$` or `$...$`.
4. **Summary Card**: Include the "สรุปสั้น ๆ" callout block right under the author card.
5. **Classroom Connection**: Include inquiry/critical reflection questions for educators or learners.
6. **Social & SEO**: Populate complete Open Graph, Twitter Cards, Canonical link, and Schema.org `ScholarlyArticle`.
7. **Index Synchronization**: Add the new article card to `index.html` under `#articles` and update `sitemap.xml`.

---

## 5. Academic Publication & CV Synchronization Workflow

Whenever Dr. Apisit publishes a new research paper or national academic article (such as in *IPST Magazine* / *นิตยสาร สสวท.*) and asks to add it to the website and CV:

### Step 1: Update Bilingual Research Grid & Search Index
1. **Thai Homepage (`index.html`)**:
   - Insert the new `<article class="research-card ..."` inside `#research-grid` with `data-research-type="national"` (or `"international"`).
   - Increment the `.research-filter-badge` counters on the filter buttons (`ทั้งหมด`, `นานาชาติ`, `ในประเทศ`).
2. **English Homepage (`index-en.html`)**:
   - Insert the matching English `<article class="research-card ..."` inside `#research-grid` with the same `id` (e.g., `id="paper-ipst-262-2569"`).
   - Increment the `.research-filter-badge` counters (`All`, `International`, `National`).
3. **Search Index (`assets/js/search-data.js`)**:
   - Add both `"th"` and `"en"` search objects pointing to `#paper-<slug>` and verify syntax using `node -c assets/js/search-data.js`.

### Step 2: Update the Master Google Doc CV
- **Master Academic CV Doc ID**: `1Ieqr6oKxlaORmOZ71piy6I_9VChMVA5KzNQt-deC0nM` (4–5 page CV used for `assets/docs/apisit_cv.pdf`)
  - *(Related 1-Page Executive Bio: `1s69BN2iu4kAevKoJ5un6Tr4zZ8bPbhlLGUEIZCNGxwY`; 1-Page Modern Resume: `1EV8hCgtxVW99CNv0IaFgQg3t7geErWSon_lIFSd-G9Y`)*
- **Insertion Method (Windows CLI Safe)**:
  1. Find the exact start offset of the top entry under `PUBLICATIONS`:
     ```powershell
     gdocs readonly find-offset 1Ieqr6oKxlaORmOZ71piy6I_9VChMVA5KzNQt-deC0nM "Tongchai, A."
     ```
  2. Create a temporary JSON batch file (e.g., `cv_insert.json`) with a trailing `\n` so the new entry inherits the 14pt font and 27pt hanging indent of the `PUBLICATIONS` list:
     ```json
     [
       {
         "op": "insert",
         "start": 5192,
         "text": "Tongchai, A. (2026). Title of Article. Journal/Magazine Name, Vol(Issue), pp-pp. (in Thai). \n"
       }
     ]
     ```
  3. Apply the batch mutation:
     ```powershell
     gdocs mutate batch 1Ieqr6oKxlaORmOZ71piy6I_9VChMVA5KzNQt-deC0nM -f cv_insert.json
     ```

### Step 3: Export PDF to Website & Push to GitHub
1. Export the updated Google Doc directly to `assets/docs/apisit_cv.pdf`:
   ```powershell
   gdocs readonly export 1Ieqr6oKxlaORmOZ71piy6I_9VChMVA5KzNQt-deC0nM --format pdf --output "c:\Users\atong\Documents\antigravity\personal website\assets\docs\apisit_cv.pdf"
   ```
2. Visually inspect `assets/docs/apisit_cv.pdf` to confirm clean pagination and hanging indentation, then commit and push `index.html`, `index-en.html`, `assets/js/search-data.js`, and `assets/docs/apisit_cv.pdf` to `origin/main`.

