# Admin Role Setup Guide

## How to Give a User Admin Role

### Method 1: Using Firebase Console (Recommended)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Firestore Database** in the left sidebar
4. Click on the **users** collection
5. Find the user document (document ID is the user's Firebase UID)
   - If you don't know the UID, you can find it in the **Authentication** section
6. Click on the user document
7. Click **Edit document** (pencil icon)
8. Find the `role` field and change its value from `"basic"` to `"admin"`
9. Click **Update**

### Method 2: Finding User UID

If you need to find a user's UID:

1. Go to **Authentication** in Firebase Console
2. Click on **Users** tab
3. Find the user by email
4. The UID is displayed in the user's row
5. Copy this UID and use it to find the document in the `users` collection

### Method 3: Using Firebase CLI (Advanced)

If you have Firebase CLI installed:

```bash
firebase firestore:set users/USER_UID '{ "role": "admin" }' --project YOUR_PROJECT_ID
```

Replace:
- `USER_UID` with the user's Firebase Authentication UID
- `YOUR_PROJECT_ID` with your Firebase project ID

## Verifying Admin Role

After setting the admin role:
1. The user needs to sign out and sign back in for the role to be reflected
2. The `userRole` in the AuthContext will be `'admin'` instead of `'basic'`

## Default Behavior

- All new users are automatically created with `role: "basic"`
- Users can read their own user document
- Admins can read all user documents (for future admin features)

