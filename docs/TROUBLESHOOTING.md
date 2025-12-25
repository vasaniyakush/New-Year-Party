# Troubleshooting Guide

## Issue: User Documents Not Appearing in Firestore

If you can log in but don't see user documents in the `users` collection, follow these steps:

### Step 1: Check Browser Console

1. Open your browser's Developer Tools (F12 or Cmd+Option+I)
2. Go to the **Console** tab
3. Sign in again
4. Look for these messages:
   - "Creating new user document for: [user-id]"
   - "User document created successfully"
   - Or any error messages

### Step 2: Verify Firestore Rules Are Published

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Firestore Database** → **Rules** tab
4. Verify the rules match what's in `firestore.rules` file
5. Click **Publish** if you see any changes
6. Rules should include:
   ```javascript
   match /users/{userId} {
     allow read: if request.auth != null && request.auth.uid == userId;
     allow write: if request.auth != null && request.auth.uid == userId;
   }
   ```

### Step 3: Check Firestore Database Mode

1. In Firebase Console → **Firestore Database**
2. Check if you see a banner saying "Test mode" or "Production mode"
3. If in **Test mode**, you need to either:
   - Switch to Production mode and set up proper rules
   - Or temporarily allow all reads/writes for testing:
     ```javascript
     match /users/{userId} {
       allow read, write: if request.auth != null;
     }
     ```
4. **Important**: Only use test mode rules for development!

### Step 4: Verify Database is Initialized

1. In Firebase Console → **Firestore Database**
2. Make sure the database is created (not just "Get started")
3. Check the **Data** tab - it should show collections (even if empty)

### Step 5: Check Network Tab

1. Open Developer Tools → **Network** tab
2. Filter by "firestore" or "googleapis"
3. Sign in again
4. Look for failed requests (red status codes)
5. Check the response for error messages

### Step 6: Manual Test

Try creating a document manually in Firebase Console:
1. Go to **Firestore Database** → **Data** tab
2. Click **Start collection**
3. Collection ID: `users`
4. Document ID: `test-user-id`
5. Add a field: `role` (string) = `basic`
6. If this works, the issue is with the code/rules, not the database

### Step 7: Verify Environment Variables

Make sure your `.env.local` file has all Firebase config values:
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

### Common Issues

**Issue**: "Permission denied" errors in console
- **Solution**: Firestore rules are blocking the write. Check Step 2 and Step 3.

**Issue**: No errors, but no documents created
- **Solution**: Check if `fetchUserRole` is being called. Look for console logs.

**Issue**: Database shows "Get started" instead of collections
- **Solution**: The database isn't initialized. Go to Firestore Database and click "Create database".

**Issue**: Rules are correct but still not working
- **Solution**: Make sure you clicked "Publish" after updating rules. Changes take a few seconds to propagate.

### Quick Fix: Temporarily Allow All Writes (Development Only)

If you need to test quickly, temporarily update your Firestore rules to:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null;
    }
    match /rsvps/{userId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

**⚠️ WARNING**: This is less secure. Only use for development/testing. Revert to proper rules before production.

### Still Not Working?

1. Check the browser console for specific error messages
2. Verify you're looking at the correct Firebase project
3. Try signing out and signing back in
4. Clear browser cache and try again
5. Check if you have multiple Firebase projects and are looking at the wrong one

