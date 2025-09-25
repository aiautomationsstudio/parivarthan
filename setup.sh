#!/bin/bash

echo "================================"
echo "Parivarthan Setup Script"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed!"
    exit 1
fi

echo "✅ npm version: $(npm -v)"

# Install dependencies
echo ""
echo "Installing dependencies..."
echo "This may take a few minutes..."
npm install

# Copy environment file
if [ ! -f .env ]; then
    echo ""
    echo "Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env file created"
fi

echo ""
echo "================================"
echo "✅ Setup Complete!"
echo "================================"
echo ""
echo "To start the application, run:"
echo "  npm start"
echo ""
echo "The app will open at http://localhost:3000"
echo ""
echo "Demo Credentials:"
echo "  Patient: patient1@gmail.com / patient123"
echo "  Doctor: psychiatrist@parivarthan.com / psych123"
echo "  Admin: admin@parivarthan.com / admin123"
echo ""
echo "For more accounts, check README.md"
echo "================================"
