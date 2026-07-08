document.addEventListener('DOMContentLoaded', () => {
    const qrInput = document.getElementById('qr-input');
    const clearBtn = document.getElementById('clear-btn');
    const qrcodeContainer = document.getElementById('qrcode-container');
    const qrcodeDiv = document.getElementById('qrcode');
    const downloadBtn = document.getElementById('download-btn');
    const themeToggleBtn = document.getElementById('theme-toggle');

    let qrcode = null;
    let generateTimeout = null;

    // Initialize QR Code logic
    function generateQR(text) {
        // Clear previous QR code
        qrcodeDiv.innerHTML = '';
        
        if (!text.trim()) {
            qrcodeContainer.classList.remove('active');
            qrcodeContainer.classList.add('placeholder-active');
            downloadBtn.disabled = true;
            return;
        }

        qrcodeContainer.classList.remove('placeholder-active');
        qrcodeContainer.classList.add('active');
        
        // Use qrcode.js to generate
        qrcode = new QRCode(qrcodeDiv, {
            text: text,
            width: 200,
            height: 200,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });

        downloadBtn.disabled = false;
    }

    // Input Event Listener with Debounce
    qrInput.addEventListener('input', (e) => {
        const text = e.target.value;
        
        // Show/hide clear button
        clearBtn.style.display = text.length > 0 ? 'flex' : 'none';

        // Debounce QR generation to prevent flickering while typing
        clearTimeout(generateTimeout);
        generateTimeout = setTimeout(() => {
            generateQR(text);
        }, 300);
    });

    // Clear Button Event
    clearBtn.addEventListener('click', () => {
        qrInput.value = '';
        qrInput.focus();
        clearBtn.style.display = 'none';
        generateQR('');
    });

    // Download Button Event
    downloadBtn.addEventListener('click', () => {
        const qrImage = qrcodeDiv.querySelector('img');
        const qrCanvas = qrcodeDiv.querySelector('canvas');
        
        let imageSrc = '';
        
        if (qrImage && qrImage.getAttribute('src')) {
            imageSrc = qrImage.getAttribute('src');
        } else if (qrCanvas) {
            imageSrc = qrCanvas.toDataURL("image/png");
        }

        if (imageSrc) {
            const link = document.createElement('a');
            link.href = imageSrc;
            link.download = 'qrcode.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    });

    // Theme Toggle Logic
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
});
