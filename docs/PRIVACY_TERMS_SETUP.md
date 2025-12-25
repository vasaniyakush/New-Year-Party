# Privacy Policy and Terms of Service Setup Guide

## Pages Created

✅ **Privacy Policy**: `/privacy-policy`  
✅ **Terms of Service**: `/terms-of-service`

Both pages are **public** (no authentication required) and accessible to everyone, as required by Google OAuth consent screen.

## Before Adding Links to Firebase

### Step 1: Update Contact Information

Edit these files and replace the placeholder text:

1. **`app/privacy-policy/page.tsx`**
   - Replace `[Add your contact email]` with your email
   - Replace `[Add your contact phone]` with your phone number

2. **`app/terms-of-service/page.tsx`**
   - Replace `[Add your contact email]` with your email
   - Replace `[Add your contact phone]` with your phone number

### Step 2: Customize Content (Optional)

Review and customize the content in both pages to match your specific needs:
- Add event-specific information
- Modify clauses as needed
- Add any additional legal requirements

### Step 3: Test Locally

1. Run `npm run dev`
2. Visit:
   - `http://localhost:3000/privacy-policy`
   - `http://localhost:3000/terms-of-service`
3. Verify the pages display correctly

## Adding Links to Firebase OAuth Consent Screen

### For Local Development (Testing)

If testing locally, use:
- Privacy Policy: `http://localhost:3000/privacy-policy`
- Terms of Service: `http://localhost:3000/terms-of-service`

### For Production

Once deployed, use your actual domain:
- Privacy Policy: `https://yourdomain.com/privacy-policy`
- Terms of Service: `https://yourdomain.com/terms-of-service`

### Steps in Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project
3. Navigate to **APIs & Services** → **OAuth consent screen**
4. Fill in:
   - **Application privacy policy link**: `https://yourdomain.com/privacy-policy`
   - **Application terms of service link**: `https://yourdomain.com/terms-of-service`
5. Click **Save and Continue**

## Footer Links

A footer has been added to all pages with links to:
- Privacy Policy
- Terms of Service

The footer appears at the bottom of every page (including login page).

## Verification Checklist

- [ ] Updated contact information in both pages
- [ ] Reviewed and customized content (if needed)
- [ ] Tested pages locally
- [ ] Deployed to production (if applicable)
- [ ] Added links to Google Cloud Console OAuth consent screen
- [ ] Verified links work in production

## Notes

- These pages are required by Google for OAuth consent screen
- They must be publicly accessible (no authentication)
- They should contain accurate contact information
- Update the "Last updated" date if you make significant changes

