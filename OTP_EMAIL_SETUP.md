# OTP Email Setup Guide

## Overview
The Trip Planner application now includes OTP (One-Time Password) verification for registration and login via email. This guide will help you set up Gmail for sending OTP emails.

---

## Step 1: Enable 2-Factor Authentication (2FA) on Your Google Account

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Click on **"2-Step Verification"** in the left sidebar
3. Follow the prompts to enable 2FA
   - You'll need to verify your phone number
   - Follow the setup steps

---

## Step 2: Generate App Password

1. Go back to [Google Account Security](https://myaccount.google.com/security)
2. Scroll down and click on **"App passwords"**
3. Select:
   - **Device type**: Windows Computer (or your device)
   - **Google app**: Mail
4. Click **"Generate"**
5. Google will display a 16-character password like: `xxxx xxxx xxxx xxxx`
   - **Copy this entire password (remove spaces)**

---

## Step 3: Update .env File

Open `backend/.env` and update these lines:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=xxxxxxxxxxxxxxxx
```

**Replace:**
- `your-email@gmail.com` with your actual Gmail address
- `xxxxxxxxxxxxxxxx` with the 16-character app password you generated (without spaces)

### Example:
```env
EMAIL_USER=john.doe@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop
```

---

## Step 4: Restart Backend Server

```bash
cd backend
npm start
```

---

## How It Works

### Registration Flow:
1. User enters Name, Email, and Password → Clicks Register
2. System generates a 6-digit OTP
3. OTP is sent to the user's email with a beautiful HTML template
4. User receives email with OTP within seconds
5. User enters OTP on the verification screen
6. OTP is valid for **5 minutes only**
7. After verification, account is created

### Login Flow (for verified users):
1. User enters Email and Password → Clicks Login
2. System generates a 6-digit OTP
3. OTP is sent to the user's email
4. User enters OTP to complete login
5. User is logged in and redirected to Dashboard

### OTP Expiration:
- Default timeout: **5 minutes**
- If expired, user can click "Resend OTP"
- Clicking resend generates a new OTP and resets the 5-minute timer

---

## Email Template Features

The OTP email includes:
- ✅ Professional HTML design with gradient backgrounds
- ✅ Large 6-digit OTP display
- ✅ Clear expiration time (5 minutes)
- ✅ Security warnings
- ✅ Responsive design (works on mobile & desktop)

---

## Troubleshooting

### "OTP email not received"

**Check 1: Verify Credentials**
- Ensure EMAIL_USER and EMAIL_PASSWORD are correct in .env
- Restart the backend server after updating .env

**Check 2: Check Gmail Settings**
- Go to [Google Account Security](https://myaccount.google.com/security)
- Ensure 2FA is enabled
- Ensure App password is generated

**Check 3: Check Backend Logs**
- Look at the backend terminal for error messages
- Should see: `✅ OTP sent successfully to user@example.com`
- If error appears, check console output

**Check 4: Check Spam/Promotions**
- Check your Gmail Spam or Promotions folder
- Gmail may filter automated emails

### "Invalid app password"
- App passwords are different from your regular Gmail password
- Do NOT use your regular password
- Generate from: myaccount.google.com → Security → App passwords

### "SMTP Connection Error"
- Ensure 2FA is enabled
- Ensure app password was generated
- Ensure backend server was restarted after updating .env
- Wait a few seconds - app password activation might take time

---

## Testing

### Quick Test:
1. Open http://localhost:3004 (or your frontend port)
2. Click "Register" 
3. Fill in: Name, Email (your Gmail), Password
4. Click "Send OTP"
5. Check your email inbox within 10 seconds
6. Copy the OTP from the email
7. Paste into the verification screen
8. Should see "Success!" message

---

## Security Notes

⚠️ **Important:**
- ✅ OTP is never stored in plain text
- ✅ OTP expires after 5 minutes
- ✅ User must complete verification to activate account
- ✅ App password is safer than regular password (limited scope)
- ✅ Never share your app password
- ✅ Rotate app password periodically if exposed

---

## Additional Information

- **OTP Length**: 6 digits (100,000 - 999,999)
- **Expiration Time**: 5 minutes
- **Email Send Time**: ~1-5 seconds (depends on Google servers)
- **Resend Limit**: No limit (user can resend anytime)

---

## Production Deployment

For production use, consider:
1. Using SendGrid or Mailgun for better reliability
2. Using environment variables from cloud platform (AWS, Heroku, etc.)
3. Adding email rate limiting
4. Adding spam filtering
5. Using custom email templates

---

**Questions?** Check the console logs in backend terminal for detailed error messages.
