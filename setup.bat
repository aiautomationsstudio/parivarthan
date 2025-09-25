@echo off
echo ================================
echo Parivarthan Setup Script
echo ================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo X Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo √ Node.js version: 
node -v

REM Check if npm is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo X npm is not installed!
    pause
    exit /b 1
)

echo √ npm version: 
npm -v

REM Install dependencies
echo.
echo Installing dependencies...
echo This may take a few minutes...
call npm install

REM Copy environment file
if not exist .env (
    echo.
    echo Creating .env file from template...
    copy .env.example .env >nul
    echo √ .env file created
)

echo.
echo ================================
echo √ Setup Complete!
echo ================================
echo.
echo To start the application, run:
echo   npm start
echo.
echo The app will open at http://localhost:3000
echo.
echo Demo Credentials:
echo   Patient: patient1@gmail.com / patient123
echo   Doctor: psychiatrist@parivarthan.com / psych123
echo   Admin: admin@parivarthan.com / admin123
echo.
echo For more accounts, check README.md
echo ================================
pause
