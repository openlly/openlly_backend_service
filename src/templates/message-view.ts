export const messageAcknowledgmentTemplate = (
    userName: string,
    messageDetails: string,
    messageUrl: string,  // Add the message URL as an argument
  ) => {
    const getCurrentYear = new Date().getFullYear();
    
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Message Acknowledgment</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
                min-height: 100vh;
                background: linear-gradient(135deg, #ee0979, #ff6a00);
            }
            .container {
                max-width: 600px;
                margin: 40px auto;
                padding: 30px;
                background: white;
                border-radius: 10px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
            }
            .content {
                color: #333;
                line-height: 1.6;
                margin-bottom: 30px;
            }
            .button {
                display: inline-block;
                padding: 12px 24px;
                background: linear-gradient(135deg, #ee0979, #ff6a00);
                color: white;
                text-decoration: none;
                border-radius: 5px;
                font-weight: bold;
                text-align: center;
                margin: 20px 0;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                color: #666;
                font-size: 14px;
            }
            .logo {
                color: #ee0979;
                font-weight: bold;
                font-size: 24px;
                margin-bottom: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">Openlly</div>
                <h1>Message Acknowledgment</h1>
            </div>
            <div class="content">
                <p>Hello ${userName}!</p>
    
                <p>We have successfully received and acknowledged your message. Here's a quick summary of your message:</p>
                <p><strong>Your Response:</strong></p>
                <p>${messageDetails}</p>
    
                            
                <center>
                    <a href="${messageUrl}" class="button">View Your Message</a> <!-- Include the message URL -->
                </center>
    
                <p>If you have any further questions, feel free to reply to this email.</p>
            </div>
            <div class="footer">
                <p>If you're having trouble clicking the button, copy and paste this URL into your browser:</p>
                <p><a href="${messageUrl}">${messageUrl}</a></p>
                <p>&copy; Openlly@${getCurrentYear}. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
  };
  