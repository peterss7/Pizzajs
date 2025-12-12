# setup.ps1
$ErrorActionPreference = "Stop"

Write-Host "Setting up frontend..." -ForegroundColor Cyan

# Assume you run this from the project root
if (Test-Path "frontend") {
    if (Test-Path "frontend\package.json") {
        Write-Host "frontend exists and has package.json (skipping Vite create)." -ForegroundColor Yellow
    } else {
        Write-Host "frontend folder exists but package.json is missing." -ForegroundColor Yellow
        Write-Host "Creating Vite app in the existing frontend folder..." -ForegroundColor Cyan
        Set-Location frontend
        npm create vite@latest . -- --template react-ts
        Set-Location ..
    }
} else {
    Write-Host "Creating Vite React+TS project in ./frontend ..." -ForegroundColor Cyan
    npm create vite@latest frontend -- --template react-ts
}

Set-Location frontend

Write-Host "Installing frontend dependencies..." -ForegroundColor Cyan
npm install

Write-Host "Installing React Router..." -ForegroundColor Cyan
npm install react-router-dom

Write-Host "Frontend setup complete." -ForegroundColor Green

