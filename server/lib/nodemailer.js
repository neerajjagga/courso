import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const sendVerificationEmail = async (recipientEmail, verificationCode) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false, // true for 465, false for 587
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"Courso" <${process.env.EMAIL_USER}>`,
            to: recipientEmail,
            subject: "Email Verification Code",
            text: `Your verification code is: ${verificationCode}`,
            html: `
                <html>
                    <head>
                        <style>
                            body {
                                font-family: 'Arial', sans-serif;
                                background-color: #f4f7fc;
                                margin: 0;
                                padding: 0;
                            }
                            .container {
                                max-width: 600px;
                                margin: 20px auto;
                                background-color: #ffffff;
                                border-radius: 8px;
                                padding: 20px;
                                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                            }
                            .header {
                                text-align: center;
                                padding-bottom: 20px;
                            }
                            .header img {
                                width: 120px;
                                margin-bottom: 15px;
                            }
                            .main-content {
                                text-align: center;
                                padding: 20px;
                                background-color: #f9f9f9;
                                border-radius: 8px;
                            }
                            .verification-code {
                                font-size: 24px;
                                font-weight: bold;
                                color: #007bff;
                                padding: 15px;
                                background-color: #e7f1ff;
                                border-radius: 8px;
                                margin: 15px 0;
                            }
                            .footer {
                                text-align: center;
                                font-size: 12px;
                                color: #777777;
                                margin-top: 20px;
                            }
                            .footer a {
                                color: #007bff;
                                text-decoration: none;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <img src="https://example.com/logo.png" alt="Courso Logo">
                                <h2>Welcome to Courso</h2>
                            </div>
                            <div class="main-content">
                                <h3>We're almost there!</h3>
                                <p>To complete your registration, use the verification code below:</p>
                                <div class="verification-code">${verificationCode}</div>
                                <p>This code will expire in 2 minutes. If you did not request this, please ignore this email.</p>
                            </div>
                            <div class="footer">
                                <p>Need help? Visit <a href="https://courso.com/support">Support</a> or reply to this email.</p>
                                <p>&copy; 2025 Courso. All Rights Reserved.</p>
                            </div>
                        </div>
                    </body>
                </html>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.messageId}`);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};
