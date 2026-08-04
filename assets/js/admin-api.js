(function () {
    const TOKEN_KEY = 'expenseAdminToken';

    function getApiUrl() {
        const url = window.ADMIN_CONFIG && window.ADMIN_CONFIG.apiUrl;
        if (!url || url.includes('YOUR_GOOGLE_APPS_SCRIPT')) {
            throw new Error('ระบบยังไม่ได้เชื่อมต่อ Google Apps Script');
        }
        return url;
    }

    async function request(action, payload = {}) {
        const response = await fetch(getApiUrl(), {
            method: 'POST',
            redirect: 'follow',
            cache: 'no-store',
            credentials: 'omit',
            referrerPolicy: 'no-referrer',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({ ...payload, action })
        });
        const text = await response.text();
        let result;
        try {
            result = JSON.parse(text);
        } catch (_error) {
            throw new Error('ไม่สามารถอ่านคำตอบจากระบบจัดเก็บข้อมูลได้');
        }
        if (!result.ok) throw new Error(result.message || 'ดำเนินการไม่สำเร็จ');
        return result;
    }

    window.AdminAPI = {
        request,
        token() { return sessionStorage.getItem(TOKEN_KEY) || ''; },
        saveToken(token) { sessionStorage.setItem(TOKEN_KEY, token); },
        clearToken() { sessionStorage.removeItem(TOKEN_KEY); },
        async verify() {
            const token = this.token();
            if (!token) return false;
            try {
                await request('verify', { token });
                return true;
            } catch (_error) {
                this.clearToken();
                return false;
            }
        },
        async requireSession() {
            if (!(await this.verify())) {
                const returnTo = encodeURIComponent(location.pathname.split('/').pop() || 'admin.html');
                location.replace(`admin.html?returnTo=${returnTo}`);
                return false;
            }
            return true;
        },
        async logout() {
            const token = this.token();
            try {
                if (token) await request('logout', { token });
            } catch (_error) {
                // Always clear the local token even if the network is unavailable.
            } finally {
                this.clearToken();
                location.replace('admin.html');
            }
        }
    };
})();
