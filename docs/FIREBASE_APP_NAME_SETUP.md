# How to Change the App Name in Google Sign-In Popup

The app name shown in the Google sign-in popup (currently showing "new-year-33d29.firebaseapp.com") is controlled by your Firebase project's OAuth consent screen settings.

## Steps to Change the App Name

### Method 1: Via Firebase Console (Easier)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (`new-year-33d29`)
3. Click on the **⚙️ Settings** (gear icon) in the left sidebar
4. Select **Project settings**
5. Scroll down to the **Your apps** section
6. Find your web app and click on it
7. Look for **App nickname** or **Public-facing name** field
8. Change it to something like "New Year Party" or "New Year Party 2025"
9. Click **Save**

### Method 2: Via Google Cloud Console (More Control)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project (`new-year-33d29`)
3. Navigate to **APIs & Services** → **OAuth consent screen** in the left sidebar
4. You'll see the **App name** field
5. Change it from "new-year-33d29" to "New Year Party" (or your preferred name)
6. You may also want to update:
   - **User support email**: Your email
   - **App logo**: Upload a logo (optional)
   - **Application home page**: Your website URL (e.g., `https://yourdomain.com`)
   - **Application privacy policy link**: `https://yourdomain.com/privacy-policy`
     - *Note: We've created a privacy policy page at `/privacy-policy` - update it with your details*
   - **Application terms of service link**: `https://yourdomain.com/terms-of-service`
     - *Note: We've created a terms of service page at `/terms-of-service` - update it with your details*
7. Click **Save and Continue**
8. Complete any remaining steps if prompted

### Important Notes

- The changes may take a few minutes to propagate
- Users may need to clear their browser cache or sign out and sign back in to see the new name
- The app name will appear in the Google sign-in popup when users authenticate

### Verification

After making changes:
1. Sign out of your app
2. Clear browser cache (or use incognito mode)
3. Try signing in again
4. The Google sign-in popup should now show your custom app name instead of "new-year-33d29.firebaseapp.com"

## Privacy Policy and Terms of Service Pages

We've created template pages for Privacy Policy and Terms of Service:

- **Privacy Policy**: Available at `/privacy-policy` (e.g., `https://yourdomain.com/privacy-policy`)
- **Terms of Service**: Available at `/terms-of-service` (e.g., `https://yourdomain.com/terms-of-service`)

### Before Deploying:

1. **Update Contact Information**: 
   - Edit both pages and replace `[Add your contact email]` and `[Add your contact phone]` with your actual contact details
   - Files to edit:
     - `app/privacy-policy/page.tsx`
     - `app/terms-of-service/page.tsx`

2. **Customize Content** (Optional):
   - Review and customize the privacy policy and terms of service content to match your specific needs
   - Add any additional clauses or information relevant to your event

3. **Add Links to Your Site**:
   - Consider adding footer links to these pages in your main layout
   - These pages are public (no authentication required) as required by OAuth consent screen

### For Local Development:

If testing locally, use:
- Privacy Policy: `http://localhost:3000/privacy-policy`
- Terms of Service: `http://localhost:3000/terms-of-service`

*Note: For production, replace `localhost:3000` with your actual domain.*

