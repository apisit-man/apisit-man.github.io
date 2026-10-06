/**
 * admin-worklog.js - Logic for Personal Work Performance & Evaluation Journal
 * Manages records in localStorage, calculates fiscal year & evaluation cycle,
 * provides filtering, report generation, and backup/restore capabilities.
 */

(function () {
    const STORAGE_KEY = 'admin_worklog_records_v1';

    // State
    let records = [];
    let editingId = null;
    let selectedFiscalYear = getCurrentFiscalYear();
    let selectedCycle = 'all'; // '1', '2', or 'all'
    let selectedCategory = '';
    let searchQuery = '';

    // DOM Elements
    const form = document.getElementById('worklogForm');
    const formTitle = document.getElementById('formTitle');
    const submitBtn = document.getElementById('submitBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const statusMsg = document.getElementById('formStatusMsg');

    const inputId = document.getElementById('recordId');
    const inputDate = document.getElementById('workDate');
    const inputTitle = document.getElementById('workTitle');
    const inputCategory = document.getElementById('workCategory');
    const inputRole = document.getElementById('workRole');
    const inputDesc = document.getElementById('workDesc');
    const inputEvidence = document.getElementById('workEvidence');

    const fiscalYearSelect = document.getElementById('fiscalYearSelect');
    const cycleTabs = document.querySelectorAll('.cycle-tab');
    const categoryFilter = document.getElementById('categoryFilter');
    const searchInput = document.getElementById('searchInput');

    const recordsList = document.getElementById('recordsList');
    const emptyState = document.getElementById('emptyState');
    const countBadge = document.getElementById('recordCountBadge');

    // Summary Stat Elements
    const statTotal = document.getElementById('statTotal');
    const statCategories = document.getElementById('statCategories');
    const statCycleLabel = document.getElementById('statCycleLabel');

    // Modals
    const reportModal = document.getElementById('reportModal');
    const reportContent = document.getElementById('reportContent');
    const copyReportBtn = document.getElementById('copyReportBtn');
    const closeReportBtn = document.getElementById('closeReportBtn');
    const openReportBtn = document.getElementById('openReportBtn');

    const backupBtn = document.getElementById('backupBtn');
    const restoreFileInput = document.getElementById('restoreFileInput');
    const exportCsvBtn = document.getElementById('exportCsvBtn');
    const syncBtn = document.getElementById('syncBtn');
    const syncIcon = document.getElementById('syncIcon');
    const storageStatusText = document.getElementById('storageStatusText');
    const storageStatusIcon = document.getElementById('storageStatusIcon');

    /**
     * Compute Thai Fiscal Year (พ.ศ.) from Date
     * Fiscal Year in Thailand:
     * - 1 Oct YYYY to 30 Sep (YYYY+1) is Fiscal Year (YYYY+1 + 543)
     */
    function getFiscalYearFromDate(dateObj) {
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1; // 1-12
        const fiscalAD = month >= 10 ? year + 1 : year;
        return fiscalAD + 543;
    }

    /**
     * Current Thai Fiscal Year
     */
    function getCurrentFiscalYear() {
        return getFiscalYearFromDate(new Date());
    }

    /**
     * Determine Evaluation Cycle (รอบการประเมิน)
     * - รอบที่ 1: 1 ต.ค. - 31 มี.ค.
     * - รอบที่ 2: 1 เม.ย. - 30 ก.ย.
     */
    function getCycleFromDate(dateObj) {
        const month = dateObj.getMonth() + 1; // 1-12
        return (month >= 10 || month <= 3) ? '1' : '2';
    }

    /**
     * Load records from localStorage
     */
    function loadRecords() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            records = raw ? JSON.parse(raw) : [];
            if (!Array.isArray(records)) records = [];
        } catch (e) {
            console.error('Failed to load worklog records:', e);
            records = [];
        }
    }

    /**
     * Save records to localStorage
     */
    function saveRecords() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
        } catch (e) {
            console.error('Failed to save worklog records:', e);
            alert('ไม่สามารถบันทึกข้อมูลลงในหน่วยความจำเบราว์เซอร์ได้ กรุณาตรวจสอบพื้นที่จัดเก็บ');
        }
    }

    /**
     * Update storage / sync status indicator UI
     */
    function setSyncStatus(status, text) {
        if (!storageStatusText) return;
        if (status === 'syncing') {
            storageStatusText.textContent = text || 'กำลังเชื่อมต่อ Google Sheets...';
            storageStatusText.className = 'text-xs font-semibold text-amber-600 dark:text-amber-400 block mt-1';
            if (storageStatusIcon) storageStatusIcon.textContent = '⏳';
        } else if (status === 'synced') {
            storageStatusText.textContent = text || 'Google Sheets เชื่อมต่อแล้ว';
            storageStatusText.className = 'text-xs font-semibold text-emerald-600 dark:text-emerald-400 block mt-1';
            if (storageStatusIcon) storageStatusIcon.textContent = '📊';
        } else if (status === 'local') {
            storageStatusText.textContent = text || 'ใช้งานโหมดออฟไลน์ (Local)';
            storageStatusText.className = 'text-xs font-semibold text-slate-500 dark:text-slate-400 block mt-1';
            if (storageStatusIcon) storageStatusIcon.textContent = '💾';
        } else if (status === 'error') {
            storageStatusText.textContent = text || 'เชื่อมต่อ Sheet ขัดข้อง';
            storageStatusText.className = 'text-xs font-semibold text-rose-600 dark:text-rose-400 block mt-1';
            if (storageStatusIcon) storageStatusIcon.textContent = '⚠️';
        }
    }

    /**
     * Synchronize records with Google Sheets
     */
    async function syncFromGoogleSheets(isUserTriggered = false) {
        if (!window.AdminAPI || !AdminAPI.hasActiveSession()) {
            setSyncStatus('local', 'ใช้งานในเครื่อง (Local)');
            return;
        }

        setSyncStatus('syncing', 'กำลังดึงข้อมูลจาก Google Sheets...');
        if (syncIcon) syncIcon.classList.add('animate-spin');

        try {
            const res = await AdminAPI.request('listWorkLogs', {
                token: AdminAPI.token(),
                limit: 1000
            });

            if (res && Array.isArray(res.records)) {
                const remoteList = res.records.map(r => {
                    const d = r.date ? new Date(r.date) : new Date();
                    return {
                        id: String(r.id || ''),
                        date: String(r.date || ''),
                        fiscalYear: r.fiscalYear ? parseInt(r.fiscalYear, 10) : getFiscalYearFromDate(d),
                        cycle: String(r.cycle || (r.date ? getCycleFromDate(d) : '1')),
                        category: String(r.category || 'งานอื่น ๆ'),
                        title: String(r.title || ''),
                        role: String(r.role || ''),
                        description: String(r.description || ''),
                        evidenceUrl: String(r.evidenceUrl || ''),
                        createdAt: String(r.createdAt || ''),
                        updatedAt: String(r.updatedAt || '')
                    };
                });

                // Merge: remote records are canonical, retain any offline-only local records
                const remoteIds = new Set(remoteList.map(r => r.id));
                const localOnly = records.filter(r => r.id && !remoteIds.has(r.id));

                records = [...remoteList, ...localOnly];
                saveRecords();
                setupFiscalYearDropdown();
                renderRecords();
                setSyncStatus('synced', `Google Sheets ซิงค์แล้ว (${records.length} รายการ)`);
                if (isUserTriggered) {
                    showStatus(`ซิงค์ข้อมูลจาก Google Sheets สำเร็จ (${records.length} รายการ)`, 'success');
                }
            }
        } catch (err) {
            console.warn('Sync from Google Sheets error:', err);
            setSyncStatus('error', err.message || 'ซิงค์ไม่สำเร็จ (ใช้ข้อมูลในเครื่อง)');
            if (isUserTriggered) {
                showStatus(`ไม่สามารถซิงค์ข้อมูลได้: ${err.message}`, 'error');
            }
        } finally {
            if (syncIcon) syncIcon.classList.remove('animate-spin');
        }
    }

    /**
     * Format date to Thai readable string
     */
    function formatThaiDate(dateStr) {
        if (!dateStr) return '—';
        const [y, m, d] = dateStr.split('-');
        if (!y || !m || !d) return dateStr;
        const months = [
            '', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
            'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
        ];
        const thaiYear = parseInt(y, 10) + (parseInt(y, 10) < 2500 ? 543 : 0);
        return `${parseInt(d, 10)} ${months[parseInt(m, 10)]} ${thaiYear}`;
    }

    /**
     * Populate Fiscal Year Dropdown with intelligent range
     */
    function setupFiscalYearDropdown() {
        const currentFY = getCurrentFiscalYear();
        const availableYears = new Set([currentFY - 1, currentFY, currentFY + 1]);
        records.forEach(r => {
            if (r.fiscalYear) availableYears.add(parseInt(r.fiscalYear, 10));
        });

        const sortedYears = Array.from(availableYears).sort((a, b) => b - a);
        fiscalYearSelect.innerHTML = '';
        sortedYears.forEach(year => {
            const opt = document.createElement('option');
            opt.value = year;
            opt.textContent = `ปีงบประมาณ ${year}`;
            if (year === selectedFiscalYear) opt.selected = true;
            fiscalYearSelect.appendChild(opt);
        });
    }

    /**
     * Filter records based on current selections
     */
    function getFilteredRecords() {
        return records.filter(r => {
            // Fiscal Year
            if (r.fiscalYear && parseInt(r.fiscalYear, 10) !== parseInt(selectedFiscalYear, 10)) {
                return false;
            }
            // Cycle
            if (selectedCycle !== 'all' && r.cycle !== selectedCycle) {
                return false;
            }
            // Category
            if (selectedCategory && r.category !== selectedCategory) {
                return false;
            }
            // Search Query
            if (searchQuery.trim()) {
                const q = searchQuery.toLowerCase().trim();
                const matchTitle = (r.title || '').toLowerCase().includes(q);
                const matchDesc = (r.description || '').toLowerCase().includes(q);
                const matchRole = (r.role || '').toLowerCase().includes(q);
                if (!matchTitle && !matchDesc && !matchRole) return false;
            }
            return true;
        }).sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    /**
     * Render the list of records
     */
    function renderRecords() {
        const filtered = getFilteredRecords();

        // Update stats
        if (statTotal) statTotal.textContent = `${filtered.length} รายการ`;
        if (countBadge) countBadge.textContent = `${filtered.length} รายการ`;

        const uniqueCategories = new Set(filtered.map(r => r.category).filter(Boolean));
        if (statCategories) statCategories.textContent = `${uniqueCategories.size} หมวด`;

        let cycleText = 'ทั้งปีงบประมาณ';
        if (selectedCycle === '1') cycleText = 'รอบที่ 1 (1 ต.ค. - 31 มี.ค.)';
        if (selectedCycle === '2') cycleText = 'รอบที่ 2 (1 เม.ย. - 30 ก.ย.)';
        if (statCycleLabel) statCycleLabel.textContent = cycleText;

        if (filtered.length === 0) {
            recordsList.innerHTML = '';
            emptyState.classList.remove('hidden');
            return;
        }

        emptyState.classList.add('hidden');
        recordsList.innerHTML = filtered.map(r => {
            const isCycle1 = r.cycle === '1';
            const cycleBadge = isCycle1
                ? '<span class="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60">รอบ 1 (ต.ค.-มี.ค.)</span>'
                : '<span class="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60">รอบ 2 (เม.ย.-ก.ย.)</span>';

            const evidenceLink = r.evidenceUrl
                ? `<a href="${encodeURI(r.evidenceUrl)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-xs text-brand-600 dark:text-brand-400 hover:underline font-semibold mt-2">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                    <span>หลักฐานอ้างอิง</span>
                   </a>`
                : '';



            return `
                <div class="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 hover:border-brand-500/40 hover:shadow-md transition-all group" data-id="${r.id}">
                    <div class="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <div class="flex flex-wrap items-center gap-1.5">
                            <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border border-brand-200/60 dark:border-brand-800/60">
                                ${escapeHtml(r.category || 'ภาระงานทั่วไป')}
                            </span>
                            ${cycleBadge}
                            ${r.role ? `<span class="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">${escapeHtml(r.role)}</span>` : ''}
                        </div>
                        <span class="text-xs text-slate-400 dark:text-slate-500 font-mono">${formatThaiDate(r.date)}</span>
                    </div>

                    <h3 class="text-base font-bold text-slate-900 dark:text-white leading-snug group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        ${escapeHtml(r.title)}
                    </h3>

                    ${r.description ? `<p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed whitespace-pre-line">${escapeHtml(r.description)}</p>` : ''}
                    

                    <div class="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/60">
                        <div>${evidenceLink}</div>
                        <div class="flex items-center gap-2">
                            <button class="edit-btn text-xs font-semibold px-2.5 py-1 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition" data-id="${r.id}">
                                ✏️ แก้ไข
                            </button>
                            <button class="delete-btn text-xs font-semibold px-2.5 py-1 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition" data-id="${r.id}">
                                🗑️ ลบ
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Attach listeners for Edit / Delete buttons
        recordsList.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => startEdit(btn.getAttribute('data-id')));
        });
        recordsList.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => deleteRecord(btn.getAttribute('data-id')));
        });
    }

    /**
     * Start editing a record
     */
    function startEdit(id) {
        const record = records.find(r => r.id === id);
        if (!record) return;

        editingId = id;
        formTitle.textContent = '✏️ แก้ไขรายการผลงาน';
        submitBtn.textContent = 'บันทึกการแก้ไข';
        cancelEditBtn.classList.remove('hidden');

        inputId.value = record.id;
        inputDate.value = record.date || '';
        inputTitle.value = record.title || '';
        inputCategory.value = record.category || '';
        inputRole.value = record.role || '';
        inputDesc.value = record.description || '';
        inputEvidence.value = record.evidenceUrl || '';

        // Scroll to form smoothly on mobile
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        inputTitle.focus();
    }

    /**
     * Cancel editing mode
     */
    function cancelEdit() {
        editingId = null;
        form.reset();
        inputId.value = '';
        formTitle.textContent = '✍️ บันทึกผลงานใหม่';
        submitBtn.textContent = 'บันทึกข้อมูล';
        cancelEditBtn.classList.add('hidden');
        setDefaultDate();
    }

    /**
     * Delete a record with confirmation and cloud sync
     */
    async function deleteRecord(id) {
        const record = records.find(r => r.id === id);
        if (!record) return;

        if (!confirm(`คุณต้องการลบรายการ "${record.title}" ใช่หรือไม่?`)) return;

        showStatus('กำลังลบข้อมูลจาก Google Sheets...', 'success');
        try {
            if (window.AdminAPI && AdminAPI.hasActiveSession()) {
                await AdminAPI.request('deleteWorkLog', {
                    token: AdminAPI.token(),
                    id: id
                });
            }
            records = records.filter(r => r.id !== id);
            saveRecords();
            if (editingId === id) cancelEdit();
            renderRecords();
            showStatus('ลบรายการจาก Google Sheets เรียบร้อยแล้ว', 'success');
            setSyncStatus('synced', `Google Sheets ซิงค์แล้ว (${records.length} รายการ)`);
        } catch (err) {
            console.error('Delete error:', err);
            records = records.filter(r => r.id !== id);
            saveRecords();
            if (editingId === id) cancelEdit();
            renderRecords();
            showStatus(`ลบจากเครื่องแล้ว (ลบจาก Google Sheets ไม่สำเร็จ: ${err.message})`, 'error');
            setSyncStatus('error', err.message || 'ลบชีตขัดข้อง');
        }
    }

    /**
     * Handle Form Submission (Create / Update with Google Sheets Sync)
     */
    async function handleFormSubmit(e) {
        e.preventDefault();

        const dateVal = inputDate.value;
        const titleVal = inputTitle.value.trim();
        const catVal = inputCategory.value;
        const roleVal = inputRole.value.trim();
        const descVal = inputDesc.value.trim();
        const evidenceVal = inputEvidence.value.trim();

        if (!dateVal || !titleVal || !catVal) {
            showStatus('กรุณากรอกวันที่ ชื่องาน และเลือกหมวดหมู่ให้ครบถ้วน', 'error');
            return;
        }

        const dateObj = new Date(dateVal);
        const fiscalYear = getFiscalYearFromDate(dateObj);
        const cycle = getCycleFromDate(dateObj);

        const targetId = editingId || ('wl_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6));
        const nowIso = new Date().toISOString();

        const recordPayload = {
            id: targetId,
            date: dateVal,
            fiscalYear,
            cycle,
            category: catVal,
            title: titleVal,
            role: roleVal,
            description: descVal,
            evidenceUrl: evidenceVal
        };

        submitBtn.disabled = true;
        const prevText = submitBtn.textContent;
        submitBtn.textContent = 'กำลังบันทึกลง Google Sheets...';

        try {
            if (window.AdminAPI && AdminAPI.hasActiveSession()) {
                if (editingId) {
                    await AdminAPI.request('updateWorkLog', {
                        token: AdminAPI.token(),
                        record: recordPayload
                    });
                } else {
                    await AdminAPI.request('createWorkLog', {
                        token: AdminAPI.token(),
                        record: recordPayload
                    });
                }
            }

            if (editingId) {
                const index = records.findIndex(r => r.id === editingId);
                if (index !== -1) {
                    records[index] = {
                        ...records[index],
                        ...recordPayload,
                        updatedAt: nowIso
                    };
                }
                showStatus('แก้ไขรายการและบันทึกลง Google Sheets สำเร็จ', 'success');
            } else {
                records.unshift({
                    ...recordPayload,
                    createdAt: nowIso,
                    updatedAt: nowIso
                });
                showStatus('บันทึกผลงานลง Google Sheets เรียบร้อยแล้ว', 'success');
            }

            saveRecords();
            setupFiscalYearDropdown();
            if (parseInt(selectedFiscalYear, 10) !== fiscalYear) {
                selectedFiscalYear = fiscalYear;
                fiscalYearSelect.value = fiscalYear;
            }

            cancelEdit();
            renderRecords();
            setSyncStatus('synced', `Google Sheets ซิงค์แล้ว (${records.length} รายการ)`);
        } catch (err) {
            console.error('Submit WorkLog error:', err);
            // Save locally as fallback
            if (editingId) {
                const index = records.findIndex(r => r.id === editingId);
                if (index !== -1) {
                    records[index] = {
                        ...records[index],
                        ...recordPayload,
                        updatedAt: nowIso
                    };
                }
            } else {
                records.unshift({
                    ...recordPayload,
                    createdAt: nowIso,
                    updatedAt: nowIso
                });
            }
            saveRecords();
            setupFiscalYearDropdown();
            cancelEdit();
            renderRecords();
            showStatus(`บันทึกในเครื่องแล้ว (ส่ง Google Sheets ขัดข้อง: ${err.message})`, 'error');
            setSyncStatus('error', err.message || 'บันทึกชีตขัดข้อง');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = editingId ? 'บันทึกการแก้ไข' : 'บันทึกข้อมูล';
        }
    }

    /**
     * Set default date to today
     */
    function setDefaultDate() {
        if (!inputDate.value) {
            const today = new Date().toISOString().split('T')[0];
            inputDate.value = today;
        }
    }

    /**
     * Show notification message
     */
    function showStatus(msg, type = 'success') {
        if (!statusMsg) return;
        statusMsg.textContent = msg;
        statusMsg.className = `p-3 rounded-xl text-xs font-semibold text-center mb-3 transition-all ${
            type === 'success'
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                : 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
        }`;
        statusMsg.classList.remove('hidden');
        setTimeout(() => {
            statusMsg.classList.add('hidden');
        }, 3500);
    }

    /**
     * Generate Comprehensive Evaluation Summary Text
     */
    function generateEvaluationReport() {
        const filtered = getFilteredRecords();
        if (filtered.length === 0) {
            return `=== สรุปผลการปฏิบัติงาน ปีงบประมาณ ${selectedFiscalYear} ===\n\n(ไม่พบรายการผลงานในช่วงที่เลือก)`;
        }

        let cycleName = 'ทั้งปีงบประมาณ';
        if (selectedCycle === '1') cycleName = 'รอบที่ 1 (1 ตุลาคม - 31 มีนาคม)';
        if (selectedCycle === '2') cycleName = 'รอบที่ 2 (1 เมษายน - 30 กันยายน)';

        let text = `====================================================\n`;
        text += `สรุปรายงานผลการปฏิบัติงานเพื่อประกอบการประเมินผลงาน\n`;
        text += `ปีงบประมาณ: ${selectedFiscalYear}\n`;
        text += `รอบการประเมิน: ${cycleName}\n`;
        text += `จำนวนผลงานทั้งหมด: ${filtered.length} รายการ\n`;
        text += `ผู้รายงาน: ดร.อภิสิทธิ์ ธงไชย\n`;
        text += `วันที่จัดทำรายงาน: ${formatThaiDate(new Date().toISOString().split('T')[0])}\n`;
        text += `====================================================\n\n`;

        // Group by category
        const groups = {};
        filtered.forEach(r => {
            const cat = r.category || 'ภาระงานทั่วไป';
            if (!groups[cat]) groups[cat] = [];
            groups[cat].push(r);
        });

        let catIndex = 1;
        for (const [cat, items] of Object.entries(groups)) {
            text += `📌 ตอนที่ ${catIndex}: ${cat} (${items.length} รายการ)\n`;
            text += `----------------------------------------------------\n`;
            items.forEach((item, idx) => {
                text += `${idx + 1}. ${item.title}\n`;
                text += `   • วันที่: ${formatThaiDate(item.date)}\n`;
                if (item.role) text += `   • บทบาท: ${item.role}\n`;
                if (item.description) text += `   • รายละเอียด: ${item.description}\n`;
                if (item.evidenceUrl) text += `   • หลักฐานอ้างอิง: ${item.evidenceUrl}\n`;
                text += `\n`;
            });
            catIndex++;
        }

        return text;
    }

    /**
     * Export Records to CSV (Excel compatible with UTF-8 BOM)
     */
    function exportToCsv() {
        const filtered = getFilteredRecords();
        if (filtered.length === 0) {
            alert('ไม่พบข้อมูลสำหรับส่งออก');
            return;
        }

        const headers = ['ลำดับ', 'วันที่', 'ปีงบประมาณ', 'รอบการประเมิน', 'หมวดหมู่งาน', 'ชื่องาน/กิจกรรม', 'บทบาท', 'รายละเอียด', 'ลิงก์หลักฐาน'];
        const rows = filtered.map((r, i) => [
            i + 1,
            r.date,
            r.fiscalYear,
            r.cycle === '1' ? 'รอบที่ 1' : 'รอบที่ 2',
            `"${(r.category || '').replace(/"/g, '""')}"`,
            `"${(r.title || '').replace(/"/g, '""')}"`,
            `"${(r.role || '').replace(/"/g, '""')}"`,
            `"${(r.description || '').replace(/"/g, '""')}"`,
            `"${(r.evidenceUrl || '').replace(/"/g, '""')}"`
        ]);

        const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(row => row.join(','))].join('\r\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `WorkLog_FY${selectedFiscalYear}_Cycle${selectedCycle}_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        URL.revokeObjectURL(url);
    }

    /**
     * Backup All Data to JSON
     */
    function backupData() {
        if (records.length === 0) {
            alert('ยังไม่มีข้อมูลสำหรับสำรอง');
            return;
        }
        const dataStr = JSON.stringify(records, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `WorkLog_Backup_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }

    /**
     * Restore Data from JSON file
     */
    function restoreData(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (event) {
            try {
                const imported = JSON.parse(event.target.result);
                if (!Array.isArray(imported)) {
                    throw new Error('รูปแบบไฟล์ไม่ถูกต้อง');
                }
                if (confirm(`พบข้อมูล ${imported.length} รายการ ต้องการนำเข้าข้อมูลใช่หรือไม่? (ข้อมูลเดิมจะถูกรวมเข้ากับข้อมูลใหม่)`)) {
                    // Merge and deduplicate by id
                    const existingMap = new Map(records.map(r => [r.id, r]));
                    imported.forEach(r => {
                        if (r.id) existingMap.set(r.id, r);
                    });
                    records = Array.from(existingMap.values());
                    saveRecords();
                    setupFiscalYearDropdown();
                    renderRecords();
                    alert(`นำเข้าข้อมูลเรียบร้อย รวมทั้งหมด ${records.length} รายการ`);
                }
            } catch (err) {
                alert('ไฟล์ JSON ไม่ถูกต้อง หรือเกิดข้อผิดพลาดในการอ่านไฟล์');
            }
            restoreFileInput.value = '';
        };
        reader.readAsText(file);
    }

    /**
     * Helper to escape HTML characters
     */
    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    /**
     * Initial Event Bindings
     */
    function init() {
        loadRecords();
        setupFiscalYearDropdown();
        setDefaultDate();

        // Form events
        form.addEventListener('submit', handleFormSubmit);
        cancelEditBtn.addEventListener('click', cancelEdit);

        // Filter events
        fiscalYearSelect.addEventListener('change', (e) => {
            selectedFiscalYear = parseInt(e.target.value, 10);
            renderRecords();
        });

        cycleTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                cycleTabs.forEach(t => {
                    t.classList.remove('bg-brand-600', 'text-white', 'shadow-sm');
                    t.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');
                });
                tab.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');
                tab.classList.add('bg-brand-600', 'text-white', 'shadow-sm');

                selectedCycle = tab.getAttribute('data-cycle');
                renderRecords();
            });
        });

        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                selectedCategory = e.target.value;
                renderRecords();
            });
        }

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchQuery = e.target.value;
                renderRecords();
            });
        }

        // Action Toolbar events
        if (openReportBtn && reportModal) {
            openReportBtn.addEventListener('click', () => {
                reportContent.value = generateEvaluationReport();
                reportModal.classList.remove('hidden');
            });
        }

        if (closeReportBtn && reportModal) {
            closeReportBtn.addEventListener('click', () => {
                reportModal.classList.add('hidden');
            });
        }

        if (copyReportBtn) {
            copyReportBtn.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(reportContent.value);
                    const originalText = copyReportBtn.innerHTML;
                    copyReportBtn.innerHTML = '<span>✔️</span> <span>คัดลอกเรียบร้อยแล้ว!</span>';
                    copyReportBtn.classList.remove('bg-brand-600', 'hover:bg-brand-700');
                    copyReportBtn.classList.add('bg-emerald-600', 'hover:bg-emerald-700');
                    setTimeout(() => {
                        copyReportBtn.innerHTML = originalText;
                        copyReportBtn.classList.remove('bg-emerald-600', 'hover:bg-emerald-700');
                        copyReportBtn.classList.add('bg-brand-600', 'hover:bg-brand-700');
                    }, 2500);
                } catch (err) {
                    reportContent.select();
                    document.execCommand('copy');
                    alert('คัดลอกข้อความสรุปแล้ว');
                }
            });
        }

        if (exportCsvBtn) exportCsvBtn.addEventListener('click', exportToCsv);
        if (backupBtn) backupBtn.addEventListener('click', backupData);
        if (restoreFileInput) restoreFileInput.addEventListener('change', restoreData);
        if (syncBtn) {
            syncBtn.addEventListener('click', () => {
                syncFromGoogleSheets(true);
            });
        }

        // Initial render from local cache
        renderRecords();

        // Background sync with Google Sheets
        syncFromGoogleSheets(false);
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
