import os
import re
import json
import subprocess
from html.parser import HTMLParser

class SimpleHTMLInspector(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = []
        self.meta = []
        self.scripts = []
        self.images = []
        self.links = []
        self.has_article = False
        self.has_header = False
        self.has_nav = False
        self.nav_texts = []
        self.canvases = 0
        self.in_nav_or_header = False
        self.current_nav_text = []
        self.in_script_ldjson = False
        self.current_ldjson = []

    def handle_starttag(self, tag, attrs):
        attr_dict = dict(attrs)
        self.tags.append((tag, attr_dict))

        if tag in ('nav', 'header'):
            self.has_header = True
            self.in_nav_or_header = True

        if tag == 'article':
            self.has_article = True

        if tag == 'canvas':
            self.canvases += 1

        if tag == 'meta':
            self.meta.append(attr_dict)

        if tag == 'img':
            self.images.append(attr_dict)

        if tag == 'a':
            self.links.append(attr_dict)

        if tag == 'script' and attr_dict.get('type') == 'application/ld+json':
            self.in_script_ldjson = True

    def handle_endtag(self, tag):
        if tag in ('nav', 'header'):
            self.in_nav_or_header = False
            self.nav_texts.append(" ".join(self.current_nav_text))
            self.current_nav_text = []

        if tag == 'script' and self.in_script_ldjson:
            self.in_script_ldjson = False

    def handle_data(self, data):
        if self.in_nav_or_header:
            self.current_nav_text.append(data.strip())
        if self.in_script_ldjson:
            self.current_ldjson.append(data)


def run_comprehensive_audit():
    repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    print(f"===========================================================")
    print(f"  COMPREHENSIVE WEBSITE SKILLS AUDIT & REFINEMENT REPORT")
    print(f"  Target Repository: {repo_root}")
    print(f"===========================================================")

    results = {
        "author_branding": {"passed": [], "issues": []},
        "navbar_cv_integrity": {"passed": [], "issues": []},
        "pages_vercel_pipeline": {"passed": [], "issues": []},
        "design_and_typography": {"passed": [], "issues": []},
        "articles_publishing": {"passed": [], "issues": []},
        "canvas_and_simulations": {"passed": [], "issues": []},
        "mobile_game_ux_and_audio": {"passed": [], "issues": []},
        "socratic_ai_and_api_security": {"passed": [], "issues": []},
        "accessibility_and_contrast": {"passed": [], "issues": []}
    }

    # 1. Pipeline & Git checks
    try:
        git_remote = subprocess.check_output(['git', 'remote', '-v'], cwd=repo_root, text=True)
        if 'apisit-man/apisit-man.github.io' in git_remote:
            results["pages_vercel_pipeline"]["passed"].append("Git remote correctly configured to apisit-man/apisit-man.github.io")
        else:
            results["pages_vercel_pipeline"]["issues"].append(f"Git remote check warning: {git_remote.strip()}")
    except Exception as e:
        results["pages_vercel_pipeline"]["issues"].append(f"Git command failed: {e}")

    # Check .nojekyll
    if os.path.exists(os.path.join(repo_root, '.nojekyll')):
        results["pages_vercel_pipeline"]["passed"].append(".nojekyll file exists at root")
    else:
        results["pages_vercel_pipeline"]["issues"].append("Missing .nojekyll at repository root")

    # Check robots.txt & sitemap.xml
    robots_path = os.path.join(repo_root, 'robots.txt')
    sitemap_path = os.path.join(repo_root, 'sitemap.xml')
    if os.path.exists(robots_path):
        with open(robots_path, 'r', encoding='utf-8') as f:
            robots_content = f.read()
        if 'sitemap.xml' in robots_content and 'apisit-man.github.io' in robots_content:
            results["pages_vercel_pipeline"]["passed"].append("robots.txt properly references sitemap.xml on apisit-man.github.io")
        else:
            results["pages_vercel_pipeline"]["issues"].append("robots.txt does not properly reference sitemap.xml")
    else:
        results["pages_vercel_pipeline"]["issues"].append("Missing robots.txt")

    # Check sitemap URLs vs existing pages
    sitemap_urls = set()
    if os.path.exists(sitemap_path):
        with open(sitemap_path, 'r', encoding='utf-8') as f:
            sitemap_content = f.read()
        sitemap_urls = set(re.findall(r'<loc>(https://apisit-man\.github\.io/[^<]*)</loc>', sitemap_content))
        results["pages_vercel_pipeline"]["passed"].append(f"sitemap.xml found with {len(sitemap_urls)} indexed URLs")
    else:
        results["pages_vercel_pipeline"]["issues"].append("Missing sitemap.xml")

    # Check Vercel serverless API files
    api_dir = os.path.join(repo_root, 'api')
    if os.path.exists(api_dir):
        for fname in os.listdir(api_dir):
            if fname.endswith('.js'):
                fpath = os.path.join(api_dir, fname)
                with open(fpath, 'r', encoding='utf-8') as f:
                    api_code = f.read()
                if 'Access-Control-Allow-Origin' in api_code and 'OPTIONS' in api_code:
                    results["pages_vercel_pipeline"]["passed"].append(f"API endpoint {fname} handles CORS & OPTIONS preflight")
                else:
                    results["pages_vercel_pipeline"]["issues"].append(f"API endpoint {fname} missing CORS headers or OPTIONS handler")

    # Gather all HTML files
    all_html_files = []
    for root, dirs, files in os.walk(repo_root):
        if any(skip in root for skip in ['.git', '.gemini', 'node_modules', '.idea', '.vscode', 'backup', '.codex_tmp']):
            continue
        for f in files:
            if f.endswith('.html'):
                all_html_files.append(os.path.join(root, f))

    # Whitelist patterns for author-branding
    whitelisted_patterns = [
        re.compile(r'นิตยสาร\s*สสวท', re.IGNORECASE),
        re.compile(r'IPST\s*Magazine', re.IGNORECASE),
        re.compile(r'atong@ipst\.ac\.th', re.IGNORECASE),
        re.compile(r'emagazine\.ipst\.ac\.th', re.IGNORECASE),
        re.compile(r'ipst\.ac\.th', re.IGNORECASE),
        re.compile(r'วารสาร\s*สสวท', re.IGNORECASE),
    ]

    prohibited_branding_regex = re.compile(
        r'(ผู้เชี่ยวชาญ\s*สสวท|ผู้เชี่ยวชาญด้านเทคโนโลยี\s*สสวท|ที่ปรึกษา\s*สสวท|พนักงาน\s*สสวท)', 
        re.IGNORECASE
    )

    # Scan HTML files
    for fpath in sorted(all_html_files):
        rel = os.path.relpath(fpath, repo_root).replace('\\', '/')
        with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()

        inspector = SimpleHTMLInspector()
        try:
            inspector.feed(content)
        except Exception:
            pass

        # -------------------------------------------------------------
        # 1. AUTHOR BRANDING & TITLES
        # -------------------------------------------------------------
        content_for_branding_test = content
        for wp in whitelisted_patterns:
            content_for_branding_test = wp.sub('__WHITELISTED__', content_for_branding_test)

        bad_brand_matches = prohibited_branding_regex.findall(content_for_branding_test)
        if bad_brand_matches:
            results["author_branding"]["issues"].append(
                f"{rel}: Prohibited institutional title detected: {bad_brand_matches}"
            )
        
        # Check Schema.org in ldjson
        for ld in inspector.current_ldjson:
            if "author" in ld:
                if ("สสวท" in ld or "IPST" in ld) and not any(w in ld for w in ["นิตยสาร สสวท", "IPST Magazine"]):
                    results["author_branding"]["issues"].append(
                        f"{rel}: Schema.org author metadata contains institutional branding"
                    )

        # -------------------------------------------------------------
        # 2. NAVBAR & CV INTEGRITY
        # -------------------------------------------------------------
        nav_combined = " ".join(inspector.nav_texts)
        if ("ดาวน์โหลด CV" in nav_combined or "Download CV" in nav_combined) and "about.html" not in rel:
            results["navbar_cv_integrity"]["issues"].append(
                f"{rel}: CV download link found in header/navigation! Must ONLY be on about.html."
            )

        if rel == "about.html":
            if "apisit_cv.pdf" in content or "CV" in content:
                results["navbar_cv_integrity"]["passed"].append("about.html correctly hosts the personal CV link")
            else:
                results["navbar_cv_integrity"]["issues"].append("about.html does not appear to contain the CV download link")

        # -------------------------------------------------------------
        # 3. DESIGN SYSTEM & TYPOGRAPHY
        # -------------------------------------------------------------
        if "fonts.googleapis.com" in content:
            has_prompt = "Prompt" in content
            if not has_prompt:
                if any(k in rel for k in ["index", "about", "category", "articles"]):
                    results["design_and_typography"]["issues"].append(f"{rel}: Missing Google Font 'Prompt' for Thai typography")
        
        if any(k in rel for k in ["index.html", "about.html", "category-"]) or rel.startswith("articles/"):
            if "dark:" not in content:
                results["design_and_typography"]["issues"].append(f"{rel}: Lacks Tailwind dark: utility classes")

        # -------------------------------------------------------------
        # 4. ARTICLE PUBLISHING STANDARDS (for files in articles/)
        # -------------------------------------------------------------
        if rel.startswith("articles/") and rel.endswith(".html"):
            if not inspector.has_article:
                results["articles_publishing"]["issues"].append(f"{rel}: Missing semantic <article> tag")
            
            if "reading-progress" not in content and "progress" not in content:
                results["articles_publishing"]["issues"].append(f"{rel}: Missing reading progress bar")

            has_math_syntax = bool(re.search(r'(\\\([^\)]+\\\)|\\\[[^\]]+\\\]|\$\$[^\$]+\$\$)', content))
            if has_math_syntax:
                if "katex" not in content:
                    results["articles_publishing"]["issues"].append(f"{rel}: Mathematical formulas detected but KaTeX is not loaded")

            has_og_title = any(m.get('property') == 'og:title' for m in inspector.meta)
            has_og_image = any(m.get('property') == 'og:image' for m in inspector.meta)
            if not has_og_title or not has_og_image:
                results["articles_publishing"]["issues"].append(f"{rel}: Missing OpenGraph og:title or og:image meta tags")

        # -------------------------------------------------------------
        # 5. CANVAS & SIMULATIONS
        # -------------------------------------------------------------
        if inspector.canvases > 0 and any(k in rel for k in ["simulation", "physics", "wave", "pendulum", "projectile", "gravity"]):
            if "devicePixelRatio" not in content and "src=" not in content:
                results["canvas_and_simulations"]["issues"].append(f"{rel}: Canvas simulation may lack Retina/Hi-DPI scaling (window.devicePixelRatio)")
            else:
                results["canvas_and_simulations"]["passed"].append(f"{rel}: Canvas simulation uses devicePixelRatio or bundle")

        # -------------------------------------------------------------
        # 6. MOBILE GAME UX & AUDIO
        # -------------------------------------------------------------
        vp_attrs = [m.get('content', '') for m in inspector.meta if m.get('name') == 'viewport']
        if not vp_attrs:
            results["mobile_game_ux_and_audio"]["issues"].append(f"{rel}: Missing viewport meta tag")
        else:
            vp_content = vp_attrs[0]
            if "viewport-fit=cover" not in vp_content and any(k in rel for k in ["game", "race", "puzzle"]):
                results["mobile_game_ux_and_audio"]["issues"].append(f"{rel}: Game viewport missing viewport-fit=cover")

        if "AudioContext" in content or "webkitAudioContext" in content:
            if "resume" not in content:
                results["mobile_game_ux_and_audio"]["issues"].append(f"{rel}: Web Audio used but missing audioContext.resume() gesture unlock")

        # -------------------------------------------------------------
        # 7. SOCRATIC AI & API SECURITY
        # -------------------------------------------------------------
        exposed_keys = re.findall(r'AIzaSy[A-Za-z0-9_-]{33}', content)
        if exposed_keys:
            results["socratic_ai_and_api_security"]["issues"].append(
                f"{rel}: CRITICAL: Exposed Google API key found in HTML: {exposed_keys[0][:10]}..."
            )

        # -------------------------------------------------------------
        # 8. ACCESSIBILITY & CONTRAST
        # -------------------------------------------------------------
        for img in inspector.images:
            if 'alt' not in img or not img['alt'].strip():
                src = img.get('src', '')
                if src and not src.startswith('data:'):
                    results["accessibility_and_contrast"]["issues"].append(f"{rel}: <img> missing alt attribute: {src[:50]}")
                    break

    # Major pages sitemap inclusion
    major_pages = ['index.html', 'index-en.html', 'about.html', 'category-ai.html', 'category-games.html', 
                   'category-gis.html', 'category-logic.html', 'category-science.html', 'category-tools.html']
    for mp in major_pages:
        full_url = f"https://apisit-man.github.io/{mp}"
        if full_url not in sitemap_urls:
            results["pages_vercel_pipeline"]["issues"].append(f"Major page {mp} missing from sitemap.xml")

    # Output formatted report
    print("\n================ AUDIT SUMMARY ================\n")
    for category, res in results.items():
        print(f"[{category.upper()}]")
        print(f"  Passed Checks : {len(res['passed'])}")
        print(f"  Issues Found  : {len(res['issues'])}")
        if res['issues']:
            print("  Issues:")
            for issue in res['issues'][:10]:
                print(f"    - {issue}")
            if len(res['issues']) > 10:
                print(f"    ... and {len(res['issues']) - 10} more.")
        print()

    output_file = os.path.join(repo_root, 'scripts', 'comprehensive_audit_results.json')
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    print(f"Full details saved to: {output_file}")

if __name__ == '__main__':
    run_comprehensive_audit()
