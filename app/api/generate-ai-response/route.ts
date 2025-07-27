import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { prompt, systemPrompt } = await request.json()

    if (!prompt) {
      return NextResponse.json({
        success: false,
        error: "Prompt is required",
      })
    }

    // Get API key from environment variables
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY

    // Check if API key is available and valid
    if (!apiKey || apiKey === "your-google-ai-api-key-here" || !apiKey.startsWith("AIza")) {
      console.log("⚠️ API key not available, using fallback response")

      // Return a fallback response
      const fallbackResponse = generateFallbackResponse(prompt)

      return NextResponse.json({
        success: true,
        text: fallbackResponse,
        isDemo: true,
      })
    }

    try {
      // Dynamic import to avoid loading issues
      const { google } = await import("@ai-sdk/google")
      const { generateText } = await import("ai")

      console.log("🤖 Generating AI response with Google Gemini...")

      const { text } = await generateText({
        model: google("gemini-1.5-flash", {
          apiKey: apiKey,
        }),
        system: systemPrompt || "You are a helpful educational assistant. Respond in Indonesian.",
        prompt: prompt,
        maxTokens: 1000,
        temperature: 0.7,
      })

      console.log("✅ AI response generated successfully")

      return NextResponse.json({
        success: true,
        text: text,
        isDemo: false,
      })
    } catch (aiError: any) {
      console.error("❌ Google AI error:", aiError)

      // Fallback to mock response if AI fails
      const fallbackResponse = generateFallbackResponse(prompt)

      return NextResponse.json({
        success: true,
        text: fallbackResponse,
        isDemo: true,
        error: aiError.message,
      })
    }
  } catch (error: any) {
    console.error("❌ Server error:", error)

    return NextResponse.json({
      success: false,
      error: error.message || "Internal server error",
    })
  }
}

function generateFallbackResponse(prompt: string): string {
  const lowerPrompt = prompt.toLowerCase()

  // Educational responses based on common topics
  if (lowerPrompt.includes("matematika") || lowerPrompt.includes("math")) {
    return `Matematika adalah ilmu yang mempelajari pola, struktur, dan hubungan logis. Beberapa cabang utama matematika meliputi:

• **Aljabar** - mempelajari simbol dan aturan manipulasi simbol
• **Geometri** - mempelajari bentuk, ukuran, dan sifat ruang
• **Kalkulus** - mempelajari perubahan dan akumulasi
• **Statistika** - mempelajari pengumpulan dan analisis data

Apakah ada topik matematika spesifik yang ingin Anda pelajari lebih lanjut?`
  }

  if (lowerPrompt.includes("fisika") || lowerPrompt.includes("physics")) {
    return `Fisika adalah ilmu yang mempelajari materi, energi, dan interaksinya. Konsep dasar fisika meliputi:

• **Mekanika** - gerak dan gaya
• **Termodinamika** - panas dan energi
• **Elektromagnetisme** - listrik dan magnet
• **Optik** - cahaya dan gelombang
• **Fisika Modern** - relativitas dan mekanika kuantum

Hukum-hukum fisika membantu kita memahami bagaimana alam semesta bekerja. Ada topik fisika tertentu yang ingin Anda bahas?`
  }

  if (lowerPrompt.includes("kimia") || lowerPrompt.includes("chemistry")) {
    return `Kimia adalah ilmu yang mempelajari komposisi, struktur, sifat, dan perubahan materi. Cabang utama kimia:

• **Kimia Anorganik** - senyawa non-karbon
• **Kimia Organik** - senyawa karbon
• **Kimia Fisik** - sifat fisik dan kimia
• **Biokimia** - proses kimia dalam makhluk hidup
• **Kimia Analitik** - identifikasi dan kuantifikasi materi

Konsep penting: atom, molekul, ikatan kimia, dan reaksi kimia. Apa aspek kimia yang ingin Anda pelajari?`
  }

  if (lowerPrompt.includes("biologi") || lowerPrompt.includes("biology")) {
    return `Biologi adalah ilmu yang mempelajari kehidupan dan organisme hidup. Cabang utama biologi:

• **Botani** - tumbuhan
• **Zoologi** - hewan
• **Mikrobiologi** - mikroorganisme
• **Genetika** - hereditas dan variasi
• **Ekologi** - interaksi organisme dengan lingkungan

Konsep dasar: sel, evolusi, genetika, homeostasis, dan energi. Topik biologi mana yang menarik bagi Anda?`
  }

  if (lowerPrompt.includes("sejarah") || lowerPrompt.includes("history")) {
    return `Sejarah adalah studi tentang peristiwa masa lalu dan dampaknya terhadap masa kini. Sejarah Indonesia mencakup:

• **Masa Prasejarah** - sebelum tulisan
• **Masa Hindu-Buddha** - kerajaan klasik
• **Masa Islam** - penyebaran Islam
• **Masa Kolonial** - penjajahan Eropa
• **Masa Kemerdekaan** - perjuangan dan pembangunan

Mempelajari sejarah membantu kita memahami identitas bangsa dan belajar dari pengalaman masa lalu. Periode sejarah mana yang ingin Anda ketahui lebih dalam?`
  }

  if (lowerPrompt.includes("bahasa") || lowerPrompt.includes("language")) {
    return `Bahasa adalah sistem komunikasi yang menggunakan simbol, suara, atau gerakan. Dalam pembelajaran bahasa:

• **Tata Bahasa** - aturan struktur kalimat
• **Kosakata** - perbendaharaan kata
• **Fonologi** - sistem bunyi
• **Semantik** - makna kata dan kalimat
• **Pragmatik** - penggunaan bahasa dalam konteks

Bahasa Indonesia memiliki struktur yang khas dengan sistem imbuhan yang kaya. Aspek bahasa mana yang ingin Anda pelajari?`
  }

  // General educational response
  return `Terima kasih atas pertanyaan Anda tentang "${prompt}". 

Saya akan berusaha membantu dengan kemampuan terbatas dalam mode demo ini. Untuk mendapatkan respons yang lebih mendalam dan kontekstual, silakan konfigurasi Google AI API key.

Beberapa hal yang bisa saya bantu:
• Penjelasan konsep dasar berbagai mata pelajaran
• Tips belajar dan mengajar yang efektif
• Informasi umum tentang pendidikan Indonesia
• Panduan penggunaan platform ini
• Strategi pembelajaran dan asesmen

Apakah ada topik spesifik yang ingin Anda pelajari lebih lanjut?`
}
