document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Enable full UTF-8 support (including Thai text) in qrcode-generator
    if (typeof qrcode === 'function' && qrcode.stringToBytesFuncs && qrcode.stringToBytesFuncs['UTF-8']) {
        qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8'];
    }

    const qrInput = document.getElementById('qr-input');
    const clearBtn = document.getElementById('clear-btn');
    const eccSelect = document.getElementById('ecc-select');
    const sizeSelect = document.getElementById('size-select');

    // Center Logo Controls
    const logoInput = document.getElementById('logo-input');
    const logoFileLabel = document.getElementById('logo-file-label');
    const useAtLogoBtn = document.getElementById('use-at-logo-btn');
    const removeLogoBtn = document.getElementById('remove-logo-btn');
    const logoSizeSelect = document.getElementById('logo-size-select');
    const logoShapeSelect = document.getElementById('logo-shape-select');

    const qrcodeContainer = document.getElementById('qrcode-container');
    const qrPlaceholder = document.getElementById('qr-placeholder');
    const qrPreviewCanvas = document.getElementById('qr-preview');

    const statusBox = document.getElementById('status-box');
    const statusIcon = document.getElementById('status-icon');
    const statusMessage = document.getElementById('status-message');
    const densityBadge = document.getElementById('density-badge');

    const statVersion = document.getElementById('stat-version');
    const statModules = document.getElementById('stat-modules');
    const statBytes = document.getElementById('stat-bytes');
    const statSummary = document.getElementById('stat-summary');

    const downloadPngBtn = document.getElementById('download-png-btn');
    const downloadSvgBtn = document.getElementById('download-svg-btn');
    const copyPngBtn = document.getElementById('copy-png-btn');
    const copyBtnText = document.getElementById('copy-btn-text');

    const projectorBtn = document.getElementById('projector-btn');
    const projectorModal = document.getElementById('projector-modal');
    const projectorCanvas = document.getElementById('projector-canvas');
    const projectorCaption = document.getElementById('projector-caption');
    const closeProjectorBtn = document.getElementById('close-projector-btn');

    const themeToggleBtn = document.getElementById('theme-toggle');

    let matrix = null;
    let logoImage = null;      // HTMLImageElement when user uploads a logo
    let logoDataUrl = null;    // Base64 Data URL for embedding into SVG export

    /**
     * Calculate the central logo exclusion zone in module coordinates (0..n-1)
     * so we don't draw half-cut dark modules behind the logo.
     */
    function getLogoModuleZone(n) {
        if (!logoImage) return null;
        const ratio = Number(logoSizeSelect.value) || 0.21;
        // Ensure an odd number of modules centered on the grid so it aligns symmetrically
        let span = Math.round(n * ratio);
        if (span % 2 !== n % 2) span += 1;
        span = Math.max(3, Math.min(span, Math.floor(n * 0.30)));

        const start = Math.floor((n - span) / 2);
        const end = start + span - 1;
        return { start, end, span, ratio };
    }

    /**
     * Helper to draw a rounded rectangle path on a 2D canvas context
     */
    function traceRoundedRect(ctx, x, y, w, h, r) {
        const radius = Math.min(r, w / 2, h / 2);
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.arcTo(x + w, y, x + w, y + h, radius);
        ctx.arcTo(x + w, y + h, x, y + h, radius);
        ctx.arcTo(x, y + h, x, y, radius);
        ctx.arcTo(x, y, x + w, y, radius);
        ctx.closePath();
    }

    /**
     * Draw pixel-snapped QR code onto a canvas with a 4-module standard quiet zone,
     * plus optional high-resolution center logo badge.
     */
    function drawQRToCanvas(canvas, px) {
        if (!matrix || !canvas) return;
        canvas.width = px;
        canvas.height = px;
        const ctx = canvas.getContext('2d');

        // Pure white quiet zone & background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, px, px);

        const n = matrix.getModuleCount();
        const totalModules = n + 8; // 4-module quiet zone on each side
        const unit = px / totalModules;
        const zone = getLogoModuleZone(n);

        // High-contrast dark modules (skipping modules inside the logo safe zone)
        ctx.fillStyle = '#111111';
        for (let r = 0; r < n; r++) {
            for (let c = 0; c < n; c++) {
                if (zone && r >= zone.start && r <= zone.end && c >= zone.start && c <= zone.end) {
                    continue;
                }
                if (matrix.isDark(r, c)) {
                    const x0 = Math.round((c + 4) * unit);
                    const x1 = Math.round((c + 5) * unit);
                    const y0 = Math.round((r + 4) * unit);
                    const y1 = Math.round((r + 5) * unit);
                    ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
                }
            }
        }

        // Draw optional center logo with a clean white protective frame
        if (logoImage && zone) {
            const boxX = Math.round((zone.start + 4) * unit);
            const boxY = Math.round((zone.start + 4) * unit);
            const boxSize = Math.round((zone.end + 5) * unit) - boxX;
            const shape = logoShapeSelect.value || 'rounded';

            ctx.save();
            ctx.fillStyle = '#ffffff';
            ctx.strokeStyle = '#e2e8f0';
            ctx.lineWidth = Math.max(1, Math.round(px * 0.003));

            if (shape === 'circle') {
                const cx = boxX + boxSize / 2;
                const cy = boxY + boxSize / 2;
                ctx.beginPath();
                ctx.arc(cx, cy, boxSize / 2, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                ctx.clip();
            } else if (shape === 'rounded') {
                const r = Math.round(boxSize * 0.18);
                traceRoundedRect(ctx, boxX, boxY, boxSize, boxSize, r);
                ctx.fill();
                ctx.stroke();
                ctx.clip();
            } else {
                ctx.fillRect(boxX, boxY, boxSize, boxSize);
                ctx.strokeRect(boxX, boxY, boxSize, boxSize);
                ctx.beginPath();
                ctx.rect(boxX, boxY, boxSize, boxSize);
                ctx.clip();
            }

            // Inner margin so the logo doesn't touch the dark modules
            const pad = Math.max(2, Math.round(unit * 0.65));
            const availW = boxSize - pad * 2;
            const availH = boxSize - pad * 2;

            // Preserve aspect ratio (object-fit: contain)
            const imgW = logoImage.naturalWidth || logoImage.width || 1;
            const imgH = logoImage.naturalHeight || logoImage.height || 1;
            const scale = Math.min(availW / imgW, availH / imgH);
            const drawW = imgW * scale;
            const drawH = imgH * scale;
            const drawX = boxX + (boxSize - drawW) / 2;
            const drawY = boxY + (boxSize - drawH) / 2;

            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(logoImage, drawX, drawY, drawW, drawH);
            ctx.restore();
        }
    }

    function setStatus(type, icon, message) {
        statusIcon.textContent = icon;
        statusMessage.textContent = message;

        statusBox.className = 'mb-6 rounded-xl p-3.5 text-xs sm:text-sm border transition-all flex items-start gap-2.5 ';
        if (type === 'ok') {
            statusBox.className += 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300';
        } else if (type === 'warn') {
            statusBox.className += 'bg-amber-50/80 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/60 text-amber-800 dark:text-amber-300';
        } else {
            statusBox.className += 'bg-rose-50/80 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800/60 text-rose-800 dark:text-rose-300';
        }
    }

    function setDensityBadge(level) {
        densityBadge.className = 'px-2.5 py-0.5 rounded-full text-xs font-semibold border ';
        if (level === 'low') {
            densityBadge.textContent = 'ความหนาแน่นต่ำ • สแกนไกลดีเยี่ยม';
            densityBadge.className += 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300/60 dark:border-emerald-800';
        } else if (level === 'medium') {
            densityBadge.textContent = 'ความหนาแน่นปานกลาง';
            densityBadge.className += 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-300/60 dark:border-amber-800';
        } else if (level === 'high') {
            densityBadge.textContent = 'ความหนาแน่นสูง • ควรย่อลิงก์';
            densityBadge.className += 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-300/60 dark:border-rose-800';
        } else {
            densityBadge.textContent = 'รอข้อมูล';
            densityBadge.className += 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700';
        }
    }

    function setControlsEnabled(enabled) {
        downloadPngBtn.disabled = !enabled;
        downloadSvgBtn.disabled = !enabled;
        copyPngBtn.disabled = !enabled;
        projectorBtn.disabled = !enabled;
    }

    function makeQR() {
        const rawData = qrInput.value;
        const data = rawData.trim();

        clearBtn.style.display = rawData.length > 0 ? 'inline-flex' : 'none';

        if (!data) {
            matrix = null;
            qrcodeContainer.classList.remove('active', 'border-solid', 'border-brand-500/60');
            qrcodeContainer.classList.add('border-dashed', 'border-slate-300', 'dark:border-slate-700');
            qrPlaceholder.style.display = 'flex';
            qrPreviewCanvas.style.display = 'none';
            setControlsEnabled(false);
            setDensityBadge('idle');
            statVersion.textContent = '—';
            statModules.textContent = '—';
            statBytes.textContent = '0 B';
            statSummary.textContent = 'กรุณากรอกลิงก์หรือข้อความเพื่อคำนวณขนาดตาราง QR Code';
            setStatus('warn', 'ℹ️', 'กรุณากรอกลิงก์ (URL) หรือข้อความที่ต้องการสร้าง QR Code');
            return;
        }

        try {
            if (typeof qrcode !== 'function') {
                throw new Error('โหลดไลบรารีสร้าง QR ไม่สำเร็จ โปรดตรวจสอบการเชื่อมต่ออินเทอร์เน็ต');
            }

            // TypeNumber 0 = auto-select minimum QR version (1..40)
            const ecc = eccSelect.value || 'M';
            const qr = qrcode(0, ecc);
            qr.addData(data, 'Byte');
            qr.make();
            matrix = qr;

            // Update container UI
            qrcodeContainer.classList.remove('border-dashed', 'border-slate-300', 'dark:border-slate-700');
            qrcodeContainer.classList.add('active', 'border-solid', 'border-brand-500/60');
            qrPlaceholder.style.display = 'none';
            qrPreviewCanvas.style.display = 'block';

            // Render crisp 512x512 preview
            drawQRToCanvas(qrPreviewCanvas, 512);
            setControlsEnabled(true);

            // Compute diagnostics
            const n = qr.getModuleCount();
            const version = (n - 17) / 4;
            const utf8Bytes = new TextEncoder().encode(data).length;

            statVersion.textContent = `V${version}`;
            statModules.textContent = `${n} × ${n}`;
            statBytes.textContent = `${utf8Bytes} B`;
            statSummary.textContent = `ตาราง ${n}×${n} โมดูล + ขอบขาว 4 โมดูล • ECC ระดับ ${ecc}${logoImage ? ' • มีโลโก้ตรงกลาง' : ''}`;

            // Check if logo is used with low ECC (L or M)
            if (logoImage && (ecc === 'L' || ecc === 'M')) {
                setDensityBadge(n <= 29 ? 'low' : n <= 41 ? 'medium' : 'high');
                setStatus(
                    'warn',
                    '⚠️',
                    `คุณใส่โลโก้ตรงกลางแต่เลือก ECC ระดับ ${ecc} ซึ่งอาจทำให้สแกนติดยาก แนะนำให้เปลี่ยนระดับ ECC เป็น H (30%) หรือ Q (25%)`
                );
                return;
            }

            if (n <= 29) {
                setDensityBadge('low');
                setStatus('ok', '✅', 'เม็ด QR มีขนาดใหญ่และโปร่ง สแกนติดง่ายมากทั้งระยะใกล้และระยะไกล (ใช้ได้ตลอดไม่หมดอายุ)');
            } else if (n <= 41) {
                setDensityBadge('medium');
                setStatus('ok', '👍', 'ความหนาแน่นปานกลาง สแกนได้ดี แนะนำให้ขยายภาพ QR บนสไลด์ให้ใหญ่ชัดเจนเมื่อใช้ในห้องประชุม');
            } else {
                setDensityBadge('high');
                const tipEcc = (!logoImage && ecc !== 'L') ? ' หรือปรับ ECC เป็นระดับ M / L' : '';
                setStatus('warn', '⚠️', `ข้อมูลค่อนข้างยาว (${utf8Bytes} bytes, ตาราง ${n}×${n}) เม็ด QR มีความถี่สูง แนะนำให้ใช้ลิงก์สั้นลง${tipEcc} เพื่อให้สแกนจากระยะไกลง่ายขึ้น`);
            }
        } catch (err) {
            matrix = null;
            setControlsEnabled(false);
            setDensityBadge('idle');
            setStatus('error', '❌', err.message || 'ไม่สามารถสร้าง QR Code ได้ (ข้อมูลอาจยาวเกินความจุสูงสุด)');
        }
    }

    function saveBlob(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    function buildSVGString() {
        if (!matrix) return '';
        const n = matrix.getModuleCount();
        const total = n + 8;
        const zone = getLogoModuleZone(n);

        let out = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${total}">`;
        out += `<rect width="100%" height="100%" fill="#ffffff"/>`;
        out += `<g fill="#111111" shape-rendering="crispEdges">`;
        for (let r = 0; r < n; r++) {
            for (let c = 0; c < n; c++) {
                if (zone && r >= zone.start && r <= zone.end && c >= zone.start && c <= zone.end) {
                    continue;
                }
                if (matrix.isDark(r, c)) {
                    out += `<rect x="${c + 4}" y="${r + 4}" width="1" height="1"/>`;
                }
            }
        }
        out += `</g>`;

        // Embed optional logo in SVG
        if (logoImage && logoDataUrl && zone) {
            const boxX = zone.start + 4;
            const boxY = zone.start + 4;
            const boxSize = zone.span;
            const pad = 0.65;
            const imgX = boxX + pad;
            const imgY = boxY + pad;
            const imgSize = Math.max(1, boxSize - pad * 2);
            const shape = logoShapeSelect.value || 'rounded';

            if (shape === 'circle') {
                const cx = boxX + boxSize / 2;
                const cy = boxY + boxSize / 2;
                const r = boxSize / 2;
                out += `<defs><clipPath id="logoClip"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath></defs>`;
                out += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#ffffff" stroke="#e2e8f0" stroke-width="0.12"/>`;
            } else if (shape === 'rounded') {
                const rx = (boxSize * 0.18).toFixed(2);
                out += `<defs><clipPath id="logoClip"><rect x="${boxX}" y="${boxY}" width="${boxSize}" height="${boxSize}" rx="${rx}"/></clipPath></defs>`;
                out += `<rect x="${boxX}" y="${boxY}" width="${boxSize}" height="${boxSize}" rx="${rx}" fill="#ffffff" stroke="#e2e8f0" stroke-width="0.12"/>`;
            } else {
                out += `<defs><clipPath id="logoClip"><rect x="${boxX}" y="${boxY}" width="${boxSize}" height="${boxSize}"/></clipPath></defs>`;
                out += `<rect x="${boxX}" y="${boxY}" width="${boxSize}" height="${boxSize}" fill="#ffffff" stroke="#e2e8f0" stroke-width="0.12"/>`;
            }
            out += `<image href="${logoDataUrl}" x="${imgX}" y="${imgY}" width="${imgSize}" height="${imgSize}" preserveAspectRatio="xMidYMid meet" clip-path="url(#logoClip)"/>`;
        }

        out += `</svg>`;
        return out;
    }

    // Handle Center Logo Upload
    logoInput.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (ev) => {
            const dataUrl = ev.target.result;
            const img = new Image();
            img.onload = () => {
                logoImage = img;
                logoDataUrl = dataUrl;
                logoFileLabel.textContent = file.name;
                removeLogoBtn.style.display = 'inline-flex';
                logoSizeSelect.disabled = false;
                logoShapeSelect.disabled = false;

                // Automatically switch ECC to H so the QR remains reliable with a center logo
                if (eccSelect.value === 'L' || eccSelect.value === 'M') {
                    eccSelect.value = 'H';
                }
                makeQR();
            };
            img.onerror = () => {
                setStatus('error', '❌', 'ไม่สามารถอ่านไฟล์รูปภาพโลโก้ได้ กรุณาเลือกไฟล์ PNG, JPG หรือ SVG');
            };
            img.src = dataUrl;
        };
        reader.readAsDataURL(file);
    });

    removeLogoBtn.addEventListener('click', () => {
        logoImage = null;
        logoDataUrl = null;
        logoInput.value = '';
        logoFileLabel.textContent = 'เลือกรูปโลโก้จากเครื่อง...';
        removeLogoBtn.style.display = 'none';
        logoSizeSelect.disabled = true;
        logoShapeSelect.disabled = true;

        // Return ECC to M (balanced default for distance scanning) when logo is removed
        if (eccSelect.value === 'H') {
            eccSelect.value = 'M';
        }
        makeQR();
    });

    logoSizeSelect.addEventListener('change', () => {
        if (Number(logoSizeSelect.value) >= 0.25 && eccSelect.value !== 'H') {
            eccSelect.value = 'H';
        }
        makeQR();
    });

    logoShapeSelect.addEventListener('change', makeQR);

    // Input & Settings Listeners
    qrInput.addEventListener('input', makeQR);
    eccSelect.addEventListener('change', makeQR);
    sizeSelect.addEventListener('change', () => {
        if (matrix) drawQRToCanvas(qrPreviewCanvas, 512);
    });

    clearBtn.addEventListener('click', () => {
        qrInput.value = '';
        qrInput.focus();
        makeQR();
    });

    downloadPngBtn.addEventListener('click', () => {
        if (!matrix) return;
        const targetPx = Number(sizeSelect.value) || 1024;
        const exportCanvas = document.createElement('canvas');
        drawQRToCanvas(exportCanvas, targetPx);
        exportCanvas.toBlob((blob) => {
            if (blob) saveBlob(blob, `qrcode-${targetPx}px.png`);
        }, 'image/png');
    });

    downloadSvgBtn.addEventListener('click', () => {
        if (!matrix) return;
        const svgStr = buildSVGString();
        const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
        saveBlob(blob, 'qrcode-vector.svg');
    });

    copyPngBtn.addEventListener('click', async () => {
        if (!matrix) return;
        try {
            const targetPx = Number(sizeSelect.value) || 1024;
            const exportCanvas = document.createElement('canvas');
            drawQRToCanvas(exportCanvas, targetPx);
            const blob = await new Promise((resolve) => exportCanvas.toBlob(resolve, 'image/png'));
            if (blob && navigator.clipboard && window.ClipboardItem) {
                await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
                const originalText = copyBtnText.textContent;
                copyBtnText.textContent = 'คัดลอกสำเร็จ! ✓';
                setTimeout(() => {
                    copyBtnText.textContent = originalText;
                }, 1800);
            } else {
                throw new Error('Clipboard API not supported');
            }
        } catch (_) {
            setStatus('warn', 'ℹ️', 'เบราว์เซอร์นี้ไม่รองรับการคัดลอกภาพโดยตรง กรุณากดปุ่ม "ดาวน์โหลด PNG" แทน');
        }
    });

    // Fullscreen Projector Modal
    function openProjectorModal() {
        if (!matrix) return;
        drawQRToCanvas(projectorCanvas, 1024);
        projectorCaption.textContent = qrInput.value.trim();
        projectorModal.classList.remove('hidden');
        projectorModal.classList.add('flex');
    }

    function closeProjectorModal() {
        projectorModal.classList.add('hidden');
        projectorModal.classList.remove('flex');
    }

    projectorBtn.addEventListener('click', openProjectorModal);
    closeProjectorBtn.addEventListener('click', closeProjectorModal);
    projectorModal.addEventListener('click', (e) => {
        if (e.target === projectorModal) closeProjectorModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !projectorModal.classList.contains('hidden')) {
            closeProjectorModal();
        }
    });

    // Theme Toggle
    themeToggleBtn.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    function loadDefaultAtLogo() {
        const defaultLogoSrc = '../../assets/images/at-logo.jpg';
        const img = new Image();
        img.onload = () => {
            logoImage = img;
            logoDataUrl = defaultLogoSrc;
            logoFileLabel.textContent = 'AT Logo (Default)';
            removeLogoBtn.style.display = 'inline-flex';
            logoSizeSelect.disabled = false;
            logoShapeSelect.disabled = false;
            logoShapeSelect.value = 'circle';
            if (eccSelect.value === 'L' || eccSelect.value === 'M') {
                eccSelect.value = 'H';
            }
            makeQR();
        };
        img.src = defaultLogoSrc;
    }

    if (useAtLogoBtn) {
        useAtLogoBtn.addEventListener('click', loadDefaultAtLogo);
    }

    // Check URL parameters (?url=...)
    const urlParams = new URLSearchParams(window.location.search);
    const paramUrl = urlParams.get('url');
    if (paramUrl) {
        qrInput.value = paramUrl;
    }

    // Initial render on page load (with AT Logo preloaded)
    makeQR();
    loadDefaultAtLogo();
});
