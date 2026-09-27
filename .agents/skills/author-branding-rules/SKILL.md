---
name: author-branding-rules
description: >-
  Editorial guidelines, personal branding standards, and strict institutional independence rules for Dr. Apisit's personal website.
  Use whenever creating, writing, or updating articles, author profiles, cards, metadata, Schema.org, or footer credits
  to ensure complete independence from organizational affiliations (strictly prohibiting institutional branding while preserving factual bibliographic citations).
---

# Personal Branding & Editorial Independence Guidelines

This skill enforces strict editorial independence for all works published on Dr. Apisit Tongchai's personal website and research portfolio (`apisit-man.github.io`).

---

## 1. Foundational Principle: Complete Institutional Independence

All articles, educational simulations, games, and research projects hosted on `apisit-man.github.io` are created **strictly in Dr. Apisit Tongchai's personal capacity as an independent scholar, educator, and technologist**.

* **Under NO circumstances** should any work imply official endorsement, representation, or institutional output of his workplace.
* Keep all projects strictly branded under his personal name and scholarly identity.

---

## 2. Strictly Prohibited Terms in Branding & Badges

Never include or reference any of the following terms in newly created project branding, author bylines, primary hero banners, bio badges, or Schema.org author metadata:

* ❌ `สสวท.`
* ❌ `สสวท`
* ❌ `ผู้เชี่ยวชาญ สสวท.`
* ❌ `ผู้เชี่ยวชาญด้านเทคโนโลยี สสวท.`
* ❌ `IPST` (as an affiliation/employer title)
* ❌ `The Institute for the Promotion of Teaching Science and Technology`

---

## 2.1 Protected Factual Citations & Bibliography Whitelist (ข้อยกเว้นทางบรรณานุกรมและประวัติผลงาน)

> [!IMPORTANT]
> **Factual and historical accuracy must always be preserved.** The prohibition above applies strictly to **author branding and institutional endorsement**, NOT to factual academic citations or historical records.

The following items are **explicitly whitelisted and must NEVER be modified, censored, or rewritten** during audits, refactorings, or bug fixes:

1. **Published Journal & Magazine Names (ชื่อวารสารและนิตยสารที่ตีพิมพ์จริง):**
   * References such as `นิตยสาร สสวท.` or `IPST Magazine` in publication lists, citations, or article cards are historical facts of publication venues and must remain exact as published.
2. **Official Contact Channels (ช่องทางติดต่อทางการ):**
   * Institutional email addresses (e.g., `atong@ipst.ac.th`) provided in contact cards or About sections must remain intact as configured by the author.
3. **External Reading Links & Media Hosts:**
   * External links hosting original articles or e-magazines (e.g., `emagazine.ipst.ac.th`) are legitimate source links and must not be altered.
4. **Historical Career / Education Records:**
   * Accurate historical employment or educational background in CV / Resume sections.

---

## 3. Approved Standard Titles & Persona

When writing author bylines, badges, or biographical metadata, choose strictly from these independent scholarly descriptors:

### In Thai:
* **ชื่อ-สกุล**: ดร.อภิสิทธิ์ ธงไชย
* **ตำแหน่ง/บทบาท (Badge)**: 
  * `นักวิจัยและนักการศึกษา`
  * `นักวิชาการอิสระด้านสะเต็มศึกษาและ AI`
  * `ผู้เชี่ยวชาญด้านการจัดการเรียนรู้วิทยาศาสตร์และ AI`
* **วุฒิการศึกษา/ความเชี่ยวชาญ**:
  * `Ph.D. วิทยาศาสตร์และเทคโนโลยีศึกษา`
  * `นักพัฒนาสื่อนวัตกรรมการเรียนรู้เชิงปฏิสัมพันธ์`

### In English:
* **Name**: Dr. Apisit Tongchai
* **Title / Role**:
  * `Independent Educator & Researcher`
  * `STEM & AI Education Specialist`
  * `Ph.D. in Science & Technology Education`

---

## 4. Standard HTML Author Profile Template

```html
<div class="flex items-center gap-4 pt-4 border-b border-slate-200/60 dark:border-slate-800/60 pb-6">
    <img src="../assets/images/profile.jpg" alt="ดร.อภิสิทธิ์ ธงไชย" class="w-12 h-12 rounded-full object-cover border-2 border-brand-500 shadow-md">
    <div>
        <div class="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <span>ดร.อภิสิทธิ์ ธงไชย</span>
            <span class="text-brand-600 dark:text-brand-400 text-xs px-1.5 py-0.5 rounded bg-brand-50 dark:bg-brand-950 border border-brand-200 dark:border-brand-800">
                นักวิจัยและนักการศึกษา
            </span>
        </div>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Ph.D. วิทยาศาสตร์และเทคโนโลยีศึกษา • ผู้เชี่ยวชาญการจัดการเรียนรู้ด้านวิทยาศาสตร์และ AI
        </p>
    </div>
</div>
```

---

## 5. Standard Schema.org JSON-LD Template

```json
{
  "@context": "https://schema.org",
  "@type": "ScholarlyArticle",
  "author": {
    "@type": "Person",
    "name": "ดร.อภิสิทธิ์ ธงไชย",
    "jobTitle": "นักวิชาการและนักวิจัยด้านการศึกษา (Educator & Researcher)",
    "url": "https://apisit-man.github.io/about.html"
  }
}
```

---

## 6. Pre-Commit Verification Checklist

Before committing any new article or feature:
1. Verify that new author bylines, hero badges, and Schema.org metadata use approved independent titles (`นักวิจัยและนักการศึกษา` or `Independent Educator & Researcher`).
2. Verify that meta keywords do not imply that the website is an official institutional outlet.
3. **DO NOT flag or rewrite existing bibliographic citations** (e.g. `นิตยสาร สสวท.`, `IPST Magazine`) or valid contact channels as violations.
