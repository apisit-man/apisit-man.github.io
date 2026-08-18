document.addEventListener('DOMContentLoaded', () => {
    const qrInput = document.getElementById('qr-input');
    const clearBtn = document.getElementById('clear-btn');
    const qrcodeContainer = document.getElementById('qrcode-container');
    const qrPlaceholder = document.getElementById('qr-placeholder');
    const qrcodeDiv = document.getElementById('qrcode');
    const downloadBtn = document.getElementById('download-btn');
    const themeToggleBtn = document.getElementById('theme-toggle');

    let qrcode = null;
    let generateTimeout = null;

    // Initialize QR Code logic
    function generateQR(text) {
        // Clear previous QR code
        qrcodeDiv.innerHTML = '';
        qrcodeDiv.classList.remove('pop-in');
        
        if (!text.trim()) {
            qrcodeContainer.classList.remove('active', 'border-solid');
            qrcodeContainer.classList.add('border-dashed');
            qrPlaceholder.style.display = 'flex';
            qrcodeDiv.style.display = 'none';
            downloadBtn.disabled = true;
            return;
        }

        qrcodeContainer.classList.remove('border-dashed');
        qrcodeContainer.classList.add('active', 'border-solid');
        qrPlaceholder.style.display = 'none';
        
        // Unhide qrcode div BEFORE generating so qrcodejs can calculate if it needs to
        qrcodeDiv.style.display = 'flex';
        
        // Force reflow
        void qrcodeDiv.offsetWidth;
        
        // Add animation class
        qrcodeDiv.classList.add('pop-in');
        
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

    // Generate initial URL if we want a default, or just leave it blank.
    // We will leave it blank as original.
    
    // Input Event Listener with Debounce
    qrInput.addEventListener('input', (e) => {
        const text = e.target.value;
        
        // Show/hide clear button
        if (text.length > 0) {
            clearBtn.style.display = 'flex';
        } else {
            clearBtn.style.display = 'none';
        }

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
        
        let sourceElement = null;
        if (qrImage && qrImage.getAttribute('src')) {
            sourceElement = qrImage;
        } else if (qrCanvas) {
            sourceElement = qrCanvas;
        }

        if (!sourceElement) return;

        // Create a new canvas with padding (white border)
        const padding = 20; 
        const srcWidth = sourceElement.width || 200;
        const srcHeight = sourceElement.height || 200;
        
        const paddedCanvas = document.createElement('canvas');
        paddedCanvas.width = srcWidth + (padding * 2);
        paddedCanvas.height = srcHeight + (padding * 2);
        
        const ctx = paddedCanvas.getContext('2d');
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, paddedCanvas.width, paddedCanvas.height);
        
        // Draw the original QR code onto the padded canvas
        ctx.drawImage(sourceElement, padding, padding, srcWidth, srcHeight);
        
        const imageSrc = paddedCanvas.toDataURL("image/png");

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
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
});
