const nodemailer = require('nodemailer');

const OTP_EXPIRY_MINUTES = 5;
let cachedTransporter = null;

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const createEmailTransporter = () => {
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS || process.env.EMAIL_PASSWORD;

    if (!emailUser || !emailPass) {
        throw new Error('Email credentials are missing. Set EMAIL_USER and EMAIL_PASS in backend .env');
    }

    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: emailUser,
            pass: emailPass
        }
    });
};

const getEmailTransporter = async () => {
    if (!cachedTransporter) {
        cachedTransporter = createEmailTransporter();
        await cachedTransporter.verify();
    }

    return cachedTransporter;
};

const buildOTPEmailTemplate = ({ name, otp }) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify Your Account</title>
</head>
<body style="margin:0;padding:0;background-color:#f3f6fb;font-family:Segoe UI,Arial,sans-serif;color:#1f2937;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f3f6fb;padding:24px 0;">
        <tr>
            <td align="center">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
                    <tr>
                        <td style="background:#0f172a;padding:24px 32px;text-align:center;">
                            <h1 style="margin:0;font-size:24px;color:#ffffff;letter-spacing:0.2px;">Trip Planner</h1>
                            <p style="margin:8px 0 0;color:#cbd5e1;font-size:14px;">Account Verification</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:32px;">
                            <p style="margin:0 0 16px;font-size:16px;line-height:1.5;">Hello ${name},</p>
                            <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#334155;">
                                Thank you for registering. Use the OTP below to verify your account.
                            </p>
                            <div style="margin:0 auto 20px;max-width:260px;background:#f8fafc;border:2px solid #cbd5e1;border-radius:10px;padding:16px 12px;text-align:center;">
                                <div style="font-size:34px;letter-spacing:8px;font-weight:700;color:#0f172a;font-family:'Courier New',monospace;">${otp}</div>
                            </div>
                            <p style="margin:0 0 12px;font-size:14px;color:#334155;">
                                This code will expire in <strong>${OTP_EXPIRY_MINUTES} minutes</strong>.
                            </p>
                            <p style="margin:0;font-size:13px;color:#64748b;line-height:1.5;">
                                If you did not request this, please ignore this email.
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:16px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;">
                            <p style="margin:0;font-size:12px;color:#64748b;text-align:center;">
                                This is an automated message. Please do not reply.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `;
};

const buildOTPText = ({ name, otp }) => {
    return [
        `Hello ${name},`,
        '',
        'Your verification code is:',
        otp,
        '',
        `This code will expire in ${OTP_EXPIRY_MINUTES} minutes.`,
        '',
        'If you did not request this, please ignore the email.'
    ].join('\n');
};

const sendOTPEmail = async (email, otp, name) => {
    if (!email || !otp) {
        throw new Error('Email and OTP are required to send verification email');
    }

    const safeName = String(name || 'User').trim() || 'User';

    // Development fallback to avoid blocking local testing.
    if (process.env.EMAIL_MODE === 'console') {
        console.log(`[OTP][console] email=${email} otp=${otp} expiresIn=${OTP_EXPIRY_MINUTES}m`);
        return { accepted: [email], response: 'console-mode' };
    }

    const transporter = await getEmailTransporter();

    return transporter.sendMail({
        from: `"Trip Planner" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Verify Your Account',
        text: buildOTPText({ name: safeName, otp }),
        html: buildOTPEmailTemplate({ name: safeName, otp })
    });
};

module.exports = {
    createEmailTransporter,
    getEmailTransporter,
    buildOTPEmailTemplate,
    generateOTP,
    sendOTPEmail
};
