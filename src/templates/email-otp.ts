import { appConfig } from "../utils/appConfig";

export const emailVerificationOtpTemplate = (otp: string, userRegistered: boolean) => {
  const expirationTimeInMinutes = Math.round(appConfig.MAGIC_LINK_TTL / 60000);
  const formattedExpirationTime =
    new Date(Date.now() + appConfig.MAGIC_LINK_TTL).toLocaleString(`en-IN`, {
      minute: `numeric`,
      hour: `numeric`,
      timeZoneName: `short`,
      timeZone: `Asia/Kolkata`,
    }) + ` (${expirationTimeInMinutes} min)`;
  const getCurrentYear = new Date().getFullYear();

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
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
          .otp-box {
              display: inline-block;
              padding: 12px 24px;
              background: linear-gradient(135deg, #ee0979, #ff6a00);
              color: white;
              font-size: 24px;
              font-weight: bold;
              text-align: center;
              border-radius: 5px;
              margin: 20px 0;
              letter-spacing: 2px;
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
              <h1>Verify Your Email Address</h1>
          </div>
          <div class="content">
              <p>Hello!</p>
  
              ${
                userRegistered
                  ? `<p>Thank you for signing up. To complete your registration and verify your email address, please use the OTP code below:</p>`
                  : `<p>This email address is associated with an existing account. To verify your email address, please use the OTP code below:</p>`
              }
              
              <center>
                  <div class="otp-box">${otp}</div>
              </center>
              
              ${
                userRegistered
                  ? `<p>If you didn't create an account, you can safely ignore this email.</p>`
                  : `<p>If you didn't request a verification email, you can safely ignore this email.</p>`
              }
              <p>This OTP will expire on ${formattedExpirationTime}.</p>
          </div>
          <div class="footer">
              <p>Enter the OTP code in the Openlly app to verify your email.</p>
              <p>© Openlly@${getCurrentYear}. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>
    `;
};