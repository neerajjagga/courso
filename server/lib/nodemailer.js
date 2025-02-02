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

export const sendCourseReceipt = async (recipientEmail, courseName, purchaseDate, amount, courseImage) => {
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
            subject: "Course Purchase Receipt - Courso",
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
                            .course-image {
                                width: 100%;
                                height: auto;
                                border-radius: 8px;
                                margin-bottom: 15px;
                            }
                            .main-content {
                                text-align: center;
                                padding: 20px;
                                background-color: #f9f9f9;
                                border-radius: 8px;
                            }
                            .receipt-details {
                                font-size: 16px;
                                text-align: left;
                                margin-top: 20px;
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
                                <h2>Thank You for Your Purchase!</h2>
                            </div>
                            <div class="main-content">
                                <img src="${courseImage}" alt="${courseName}" class="course-image">
                                <h3>Course Receipt</h3>
                                <p>Dear valued learner,</p>
                                <p>Thank you for purchasing the <strong>${courseName}</strong> course. Here are your purchase details:</p>
                                <div class="receipt-details">
                                    <p><strong>Course Name:</strong> ${courseName}</p>
                                    <p><strong>Purchase Date:</strong> ${purchaseDate}</p>
                                    <p><strong>Amount Paid:</strong> ₹${amount/100}</p>
                                </div>
                                <p>You can now access your course anytime from your dashboard.</p>
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
        console.log(`Receipt email sent: ${info.messageId}`);
    } catch (error) {
        console.error("Error sending course receipt email:", error);
    }
};

export const sendPaymentFailedEmail = async (recipientEmail, courseName, purchaseDate, amount, reason, courseImage) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"Courso" <${process.env.EMAIL_USER}>`,
            to: recipientEmail,
            subject: "Payment Failed - Courso",
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
                            .course-image {
                                width: 100%;
                                height: auto;
                                border-radius: 8px;
                                margin-bottom: 15px;
                            }
                            .main-content {
                                text-align: center;
                                padding: 20px;
                                background-color: #f9f9f9;
                                border-radius: 8px;
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
                                <h2>Payment Failed</h2>
                            </div>
                            <div class="main-content">
                                <img src="${courseImage}" alt="${courseName}" class="course-image">
                                <h3>Transaction Unsuccessful</h3>
                                <p>Your payment for the <strong>${courseName}</strong> course on <strong>${purchaseDate}</strong> was unsuccessful. The amount attempted was ₹${amount}.</p>
                                <p><strong>Reason:</strong> ${reason}</p>
                            </div>
                        </div>
                    </body>
                </html>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`Payment failure email sent: ${info.messageId}`);
    } catch (error) {
        console.error("Error sending payment failure email:", error);
    }
};
