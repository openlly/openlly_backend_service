export const contactUsTemplate = (name: string, email: string, message: string) => {
    const getCurrentYear = new Date().getFullYear();
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contact Us</title>
        <style>
            body {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
                min-height: 100vh;
                background: linear-gradient(135deg, #0062cc, #33d9b2);
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
            .footer {
                text-align: center;
                margin-top: 30px;
                color: #666;
                font-size: 14px;
            }
            .logo {
                color: #0062cc;
                font-weight: bold;
                font-size: 24px;
                margin-bottom: 20px;
            }
            .message-box {
                background: #f9f9f9;
                border: 1px solid #ddd;
                padding: 15px;
                border-radius: 5px;
                color: #555;
                margin-top: 15px;
                font-size: 14px;
                white-space: pre-wrap;
            }
            .highlight {
                color: #0062cc;
                font-weight: bold;
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
                <h1>Contact Us Inquiry</h1>
            </div>
            <div class="content">
                <p>Hello Admin,</p>
                <p>You have received a new inquiry from the "Contact Us" form. Here are the details:</p>
                
                <p><span class="highlight">Name:</span> ${name}</p>
                <p><span class="highlight">Email:</span> ${email}</p>
                <p><span class="highlight">Message:</span></p>
                <div class="message-box">${message}</div>
            </div>
            <div class="footer">
                <p>&copy; Openlly@${getCurrentYear}. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
  };
  