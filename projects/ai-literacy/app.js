// --- Sidebar Logic ---
        const sidebar = document.getElementById('info-sidebar');
        const closeBtn = document.getElementById('close-sidebar-btn');
        let activeNodeData = null; // Track clicked node globally for clipboard exporter
        
        function openSidebar(node) {
            activeNodeData = node;
            const data = node.data;
            const details = data.details || {};
            
            // Set Header
            document.getElementById('sb-icon').textContent = data.icon || '📄';
            document.getElementById('sb-title').textContent = data.name;
            document.getElementById('sb-title').style.color = node.color;
            document.getElementById('sb-subtitle').textContent = data.englishName || '';

            // Set Description
            const desc = details.description || data.description || `หัวข้อ "${data.name}" เป็นส่วนหนึ่งของหมวดหมู่การเรียนรู้เรื่อง AI & Media Literacy`;
            document.getElementById('sb-desc').innerHTML = desc;

            // Set Examples & Progressions dynamically
            const teachContent = document.getElementById('tab-content-teach');
            const basicBox = document.getElementById('level-basic-box');
            const intermediateBox = document.getElementById('level-intermediate-box');
            const advancedBox = document.getElementById('level-advanced-box');
            
            // Clean up previous general box if any
            let generalBox = document.getElementById('level-general-box');
            if (generalBox) generalBox.remove();

            if (details.progression) {
                // Show level boxes
                basicBox.style.display = 'block';
                intermediateBox.style.display = 'block';
                advancedBox.style.display = 'block';

                document.getElementById('sb-level-basic').textContent = details.progression.basic || 'ยังไม่มีรายละเอียดในระดับนี้';
                document.getElementById('sb-level-intermediate').textContent = details.progression.intermediate || 'ยังไม่มีรายละเอียดในระดับนี้';
                document.getElementById('sb-level-advanced').textContent = details.progression.advanced || 'ยังไม่มีรายละเอียดในระดับนี้';
            } else {
                // Hide level boxes
                basicBox.style.display = 'none';
                intermediateBox.style.display = 'none';
                advancedBox.style.display = 'none';

                // Create a general list box
                const examples = details.examples || data.details && data.details.examples || [];
                const generalListHtml = examples.map(ex => `<li>${ex}</li>`).join('');
                const listMarkup = generalListHtml ? `<ul class="text-sm text-slate-700 space-y-2 list-disc pl-4 marker:text-blue-500 leading-relaxed font-kanit">${generalListHtml}</ul>` : `<p class="text-xs text-slate-400 font-kanit">ยังไม่มีไอเดียแนะนำในหัวข้อนี้</p>`;

                const newGeneralBox = document.createElement('div');
                newGeneralBox.id = 'level-general-box';
                newGeneralBox.className = 'bg-blue-50/50 rounded-xl p-4 border border-blue-100';
                newGeneralBox.innerHTML = `
                    <h3 class="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-2 flex items-center gap-1.5 font-kanit">
                        <span>💡</span> ไอเดียการจัดกิจกรรมทั่วไป
                    </h3>
                    ${listMarkup}
                `;
                teachContent.querySelector('.space-y-4').appendChild(newGeneralBox);
            }

            // Set Questions
            const questionsList = document.getElementById('sb-questions');
            const questions = details.questions || data.details && data.details.questions || [];
            if (questions && questions.length > 0) {
                questionsList.innerHTML = questions.map(q => `<li>${q}</li>`).join('');
            } else {
                questionsList.innerHTML = `<li class="text-slate-400 list-none text-xs font-kanit">ยังไม่มีคำถามกระตุ้นความคิดแนะนำในหัวข้อนี้ 💬</li>`;
            }

            // Always reset tabs back to 'learn' when opening sidebar
            switchTab('learn');

            // Show Sidebar
            sidebar.classList.remove('translate-x-full');
            document.body.classList.add('sidebar-open');
        }

        function closeSidebar() {
            sidebar.classList.add('translate-x-full');
            document.body.classList.remove('sidebar-open');
            activeNodeData = null;
            update(root); // Refresh nodes styling to remove selected state
        }

        closeBtn.addEventListener('click', closeSidebar);

        // Sidebar Tabs handler
        const tabs = ['learn', 'teach', 'ask'];
        function switchTab(activeTab) {
            tabs.forEach(tab => {
                const btn = document.getElementById(`tab-btn-${tab}`);
                const content = document.getElementById(`tab-content-${tab}`);
                if (tab === activeTab) {
                    btn.classList.add('active');
                    content.classList.add('active');
                } else {
                    btn.classList.remove('active');
                    content.classList.remove('active');
                }
            });
        }

        tabs.forEach(tab => {
            document.getElementById(`tab-btn-${tab}`).addEventListener('click', () => switchTab(tab));
        });

        // Clipboard Exporter Logic
        document.getElementById('copy-outline-btn').addEventListener('click', () => {
            if (!activeNodeData) return;
            const data = activeNodeData.data;
            const details = data.details || {};
            const desc = details.description || data.description || "คำอธิบายหัวข้อ";
            
            let examplesText = "";
            if (details.progression) {
                examplesText = `*   **ระดับเริ่มต้น (Basic Level):** ${details.progression.basic}
*   **ระดับกลาง (Intermediate Level):** ${details.progression.intermediate}
*   **ระดับสูง (Advanced Level):** ${details.progression.advanced}`;
            } else {
                const examples = details.examples || data.details && data.details.examples || [];
                examplesText = examples.map(ex => `*   ${ex}`).join('\n');
            }

            const questions = (details.questions || data.details && data.details.questions || []).map((q, i) => `${i+1}. ${q}`).join('\n');
            
            const textToCopy = `# แผนการสอน: ${data.name} (${data.englishName || ''})
            
## 📖 สาระน่ารู้และแนวคิดเชิงลึก (Learn)
${desc}

## 💡 ไอเดียการจัดกิจกรรมในห้องเรียน (Teach)
${examplesText || '* ไม่มีไอเดียจัดกิจกรรมเฉพาะสำหรับหัวข้อนี้'}

## 🤔 คำถามชวนคิดเพื่อกระตุ้นความคิดวิเคราะห์ (Ask)
${questions || '* ไม่มีคำถามกระตุ้นความคิดสำหรับหัวข้อนี้'}

---
คัดลอกร่างการสอนจาก: แผนที่การเรียนรู้ระบบการรู้เท่าทัน AI และสื่อ (AI & Media Literacy Mindmap)`;

            navigator.clipboard.writeText(textToCopy).then(() => {
                const toast = document.getElementById('copy-toast');
                toast.classList.remove('opacity-0');
                setTimeout(() => toast.classList.add('opacity-0'), 2500);
            }).catch(err => {
                console.error("Could not copy outline: ", err);
            });
        });


        // --- D3.js Setup ---
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        const zoom = d3.zoom()
            .scaleExtent([0.1, 3])
            .on("zoom", (event) => {
                svgGroup.attr("transform", event.transform);
            });

        const svg = d3.select("#mindmap-container").append("svg")
            .attr("width", width)
            .attr("height", height)
            .call(zoom)
            .on("dblclick.zoom", null); 
            
        const svgGroup = svg.append("g");
        const tooltip = d3.select("#tooltip");
        const treemap = d3.tree().nodeSize([65, 320]); 

        let root;
        let i = 0;
        const duration = 750;

        function hexToRgba(hex, opacity) {
            let r = parseInt(hex.slice(1, 3), 16),
                g = parseInt(hex.slice(3, 5), 16),
                b = parseInt(hex.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${opacity})`;
        }

        // Expanded parent search highlighting state tracker
        let highlightedNodes = new Set();

        function update(source) {
            const treeData = treemap(root);
            const nodes = treeData.descendants();
            const links = treeData.descendants().slice(1);

            const levelSpacing = window.innerWidth < 768 ? 220 : 340;
            nodes.forEach(d => { d.y = d.depth * levelSpacing; });

            const node = svgGroup.selectAll('g.node')
                .data(nodes, d => d.id || (d.id = ++i));

            const nodeEnter = node.enter().append('g')
                .attr('class', 'node')
                .attr("transform", d => `translate(${source.y0},${source.x0})`)
                .on('click', click)
                .on('mouseover', showTooltip)
                .on('mouseout', hideTooltip);

            nodeEnter.append('circle')
                .attr('class', 'node')
                .attr('r', 1e-6)
                .style("stroke", d => d.color);

            nodeEnter.append('text')
                .attr("dy", "-.35em")
                .attr("x", d => d.children || d._children ? -15 : 15)
                .attr("text-anchor", d => d.children || d._children ? "end" : "start")
                .html(d => `<tspan class="emoji-icon">${d.data.icon ? d.data.icon + " " : ""}</tspan>${d.data.name}`)
                .style("font-weight", d => d.depth === 0 ? "600" : "500");

            nodeEnter.append('text')
                .attr("class", "subtext")
                .attr("dy", "1em")
                .attr("x", d => d.children || d._children ? -15 : 15)
                .attr("text-anchor", d => d.children || d._children ? "end" : "start")
                .text(d => d.data.englishName ? d.data.englishName : "");

            const nodeUpdate = nodeEnter.merge(node);

            // Assign custom classes for visual animations
            nodeUpdate.classed("node-selected", d => activeNodeData && activeNodeData.id === d.id)
                      .classed("node-highlighted", d => highlightedNodes.has(d.id));

            nodeUpdate.transition()
                .duration(duration)
                .attr("transform", d => `translate(${d.y},${d.x})`);

            nodeUpdate.select('circle.node')
                .attr('r', d => {
                    if (d.depth === 0) return 14; 
                    if (!d.children && !d._children) return 8; 
                    return 10; 
                })
                .style("fill", d => {
                    if (!d.children && !d._children) return d.color; 
                    return d._children ? hexToRgba(d.color, 0.2) : "#fff"; 
                })
                .style("stroke", d => d.color)
                .attr('cursor', 'pointer');

            const nodeExit = node.exit().transition()
                .duration(duration)
                .attr("transform", d => `translate(${source.y},${source.x})`)
                .remove();

            nodeExit.select('circle').attr('r', 1e-6);
            nodeExit.select('text').style('fill-opacity', 1e-6);

            const link = svgGroup.selectAll('path.link')
                .data(links, d => d.id);

            const linkEnter = link.enter().insert('path', "g")
                .attr("class", "link")
                .style("stroke", d => d.color) 
                .attr('d', d => {
                    const o = {x: source.x0, y: source.y0};
                    return diagonal(o, o);
                });

            const linkUpdate = linkEnter.merge(link);

            linkUpdate.transition()
                .duration(duration)
                .style("stroke", d => d.color)
                .attr('d', d => diagonal(d, d.parent));

            const linkExit = link.exit().transition()
                .duration(duration)
                .attr('d', d => {
                    const o = {x: source.x, y: source.y};
                    return diagonal(o, o);
                })
                .remove();

            nodes.forEach(d => {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        }

        function diagonal(s, d) {
            return `M ${s.y} ${s.x}
                    C ${(s.y + d.y) / 2} ${s.x},
                      ${(s.y + d.y) / 2} ${d.x},
                      ${d.y} ${d.x}`;
        }

        // Click behavior: Open sidebar AND toggle children
        function click(event, d) {
            openSidebar(d);
            
            if (d.children || d._children) {
                if (d.children) {
                    d._children = d.children;
                    d.children = null;
                } else {
                    d.children = d._children;
                    d._children = null;
                }
                update(d);
            }
            hideTooltip();
        }

        function showTooltip(event, d) {
            // Only show tooltip if sidebar is closed, otherwise it's visually noisy
            if (sidebar.classList.contains('translate-x-full')) {
                let shortDesc = d.data.description;
                if (!shortDesc && d.data.details) shortDesc = "คลิกเพื่อดูไอเดียและข้อมูลเชิงลึก 💡";
                if (!shortDesc) shortDesc = "คลิกเพื่อดูรายละเอียดเพิ่มเติม";

                tooltip.transition().duration(200).style("opacity", 1);
                tooltip.html(`
                    <div class="flex items-center gap-2 mb-1 font-kanit">
                        <span class="text-xl">${d.data.icon || ''}</span>
                        <strong class="text-slate-800" style="color: ${d.color}">${d.data.name}</strong>
                    </div>
                    <p class="text-slate-600 mt-1 font-kanit text-xs">${shortDesc}</p>
                `)
                .style("left", (event.pageX + 20) + "px")
                .style("top", (event.pageY - 20) + "px");
            }
        }

        function hideTooltip() {
            tooltip.transition().duration(500).style("opacity", 0);
        }

        // Initialize
        root = d3.hierarchy(mindmapData, d => d.children);
        root.x0 = height / 2;
        root.y0 = 0;

        root.each(d => {
            if (d.depth === 0) d.color = d.data.color || "#3b82f6";
            else if (d.depth === 1) d.color = d.data.color;
            else d.color = d.parent.color; 
        });

        function collapse(d) {
            if (d.children) {
                d._children = d.children;
                d._children.forEach(collapse);
                d.children = null;
            }
        }

        if(root.children) {
            root.children.forEach(child => {
                 if(child.children) child.children.forEach(collapse);
            });
        }

        update(root);

        function centerMindmap() {
            const yOffset = window.innerWidth < 768 ? 50 : (sidebar.classList.contains('translate-x-full') ? 150 : 50); 
            const xOffset = window.innerHeight / 2;
            
            svg.transition()
               .duration(750)
               .call(zoom.transform, d3.zoomIdentity.translate(yOffset, xOffset).scale(0.85));
        }

        window.addEventListener('resize', () => {
            svg.attr("width", window.innerWidth).attr("height", window.innerHeight);
        });

        document.getElementById('reset-btn').addEventListener('click', centerMindmap);
        setTimeout(centerMindmap, 150);

        // --- Search Functionality ---
        const searchInput = document.getElementById('search-input');
        const clearSearchBtn = document.getElementById('clear-search-btn');

        searchInput.addEventListener('input', (e) => {
            const val = e.target.value.trim().toLowerCase();
            if (val.length > 0) {
                clearSearchBtn.classList.remove('hidden');
                performSearch(val);
            } else {
                clearSearchBtn.classList.add('hidden');
                resetSearch();
            }
        });

        clearSearchBtn.addEventListener('click', () => {
            searchInput.value = '';
            clearSearchBtn.classList.add('hidden');
            resetSearch();
        });

        function performSearch(query) {
            highlightedNodes.clear();
            const matches = [];

            // Helper to recursively traverse all nodes, including collapsed ones
            function searchTraverse(d) {
                const name = (d.data.name || "").toLowerCase();
                const englishName = (d.data.englishName || "").toLowerCase();
                const desc = (d.data.description || "").toLowerCase();
                const detailsDesc = (d.data.details && d.data.details.description || "").toLowerCase();

                if (name.includes(query) || englishName.includes(query) || desc.includes(query) || detailsDesc.includes(query)) {
                    matches.push(d);
                }

                const childrenList = d.children || d._children;
                if (childrenList) {
                    childrenList.forEach(searchTraverse);
                }
            }

            searchTraverse(root);

            if (matches.length > 0) {
                matches.forEach(nodeItem => {
                    highlightedNodes.add(nodeItem.id);
                    expandParents(nodeItem);
                });

                update(root);

                // Focus on the first found node
                focusOnNode(matches[0]);
            }
        }

        function expandParents(d) {
            if (d.parent) {
                if (d.parent._children) {
                    d.parent.children = d.parent._children;
                    d.parent._children = null;
                }
                expandParents(d.parent);
            }
        }

        function resetSearch() {
            highlightedNodes.clear();
            update(root);
        }

        function focusOnNode(d) {
            const yOffset = window.innerWidth < 768 ? window.innerWidth / 2 : window.innerWidth / 2 - 120;
            const xOffset = window.innerHeight / 2;
            const transformIdentity = d3.zoomIdentity
                .translate(yOffset - d.y * 0.85, xOffset - d.x * 0.85)
                .scale(0.85);

            svg.transition()
               .duration(750)
               .call(zoom.transform, transformIdentity);
        }

        // --- Floating Zoom Controls Handling ---
        document.getElementById('zoom-in-btn').addEventListener('click', () => {
            svg.transition().duration(300).call(zoom.scaleBy, 1.3);
        });

        document.getElementById('zoom-out-btn').addEventListener('click', () => {
            svg.transition().duration(300).call(zoom.scaleBy, 0.76);
        });

        document.getElementById('zoom-reset-btn').addEventListener('click', centerMindmap);