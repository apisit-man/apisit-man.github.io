(function () {
    const config = window.EXPENSE_PAGE_CONFIG;
    if (!config) return;

    const form = document.getElementById('expenseForm');
    const statusBox = document.getElementById('statusMessage');
    const submitButton = document.getElementById('submitBtn');
    const historyList = document.getElementById('historyList');
    const historyEmpty = document.getElementById('historyEmpty');
    const monthFilter = document.getElementById('monthFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    const typeFilter = document.getElementById('typeFilter');
    const fileInput = document.getElementById('fileInput');
    const fileName = document.getElementById('fileNameDisplay');
    let records = [];
    let receipt = null;

    function escapeHtml(value) {
        return String(value ?? '').replace(/[&<>'"]/g, char => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
        }[char]));
    }

    function localDateTimeValue(date = new Date()) {
        const shifted = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        return shifted.toISOString().slice(0, 16);
    }

    function money(value) {
        return new Intl.NumberFormat('th-TH', {
            style: 'currency', currency: 'THB', minimumFractionDigits: 0, maximumFractionDigits: 2
        }).format(Number(value) || 0);
    }

    function showStatus(message, type = 'success') {
        statusBox.textContent = message;
        statusBox.className = `p-4 rounded-xl text-sm font-medium text-center ${
            type === 'success'
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                : 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300'
        }`;
    }

    function recordMonth(record) {
        const date = new Date(record.date || record.createdAt);
        if (Number.isNaN(date.getTime())) return '';
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    }

    function filteredRecords() {
        return records.filter(record => {
            if (monthFilter.value && recordMonth(record) !== monthFilter.value) return false;
            if (categoryFilter.value && record.category !== categoryFilter.value) return false;
            if (typeFilter && typeFilter.value && record.entryType !== typeFilter.value) return false;
            return true;
        });
    }

    function renderSummary() {
        const now = new Date();
        const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        const monthRecords = records.filter(record => recordMonth(record) === thisMonth);
        const expenses = monthRecords.filter(record => record.entryType !== 'income')
            .reduce((sum, record) => sum + Number(record.amount || 0), 0);
        const income = monthRecords.filter(record => record.entryType === 'income')
            .reduce((sum, record) => sum + Number(record.amount || 0), 0);

        document.getElementById('summaryPrimary').textContent = money(expenses);
        document.getElementById('summaryCount').textContent = `${monthRecords.length} รายการ`;
        const secondary = document.getElementById('summarySecondary');
        if (config.expenseType === 'personal') {
            secondary.textContent = money(income - expenses);
        } else {
            const latestOdometer = records.map(item => Number(item.odometer || 0)).find(Boolean);
            secondary.textContent = latestOdometer ? `${latestOdometer.toLocaleString('th-TH')} km` : '—';
        }
    }

    function renderHistory() {
        const visible = filteredRecords();
        historyEmpty.classList.toggle('hidden', visible.length !== 0);
        historyList.innerHTML = visible.map(record => {
            const isIncome = record.entryType === 'income';
            const amountClass = isIncome ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white';
            const amountPrefix = isIncome ? '+' : '−';
            const details = [record.merchant, record.paymentMethod, record.note].filter(Boolean).map(escapeHtml).join(' · ');
            const vehicle = [
                record.odometer ? `${Number(record.odometer).toLocaleString('th-TH')} km` : '',
                record.liters ? `${record.liters} L` : ''
            ].filter(Boolean).join(' · ');
            return `
                <article class="flex gap-4 items-start p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <div class="w-11 h-11 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center text-xl flex-none">${isIncome ? '💰' : config.icon}</div>
                    <div class="min-w-0 flex-1">
                        <div class="flex flex-wrap justify-between gap-2">
                            <div>
                                <h3 class="font-bold text-slate-800 dark:text-white">${escapeHtml(record.category)}</h3>
                                <p class="text-xs text-slate-500 mt-1">${new Date(record.date).toLocaleString('th-TH', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                            </div>
                            <strong class="${amountClass}">${amountPrefix}${money(record.amount)}</strong>
                        </div>
                        ${details ? `<p class="text-sm text-slate-600 dark:text-slate-400 mt-2 break-words">${details}</p>` : ''}
                        ${vehicle ? `<p class="text-xs text-slate-500 mt-2">${escapeHtml(vehicle)}</p>` : ''}
                        <div class="flex items-center gap-4 mt-3 text-xs">
                            ${record.receiptUrl ? `<a class="text-brand-600 dark:text-brand-400 font-semibold" href="${escapeHtml(record.receiptUrl)}" target="_blank" rel="noopener noreferrer">ดูใบเสร็จ</a>` : ''}
                            <button type="button" data-delete-id="${escapeHtml(record.id)}" class="text-red-500 hover:text-red-700 font-semibold">ลบรายการ</button>
                        </div>
                    </div>
                </article>`;
        }).join('');
    }

    async function loadRecords() {
        historyList.innerHTML = '<p class="text-sm text-slate-500 text-center py-8">กำลังโหลดข้อมูล...</p>';
        try {
            const result = await AdminAPI.request('listExpenses', {
                token: AdminAPI.token(), expenseType: config.expenseType, limit: 250
            });
            records = result.records || [];
            renderSummary();
            renderHistory();
        } catch (error) {
            showStatus(error.message, 'error');
            historyList.innerHTML = '';
        }
    }

    function collectPayload() {
        const value = id => document.getElementById(id)?.value || '';
        return {
            date: value('dateInput'),
            entryType: value('entryTypeInput') || 'expense',
            category: value('categoryInput'),
            amount: value('amountInput'),
            paymentMethod: value('paymentMethodInput'),
            merchant: value('merchantInput'),
            note: value('noteInput'),
            odometer: value('odometerInput'),
            liters: value('litersInput'),
            pricePerLiter: value('pricePerLiterInput'),
            filename: receipt?.name || '',
            mimeType: receipt?.type || '',
            fileData: receipt?.data || ''
        };
    }

    fileInput?.addEventListener('change', event => {
        const file = event.target.files[0];
        receipt = null;
        fileName.textContent = '';
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) {
            showStatus('ไฟล์ใบเสร็จต้องมีขนาดไม่เกิน 5 MB', 'error');
            fileInput.value = '';
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            receipt = { name: file.name, type: file.type, data: String(reader.result).split(',')[1] };
            fileName.textContent = `ไฟล์ที่เลือก: ${file.name}`;
        };
        reader.readAsDataURL(file);
    });

    form.addEventListener('submit', async event => {
        event.preventDefault();
        submitButton.disabled = true;
        submitButton.textContent = 'กำลังบันทึก...';
        try {
            await AdminAPI.request('createExpense', {
                token: AdminAPI.token(), expenseType: config.expenseType, record: collectPayload()
            });
            showStatus('บันทึกข้อมูลเรียบร้อยแล้ว');
            form.reset();
            document.getElementById('dateInput').value = localDateTimeValue();
            receipt = null;
            fileName.textContent = '';
            await loadRecords();
        } catch (error) {
            showStatus(error.message, 'error');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'บันทึกข้อมูล';
        }
    });

    historyList.addEventListener('click', async event => {
        const button = event.target.closest('[data-delete-id]');
        if (!button || !confirm('ต้องการลบรายการนี้หรือไม่?')) return;
        button.disabled = true;
        try {
            await AdminAPI.request('deleteExpense', {
                token: AdminAPI.token(), expenseType: config.expenseType, id: button.dataset.deleteId
            });
            records = records.filter(record => record.id !== button.dataset.deleteId);
            renderSummary();
            renderHistory();
        } catch (error) {
            showStatus(error.message, 'error');
            button.disabled = false;
        }
    });

    [monthFilter, categoryFilter, typeFilter].filter(Boolean).forEach(element => element.addEventListener('change', renderHistory));
    document.getElementById('logoutBtn').addEventListener('click', () => AdminAPI.logout());
    document.getElementById('theme-toggle').addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    });

    (async function init() {
        document.getElementById('dateInput').value = localDateTimeValue();
        monthFilter.value = new Date().toISOString().slice(0, 7);
        if (await AdminAPI.requireSession()) {
            document.getElementById('pageLoading').classList.add('hidden');
            document.getElementById('pageContent').classList.remove('hidden');
            await loadRecords();
        }
    })();
})();
