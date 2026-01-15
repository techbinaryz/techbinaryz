# TechBinaryz - Full Stack Application

<div align="center">

![TechBinaryz Logo](https://via.placeholder.com/200x80/0066cc/ffffff?text=TechBinaryz)

**Modern Full Stack Application with Next.js, Fastify, and TypeScript**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15%2B-black.svg)](https://nextjs.org/)

</div>

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Quick Start](#quick-start)
- [Development Setup](#development-setup)
- [Production Deployment](#production-deployment)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## 🚀 Overview

TechBinaryz is a modern full-stack application built with cutting-edge technologies. It consists of three main components:

- **Client Application** - User-facing Next.js application
- **Admin Dashboard** - Administrative interface for content management
- **API Server** - Fastify-based backend with TypeScript

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client App    │    │  Admin Panel    │    │   API Server    │
│   (Next.js)     │    │   (Next.js)     │    │   (Fastify)     │
│   Port: 3000    │    │   Port: 3001    │    │   Port: 3003    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │  Nginx Proxy    │
                    │  (SSL/HTTPS)    │
                    └─────────────────┘
```

### Tech Stack

| Component           | Technology           | Purpose                            |
| ------------------- | -------------------- | ---------------------------------- |
| **Frontend**        | Next.js 15+          | Client application with SSR/SSG    |
| **Admin**           | Next.js 15+          | Administrative dashboard           |
| **Backend**         | Fastify + TypeScript | High-performance API server        |
| **Styling**         | Tailwind CSS         | Utility-first CSS framework        |
| **UI Components**   | Custom + shadcn/ui   | Reusable component library         |
| **Process Manager** | PM2                  | Production process management      |
| **Reverse Proxy**   | Nginx                | Load balancing and SSL termination |
| **SSL**             | Let's Encrypt        | Free SSL certificates              |

## ⚡ Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Local Development

```bash
# Clone the repository
git clone https://github.com/techbinaryz/techbinaryz.git
cd techbinaryz

# Install dependencies for all apps
npm run install:all

# Start all applications in development mode
npm run dev:all
```

**Access URLs:**

- Client: http://localhost:3000
- Admin: http://localhost:3001
- Server: http://localhost:3003

## 🛠️ Development Setup

### Individual App Setup

#### Client Application

```bash
cd client
npm install
npm run dev
```

#### Admin Dashboard

```bash
cd admin
npm install
npm run dev
```

#### API Server

```bash
cd server
npm install
npm run dev
```

### Available Scripts

| Script                | Description                       |
| --------------------- | --------------------------------- |
| `npm run dev:all`     | Start all apps in development     |
| `npm run build:all`   | Build all apps for production     |
| `npm run install:all` | Install dependencies for all apps |
| `npm run lint:all`    | Run linting for all apps          |
| `npm run test:all`    | Run tests for all apps            |

## 🚀 Production Deployment

### VPS Requirements

- **OS:** Ubuntu 20.04+ LTS
- **RAM:** 2GB minimum (4GB recommended)
- **Storage:** 20GB minimum
- **Domain:** `techbinaryz.in` with DNS access

### Deployment URLs

| Service    | URL                           | Port |
| ---------- | ----------------------------- | ---- |
| **Client** | https://techbinaryz.in        | 3000 |
| **Admin**  | https://admin.techbinaryz.in  | 3001 |
| **API**    | https://server.techbinaryz.in | 3003 |

---

## 📦 VPS Setup Guide

### 1. Initial Server Setup

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install essential packages
sudo apt install git nginx curl ufw -y

# Configure firewall
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable
```

### 2. Install Node.js & PM2

```bash
# Install Node.js LTS
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install nodejs -y

# Verify installation
node -v && npm -v

# Install PM2 globally
sudo npm install -g pm2

# Setup PM2 startup
pm2 startup
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u $USER --hp $HOME
pm2 save
```

### 3. Setup SSH for GitHub

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "techbinaryz-vps@$(hostname)"

# Display public key (add to GitHub)
cat ~/.ssh/id_ed25519.pub

# Test GitHub connection
ssh -T git@github.com
```

### 4. Clone & Deploy Repository

```bash
# Create apps directory
mkdir -p ~/apps && cd ~/apps

# Clone repository
git clone git@github.com:techbinaryz/techbinaryz.git
cd techbinaryz

# Deploy all applications
./scripts/deploy-all.sh
```

### 5. DNS Configuration

**Required DNS Records:**

| Type  | Name   | Value          | TTL |
| ----- | ------ | -------------- | --- |
| A     | @      | `YOUR_VPS_IP`  | 300 |
| A     | admin  | `YOUR_VPS_IP`  | 300 |
| A     | server | `YOUR_VPS_IP`  | 300 |
| CNAME | www    | techbinaryz.in | 300 |

**Verify DNS propagation:**

```bash
dig +short techbinaryz.in
dig +short admin.techbinaryz.in
dig +short server.techbinaryz.in
```

### 6. Nginx Configuration

```bash
# Create Nginx configuration
sudo tee /etc/nginx/sites-available/techbinaryz.in > /dev/null << 'EOF'
# Main website
server {
    server_name techbinaryz.in www.techbinaryz.in;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# Admin dashboard
server {
    server_name admin.techbinaryz.in;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# API server
server {
    server_name server.techbinaryz.in;

    location / {
        proxy_pass http://127.0.0.1:3003;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Enable site and test configuration
sudo ln -sf /etc/nginx/sites-available/techbinaryz.in /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 7. SSL Certificate Setup

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtain SSL certificates for all domains
sudo certbot --nginx -d techbinaryz.in -d www.techbinaryz.in -d admin.techbinaryz.in -d server.techbinaryz.in

# Setup automatic renewal
sudo crontab -e
# Add this line:
# 0 12 * * * /usr/bin/certbot renew --quiet
```

### 8. Deploy Applications

```bash
cd ~/apps/techbinaryz

# Deploy Server (Fastify)
cd server
npm install
npm run build
PORT=3003 pm2 start npm --name server -- start

# Deploy Client (Next.js)
cd ../client
npm install
npm run build
PORT=3000 pm2 start npm --name client -- start

# Deploy Admin (Next.js)
cd ../admin
npm install
npm run build
PORT=3001 pm2 start npm --name admin -- start

# Save PM2 configuration
pm2 save
```

### 9. One-Command Deployment Script

Create the deployment script:

```bash
# Create scripts directory
mkdir -p ~/apps/techbinaryz/scripts

# Create deployment script
cat > ~/apps/techbinaryz/scripts/deploy-all.sh << 'EOF'
#!/bin/bash
set -e

REPO_DIR="$HOME/apps/techbinaryz"
BRANCH="main"

echo "🚀 Starting deployment..."

# Update repository
echo "📥 Updating repository..."
cd "$REPO_DIR"
git fetch origin
git reset --hard origin/$BRANCH

# Deploy Server
echo "🔧 Deploying server..."
cd "$REPO_DIR/server"
npm install
npm run build
PORT=3003 pm2 restart server --update-env || PORT=3003 pm2 start npm --name server -- start

# Deploy Client
echo "🌐 Deploying client..."
cd "$REPO_DIR/client"
npm install
npm run build
PORT=3000 pm2 restart client --update-env || PORT=3000 pm2 start npm --name client -- start

# Deploy Admin
echo "⚙️ Deploying admin..."
cd "$REPO_DIR/admin"
npm install
npm run build
PORT=3001 pm2 restart admin --update-env || PORT=3001 pm2 start npm --name admin -- start

# Save PM2 state
pm2 save

echo "✅ Deployment completed successfully!"
echo "🌍 Live URLs:"
echo "   Client: https://techbinaryz.in"
echo "   Admin:  https://admin.techbinaryz.in"
echo "   Server: https://server.techbinaryz.in"
EOF

# Make script executable
chmod +x ~/apps/techbinaryz/scripts/deploy-all.sh
```

**Deploy anytime with:**

```bash
~/apps/techbinaryz/scripts/deploy-all.sh
```

## 🔧 Environment Variables

### Client (.env.local)

```bash
NEXT_PUBLIC_API_URL=https://server.techbinaryz.in
NEXT_PUBLIC_SITE_URL=https://techbinaryz.in
```

### Admin (.env.local)

```bash
NEXT_PUBLIC_API_URL=https://server.techbinaryz.in
NEXT_PUBLIC_ADMIN_URL=https://admin.techbinaryz.in
```

### Server (.env)

```bash
PORT=3003
NODE_ENV=production
CORS_ORIGIN=https://techbinaryz.in,https://admin.techbinaryz.in
```

## 📚 API Documentation

### Base URL

```
Production: https://server.techbinaryz.in
Development: http://localhost:3003
```

### Endpoints

#### Health Check

```http
GET /health
```

**Response:**

```json
{
  "status": "healthy",
  "uptime": 12345.67,
  "timestamp": "2024-01-16T10:30:00.000Z"
}
```

#### Welcome

```http
GET /
```

**Response:**

```json
{
  "message": "Welcome to Tech Binaryz API!",
  "status": "Server is running",
  "timestamp": "2024-01-16T10:30:00.000Z"
}
```

## 🛠️ Management Commands

### PM2 Process Management

```bash
# View all processes
pm2 list

# View logs
pm2 logs client
pm2 logs admin
pm2 logs server

# Restart individual services
pm2 restart client
pm2 restart admin
pm2 restart server

# Stop all services
pm2 stop all

# Start all services
pm2 start all

# Monitor processes
pm2 monit
```

### Nginx Management

```bash
# Test configuration
sudo nginx -t

# Reload configuration
sudo systemctl reload nginx

# Restart Nginx
sudo systemctl restart nginx

# Check status
sudo systemctl status nginx
```

### SSL Certificate Management

```bash
# Check certificate status
sudo certbot certificates

# Renew certificates manually
sudo certbot renew

# Test renewal process
sudo certbot renew --dry-run
```

## 🐛 Troubleshooting

### Common Issues

#### 1. Port Already in Use

```bash
# Find process using port
sudo lsof -i :3000
sudo lsof -i :3001
sudo lsof -i :3003

# Kill process
sudo kill -9 <PID>
```

#### 2. SSL Certificate Issues

```bash
# Check DNS propagation
dig +short techbinaryz.in
nslookup techbinaryz.in

# Check certificate logs
sudo tail -f /var/log/letsencrypt/letsencrypt.log
```

#### 3. Nginx Configuration Issues

```bash
# Test configuration
sudo nginx -t

# Check error logs
sudo tail -f /var/log/nginx/error.log
```

#### 4. PM2 Process Issues

```bash
# Restart PM2
pm2 kill
pm2 resurrect

# Clear logs
pm2 flush
```

## 🔒 Security Best Practices

### Firewall Configuration

```bash
# Allow only necessary ports
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw deny 3000   # Block direct access to apps
sudo ufw deny 3001
sudo ufw deny 3003
```

### Nginx Security Headers

Add to your Nginx configuration:

```nginx
# Security headers
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ by TechBinaryz Team**

[Website](https://techbinaryz.in) • [Admin](https://admin.techbinaryz.in) • [API](https://server.techbinaryz.in)

</div>
