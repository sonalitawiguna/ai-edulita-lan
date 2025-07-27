import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Get API key from environment variables
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY

    console.log("🔍 Checking Google AI API key...")
    console.log("API key exists:", !!apiKey)
    console.log("API key length:", apiKey?.length || 0)
    console.log("API key starts with AIza:", apiKey?.startsWith("AIza") || false)

    // Validate API key format
    if (!apiKey) {
      return NextResponse.json({
        available: false,
        error: "API key not found",
        details: "GOOGLE_GENERATIVE_AI_API_KEY environment variable is not set",
      })
    }

    if (apiKey === "your-google-ai-api-key-here") {
      return NextResponse.json({
        available: false,
        error: "API key not configured",
        details: "Please replace the placeholder API key with your actual Google AI API key",
      })
    }

    if (!apiKey.startsWith("AIza")) {
      return NextResponse.json({
        available: false,
        error: "Invalid API key format",
        details: "Google AI API keys should start with 'AIza'",
      })
    }

    if (apiKey.length < 30) {
      return NextResponse.json({
        available: false,
        error: "API key too short",
        details: "Google AI API keys are typically longer than 30 characters",
      })
    }

    // Test the API key by making a simple request
    try {
      const { google } = await import("@ai-sdk/google")
      const { generateText } = await import("ai")

      console.log("🧪 Testing API key with a simple request...")

      const { text } = await generateText({
        model: google("gemini-1.5-flash", {
          apiKey: apiKey,
        }),
        prompt: "Say 'Hello' in Indonesian",
        maxTokens: 10,
      })

      console.log("✅ API key test successful:", text)

      return NextResponse.json({
        available: true,
        message: "Google AI API key is working correctly",
        testResponse: text,
      })
    } catch (testError: any) {
      console.error("❌ API key test failed:", testError)

      return NextResponse.json({
        available: false,
        error: "API key test failed",
        details: testError.message || "Failed to connect to Google AI API",
      })
    }
  } catch (error: any) {
    console.error("❌ Error checking API key:", error)

    return NextResponse.json({
      available: false,
      error: "Server error",
      details: error.message || "Internal server error while checking API key",
    })
  }
}
