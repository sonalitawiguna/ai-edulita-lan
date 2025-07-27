Write-Host "🚀 Edulita Insight - Pre-Deployment Check" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Function to print colored output
function Write-Status {
    param(
        [string]$Status,
        [string]$Message
    )
    
    switch ($Status) {
        "SUCCESS" { Write-Host "✅ $Message" -ForegroundColor Green }
        "WARNING" { Write-Host "⚠️  $Message" -ForegroundColor Yellow }
        "ERROR" { Write-Host "❌ $Message" -ForegroundColor Red }
        "INFO" { Write-Host "ℹ️  $Message" -ForegroundColor Blue }
    }
}

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Status "ERROR" "package.json not found. Please run this script from the project root directory."
    exit 1
}

Write-Status "INFO" "Starting pre-deployment checks..."

# 1. Check Node.js version
Write-Host ""
Write-Host "1. Checking Node.js version..."
try {
    $nodeVersion = node --version
    Write-Status "INFO" "Node.js version: $nodeVersion"
    
    if ($nodeVersion -like "v20*") {
        Write-Status "SUCCESS" "Node.js version is compatible with Vercel"
    } else {
        Write-Status "WARNING" "Recommended Node.js version is 20.x for optimal Vercel compatibility"
    }
} catch {
    Write-Status "ERROR" "Node.js is not installed or not in PATH"
    exit 1
}

# 2. Check npm version
Write-Host ""
Write-Host "2. Checking npm version..."
try {
    $npmVersion = npm --version
    Write-Status "INFO" "npm version: $npmVersion"
} catch {
    Write-Status "ERROR" "npm is not installed or not in PATH"
    exit 1
}

# 3. Check environment variables
Write-Host ""
Write-Host "3. Checking environment variables..."

if (Test-Path ".env.local") {
    Write-Status "SUCCESS" ".env.local file found"
    
    $envContent = Get-Content ".env.local" -Raw
    
    # Check for required environment variables
    if ($envContent -match "GOOGLE_GENERATIVE_AI_API_KEY") {
        $apiKeyLine = $envContent | Select-String "GOOGLE_GENERATIVE_AI_API_KEY" | Select-Object -First 1
        $apiKey = ($apiKeyLine -split "=")[1] -replace '"', '' -replace "'", ''
        
        if ($apiKey -eq "your-google-ai-api-key-here" -or [string]::IsNullOrWhiteSpace($apiKey)) {
            Write-Status "WARNING" "Google AI API key is not configured properly"
            Write-Status "INFO" "The application will run in demo mode without AI features"
        } else {
            Write-Status "SUCCESS" "Google AI API key is configured"
        }
    } else {
        Write-Status "WARNING" "GOOGLE_GENERATIVE_AI_API_KEY not found in .env.local"
    }
    
    if ($envContent -match "NEXT_PUBLIC_SUPABASE_URL") {
        Write-Status "SUCCESS" "Supabase URL is configured"
    } else {
        Write-Status "WARNING" "Supabase URL not found (optional for basic functionality)"
    }
} else {
    Write-Status "WARNING" ".env.local file not found"
    Write-Status "INFO" "Copy .env.local.example to .env.local and configure your environment variables"
}

# 4. Install dependencies
Write-Host ""
Write-Host "4. Installing dependencies..."
try {
    npm install
    Write-Status "SUCCESS" "Dependencies installed successfully"
} catch {
    Write-Status "ERROR" "Failed to install dependencies"
    exit 1
}

# 5. Run type checking
Write-Host ""
Write-Host "5. Running TypeScript type checking..."
try {
    $typeCheckResult = & npx tsc --noEmit 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Status "SUCCESS" "TypeScript type checking passed"
    } else {
        Write-Status "WARNING" "TypeScript type checking found issues (non-critical for deployment)"
    }
} catch {
    Write-Status "WARNING" "TypeScript type checking could not be run"
}

# 6. Run linting
Write-Host ""
Write-Host "6. Running ESLint..."
try {
    $lintResult = & npx next lint 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Status "SUCCESS" "Linting passed"
    } else {
        Write-Status "WARNING" "Linting found issues (non-critical for deployment)"
    }
} catch {
    Write-Status "WARNING" "Linting could not be run"
}

# 7. Test build
Write-Host ""
Write-Host "7. Testing production build..."
try {
    npm run build
    if ($LASTEXITCODE -eq 0) {
        Write-Status "SUCCESS" "Production build completed successfully"
    } else {
        Write-Status "ERROR" "Production build failed"
        exit 1
    }
} catch {
    Write-Status "ERROR" "Production build failed"
    exit 1
}

# 8. Check vercel.json configuration
Write-Host ""
Write-Host "8. Checking Vercel configuration..."
if (Test-Path "vercel.json") {
    Write-Status "SUCCESS" "vercel.json found"
    
    $vercelConfig = Get-Content "vercel.json" -Raw
    if ($vercelConfig -match "nodejs20.x") {
        Write-Status "SUCCESS" "Correct Node.js runtime specified (nodejs20.x)"
    } else {
        Write-Status "WARNING" "Node.js runtime might not be optimal for Vercel"
    }
} else {
    Write-Status "WARNING" "vercel.json not found (will use default Vercel settings)"
}

# 9. Check for required files
Write-Host ""
Write-Host "9. Checking required files..."

$requiredFiles = @(
    "app/layout.tsx",
    "app/page.tsx",
    "components/chatbot/chatbot.tsx",
    "app/api/check-api-key/route.ts",
    "app/api/generate-ai-response/route.ts"
)

foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Status "SUCCESS" "$file exists"
    } else {
        Write-Status "ERROR" "$file is missing"
        exit 1
    }
}

# 10. Final summary
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Status "SUCCESS" "Pre-deployment check completed!"
Write-Host ""
Write-Status "INFO" "Next steps:"
Write-Host "  1. Ensure your environment variables are set in Vercel dashboard"
Write-Host "  2. Run: npm run deploy or vercel --prod"
Write-Host "  3. Test the deployed application"
Write-Host ""
Write-Status "INFO" "Environment variables to set in Vercel:"
Write-Host "  - GOOGLE_GENERATIVE_AI_API_KEY (required for AI features)"
Write-Host "  - NEXT_PUBLIC_SUPABASE_URL (optional)"
Write-Host "  - NEXT_PUBLIC_SUPABASE_ANON_KEY (optional)"
Write-Host ""
Write-Status "SUCCESS" "Ready for deployment! 🚀"
