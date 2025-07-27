#!/bin/bash

echo "🚀 Edulita Insight - Pre-Deployment Check"
echo "========================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    local status=$1
    local message=$2
    case $status in
        "SUCCESS") echo -e "${GREEN}✅ $message${NC}" ;;
        "WARNING") echo -e "${YELLOW}⚠️  $message${NC}" ;;
        "ERROR") echo -e "${RED}❌ $message${NC}" ;;
        "INFO") echo -e "${BLUE}ℹ️  $message${NC}" ;;
    esac
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_status "ERROR" "package.json not found. Please run this script from the project root directory."
    exit 1
fi

print_status "INFO" "Starting pre-deployment checks..."

# 1. Check Node.js version
echo ""
echo "1. Checking Node.js version..."
NODE_VERSION=$(node --version)
print_status "INFO" "Node.js version: $NODE_VERSION"

if [[ $NODE_VERSION == v2* ]]; then
    print_status "SUCCESS" "Node.js version is compatible with Vercel"
else
    print_status "WARNING" "Recommended Node.js version is 20.x for optimal Vercel compatibility"
fi

# 2. Check npm version
echo ""
echo "2. Checking npm version..."
NPM_VERSION=$(npm --version)
print_status "INFO" "npm version: $NPM_VERSION"

# 3. Check environment variables
echo ""
echo "3. Checking environment variables..."

if [ -f ".env.local" ]; then
    print_status "SUCCESS" ".env.local file found"
    
    # Check for required environment variables
    if grep -q "GOOGLE_GENERATIVE_AI_API_KEY" .env.local; then
        API_KEY=$(grep "GOOGLE_GENERATIVE_AI_API_KEY" .env.local | cut -d '=' -f2 | tr -d '"' | tr -d "'")
        if [ "$API_KEY" = "your-google-ai-api-key-here" ] || [ -z "$API_KEY" ]; then
            print_status "WARNING" "Google AI API key is not configured properly"
            print_status "INFO" "The application will run in demo mode without AI features"
        else
            print_status "SUCCESS" "Google AI API key is configured"
        fi
    else
        print_status "WARNING" "GOOGLE_GENERATIVE_AI_API_KEY not found in .env.local"
    fi
    
    if grep -q "NEXT_PUBLIC_SUPABASE_URL" .env.local; then
        print_status "SUCCESS" "Supabase URL is configured"
    else
        print_status "WARNING" "Supabase URL not found (optional for basic functionality)"
    fi
else
    print_status "WARNING" ".env.local file not found"
    print_status "INFO" "Copy .env.local.example to .env.local and configure your environment variables"
fi

# 4. Install dependencies
echo ""
echo "4. Installing dependencies..."
if npm install; then
    print_status "SUCCESS" "Dependencies installed successfully"
else
    print_status "ERROR" "Failed to install dependencies"
    exit 1
fi

# 5. Run type checking
echo ""
echo "5. Running TypeScript type checking..."
if npm run type-check 2>/dev/null || npx tsc --noEmit; then
    print_status "SUCCESS" "TypeScript type checking passed"
else
    print_status "WARNING" "TypeScript type checking found issues (non-critical for deployment)"
fi

# 6. Run linting
echo ""
echo "6. Running ESLint..."
if npm run lint 2>/dev/null || npx next lint; then
    print_status "SUCCESS" "Linting passed"
else
    print_status "WARNING" "Linting found issues (non-critical for deployment)"
fi

# 7. Test build
echo ""
echo "7. Testing production build..."
if npm run build; then
    print_status "SUCCESS" "Production build completed successfully"
else
    print_status "ERROR" "Production build failed"
    exit 1
fi

# 8. Check vercel.json configuration
echo ""
echo "8. Checking Vercel configuration..."
if [ -f "vercel.json" ]; then
    print_status "SUCCESS" "vercel.json found"
    
    # Check for correct runtime
    if grep -q "nodejs20.x" vercel.json; then
        print_status "SUCCESS" "Correct Node.js runtime specified (nodejs20.x)"
    else
        print_status "WARNING" "Node.js runtime might not be optimal for Vercel"
    fi
else
    print_status "WARNING" "vercel.json not found (will use default Vercel settings)"
fi

# 9. Check for required files
echo ""
echo "9. Checking required files..."

REQUIRED_FILES=(
    "app/layout.tsx"
    "app/page.tsx"
    "components/chatbot/chatbot.tsx"
    "app/api/check-api-key/route.ts"
    "app/api/generate-ai-response/route.ts"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        print_status "SUCCESS" "$file exists"
    else
        print_status "ERROR" "$file is missing"
        exit 1
    fi
done

# 10. Final summary
echo ""
echo "=========================================="
print_status "SUCCESS" "Pre-deployment check completed!"
echo ""
print_status "INFO" "Next steps:"
echo "  1. Ensure your environment variables are set in Vercel dashboard"
echo "  2. Run: npm run deploy or vercel --prod"
echo "  3. Test the deployed application"
echo ""
print_status "INFO" "Environment variables to set in Vercel:"
echo "  - GOOGLE_GENERATIVE_AI_API_KEY (required for AI features)"
echo "  - NEXT_PUBLIC_SUPABASE_URL (optional)"
echo "  - NEXT_PUBLIC_SUPABASE_ANON_KEY (optional)"
echo ""
print_status "SUCCESS" "Ready for deployment! 🚀"
