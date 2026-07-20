import re
import os

filepath = r"c:\Users\atong\Documents\antigravity\personal website\learning games\ai-literacy\index.html"
dirpath = os.path.dirname(filepath)

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Extract the script content
script_match = re.search(r'<script>(.*?)</script>', content, re.DOTALL)
if script_match:
    full_script = script_match.group(1)
    
    # Extract mindmapData (it's a const declaration at the top)
    # We find where const mindmapData = { starts, and find the matching closing brace.
    start_idx = full_script.find('const mindmapData = {')
    if start_idx != -1:
        brace_count = 0
        in_data = False
        end_idx = -1
        for i in range(start_idx, len(full_script)):
            if full_script[i] == '{':
                brace_count += 1
                in_data = True
            elif full_script[i] == '}':
                brace_count -= 1
                
            if in_data and brace_count == 0:
                end_idx = i + 1
                # check if there's a semicolon
                if i+1 < len(full_script) and full_script[i+1] == ';':
                    end_idx += 1
                break
                
        if end_idx != -1:
            data_script = full_script[:end_idx].strip()
            app_script = full_script[end_idx:].strip()
            
            # Add // Data file header
            data_script = "// Data Structure aligned with OECD / European Commission AILit Framework\n" + data_script
            
            # Write data.js
            with open(os.path.join(dirpath, 'data.js'), 'w', encoding='utf-8') as f:
                f.write(data_script)
                
            # Write app.js
            with open(os.path.join(dirpath, 'app.js'), 'w', encoding='utf-8') as f:
                f.write(app_script)
                
            # Replace the script tag in HTML
            new_scripts = '    <script src="data.js"></script>\n    <script src="app.js"></script>'
            content = content.replace(f'<script>{full_script}</script>', new_scripts)

# 2. Fix SEO (og:url and og:image)
content = content.replace(
    '<meta property="og:url" content="https://apisit0815.github.io/ailiteracy/">',
    '<meta property="og:url" content="https://apisit-man.github.io/learning%20games/ai-literacy/index.html">\n    <meta property="og:image" content="https://apisit-man.github.io/learning%20games/ai-literacy/preview.jpg">'
)

# 3. Add aesthetics (Background Grid & Tab fade-in)
# We will inject some CSS into the <style> block
custom_css = """
        /* Background Grid */
        body {
            background-color: #f8fafc;
            background-image: radial-gradient(#cbd5e1 1px, transparent 1px);
            background-size: 24px 24px;
        }

        /* Tab Fade-in Animation */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .tab-content.active {
            display: block;
            animation: fadeIn 0.3s ease-out forwards;
        }
"""
content = content.replace('/* Sidebar custom scrollbar */', custom_css + '\n        /* Sidebar custom scrollbar */')

# 4. Mobile UX (Zoom button z-index and hiding)
# We can adjust the z-index of the zoom controls or shift them.
# The zoom controls div has `absolute bottom-6 right-6 z-10 flex flex-col gap-2 pointer-events-auto`
# Let's change z-10 to z-0 so it gets hidden under the sidebar on mobile, or just leave it as z-10 since sidebar is z-50.
# Wait, sidebar is z-50, so sidebar WILL cover the zoom controls. The issue is they might peek out.
# Let's add a class to the zoom controls so they disappear when sidebar is open on mobile.
content = content.replace(
    '<div class="absolute bottom-6 right-6 z-10 flex flex-col gap-2 pointer-events-auto">',
    '<div id="zoom-controls" class="absolute bottom-6 right-6 z-10 flex flex-col gap-2 pointer-events-auto transition-opacity duration-300">'
)

# In app.js we need to toggle opacity of zoom-controls when sidebar is open on mobile.
# But it might be easier to just use CSS media query for body.sidebar-open #zoom-controls
mobile_css = """
        @media (max-width: 768px) {
            body.sidebar-open #zoom-controls {
                opacity: 0;
                pointer-events: none;
            }
        }
"""
content = content.replace('/* Sidebar open alignment for larger screens */', mobile_css + '\n        /* Sidebar open alignment for larger screens */')


with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Refactoring complete.")
