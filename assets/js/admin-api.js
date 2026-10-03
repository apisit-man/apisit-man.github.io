(function () {
    const TOKEN_KEY = 'expenseAdminToken';
    const EXPIRY_KEY = 'expenseAdminExpiry';
    const IDLE_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes session timeout (matches backend SESSION_IDLE_SECONDS)

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

        // Touch session expiry on successful server response
        if (window.AdminAPI && typeof window.AdminAPI.touchSession === 'function') {
            window.AdminAPI.touchSession();
        }
        return result;
    }

    window.AdminAPI = {
        request,
        token() {
            return sessionStorage.getItem(TOKEN_KEY) || '';
        },
        hasActiveSession() {
            const token = this.token();
            if (!token) return false;
            const expiry = parseInt(sessionStorage.getItem(EXPIRY_KEY) || '0', 10);
            if (!expiry || Date.now() > expiry) {
                this.clearToken();
                return false;
            }
            return true;
        },
        touchSession() {
            if (this.token()) {
                sessionStorage.setItem(EXPIRY_KEY, String(Date.now() + IDLE_TIMEOUT_MS));
            }
        },
        saveToken(token) {
            sessionStorage.setItem(TOKEN_KEY, token);
            this.touchSession();
        },
        clearToken() {
            sessionStorage.removeItem(TOKEN_KEY);
            sessionStorage.removeItem(EXPIRY_KEY);
            if (document.documentElement) {
                document.documentElement.classList.remove('has-admin-session');
            }
        },
        async verify() {
            if (!this.hasActiveSession()) return false;
            const token = this.token();
            try {
                await request('verify', { token });
                this.touchSession();
                return true;
            } catch (_error) {
                this.clearToken();
                return false;
            }
        },
        async requireSession() {
            if (!this.hasActiveSession() || !(await this.verify())) {
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
