// Email service for OTP verification using nodemailer with Ethereal Email
const nodemailer = require('nodemailer');

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

let cachedTransporter = null;

const getTransporter = async () => {
    // Return cached transporter if available
    if (cachedTransporter) {
        return cachedTransporter;
    }

    try {
        // Check if Gmail credentials are configured in .env
        const hasGmailConfig = process.env.EMAIL_USER &&
            !process.env.EMAIL_USER.includes('your-email') &&
            process.env.EMAIL_PASSWORD &&
            !process.env.EMAIL_PASSWORD.includes('your-app-password');

        if (hasGmailConfig) {
            // Use configured Gmail account
            cachedTransporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD
                }
            });
            console.log('✅ Using configured Gmail account for email sending');
        } else {
            // Generate Ethereal test account (works with any email)
            console.log('🔧 Generating Ethereal test account for email sending...');
            const testAccount = await nodemailer.createTestAccount();

            cachedTransporter = nodemailer.createTransport({
                host: testAccount.smtp.host,
                port: testAccount.smtp.port,
                secure: testAccount.smtp.secure,
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass
                }
            });

            console.log('✅ Using Ethereal Email test account (auto-generated)');
        }

        return cachedTransporter;
    } catch (err) {
        console.error('❌ Error setting up transporter:', err.message);
        throw err;
    }
};

const sendOTPEmail = async (email, otp, name) => {
    try {
        const transporter = await getTransporter();

        const mailOptions = {
            from: process.env.EMAIL_USER || 'trips@example.com',
            to: email,
            subject: '🔐 Your OTP Verification Code - Trip Planner',
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; border-radius: 10px;">
                    <div style="background: white; border-radius: 10px; padding: 40px; text-align: center;">
                        <div style="margin-bottom: 30px;">
                            <div style="display: inline-block; width: 60px; height: 60px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 30px; margin-bottom: 20px;">🔐</div>
                            <h2 style="color: #333; margin: 0 0 10px 0; font-size: 28px;">OTP Verification</h2>
                            <p style="color: #666; margin: 0; font-size: 16px;">Your security code for Trip Planner</p>
                        </div>
                        
                        <p style="color: #555; margin: 20px 0; font-size: 16px;">Hi <strong>${name}</strong>,</p>
                        
                        <p style="color: #666; margin: 20px 0; font-size: 14px;">Your one-time password (OTP) for verification is:</p>
                        
                        <div style="background: #f5f5f5; border: 2px solid #667eea; border-radius: 8px; padding: 20px; margin: 30px 0;">
                            <div style="font-size: 48px; font-weight: bold; color: #667eea; letter-spacing: 10px; font-family: 'Courier New', monospace;">${otp}</div>
                        </div>
                        
                        <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; text-align: left;">
                            <p style="color: #856404; margin: 0; font-size: 14px;"><strong>⏱️ Expires in:</strong> 5 minutes</p>
                            <p style="color: #856404; margin: 5px 0 0 0; font-size: 14px;"><strong>⚠️ Important:</strong> Do not share this code with anyone!</p>
                        </div>
                        
                        <p style="color: #999; margin: 30px 0 0 0; font-size: 12px; border-top: 1px solid #eee; padding-top: 20px;">If you didn't request this code, please ignore this email.</p>
                    </div>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);

        // Log OTP to console in development
        console.log(`
╔════════════════════════════════════════════════════════════╗
║                  🔐 OTP VERIFICATION CODE                  ║
╚════════════════════════════════════════════════════════════╝
To: ${email}
User: ${name}

📧 OTP EMAIL DETAILS:
   Recipient: ${email}
   OTP Code: ${otp}
   Valid for: 5 minutes
   
📨 Preview: ${nodemailer.getTestMessageUrl(info) || 'Email sent successfully'}

════════════════════════════════════════════════════════════
        `);

        console.log(`✅ OTP email sent successfully to ${email}`);
        return true;

    } catch (err) {
        console.error('❌ Error in sendOTPEmail:', err.message);
        console.warn('⚠️  Email sending failed, but OTP is still valid in database');

        // Log fallback OTP for debugging
        console.log(`
╔════════════════════════════════════════════════════════════╗
║              ⚠️  FALLBACK OTP (Email Failed)              ║
╚════════════════════════════════════════════════════════════╝
Email: ${email}
Name: ${name}
OTP Code: ${otp}
Valid for: 5 minutes
════════════════════════════════════════════════════════════
        `);

        return true; // Allow registration to proceed even if email fails
    }
};

module.exports = {
    generateOTP,
    sendOTPEmail
};
