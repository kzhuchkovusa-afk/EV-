# 📊 Facebook Pixel Integration Guide

## ✅ What's Already Done

Your website now has **Facebook Pixel** (ID: 1409051684286127) fully integrated and tracking the following events:

### 1️⃣ **PageView Event** (Automatic)
- Tracks every page load
- Location: `<head>` section of `index.html`

### 2️⃣ **Lead Event** (On Form Submission)
- Tracks when someone submits the contact form
- Triggers on successful form submission
- Includes additional data:
  - `content_name`: 'Free Inspection Request'
  - `content_category`: 'Turnkey Painting'
  - `value`: 0
  - `currency`: 'USD'

---

## 🎯 What Gets Tracked

### When a visitor lands on your site:
```javascript
fbq('track', 'PageView');
```
✅ Facebook records the page visit

### When someone submits the contact form:
```javascript
fbq('track', 'Lead', {
    content_name: 'Free Inspection Request',
    content_category: 'Turnkey Painting',
    value: 0,
    currency: 'USD'
});
```
✅ Facebook records a Lead conversion

---

## 📈 How to View Your Data

### In Facebook Events Manager:

1. Go to [Facebook Events Manager](https://business.facebook.com/events_manager2)
2. Select your Pixel (ID: 1409051684286127)
3. Click on **"Test Events"** tab to see live activity
4. Submit a form on your website to see the Lead event appear in real-time

### What You'll See:

- **PageView**: Every time someone visits your site
- **Lead**: Every time someone submits the contact form

---

## 🎨 Optimize Your Facebook Ads

With this tracking in place, you can now:

### 1. Create Custom Audiences
- Website visitors
- People who submitted the form (Leads)

### 2. Create Lookalike Audiences
- Find people similar to your leads

### 3. Optimize Your Campaigns
- Use "Lead" as your conversion objective
- Let Facebook optimize for people likely to submit forms

### 4. Track ROI
- See exactly how many leads came from Facebook ads
- Calculate cost per lead

---

## 🔍 Testing Your Pixel

### Method 1: Facebook Pixel Helper (Chrome Extension)

1. Install [Facebook Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)
2. Visit your website
3. Click the extension icon
4. You should see:
   - ✅ PageView event fired
5. Submit the form
6. You should see:
   - ✅ Lead event fired

### Method 2: Events Manager Test Events

1. Go to Events Manager → Test Events
2. Open your website
3. Submit the form
4. Check Events Manager - you should see both events appear

---

## 📝 Event Details

### PageView Event
```javascript
Event: PageView
Status: Active
Location: index.html <head> section
Fires: On page load
```

### Lead Event
```javascript
Event: Lead
Status: Active
Location: js/main.js (line ~148)
Fires: After successful form submission
Parameters:
  - content_name: 'Free Inspection Request'
  - content_category: 'Turnkey Painting'
  - value: 0 (you can update this if you assign value to leads)
  - currency: 'USD'
```

---

## 🎯 Facebook Ads Campaign Setup

### Create a Lead Generation Campaign:

1. **Campaign Objective**: Choose "Leads" or "Conversions"
2. **Pixel**: Select your pixel (1409051684286127)
3. **Conversion Event**: Select "Lead"
4. **Optimization**: Optimize for Lead events
5. **Budget**: Set your daily/lifetime budget
6. **Audience**: Target Miami + surrounding areas
7. **Ad Creative**: Showcase M-SEQUA™ technology and before/after photos

### Recommended Ad Copy Structure:
- Hook: "Transform Your Miami Home with No Mess, No Stress"
- Value: "M-SEQUA™ Technology - 2-3x faster, zero dust"
- CTA: "Get Free Inspection" → links to your website

---

## 💡 Advanced Tracking (Optional)

Want to track more events? You can add:

### Track Button Clicks:
```javascript
// Add to any CTA button
document.querySelector('.btn-primary').addEventListener('click', function() {
    if (typeof fbq !== 'undefined') {
        fbq('trackCustom', 'CTAClick', {
            button_text: this.textContent
        });
    }
});
```

### Track Scroll Depth:
```javascript
// Track when users scroll 75% of the page
let scrollTracked = false;
window.addEventListener('scroll', function() {
    const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    if (scrollPercent > 75 && !scrollTracked) {
        if (typeof fbq !== 'undefined') {
            fbq('trackCustom', 'DeepScroll');
        }
        scrollTracked = true;
    }
});
```

---

## 🔒 Privacy & Compliance

Your Facebook Pixel implementation:
- ✅ Loads asynchronously (doesn't slow down site)
- ✅ Includes noscript fallback for users with JavaScript disabled
- ✅ Tracks anonymously (no PII sent to Facebook)

### Optional: Add Privacy Notice

Consider adding to your website:
- Cookie consent banner
- Privacy Policy mentioning Facebook tracking
- Link in footer: "Privacy Policy"

---

## 🆘 Troubleshooting

### Issue: Pixel not firing
**Solution**: 
- Check browser console for errors
- Ensure Facebook Pixel Helper shows green icon
- Verify Pixel ID is correct (1409051684286127)

### Issue: Lead event not tracking
**Solution**:
- Open browser console (F12)
- Submit form
- Look for: "Facebook Pixel: Lead event tracked"
- If missing, check `js/main.js` integration

### Issue: Events delayed in Events Manager
**Solution**:
- This is normal - events can take 15-30 minutes to appear
- Use "Test Events" tab for real-time testing

---

## 📊 Success Metrics to Track

Monitor these in Facebook Events Manager:

1. **PageView Rate**: How many people visit your site
2. **Lead Conversion Rate**: % of visitors who submit form
3. **Cost Per Lead**: Total ad spend ÷ number of leads
4. **Return on Ad Spend (ROAS)**: Revenue ÷ ad spend

---

## ✅ Quick Checklist

- ✅ Facebook Pixel installed in `<head>`
- ✅ PageView event tracking
- ✅ Lead event tracking on form submission
- ✅ Event parameters configured
- ✅ Console logging for debugging
- ✅ Ready for Facebook Ads campaigns

---

## 🚀 Next Steps

1. **Test Your Pixel**: Submit a test form and verify in Events Manager
2. **Create Audiences**: Set up custom audiences for website visitors
3. **Launch Campaigns**: Create Facebook ad campaigns optimized for Leads
4. **Monitor Performance**: Check Events Manager daily for the first week
5. **Optimize**: Adjust targeting and creative based on performance data

---

**Your Facebook Pixel is live and tracking! 🎉**

All lead submissions will now be tracked in Facebook, allowing you to optimize your ad campaigns and measure ROI accurately.