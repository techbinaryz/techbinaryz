# TechBinaryz Server

Backend server for TechBinaryz with secure admin authentication system.

## Features

- **Single Admin Role**: Simplified authentication with only admin role
- **Two-Factor Authentication (2FA)**: OTP-based email verification
- **Security Features**:
  - Password hashing with bcrypt (12 rounds)
  - JWT-based authentication
  - Refresh token rotation
  - IP-based brute force protection
  - Failed login attempt tracking
  - Automatic IP blocking after repeated failures
- **Email Notifications**: OTP and welcome emails via Nodemailer
- **MongoDB**: Database with Mongoose ODM
- **Rate Limiting**: Built-in request rate limiting
- **Security Headers**: Helmet.js integration

## Prerequisites

- Node.js 20+ 
- MongoDB 6+
- SMTP server for emails (Gmail, SendGrid, etc.)

## Setup

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Configure environment**:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and set your values:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Strong secret for JWT signing
   - `EMAIL_*`: SMTP server configuration

3. **Start MongoDB** (if running locally):
   ```bash
   mongod
   ```

## Development

```bash
pnpm dev
```

Server will start on `http://localhost:3000`

## Build & Production

```bash
# Build
pnpm build

# Start production server
pnpm start
```

## API Endpoints

### Authentication

#### 1. Send OTP (for Registration)
```http
POST /auth/send-otp
Content-Type: application/json

{
  "email": "admin@example.com"
}
```

Response:
```json
{
  "success": true,
  "message": "OTP sent to your email."
}
```

#### 2. Register Admin
```http
POST /auth/register
Content-Type: application/json

{
  "full_name": "John Doe",
  "email": "admin@example.com",
  "password": "SecurePassword123!",
  "otp": "123456"
}
```

Response:
```json
{
  "success": true,
  "message": "Admin account created successfully.",
  "access_token": "eyJhbGc...",
  "refresh_token": "a1b2c3d4..."
}
```

#### 3. Login (Step 1 - Credentials)
```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "SecurePassword123!"
}
```

Response:
```json
{
  "success": true,
  "message": "Credentials verified. OTP sent to your email.",
  "requires_otp": true
}
```

#### 4. Login Verify (Step 2 - OTP)
```http
POST /auth/login/verify
Content-Type: application/json

{
  "email": "admin@example.com",
  "otp": "123456"
}
```

Response:
```json
{
  "success": true,
  "message": "Login successful.",
  "access_token": "eyJhbGc...",
  "refresh_token": "a1b2c3d4...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "first_name": "John",
    "last_name": "Doe",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

#### 5. Refresh Token
```http
POST /auth/refresh
Content-Type: application/json

{
  "refresh_token": "a1b2c3d4..."
}
```

Response:
```json
{
  "success": true,
  "access_token": "eyJhbGc...",
  "refresh_token": "e5f6g7h8..."
}
```

#### 6. Logout
```http
POST /auth/logout
Content-Type: application/json

{
  "refresh_token": "a1b2c3d4..."
}
```

Response:
```json
{
  "success": true,
  "message": "Logged out successfully."
}
```

### Protected Routes

All protected routes require the `Authorization` header:

```http
Authorization: Bearer <access_token>
```

#### Get Current User
```http
GET /me
Authorization: Bearer eyJhbGc...
```

Response:
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "first_name": "John",
    "last_name": "Doe",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

## Security Features

### Password Requirements
- Minimum length handled by client
- Hashed with bcrypt (12 rounds)
- Never stored in plain text

### Brute Force Protection
- **5 failed attempts**: IP blocked for 15 minutes
- **10 failed attempts**: IP blocked for 1 hour
- Automatic cleanup of old attempts

### OTP Security
- **Hashed storage**: OTPs stored as SHA-256 hashes
- **Single use**: Consumed after successful verification
- **Expiry**: 10 minutes (configurable)
- **Attempt limit**: Max 5 wrong attempts per OTP
- **Auto-burn**: OTP invalidated after max attempts

### Token Security
- **Access tokens**: Short-lived (15 minutes)
- **Refresh tokens**: Rotate on each use
- **Token family tracking**: Detect token theft
- **Automatic revocation**: On logout or rotation

## Database Models

### User
- first_name, last_name, email, password (hashed)
- role: "admin" (only)
- account_status: active/deactivated/deleted/suspicious
- is_email_verified

### OTP
- email, otp (hashed), purpose, expires_at
- is_used, attempts
- Auto-expires after time limit

### RefreshToken
- token, user_id, family_id
- expires_at, is_revoked, replaced_by
- Auto-expires after 7 days

### BlockedIp
- ip, email, blocked_until
- Auto-expires after block period

### FailedLoginAttempt
- ip, email, created_at
- Tracks failed login attempts

## Gmail SMTP Setup

For Gmail, you need an **App Password**:

1. Enable 2FA on your Google account
2. Go to Google Account > Security > App passwords
3. Generate an app password
4. Use in `.env`:
   ```
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   ```

## Type Checking

```bash
pnpm typecheck
```

## Project Structure

```
src/
├── config/
│   ├── database.ts       # MongoDB connection
│   └── env.ts            # Environment configuration
├── models/
│   ├── user.model.ts
│   ├── otp.model.ts
│   ├── refresh-token.model.ts
│   ├── blocked-ip.model.ts
│   └── failed-login-attempt.model.ts
├── modules/
│   └── auth/
│       ├── auth.handler.ts      # Route registrations
│       ├── auth.internal.ts     # Auth utilities
│       ├── send-otp.ts
│       ├── register.ts
│       ├── login.ts
│       ├── login-verify.ts
│       ├── refresh.ts
│       └── logout.ts
├── plugins/
│   └── authenticate.ts          # JWT verification plugin
├── utils/
│   ├── email.service.ts         # Email sending
│   └── http-helpers.ts          # HTTP utilities
├── app.ts                       # Fastify app setup
└── server.ts                    # Server entry point
```

## License

Private - TechBinaryz
