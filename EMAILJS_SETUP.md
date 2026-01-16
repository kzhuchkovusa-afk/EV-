# EmailJS Setup Guide - Florida Build Group

## 📧 Email Integration for Contact Form

This guide will help you set up EmailJS to receive form submissions at **floridabuildgroup@gmail.com**

---

## ⚡ Quick Setup (5 minutes)

### Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click **"Sign Up Free"**
3. Create account with your email (can use floridabuildgroup@gmail.com)
4. Verify your email address

### Step 2: Add Email Service

1. After login, go to **"Email Services"** tab
2. Click **"Add New Service"**
3. Choose **Gmail** (recommended)
4. Click **"Connect Account"**
5. Sign in with **floridabuildgroup@gmail.com**
6. Grant permissions to EmailJS
7. **Copy the Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template

1. Go to **"Email Templates"** tab
2. Click **"Create New Template"**
3. Replace the default template with this:

```
Subject: New Lead from Florida Build Group Website

Hello,

You have received a new inspection request from your website!

--------------------------------------------------
CUSTOMER DETAILS:
--------------------------------------------------
Name:     {{from_name}}
Email:    {{from_email}}
Phone:    {{from_phone}}
Address:  {{from_address}}

--------------------------------------------------
MESSAGE:
--------------------------------------------------
{{message}}

--------------------------------------------------

Please respond to this customer within 24 hours.

Reply directly to: {{reply_to}}

---
Florida Build Group - Turnkey Painting
Automated email via EmailJS
```

4. Click **"Save"**
5. **Copy the Template ID** (e.g., `template_xyz789`)

### Step 4: Get Public Key

1. Go to **"Account"** → **"General"**
2. Find **"Public Key"** section
3. **Copy your Public Key** (e.g., `user_ABC123xyz`)

### Step 5: Update Website Code

1. Open `js/main.js` in your code editor
2. Find lines 6-8 and replace with your credentials:

```javascript
const EMAILJS_SERVICE_ID = 'service_abc123';  // Your Service ID
const EMAILJS_TEMPLATE_ID = 'template_xyz789'; // Your Template ID
const EMAILJS_PUBLIC_KEY = 'user_ABC123xyz';   // Your Public Key
```

3. Save the file
4. Upload to your server or commit to GitHub

---

## ✅ Testing

### Test Form Submission:

1. Open your website
2. Fill out the contact form
3. Click "Request Free Inspection"
4. Check **floridabuildgroup@gmail.com** inbox
5. You should receive an email within seconds!

### Troubleshooting:

**Problem:** "EmailJS not configured" error
- **Solution:** Make sure you replaced all three credentials in `js/main.js`

**Problem:** Email not arriving
- **Solution:** 
  - Check EmailJS dashboard for error logs
  - Verify Gmail service is connected
  - Check spam folder
  - Ensure template variables match: `{{from_name}}`, `{{from_email}}`, etc.

**Problem:** "Failed to send" error
- **Solution:**
  - Verify Service ID and Template ID are correct
  - Check EmailJS account is verified
  - Ensure monthly email limit not exceeded (200 emails/month on free plan)

---

## 📊 EmailJS Dashboard

Monitor your form submissions:
- **Email Services:** https://dashboard.emailjs.com/admin
- **Email Templates:** https://dashboard.emailjs.com/admin/templates
- **Email History:** https://dashboard.emailjs.com/admin/history

---

## 🎯 Free Plan Limits

EmailJS free plan includes:
- ✅ **200 emails per month**
- ✅ Unlimited templates
- ✅ Multiple email services
- ✅ Email history for 30 days

For higher volume, upgrade to:
- **Personal Plan:** $15/month (1,000 emails)
- **Professional Plan:** $40/month (5,000 emails)

---

## 🔒 Security Notes

1. **Public Key is safe to expose** - It's meant to be used in frontend code
2. **Gmail credentials are NOT exposed** - EmailJS handles authentication
3. **Rate limiting** - EmailJS prevents spam with built-in protection
4. **Email validation** - Form validates email format before sending

---

## 📧 Email Template Variables

Available variables in your template:

| Variable | Description | Example |
|----------|-------------|---------|
| `{{from_name}}` | Customer's name | John Smith |
| `{{from_email}}` | Customer's email | john@example.com |
| `{{from_phone}}` | Customer's phone | (305) 555-0123 |
| `{{from_address}}` | Property address | 123 Main St, Miami |
| `{{message}}` | Customer's message | I need exterior painting |
| `{{to_email}}` | Your email | floridabuildgroup@gmail.com |
| `{{reply_to}}` | Reply-to address | john@example.com |

---

## 🎨 Customize Email Template

You can customize the email template in EmailJS dashboard:

### Add Your Logo:
```html
<img src="YOUR_LOGO_URL" alt="Florida Build Group" width="200">
```

### Add Styling:
```html
<div style="font-family: Arial, sans-serif; color: #333;">
  <h2 style="color: #FF6B35;">New Lead from Website</h2>
  <!-- Your content here -->
</div>
```

### Add Auto-Reply:
1. Create a second template for customer confirmation
2. Update code to send two emails:
   - One to you (floridabuildgroup@gmail.com)
   - One to customer (from_email)

---

## 🔄 Optional: Google Sheets Integration

If you also want to save leads to Google Sheets:

1. Keep the Google Sheets setup from `GOOGLE_SHEETS_SETUP.md`
2. Add the Google Script URL to line 11 in `js/main.js`:
```javascript
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL';
```
3. Now you'll have **both** email notifications AND spreadsheet backup!

---

## 📞 Support

- **EmailJS Documentation:** https://www.emailjs.com/docs/
- **EmailJS Support:** support@emailjs.com
- **EmailJS Community:** https://github.com/emailjs/emailjs-sdk/discussions

---

## ✨ Benefits of EmailJS

✅ **No backend required** - Works with static websites  
✅ **Free tier included** - 200 emails/month free  
✅ **Reliable delivery** - 99.9% uptime  
✅ **Easy setup** - 5 minutes to configure  
✅ **Multiple providers** - Gmail, Outlook, SendGrid, etc.  
✅ **Spam protection** - Built-in rate limiting  
✅ **Email tracking** - Dashboard with delivery logs  

---

**Ready to receive leads! 🚀**

After setup, every form submission will instantly arrive at **floridabuildgroup@gmail.com**
