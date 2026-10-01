@echo off
title ProSearch Launcher
echo ===========================================
echo       ProSearch Application Launcher
echo ===========================================
echo.

echo Checking backend dependencies...
cd backend
call npm install --silent
cd ..

echo Checking frontend dependencies...
cd frontend
call npm install --silent
cd ..

echo.
echo Starting Backend Server on Port 5000...
start "ProSearch Backend" cmd /k "cd backend && npm run dev"

echo Starting Frontend Server on Port 5173...
start "ProSearch Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ===========================================
echo   All servers are starting up!
echo   Frontend will be at: http://localhost:5173
echo   (Keep the new command windows open)
echo ===========================================
echo.
pause
