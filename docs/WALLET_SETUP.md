# Wallet System Documentation

## Overview

The wallet system allows users to send fake money to each other. Each user starts with $1000. Admins can add money to any user's wallet.

## Features

1. **User Wallets**
   - Each user gets a wallet with $1000 starting balance
   - Wallets are automatically created when a user signs up
   - Users can view their balance

2. **Send Money**
   - Users can send money to other users
   - Validations:
     - Cannot send to yourself
     - Cannot send more than your balance
     - Amount must be greater than 0
   - Uses Firestore transactions for atomicity

3. **Admin Functions**
   - Admins can add money to any user's wallet
   - Admins can add money to their own wallet too

## Firestore Structure

### Wallets Collection
```
wallets/{userId}
  - userId: string
  - balance: number
  - createdAt: timestamp
  - updatedAt: timestamp
```

## Firestore Rules

The rules allow:
- Users to read their own wallet
- Users to update their own wallet (for sending money - balance decreases)
- Users to update other wallets when balance increases (for receiving money)
- Users to create their own wallet

This design allows:
- ✅ Users to send money (their balance decreases, recipient's increases)
- ✅ Admins to add money to any wallet (balance increases)

## Security Considerations

1. **Balance Validation**: Client-side validation prevents sending more than balance, but server-side rules provide additional protection
2. **Transactions**: All money transfers use Firestore transactions to ensure atomicity
3. **Self-Send Prevention**: Users cannot send money to themselves
4. **Admin Checks**: Admin functions check user role client-side (additional server-side validation recommended for production)

## Usage

### For Users
1. Go to the Wallet page
2. Select a recipient from the dropdown
3. Enter the amount to send
4. Click "Send Money"

### For Admins
1. Go to the Wallet page
2. Scroll to the "Admin: Add Money" section
3. Select a user
4. Enter the amount to add
5. Click "Add Money"

## Starting Balance

New users automatically receive $1000 when their account is created. This happens in the `AuthContext` when a new user document is created.

## Future Enhancements

- Transaction history
- Request money feature
- Wallet-to-wallet transfers with QR codes
- Spending limits
- Admin dashboard for wallet management

