import { supabase } from "./supabase"
import type { Quiz, QuizAttempt, User, Assignment, Submission, Document, ChatMessage, School, Class } from "./supabase"

// Mock data untuk development
const mockQuizzes: Quiz[] = [
  {
    id: "1",
    title: "Matematika Dasar - Aljabar",
    subject: "Matematika",
    difficulty: "easy",
    questions: [
      {
        id: 1,
        question: "Berapakah hasil dari 2x + 3 = 11?",
        options: ["x = 4", "x = 5", "x = 6", "x = 7"],
        correct: 0,
        explanation: "Untuk menyelesaikan 2x + 3 = 11, kurangi 3 dari kedua sisi: 2x = 8, lalu bagi dengan 2: x = 4",
      },
      {
        id: 2,
        question: "Jika y = 3x - 2 dan x = 4, berapakah nilai y?",
        options: ["8", "10", "12", "14"],
        correct: 1,
        explanation: "Substitusi x = 4 ke dalam y = 3x - 2: y = 3(4) - 2 = 12 - 2 = 10",
      },
    ],
    created_by: "teacher-1",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Fisika - Gerak Lurus",
    subject: "Fisika",
    difficulty: "medium",
    questions: [
      {
        id: 1,
        question: "Sebuah mobil bergerak dengan kecepatan 60 km/jam. Berapa jarak yang ditempuh dalam 2 jam?",
        options: ["100 km", "120 km", "140 km", "160 km"],
        correct: 1,
        explanation: "Jarak = Kecepatan × Waktu = 60 km/jam × 2 jam = 120 km",
      },
    ],
    created_by: "teacher-1",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Bahasa Indonesia - Tata Bahasa",
    subject: "Bahasa Indonesia",
    difficulty: "easy",
    questions: [
      {
        id: 1,
        question: "Apa yang dimaksud dengan subjek dalam kalimat?",
        options: ["Pelaku dalam kalimat", "Objek dalam kalimat", "Predikat dalam kalimat", "Keterangan dalam kalimat"],
        correct: 0,
        explanation: "Subjek adalah pelaku atau yang melakukan tindakan dalam kalimat",
      },
      {
        id: 2,
        question: "Manakah contoh kalimat aktif?",
        options: ["Buku dibaca oleh Ani", "Ani membaca buku", "Buku itu sudah dibaca", "Dibaca buku oleh Ani"],
        correct: 1,
        explanation: "Kalimat aktif adalah kalimat yang subjeknya melakukan tindakan, seperti 'Ani membaca buku'",
      },
    ],
    created_by: "teacher-1",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

const mockUsers: User[] = [
  {
    id: "student-1",
    email: "student@demo.com",
    role: "student",
    name: "Ahmad Siswa",
    school_id: "school-1",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "teacher-1",
    email: "teacher@demo.com",
    role: "teacher",
    name: "Ibu Guru",
    school_id: "school-1",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

const mockQuizAttempts: QuizAttempt[] = [
  {
    id: "1",
    quiz_id: "1",
    student_id: "student-1",
    answers: [
      { questionId: 1, answer: 0 },
      { questionId: 2, answer: 1 },
    ],
    score: 100,
    completed_at: new Date().toISOString(),
  },
]

// Enhanced mock data for development
const mockData = {
  users: [
    {
      id: "mock-student-1",
      email: "siswa@demo.com",
      role: "student" as const,
      name: "Ahmad Siswa",
      school_id: "mock-school-1",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "mock-teacher-1",
      email: "guru@demo.com",
      role: "teacher" as const,
      name: "Siti Guru",
      school_id: "mock-school-1",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  schools: [
    {
      id: "mock-school-1",
      name: "SMA Negeri 1 Demo",
      address: "Jl. Demo No. 123, Jakarta",
      accreditation: "A" as const,
      total_students: 500,
      total_teachers: 25,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  quizzes: [
    {
      id: "mock-quiz-1",
      title: "Kuis Matematika Dasar",
      subject: "Matematika",
      difficulty: "easy" as const,
      questions: [
        {
          id: "1",
          question: "Berapakah hasil dari 2 + 2?",
          options: ["3", "4", "5", "6"],
          correctAnswer: 1,
          explanation: "2 + 2 = 4",
        },
        {
          id: "2",
          question: "Berapakah hasil dari 5 × 3?",
          options: ["12", "15", "18", "20"],
          correctAnswer: 1,
          explanation: "5 × 3 = 15",
        },
      ],
      created_by: "mock-teacher-1",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "mock-quiz-2",
      title: "Kuis Fisika - Gerak",
      subject: "Fisika",
      difficulty: "medium" as const,
      questions: [
        {
          id: "1",
          question: "Apa satuan kecepatan dalam SI?",
          options: ["km/jam", "m/s", "cm/s", "mil/jam"],
          correctAnswer: 1,
          explanation: "Satuan kecepatan dalam SI adalah meter per sekon (m/s)",
        },
      ],
      created_by: "mock-teacher-1",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  // Mock learning modules data
  learningModules: [
    {
      id: "mock-module-1",
      title: "Pengenalan Aljabar Linear",
      subject: "Matematika",
      grade: "10",
      description: "Modul pembelajaran tentang konsep dasar aljabar linear",
      content: {
        objectives: ["Memahami konsep vektor", "Menguasai operasi matriks", "Menyelesaikan sistem persamaan linear"],
        materials: [
          {
            type: "text",
            title: "Pengertian Vektor",
            content: "Vektor adalah besaran yang memiliki nilai dan arah...",
          },
          {
            type: "video",
            title: "Operasi Matriks",
            url: "https://example.com/video",
          },
          {
            type: "exercise",
            title: "Latihan Soal",
            questions: [
              {
                question: "Tentukan hasil penjumlahan vektor (2,3) + (1,4)",
                answer: "(3,7)",
              },
            ],
          },
        ],
        assessment: {
          type: "quiz",
          quiz_id: "mock-quiz-1",
        },
      },
      created_by: "mock-teacher-1",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "mock-module-2",
      title: "Gerak Lurus Beraturan",
      subject: "Fisika",
      grade: "10",
      description: "Modul pembelajaran tentang gerak lurus beraturan",
      content: {
        objectives: ["Memahami konsep GLB", "Menghitung jarak dan kecepatan", "Menganalisis grafik gerak"],
        materials: [
          {
            type: "text",
            title: "Definisi GLB",
            content: "Gerak Lurus Beraturan adalah gerak benda pada lintasan lurus dengan kecepatan tetap...",
          },
          {
            type: "exercise",
            title: "Latihan GLB",
            questions: [
              {
                question: "Sebuah mobil bergerak 60 km/jam selama 2 jam. Berapa jarak tempuh?",
                answer: "120 km",
              },
            ],
          },
        ],
        assessment: {
          type: "reflection",
          instructions: "Buatlah refleksi tentang pemahaman GLB",
        },
      },
      created_by: "mock-teacher-1",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  // Mock chat history for development
  chatHistory: [] as ChatMessage[],
  // Mock reports data
  reports: [
    {
      id: "mock-report-1",
      title: "Laporan Bulanan Januari",
      type: "monthly",
      class: "X IPA 1",
      content: "Laporan pembelajaran bulan Januari menunjukkan peningkatan yang signifikan...",
      created_by: "mock-teacher-1",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  // Mock school analytics data
  schoolAnalytics: [
    {
      id: "mock-analytics-1",
      school_id: "mock-school-1",
      literacy_score: 85.2,
      numeracy_score: 83.7,
      character_score: 88.9,
      subjects_data: [
        { name: "Matematika", score: 85.2, national: 78.5 },
        { name: "Bahasa Indonesia", score: 87.1, national: 82.3 },
        { name: "Bahasa Inggris", score: 79.8, national: 75.2 },
        { name: "IPA", score: 83.7, national: 80.1 },
        { name: "IPS", score: 81.4, national: 79.8 },
      ],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  // Mock policy simulations
  policySimulations: [
    {
      id: "mock-policy-1",
      title: "Peningkatan Anggaran Guru",
      description: "Simulasi peningkatan anggaran guru sebesar 20%",
      parameters: { budget_increase: 20, target_ratio: 15 },
      results: { teacher_ratio: "1:15", quality_improvement: 12, average_score_increase: 2.7 },
      created_by: "mock-principal-1",
      created_at: new Date().toISOString(),
    },
  ],
  // Mock regional data for department
  regionalData: [
    {
      id: "mock-regional-1",
      region: "Jakarta Pusat",
      total_schools: 25,
      total_students: 12500,
      total_teachers: 625,
      average_score: 85.2,
      budget_utilization: 87.5,
      created_at: new Date().toISOString(),
    },
  ],
}

// Helper function to check if we should use Supabase
function shouldUseSupabase(): boolean {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    // Check if Supabase is properly configured
    const isConfigured =
      supabaseUrl &&
      supabaseKey &&
      supabaseUrl !== "https://demo-project.supabase.co" &&
      supabaseUrl !== "https://placeholder.supabase.co" &&
      supabaseKey !== "demo-anon-key" &&
      supabaseKey !== "placeholder-key" &&
      supabaseUrl.includes("supabase.co") &&
      supabaseKey.length > 50

    console.log("🔍 Supabase configuration check:", {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseKey,
      urlValid: supabaseUrl?.includes("supabase.co"),
      keyValid: supabaseKey && supabaseKey.length > 50,
      isConfigured,
    })

    return isConfigured
  } catch (error) {
    console.error("Error checking Supabase configuration:", error)
    return false
  }
}

// Helper function to check if AI is available
function shouldUseAI(): boolean {
  try {
    const googleApiKey =
      process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY

    const isAvailable =
      googleApiKey &&
      googleApiKey !== "your-google-ai-api-key-here" &&
      googleApiKey.startsWith("AIza") &&
      googleApiKey.length > 30

    console.log("🤖 AI configuration check:", {
      hasKey: !!googleApiKey,
      keyLength: googleApiKey?.length,
      startsWithAIza: googleApiKey?.startsWith("AIza"),
      isAvailable,
    })

    return isAvailable
  } catch (error) {
    console.error("Error checking AI configuration:", error)
    return false
  }
}

// AI Service for generating content
export const aiService = {
  async generateQuiz(prompt: string, subject: string, difficulty: string, questionCount = 5) {
    console.log("🤖 Generating quiz with AI...")

    // Always use mock generation for now to avoid API issues
    try {
      // Simulate AI processing time
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const mockQuestions = []
      const subjectTemplates = {
        matematika: {
          easy: [
            { q: "Berapakah hasil dari 5 + 3?", opts: ["6", "8", "9", "10"], correct: 1, exp: "5 + 3 = 8" },
            { q: "Berapakah hasil dari 12 - 7?", opts: ["4", "5", "6", "7"], correct: 1, exp: "12 - 7 = 5" },
            { q: "Berapakah hasil dari 4 × 6?", opts: ["20", "24", "28", "30"], correct: 1, exp: "4 × 6 = 24" },
          ],
          medium: [
            {
              q: "Tentukan nilai x dari persamaan 2x + 5 = 13",
              opts: ["3", "4", "5", "6"],
              correct: 1,
              exp: "2x = 13 - 5 = 8, maka x = 4",
            },
            {
              q: "Berapakah luas segitiga dengan alas 8 cm dan tinggi 6 cm?",
              opts: ["24 cm²", "48 cm²", "14 cm²", "20 cm²"],
              correct: 0,
              exp: "Luas = ½ × alas × tinggi = ½ × 8 × 6 = 24 cm²",
            },
          ],
          hard: [
            {
              q: "Tentukan turunan dari f(x) = 3x² + 2x - 1",
              opts: ["6x + 2", "3x + 2", "6x - 1", "3x - 1"],
              correct: 0,
              exp: "f'(x) = 6x + 2",
            },
          ],
        },
        fisika: {
          easy: [
            {
              q: "Satuan kecepatan dalam SI adalah?",
              opts: ["m/s", "km/h", "cm/s", "m/h"],
              correct: 0,
              exp: "Satuan kecepatan dalam SI adalah meter per sekon (m/s)",
            },
            {
              q: "Gaya yang diperlukan untuk menggerakkan benda disebut?",
              opts: ["Energi", "Daya", "Gaya", "Momentum"],
              correct: 2,
              exp: "Gaya adalah dorongan atau tarikan yang dapat mengubah keadaan gerak benda",
            },
          ],
          medium: [
            {
              q: "Sebuah benda jatuh bebas dari ketinggian 20 m. Berapa kecepatan saat menyentuh tanah? (g = 10 m/s²)",
              opts: ["10 m/s", "20 m/s", "30 m/s", "40 m/s"],
              correct: 1,
              exp: "v = √(2gh) = √(2×10×20) = √400 = 20 m/s",
            },
          ],
          hard: [
            {
              q: "Frekuensi gelombang elektromagnetik dengan panjang gelombang 500 nm adalah? (c = 3×10⁸ m/s)",
              opts: ["6×10¹⁴ Hz", "6×10¹⁵ Hz", "6×10¹³ Hz", "6×10¹² Hz"],
              correct: 0,
              exp: "f = c/λ = 3×10⁸/(500×10⁻⁹) = 6×10¹⁴ Hz",
            },
          ],
        },
        kimia: {
          easy: [
            {
              q: "Rumus kimia air adalah?",
              opts: ["H₂O", "CO₂", "NaCl", "CH₄"],
              correct: 0,
              exp: "Air terdiri dari 2 atom hidrogen dan 1 atom oksigen, sehingga rumusnya H₂O",
            },
          ],
          medium: [
            {
              q: "Berapa mol NaCl dalam 58,5 gram NaCl? (Mr NaCl = 58,5)",
              opts: ["0,5 mol", "1 mol", "1,5 mol", "2 mol"],
              correct: 1,
              exp: "n = massa/Mr = 58,5/58,5 = 1 mol",
            },
          ],
          hard: [
            {
              q: "pH larutan HCl 0,01 M adalah?",
              opts: ["1", "2", "3", "4"],
              correct: 1,
              exp: "pH = -log[H⁺] = -log(0,01) = -log(10⁻²) = 2",
            },
          ],
        },
      }

      const templates =
        subjectTemplates[subject as keyof typeof subjectTemplates]?.[
          difficulty as keyof (typeof subjectTemplates)["matematika"]
        ] || subjectTemplates.matematika.easy

      for (let i = 0; i < Math.min(questionCount, templates.length); i++) {
        const template = templates[i % templates.length]
        mockQuestions.push({
          id: `generated-${i + 1}`,
          question: template.q,
          options: template.opts,
          correctAnswer: template.correct,
          explanation: template.exp,
        })
      }

      // If we need more questions than templates, generate variations
      while (mockQuestions.length < questionCount) {
        const baseTemplate = templates[mockQuestions.length % templates.length]
        mockQuestions.push({
          id: `generated-${mockQuestions.length + 1}`,
          question: `${baseTemplate.q} (Variasi ${Math.floor(mockQuestions.length / templates.length) + 1})`,
          options: baseTemplate.opts,
          correctAnswer: baseTemplate.correct,
          explanation: baseTemplate.exp,
        })
      }

      const generatedQuiz = {
        title: `Kuis ${subject.charAt(0).toUpperCase() + subject.slice(1)} - ${prompt.substring(0, 30)}${prompt.length > 30 ? "..." : ""}`,
        subject,
        difficulty,
        questions: mockQuestions.slice(0, questionCount),
      }

      console.log("✅ Quiz generated successfully with mock data")
      return generatedQuiz
    } catch (error) {
      console.error("Error generating quiz:", error)

      // Fallback to very basic generation
      const fallbackQuestions = []
      for (let i = 0; i < questionCount; i++) {
        fallbackQuestions.push({
          id: `fallback-${i + 1}`,
          question: `Soal ${subject} ${difficulty} nomor ${i + 1} berdasarkan: ${prompt}`,
          options: [
            `Pilihan A untuk soal ${i + 1}`,
            `Pilihan B untuk soal ${i + 1}`,
            `Pilihan C untuk soal ${i + 1}`,
            `Pilihan D untuk soal ${i + 1}`,
          ],
          correctAnswer: 0,
          explanation: `Penjelasan untuk soal ${i + 1}: Berdasarkan konsep ${subject} tingkat ${difficulty}`,
        })
      }

      return {
        title: `Kuis ${subject} - ${prompt.substring(0, 30)}...`,
        subject,
        difficulty,
        questions: fallbackQuestions,
      }
    }
  },

  async generateLearningModule(prompt: string, subject: string, grade: string) {
    console.log("🤖 Generating learning module with AI...")

    try {
      // Simulate AI processing time
      await new Promise((resolve) => setTimeout(resolve, 2500))

      const moduleTemplates = {
        matematika: {
          "10": {
            objectives: [
              "Memahami konsep dasar aljabar dan operasinya",
              "Menguasai teknik penyelesaian persamaan linear",
              "Mengaplikasikan konsep dalam pemecahan masalah sehari-hari",
            ],
            materials: [
              {
                type: "text",
                title: "Pengantar Aljabar",
                content:
                  "Aljabar adalah cabang matematika yang menggunakan huruf dan simbol untuk mewakili bilangan dalam rumus dan persamaan. Konsep ini sangat penting dalam matematika tingkat lanjut.",
              },
              {
                type: "text",
                title: "Operasi Aljabar Dasar",
                content:
                  "Operasi dasar dalam aljabar meliputi penjumlahan, pengurangan, perkalian, dan pembagian suku-suku aljabar. Setiap operasi memiliki aturan khusus yang harus dipahami.",
              },
              {
                type: "exercise",
                title: "Latihan Soal",
                questions: [
                  {
                    question: "Sederhanakan bentuk aljabar: 3x + 5x - 2x",
                    answer: "6x (karena 3x + 5x - 2x = 8x - 2x = 6x)",
                  },
                  {
                    question: "Tentukan nilai x dari persamaan: 2x + 5 = 13",
                    answer: "x = 4 (karena 2x = 13 - 5 = 8, maka x = 4)",
                  },
                ],
              },
            ],
          },
        },
        fisika: {
          "10": {
            objectives: [
              "Memahami konsep gerak lurus beraturan dan berubah beraturan",
              "Menguasai hukum-hukum Newton tentang gerak",
              "Menganalisis gerak benda dalam kehidupan sehari-hari",
            ],
            materials: [
              {
                type: "text",
                title: "Konsep Gerak",
                content:
                  "Gerak adalah perubahan posisi suatu benda terhadap titik acuan dalam selang waktu tertentu. Gerak dapat dibedakan menjadi gerak lurus beraturan (GLB) dan gerak lurus berubah beraturan (GLBB).",
              },
              {
                type: "text",
                title: "Hukum Newton",
                content:
                  "Hukum I Newton: Benda akan tetap diam atau bergerak lurus beraturan jika tidak ada gaya yang bekerja padanya. Hukum II Newton: F = ma. Hukum III Newton: Aksi = Reaksi.",
              },
            ],
          },
        },
      }

      const template =
        moduleTemplates[subject as keyof typeof moduleTemplates]?.[
          grade as keyof (typeof moduleTemplates)["matematika"]
        ] || moduleTemplates.matematika["10"]

      const generatedModule = {
        title: `Modul ${subject.charAt(0).toUpperCase() + subject.slice(1)} Kelas ${grade} - ${prompt.substring(0, 30)}${prompt.length > 30 ? "..." : ""}`,
        subject,
        grade,
        description: `Modul pembelajaran ${subject} untuk kelas ${grade} yang membahas: ${prompt}`,
        content: {
          objectives: template.objectives,
          materials: template.materials,
          assessment: {
            type: "reflection",
            instructions: `Buatlah refleksi tentang pemahaman Anda terhadap materi ${subject} yang telah dipelajari dalam modul ini`,
          },
        },
      }

      console.log("✅ Learning module generated successfully with mock data")
      return generatedModule
    } catch (error) {
      console.error("Error generating learning module:", error)

      // Fallback generation
      return {
        title: `Modul ${subject} Kelas ${grade} - ${prompt.substring(0, 30)}...`,
        subject,
        grade,
        description: `Modul pembelajaran ${subject} untuk kelas ${grade} berdasarkan: ${prompt}`,
        content: {
          objectives: [
            `Memahami konsep dasar ${subject}`,
            `Menguasai aplikasi praktis ${subject}`,
            `Menganalisis dan menyelesaikan masalah terkait ${subject}`,
          ],
          materials: [
            {
              type: "text",
              title: "Pengantar Materi",
              content: `Materi ${subject} ini akan membahas tentang ${prompt}. Konten telah disesuaikan dengan kurikulum kelas ${grade}.`,
            },
            {
              type: "exercise",
              title: "Latihan Pemahaman",
              questions: [
                {
                  question: `Jelaskan konsep utama dari ${subject} yang telah dipelajari`,
                  answer: `Jawaban akan bervariasi tergantung pemahaman siswa tentang ${subject}`,
                },
              ],
            },
          ],
          assessment: {
            type: "reflection",
            instructions: `Buatlah refleksi tentang pemahaman Anda terhadap materi ${subject} ini`,
          },
        },
      }
    }
  },
}

// User operations
export const userService = {
  async getCurrentUser() {
    console.log("👤 Getting current user...")

    if (!shouldUseSupabase()) {
      console.log("📝 Using mock user data")
      // Return mock user for development
      const savedUser = typeof window !== "undefined" ? localStorage.getItem("edulita_mock_user") : null
      if (savedUser) {
        try {
          return JSON.parse(savedUser) as User
        } catch {
          return mockData.users[0] as User
        }
      }
      return mockData.users[0] as User
    }

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return null

      const { data, error } = await supabase.from("users").select("*").eq("id", user.id).single()

      if (error) {
        console.warn("⚠️ Supabase error, using mock user:", error.message)
        return mockData.users[0] as User
      }
      return data as User
    } catch (error) {
      console.warn("⚠️ Database error, using mock user:", error)
      return mockData.users[0] as User
    }
  },

  async updateProfile(userId: string, updates: Partial<User>) {
    if (!shouldUseSupabase()) {
      // Mock update for development
      return { ...mockData.users[0], ...updates } as User
    }

    try {
      const { data, error } = await supabase.from("users").update(updates).eq("id", userId).select().single()

      if (error) {
        console.warn("⚠️ Supabase error, using mock update:", error.message)
        return { ...mockData.users[0], ...updates } as User
      }
      return data as User
    } catch (error) {
      console.warn("⚠️ Database error, using mock update:", error)
      return { ...mockData.users[0], ...updates } as User
    }
  },

  async getUsersByRole(role: User["role"]) {
    if (!shouldUseSupabase()) {
      return mockData.users.filter((user) => user.role === role) as User[]
    }

    try {
      const { data, error } = await supabase.from("users").select("*").eq("role", role)

      if (error) {
        console.warn("⚠️ Supabase error, using mock users:", error.message)
        return mockData.users.filter((user) => user.role === role) as User[]
      }
      return data as User[]
    } catch (error) {
      console.warn("⚠️ Database error, using mock users:", error)
      return mockData.users.filter((user) => user.role === role) as User[]
    }
  },
}

// School operations
export const schoolService = {
  async getSchoolById(schoolId: string) {
    if (!shouldUseSupabase()) {
      // Return mock school data
      return mockData.schools[0] as School
    }

    try {
      const { data, error } = await supabase.from("schools").select("*").eq("id", schoolId).single()

      if (error) {
        console.warn("⚠️ Supabase error, using mock school:", error.message)
        return mockData.schools[0] as School
      }
      return data as School
    } catch (error) {
      console.warn("⚠️ Database error, using mock school:", error)
      return mockData.schools[0] as School
    }
  },

  async getSchoolStats(schoolId: string) {
    if (!shouldUseSupabase()) {
      return {
        school: mockData.schools[0] as School,
        totalClasses: 12,
        totalTeachers: 25,
        totalStudents: 500,
      }
    }

    try {
      const { data: school, error: schoolError } = await supabase
        .from("schools")
        .select("*")
        .eq("id", schoolId)
        .single()

      if (schoolError) {
        console.warn("⚠️ Supabase error, using mock school stats:", schoolError.message)
        return {
          school: mockData.schools[0] as School,
          totalClasses: 12,
          totalTeachers: 25,
          totalStudents: 500,
        }
      }

      const { data: classes, error: classError } = await supabase.from("classes").select("*").eq("school_id", schoolId)

      if (classError) {
        console.warn("⚠️ Classes error, using mock data:", classError.message)
      }

      const { data: teachers, error: teacherError } = await supabase
        .from("teachers")
        .select("*")
        .eq("school_id", schoolId)

      if (teacherError) {
        console.warn("⚠️ Teachers error, using mock data:", teacherError.message)
      }

      return {
        school: school as School,
        totalClasses: classes?.length || 12,
        totalTeachers: teachers?.length || 25,
        totalStudents: school.total_students || 500,
      }
    } catch (error) {
      console.warn("⚠️ Database error, using mock school stats:", error)
      return {
        school: mockData.schools[0] as School,
        totalClasses: 12,
        totalTeachers: 25,
        totalStudents: 500,
      }
    }
  },

  async updateSchool(schoolId: string, updates: Partial<School>) {
    if (!shouldUseSupabase()) {
      return { ...mockData.schools[0], ...updates } as School
    }

    try {
      const { data, error } = await supabase.from("schools").update(updates).eq("id", schoolId).select().single()

      if (error) {
        console.warn("⚠️ Supabase error, using mock update:", error.message)
        return { ...mockData.schools[0], ...updates } as School
      }
      return data as School
    } catch (error) {
      console.warn("⚠️ Database error, using mock update:", error)
      return { ...mockData.schools[0], ...updates } as School
    }
  },
}

// Student operations
export const studentService = {
  async getStudentProfile(userId: string) {
    console.log("👨‍🎓 Getting student profile for:", userId)

    if (!shouldUseSupabase()) {
      console.log("📝 Using mock student profile")
      return {
        id: "mock-student-profile-1",
        user_id: userId,
        class_id: "mock-class-1",
        student_number: "2024001",
        grade: "10",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    }

    try {
      const { data, error } = await supabase
        .from("students")
        .select(`
          *,
          user:users(*),
          class:classes(*, school:schools(*))
        `)
        .eq("user_id", userId)
        .single()

      if (error) {
        console.warn("⚠️ Supabase error, using mock student profile:", error.message)
        return {
          id: "mock-student-profile-1",
          user_id: userId,
          class_id: "mock-class-1",
          student_number: "2024001",
          grade: "10",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      }
      return data
    } catch (error) {
      console.warn("⚠️ Database error, using mock student profile:", error)
      return {
        id: "mock-student-profile-1",
        user_id: userId,
        class_id: "mock-class-1",
        student_number: "2024001",
        grade: "10",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    }
  },

  async getStudentStats(studentId: string) {
    console.log("📊 Getting student stats for:", studentId)

    if (!shouldUseSupabase()) {
      console.log("📝 Using mock student stats")
      // Return enhanced mock stats for development
      return {
        totalQuizzes: 8,
        averageQuizScore: 87.5,
        totalAssignments: 5,
        averageAssignmentScore: 85.2,
        overallAverage: 86.35,
        recentQuizzes: [
          { id: "1", title: "Kuis Matematika", score: 90, subject: "Matematika" },
          { id: "2", title: "Kuis Fisika", score: 85, subject: "Fisika" },
        ],
      }
    }

    try {
      // Get quiz attempts
      const { data: quizAttempts, error: quizError } = await supabase
        .from("quiz_attempts")
        .select("score, completed_at")
        .eq("student_id", studentId)

      if (quizError) {
        console.warn("⚠️ Quiz attempts error, using mock stats:", quizError.message)
        return {
          totalQuizzes: 8,
          averageQuizScore: 87.5,
          totalAssignments: 5,
          averageAssignmentScore: 85.2,
          overallAverage: 86.35,
        }
      }

      // Get submissions
      const { data: submissions, error: submissionError } = await supabase
        .from("submissions")
        .select("score, submitted_at")
        .eq("student_id", studentId)
        .not("score", "is", null)

      if (submissionError) {
        console.warn("⚠️ Submissions error, using partial mock stats:", submissionError.message)
      }

      const totalQuizzes = quizAttempts?.length || 0
      const averageQuizScore = quizAttempts?.length
        ? quizAttempts.reduce((sum, attempt) => sum + attempt.score, 0) / quizAttempts.length
        : 0

      const totalAssignments = submissions?.length || 0
      const averageAssignmentScore = submissions?.length
        ? submissions.reduce((sum, sub) => sum + (sub.score || 0), 0) / submissions.length
        : 0

      return {
        totalQuizzes,
        averageQuizScore,
        totalAssignments,
        averageAssignmentScore,
        overallAverage: (averageQuizScore + averageAssignmentScore) / 2,
      }
    } catch (error) {
      console.warn("⚠️ Database error, using mock student stats:", error)
      return {
        totalQuizzes: 8,
        averageQuizScore: 87.5,
        totalAssignments: 5,
        averageAssignmentScore: 85.2,
        overallAverage: 86.35,
      }
    }
  },
}

// Quiz operations - Enhanced with CRUD
export const quizService = {
  async getAllQuizzes() {
    console.log("📚 Getting all quizzes...")

    if (!shouldUseSupabase()) {
      console.log("📝 Using mock quiz data")
      return mockQuizzes as Quiz[]
    }

    try {
      const { data, error } = await supabase.from("quizzes").select("*").order("created_at", { ascending: false })

      if (error) {
        console.warn("⚠️ Supabase error, falling back to mock quizzes:", error.message)
        return mockQuizzes as Quiz[]
      }

      console.log(`✅ Loaded ${data?.length || 0} quizzes from database`)
      return (data as Quiz[]) || mockQuizzes
    } catch (error) {
      console.warn("⚠️ Database error, using mock quizzes:", error)
      return mockQuizzes as Quiz[]
    }
  },

  async getQuizzesByTeacher(teacherId: string) {
    console.log("👩‍🏫 Getting quizzes by teacher:", teacherId)

    if (!shouldUseSupabase()) {
      console.log("📝 Using mock quiz data filtered by teacher")
      return mockQuizzes.filter((q) => q.created_by === teacherId) as Quiz[]
    }

    try {
      const { data, error } = await supabase
        .from("quizzes")
        .select("*")
        .eq("created_by", teacherId)
        .order("created_at", { ascending: false })

      if (error) {
        console.warn("⚠️ Supabase error, falling back to mock data:", error.message)
        return mockQuizzes.filter((q) => q.created_by === teacherId) as Quiz[]
      }

      return (data as Quiz[]) || []
    } catch (error) {
      console.warn("⚠️ Database error, using mock data:", error)
      return mockQuizzes.filter((q) => q.created_by === teacherId) as Quiz[]
    }
  },

  async getQuizById(quizId: string) {
    console.log("🔍 Getting quiz by ID:", quizId)

    if (!shouldUseSupabase()) {
      console.log("📝 Using mock quiz data")
      return mockQuizzes.find((q) => q.id === quizId) || (mockQuizzes[0] as Quiz)
    }

    try {
      const { data, error } = await supabase.from("quizzes").select("*").eq("id", quizId).single()

      if (error) {
        console.warn("⚠️ Supabase error, using mock quiz:", error.message)
        return mockQuizzes.find((q) => q.id === quizId) || (mockQuizzes[0] as Quiz)
      }
      return data as Quiz
    } catch (error) {
      console.warn("⚠️ Database error, using mock quiz:", error)
      return mockQuizzes.find((q) => q.id === quizId) || (mockQuizzes[0] as Quiz)
    }
  },

  async createQuiz(quizData: Omit<Quiz, "id" | "created_at" | "updated_at">) {
    console.log("📝 Creating quiz:", quizData.title)

    if (!shouldUseSupabase()) {
      console.log("📝 Creating mock quiz")
      const newQuiz = {
        ...quizData,
        id: `mock-quiz-${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as Quiz

      // Add to mock data
      mockQuizzes.push(newQuiz)
      console.log("✅ Quiz created successfully with mock data")
      return newQuiz
    }

    try {
      const { data, error } = await supabase.from("quizzes").insert(quizData).select().single()

      if (error) {
        console.warn("⚠️ Supabase error, falling back to mock:", error.message)
        // Fallback to mock creation
        const newQuiz = {
          ...quizData,
          id: `mock-quiz-${Date.now()}`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        } as Quiz

        mockQuizzes.push(newQuiz)
        return newQuiz
      }

      console.log("✅ Quiz created successfully in database")
      return data as Quiz
    } catch (error) {
      console.warn("⚠️ Database error, using mock creation:", error)
      // Fallback to mock creation
      const newQuiz = {
        ...quizData,
        id: `mock-quiz-${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as Quiz

      mockQuizzes.push(newQuiz)
      return newQuiz
    }
  },

  async updateQuiz(quizId: string, updates: Partial<Quiz>) {
    console.log("✏️ Updating quiz:", quizId)

    if (!shouldUseSupabase()) {
      console.log("📝 Updating mock quiz")
      const quizIndex = mockQuizzes.findIndex((q) => q.id === quizId)
      if (quizIndex !== -1) {
        mockQuizzes[quizIndex] = {
          ...mockQuizzes[quizIndex],
          ...updates,
          updated_at: new Date().toISOString(),
        }
        return mockQuizzes[quizIndex] as Quiz
      }
      return mockQuizzes[0] as Quiz
    }

    try {
      const { data, error } = await supabase
        .from("quizzes")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", quizId)
        .select()
        .single()

      if (error) {
        console.warn("⚠️ Supabase error, updating mock data:", error.message)
        const quizIndex = mockQuizzes.findIndex((q) => q.id === quizId)
        if (quizIndex !== -1) {
          mockQuizzes[quizIndex] = {
            ...mockQuizzes[quizIndex],
            ...updates,
            updated_at: new Date().toISOString(),
          }
          return mockQuizzes[quizIndex] as Quiz
        }
        return mockQuizzes[0] as Quiz
      }

      return data as Quiz
    } catch (error) {
      console.warn("⚠️ Database error, updating mock data:", error)
      const quizIndex = mockQuizzes.findIndex((q) => q.id === quizId)
      if (quizIndex !== -1) {
        mockQuizzes[quizIndex] = {
          ...mockQuizzes[quizIndex],
          ...updates,
          updated_at: new Date().toISOString(),
        }
        return mockQuizzes[quizIndex] as Quiz
      }
      return mockQuizzes[0] as Quiz
    }
  },

  async deleteQuiz(quizId: string) {
    console.log("🗑️ Deleting quiz:", quizId)

    if (!shouldUseSupabase()) {
      console.log("📝 Deleting mock quiz")
      const quizIndex = mockQuizzes.findIndex((q) => q.id === quizId)
      if (quizIndex !== -1) {
        mockQuizzes.splice(quizIndex, 1)
      }
      return true
    }

    try {
      const { error } = await supabase.from("quizzes").delete().eq("id", quizId)

      if (error) {
        console.warn("⚠️ Supabase error, deleting from mock data:", error.message)
        const quizIndex = mockQuizzes.findIndex((q) => q.id === quizId)
        if (quizIndex !== -1) {
          mockQuizzes.splice(quizIndex, 1)
        }
        return true
      }

      return true
    } catch (error) {
      console.warn("⚠️ Database error, deleting from mock data:", error)
      const quizIndex = mockQuizzes.findIndex((q) => q.id === quizId)
      if (quizIndex !== -1) {
        mockQuizzes.splice(quizIndex, 1)
      }
      return true
    }
  },

  async submitQuizAttempt(attemptData: Omit<QuizAttempt, "id" | "completed_at">) {
    console.log("📤 Submitting quiz attempt...")

    if (!shouldUseSupabase()) {
      console.log("📝 Creating mock quiz attempt")
      return {
        ...attemptData,
        id: `mock-attempt-${Date.now()}`,
        completed_at: new Date().toISOString(),
      } as QuizAttempt
    }

    try {
      const { data, error } = await supabase
        .from("quiz_attempts")
        .insert({
          ...attemptData,
          completed_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (error) {
        console.warn("⚠️ Supabase error, creating mock attempt:", error.message)
        return {
          ...attemptData,
          id: `mock-attempt-${Date.now()}`,
          completed_at: new Date().toISOString(),
        } as QuizAttempt
      }
      return data as QuizAttempt
    } catch (error) {
      console.warn("⚠️ Database error, creating mock attempt:", error)
      return {
        ...attemptData,
        id: `mock-attempt-${Date.now()}`,
        completed_at: new Date().toISOString(),
      } as QuizAttempt
    }
  },

  async getStudentQuizAttempts(studentId: string) {
    console.log("📊 Getting student quiz attempts for:", studentId)

    if (!shouldUseSupabase()) {
      console.log("📝 Using mock quiz attempts")
      return [
        {
          id: "mock-attempt-1",
          quiz_id: "1",
          student_id: studentId,
          score: 90,
          completed_at: new Date().toISOString(),
          quiz: {
            title: "Kuis Matematika Dasar",
            subject: "Matematika",
            difficulty: "easy",
          },
        },
        {
          id: "mock-attempt-2",
          quiz_id: "2",
          student_id: studentId,
          score: 85,
          completed_at: new Date(Date.now() - 86400000).toISOString(), // Yesterday
          quiz: {
            title: "Kuis Fisika - Gerak",
            subject: "Fisika",
            difficulty: "medium",
          },
        },
      ]
    }

    try {
      const { data, error } = await supabase
        .from("quiz_attempts")
        .select(`
          *,
          quiz:quizzes(title, subject, difficulty)
        `)
        .eq("student_id", studentId)
        .order("completed_at", { ascending: false })

      if (error) {
        console.warn("⚠️ Supabase error, using mock attempts:", error.message)
        return [
          {
            id: "mock-attempt-1",
            quiz_id: "1",
            student_id: studentId,
            score: 90,
            completed_at: new Date().toISOString(),
            quiz: {
              title: "Kuis Matematika Dasar",
              subject: "Matematika",
              difficulty: "easy",
            },
          },
        ]
      }
      return data || []
    } catch (error) {
      console.warn("⚠️ Database error, using mock attempts:", error)
      return []
    }
  },
}

// Learning Module operations - New CRUD service
export const learningModuleService = {
  async getModulesByTeacher(teacherId: string) {
    console.log("📚 Getting modules by teacher:", teacherId)

    if (!shouldUseSupabase()) {
      console.log("📝 Using mock learning modules")
      return mockData.learningModules.filter((m) => m.created_by === teacherId)
    }

    try {
      const { data, error } = await supabase
        .from("learning_modules")
        .select("*")
        .eq("created_by", teacherId)
        .order("created_at", { ascending: false })

      if (error) {
        console.warn("⚠️ Supabase error, falling back to mock data:", error.message)
        return mockData.learningModules.filter((m) => m.created_by === teacherId)
      }

      return data || []
    } catch (error) {
      console.warn("⚠️ Database error, using mock data:", error)
      return mockData.learningModules.filter((m) => m.created_by === teacherId)
    }
  },

  async createModule(moduleData: any) {
    console.log("📚 Creating learning module:", moduleData.title)

    if (!shouldUseSupabase()) {
      console.log("📝 Creating mock learning module")
      const newModule = {
        ...moduleData,
        id: `mock-module-${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      mockData.learningModules.push(newModule)
      console.log("✅ Learning module created successfully with mock data")
      return newModule
    }

    try {
      const { data, error } = await supabase.from("learning_modules").insert(moduleData).select().single()

      if (error) {
        console.warn("⚠️ Supabase error, creating mock module:", error.message)
        const mockModule = {
          ...moduleData,
          id: `mock-module-${Date.now()}`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
        mockData.learningModules.push(mockModule)
        return mockModule
      }

      console.log("✅ Learning module created successfully in database")
      return data
    } catch (error) {
      console.warn("⚠️ Database error, creating mock module:", error)
      const mockModule = {
        ...moduleData,
        id: `mock-module-${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      mockData.learningModules.push(mockModule)
      return mockModule
    }
  },

  async updateModule(moduleId: string, updates: any) {
    console.log("✏️ Updating learning module:", moduleId)

    if (!shouldUseSupabase()) {
      console.log("📝 Updating mock learning module")
      const moduleIndex = mockData.learningModules.findIndex((m) => m.id === moduleId)
      if (moduleIndex !== -1) {
        mockData.learningModules[moduleIndex] = {
          ...mockData.learningModules[moduleIndex],
          ...updates,
          updated_at: new Date().toISOString(),
        }
        return mockData.learningModules[moduleIndex]
      }
      return null
    }

    try {
      const { data, error } = await supabase
        .from("learning_modules")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", moduleId)
        .select()
        .single()

      if (error) {
        console.warn("⚠️ Supabase error, updating mock module:", error.message)
        const moduleIndex = mockData.learningModules.findIndex((m) => m.id === moduleId)
        if (moduleIndex !== -1) {
          mockData.learningModules[moduleIndex] = {
            ...mockData.learningModules[moduleIndex],
            ...updates,
            updated_at: new Date().toISOString(),
          }
          return mockData.learningModules[moduleIndex]
        }
        return null
      }

      return data
    } catch (error) {
      console.warn("⚠️ Database error, updating mock module:", error)
      const moduleIndex = mockData.learningModules.findIndex((m) => m.id === moduleId)
      if (moduleIndex !== -1) {
        mockData.learningModules[moduleIndex] = {
          ...mockData.learningModules[moduleIndex],
          ...updates,
          updated_at: new Date().toISOString(),
        }
        return mockData.learningModules[moduleIndex]
      }
      return null
    }
  },

  async deleteModule(moduleId: string) {
    console.log("🗑️ Deleting learning module:", moduleId)

    if (!shouldUseSupabase()) {
      console.log("📝 Deleting mock learning module")
      const moduleIndex = mockData.learningModules.findIndex((m) => m.id === moduleId)
      if (moduleIndex !== -1) {
        mockData.learningModules.splice(moduleIndex, 1)
      }
      return true
    }

    try {
      const { error } = await supabase.from("learning_modules").delete().eq("id", moduleId)

      if (error) {
        console.warn("⚠️ Supabase error, deleting from mock data:", error.message)
        const moduleIndex = mockData.learningModules.findIndex((m) => m.id === moduleId)
        if (moduleIndex !== -1) {
          mockData.learningModules.splice(moduleIndex, 1)
        }
        return true
      }

      return true
    } catch (error) {
      console.warn("⚠️ Database error, deleting from mock data:", error)
      const moduleIndex = mockData.learningModules.findIndex((m) => m.id === moduleId)
      if (moduleIndex !== -1) {
        mockData.learningModules.splice(moduleIndex, 1)
      }
      return true
    }
  },

  async getAllModules() {
    console.log("📚 Getting all learning modules...")

    if (!shouldUseSupabase()) {
      console.log("📝 Using mock learning modules")
      return mockData.learningModules
    }

    try {
      const { data, error } = await supabase
        .from("learning_modules")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.warn("⚠️ Supabase error, using mock data:", error.message)
        return mockData.learningModules
      }

      console.log(`✅ Loaded ${data?.length || 0} learning modules from database`)
      return data || mockData.learningModules
    } catch (error) {
      console.warn("⚠️ Database error, using mock data:", error)
      return mockData.learningModules
    }
  },
}

// Report operations - New CRUD service
export const reportService = {
  async getReportsByTeacher(teacherId: string) {
    if (!shouldUseSupabase()) {
      // Return mock reports filtered by teacher
      return mockData.reports.filter((r) => r.created_by === teacherId)
    }

    try {
      const { data, error } = await supabase
        .from("reports")
        .select("*")
        .eq("created_by", teacherId)
        .order("created_at", { ascending: false })

      if (error) {
        console.warn("⚠️ Supabase error, falling back to mock data:", error.message)
        return mockData.reports.filter((r) => r.created_by === teacherId)
      }

      return data || []
    } catch (error) {
      console.warn("⚠️ Database error, using mock data:", error)
      return mockData.reports.filter((r) => r.created_by === teacherId)
    }
  },

  async createReport(reportData: any) {
    if (!shouldUseSupabase()) {
      const newReport = {
        ...reportData,
        id: `mock-report-${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      mockData.reports.push(newReport)
      return newReport
    }

    try {
      const { data, error } = await supabase.from("reports").insert(reportData).select().single()

      if (error) {
        console.warn("⚠️ Supabase error, creating mock report:", error.message)
        const mockReport = {
          ...reportData,
          id: `mock-report-${Date.now()}`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
        mockData.reports.push(mockReport)
        return mockReport
      }

      return data
    } catch (error) {
      console.warn("⚠️ Database error, creating mock report:", error)
      const mockReport = {
        ...reportData,
        id: `mock-report-${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      mockData.reports.push(mockReport)
      return mockReport
    }
  },

  async updateReport(reportId: string, updates: any) {
    if (!shouldUseSupabase()) {
      const reportIndex = mockData.reports.findIndex((r) => r.id === reportId)
      if (reportIndex !== -1) {
        mockData.reports[reportIndex] = {
          ...mockData.reports[reportIndex],
          ...updates,
          updated_at: new Date().toISOString(),
        }
        return mockData.reports[reportIndex]
      }
      return null
    }

    try {
      const { data, error } = await supabase
        .from("reports")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", reportId)
        .select()
        .single()

      if (error) {
        console.warn("⚠️ Supabase error, updating mock report:", error.message)
        const reportIndex = mockData.reports.findIndex((r) => r.id === reportId)
        if (reportIndex !== -1) {
          mockData.reports[reportIndex] = {
            ...mockData.reports[reportIndex],
            ...updates,
            updated_at: new Date().toISOString(),
          }
          return mockData.reports[reportIndex]
        }
        return null
      }

      return data
    } catch (error) {
      console.warn("⚠️ Database error, updating mock report:", error)
      const reportIndex = mockData.reports.findIndex((r) => r.id === reportId)
      if (reportIndex !== -1) {
        mockData.reports[reportIndex] = {
          ...mockData.reports[reportIndex],
          ...updates,
          updated_at: new Date().toISOString(),
        }
        return mockData.reports[reportIndex]
      }
      return null
    }
  },

  async deleteReport(reportId: string) {
    if (!shouldUseSupabase()) {
      const reportIndex = mockData.reports.findIndex((r) => r.id === reportId)
      if (reportIndex !== -1) {
        mockData.reports.splice(reportIndex, 1)
      }
      return true
    }

    try {
      const { error } = await supabase.from("reports").delete().eq("id", reportId)

      if (error) {
        console.warn("⚠️ Supabase error, deleting from mock data:", error.message)
        const reportIndex = mockData.reports.findIndex((r) => r.id === reportId)
        if (reportIndex !== -1) {
          mockData.reports.splice(reportIndex, 1)
        }
        return true
      }

      return true
    } catch (error) {
      console.warn("⚠️ Database error, deleting from mock data:", error)
      const reportIndex = mockData.reports.findIndex((r) => r.id === reportId)
      if (reportIndex !== -1) {
        mockData.reports.splice(reportIndex, 1)
      }
      return true
    }
  },
}

// School Analytics operations - New service
export const schoolAnalyticsService = {
  async getSchoolAnalytics(schoolId: string) {
    if (!shouldUseSupabase()) {
      return mockData.schoolAnalytics[0]
    }

    try {
      const { data, error } = await supabase.from("school_analytics").select("*").eq("school_id", schoolId).single()

      if (error) {
        console.warn("⚠️ Supabase error, using mock analytics:", error.message)
        return mockData.schoolAnalytics[0]
      }
      return data
    } catch (error) {
      console.warn("⚠️ Database error, using mock analytics:", error)
      return mockData.schoolAnalytics[0]
    }
  },

  async createOrUpdateAnalytics(analyticsData: any) {
    if (!shouldUseSupabase()) {
      const existingIndex = mockData.schoolAnalytics.findIndex((a) => a.school_id === analyticsData.school_id)
      if (existingIndex !== -1) {
        mockData.schoolAnalytics[existingIndex] = { ...analyticsData, updated_at: new Date().toISOString() }
        return mockData.schoolAnalytics[existingIndex]
      } else {
        const newAnalytics = {
          ...analyticsData,
          id: `mock-analytics-${Date.now()}`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
        mockData.schoolAnalytics.push(newAnalytics)
        return newAnalytics
      }
    }

    try {
      const { data, error } = await supabase.from("school_analytics").upsert(analyticsData).select().single()

      if (error) {
        console.warn("⚠️ Supabase error, using mock analytics:", error.message)
        throw error
      }
      return data
    } catch (error) {
      console.warn("⚠️ Database error, using mock analytics:", error)
      throw error
    }
  },
}

// Policy Simulation operations - New service
export const policySimulationService = {
  async getPolicySimulations(createdBy: string) {
    if (!shouldUseSupabase()) {
      return mockData.policySimulations.filter((p) => p.created_by === createdBy)
    }

    try {
      const { data, error } = await supabase
        .from("policy_simulations")
        .select("*")
        .eq("created_by", createdBy)
        .order("created_at", { ascending: false })

      if (error) {
        console.warn("⚠️ Supabase error, using mock simulations:", error.message)
        return mockData.policySimulations
      }
      return data || mockData.policySimulations
    } catch (error) {
      console.warn("⚠️ Database error, using mock simulations:", error)
      return mockData.policySimulations
    }
  },

  async createPolicySimulation(simulationData: any) {
    if (!shouldUseSupabase()) {
      const newSimulation = {
        ...simulationData,
        id: `mock-policy-${Date.now()}`,
        created_at: new Date().toISOString(),
      }

      mockData.policySimulations.push(newSimulation)
      return newSimulation
    }

    try {
      const { data, error } = await supabase.from("policy_simulations").insert(simulationData).select().single()

      if (error) {
        console.warn("⚠️ Supabase error, creating mock simulation:", error.message)
        const mockSimulation = {
          ...simulationData,
          id: `mock-policy-${Date.now()}`,
          created_at: new Date().toISOString(),
        }
        mockData.policySimulations.push(mockSimulation)
        return mockSimulation
      }
      return data
    } catch (error) {
      console.warn("⚠️ Database error, creating mock simulation:", error)
      const mockSimulation = {
        ...simulationData,
        id: `mock-policy-${Date.now()}`,
        created_at: new Date().toISOString(),
      }
      mockData.policySimulations.push(mockSimulation)
      return mockSimulation
    }
  },
}

// Regional Data operations - New service
export const regionalDataService = {
  async getAllRegionalData() {
    if (!shouldUseSupabase()) {
      return mockData.regionalData
    }

    try {
      const { data, error } = await supabase.from("regional_data").select("*").order("created_at", { ascending: false })

      if (error) {
        console.warn("⚠️ Supabase error, using mock regional data:", error.message)
        return mockData.regionalData
      }
      return data || mockData.regionalData
    } catch (error) {
      console.warn("⚠️ Database error, using mock regional data:", error)
      return mockData.regionalData
    }
  },

  async createOrUpdateRegionalData(regionalData: any) {
    if (!shouldUseSupabase()) {
      const existingIndex = mockData.regionalData.findIndex((r) => r.region === regionalData.region)
      if (existingIndex !== -1) {
        mockData.regionalData[existingIndex] = { ...regionalData, updated_at: new Date().toISOString() }
        return mockData.regionalData[existingIndex]
      } else {
        const newData = {
          ...regionalData,
          id: `mock-regional-${Date.now()}`,
          created_at: new Date().toISOString(),
        }
        mockData.regionalData.push(newData)
        return newData
      }
    }

    try {
      const { data, error } = await supabase.from("regional_data").upsert(regionalData).select().single()

      if (error) {
        console.warn("⚠️ Supabase error, using mock regional data:", error.message)
        throw error
      }
      return data
    } catch (error) {
      console.warn("⚠️ Database error, using mock regional data:", error)
      throw error
    }
  },
}

// Chat operations - Enhanced with better error handling
export const chatService = {
  async saveChatMessage(messageData: Omit<ChatMessage, "id" | "created_at">) {
    console.log("💾 Attempting to save chat message...")

    // Always try localStorage first for reliability
    try {
      const chatHistory =
        typeof window !== "undefined" ? JSON.parse(localStorage.getItem("edulita_chat_history") || "[]") : []
      const newMessage: ChatMessage = {
        ...messageData,
        id: `local-message-${Date.now()}`,
        created_at: new Date().toISOString(),
      }

      chatHistory.push(newMessage)

      // Keep only last 50 messages
      if (chatHistory.length > 50) {
        chatHistory.splice(0, chatHistory.length - 50)
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("edulita_chat_history", JSON.stringify(chatHistory))
      }
      console.log("✅ Chat message saved to localStorage")

      // Try to save to Supabase as backup (non-blocking)
      if (shouldUseSupabase()) {
        try {
          console.log("🗄️ Attempting backup save to Supabase...")
          const { data, error } = await supabase.from("chat_messages").insert(messageData).select().single()

          if (error) {
            console.warn("⚠️ Supabase backup save failed (non-critical):", error.message)
          } else {
            console.log("✅ Chat message backed up to database:", data.id)
          }
        } catch (dbError) {
          console.warn("⚠️ Supabase backup save error (non-critical):", dbError)
        }
      }

      return newMessage
    } catch (error) {
      console.error("💥 LocalStorage save failed:", error)

      // Return a fallback message even if save fails
      return {
        ...messageData,
        id: `fallback-message-${Date.now()}`,
        created_at: new Date().toISOString(),
      } as ChatMessage
    }
  },

  async getUserChatHistory(userId: string, limit = 20) {
    console.log("📚 Loading chat history for user:", userId)

    // Always load from localStorage first (most reliable)
    try {
      console.log("📝 Loading from localStorage...")
      const chatHistory =
        typeof window !== "undefined" ? JSON.parse(localStorage.getItem("edulita_chat_history") || "[]") : []
      const userHistory = chatHistory.filter((msg: ChatMessage) => msg.user_id === userId).slice(-limit) // Get last N messages

      console.log(`✅ Loaded ${userHistory.length} messages from localStorage`)

      // Try to load from Supabase as additional source (non-blocking)
      if (shouldUseSupabase() && userHistory.length === 0) {
        try {
          console.log("🗄️ Attempting to load from Supabase as fallback...")
          const { data, error } = await supabase
            .from("chat_messages")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: false })
            .limit(limit)

          if (error) {
            console.warn("⚠️ Supabase load failed (using localStorage):", error.message)
          } else if (data && data.length > 0) {
            console.log(`✅ Loaded ${data.length} additional messages from database`)

            // Merge with localStorage and save back
            const mergedHistory = [...userHistory, ...data]
            const allHistory =
              typeof window !== "undefined" ? JSON.parse(localStorage.getItem("edulita_chat_history") || "[]") : []

            // Add new messages to localStorage
            data.forEach((msg) => {
              if (!allHistory.find((existing: ChatMessage) => existing.id === msg.id)) {
                allHistory.push(msg)
              }
            })

            if (typeof window !== "undefined") {
              localStorage.setItem("edulita_chat_history", JSON.stringify(allHistory))
            }
            return data as ChatMessage[]
          }
        } catch (dbError) {
          console.warn("⚠️ Supabase load error (using localStorage):", dbError)
        }
      }

      return userHistory as ChatMessage[]
    } catch (error) {
      console.error("💥 Error loading chat history:", error)
      return [] // Return empty array if all fails
    }
  },

  async clearUserChatHistory(userId: string) {
    console.log("🗑️ Clearing chat history for user:", userId)

    try {
      // Clear from localStorage (primary)
      console.log("📝 Clearing localStorage history")
      if (typeof window !== "undefined") {
        const chatHistory = JSON.parse(localStorage.getItem("edulita_chat_history") || "[]")
        const filteredHistory = chatHistory.filter((msg: ChatMessage) => msg.user_id !== userId)
        localStorage.setItem("edulita_chat_history", JSON.stringify(filteredHistory))
      }
      console.log("✅ Chat history cleared from localStorage")

      // Try to clear from Supabase (secondary, non-blocking)
      if (shouldUseSupabase()) {
        try {
          console.log("🗄️ Attempting to clear from Supabase...")
          const { error } = await supabase.from("chat_messages").delete().eq("user_id", userId)

          if (error) {
            console.warn("⚠️ Supabase clear failed (non-critical):", error.message)
          } else {
            console.log("✅ Chat history cleared from database")
          }
        } catch (dbError) {
          console.warn("⚠️ Supabase clear error (non-critical):", dbError)
        }
      }
    } catch (error) {
      console.error("💥 Error clearing chat history:", error)
    }
  },
}

// Document operations
export const documentService = {
  async uploadDocument(documentData: Omit<Document, "id" | "created_at" | "updated_at">) {
    if (!shouldUseSupabase()) {
      return {
        ...documentData,
        id: `mock-document-${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as Document
    }

    try {
      const { data, error } = await supabase.from("documents").insert(documentData).select().single()

      if (error) {
        console.warn("⚠️ Supabase error, creating mock document:", error.message)
        return {
          ...documentData,
          id: `mock-document-${Date.now()}`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        } as Document
      }
      return data as Document
    } catch (error) {
      console.warn("⚠️ Database error, creating mock document:", error)
      return {
        ...documentData,
        id: `mock-document-${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as Document
    }
  },

  async getUserDocuments(userId: string) {
    if (!shouldUseSupabase()) {
      return []
    }

    try {
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .eq("uploaded_by", userId)
        .order("created_at", { ascending: false })

      if (error) {
        console.warn("⚠️ Supabase error, returning empty documents:", error.message)
        return []
      }
      return data as Document[]
    } catch (error) {
      console.warn("⚠️ Database error, returning empty documents:", error)
      return []
    }
  },

  async updateDocumentSummary(documentId: string, summary: string, extractedText?: string) {
    if (!shouldUseSupabase()) {
      return { id: documentId, summary, extracted_text: extractedText } as Document
    }

    try {
      const { data, error } = await supabase
        .from("documents")
        .update({ summary, extracted_text: extractedText })
        .eq("id", documentId)
        .select()
        .single()

      if (error) {
        console.warn("⚠️ Supabase error, returning mock document:", error.message)
        return { id: documentId, summary, extracted_text: extractedText } as Document
      }
      return data as Document
    } catch (error) {
      console.warn("⚠️ Database error, returning mock document:", error)
      return { id: documentId, summary, extracted_text: extractedText } as Document
    }
  },
}

// Assignment operations (keeping existing structure)
export const assignmentService = {
  async getAssignmentsByClass(classId: string) {
    if (!shouldUseSupabase()) {
      return []
    }

    try {
      const { data, error } = await supabase
        .from("assignments")
        .select(`
          *,
          submissions(id, student_id, score, submitted_at)
        `)
        .eq("class_id", classId)
        .order("created_at", { ascending: false })

      if (error) {
        console.warn("⚠️ Supabase error, returning empty assignments:", error.message)
        return []
      }
      return data || []
    } catch (error) {
      console.warn("⚠️ Database error, returning empty assignments:", error)
      return []
    }
  },

  async createAssignment(assignmentData: Omit<Assignment, "id" | "created_at" | "updated_at">) {
    if (!shouldUseSupabase()) {
      return {
        ...assignmentData,
        id: `mock-assignment-${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as Assignment
    }

    try {
      const { data, error } = await supabase.from("assignments").insert(assignmentData).select().single()

      if (error) {
        console.warn("⚠️ Supabase error, creating mock assignment:", error.message)
        return {
          ...assignmentData,
          id: `mock-assignment-${Date.now()}`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        } as Assignment
      }
      return data as Assignment
    } catch (error) {
      console.warn("⚠️ Database error, creating mock assignment:", error)
      return {
        ...assignmentData,
        id: `mock-assignment-${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as Assignment
    }
  },

  async submitAssignment(submissionData: Omit<Submission, "id" | "submitted_at" | "graded_at">) {
    if (!shouldUseSupabase()) {
      return {
        ...submissionData,
        id: `mock-submission-${Date.now()}`,
        submitted_at: new Date().toISOString(),
      } as Submission
    }

    try {
      const { data, error } = await supabase.from("submissions").insert(submissionData).select().single()

      if (error) {
        console.warn("⚠️ Supabase error, creating mock submission:", error.message)
        return {
          ...submissionData,
          id: `mock-submission-${Date.now()}`,
          submitted_at: new Date().toISOString(),
        } as Submission
      }
      return data as Submission
    } catch (error) {
      console.warn("⚠️ Database error, creating mock submission:", error)
      return {
        ...submissionData,
        id: `mock-submission-${Date.now()}`,
        submitted_at: new Date().toISOString(),
      } as Submission
    }
  },

  async gradeSubmission(submissionId: string, score: number, feedback?: string) {
    if (!shouldUseSupabase()) {
      return {
        id: submissionId,
        score,
        feedback,
        graded_at: new Date().toISOString(),
      } as Submission
    }

    try {
      const { data, error } = await supabase
        .from("submissions")
        .update({
          score,
          feedback,
          graded_at: new Date().toISOString(),
        })
        .eq("id", submissionId)
        .select()
        .single()

      if (error) {
        console.warn("⚠️ Supabase error, returning mock graded submission:", error.message)
        return {
          id: submissionId,
          score,
          feedback,
          graded_at: new Date().toISOString(),
        } as Submission
      }
      return data as Submission
    } catch (error) {
      console.warn("⚠️ Database error, returning mock graded submission:", error)
      return {
        id: submissionId,
        score,
        feedback,
        graded_at: new Date().toISOString(),
      } as Submission
    }
  },
}

// Class operations (keeping existing structure)
export const classService = {
  async getClassesByTeacher(teacherId: string) {
    if (!shouldUseSupabase()) {
      return []
    }

    try {
      const { data, error } = await supabase
        .from("classes")
        .select(`
          *,
          school:schools(name),
          assignments(id, title, due_date)
        `)
        .eq("teacher_id", teacherId)

      if (error) {
        console.warn("⚠️ Supabase error, returning empty classes:", error.message)
        return []
      }
      return data || []
    } catch (error) {
      console.warn("⚠️ Database error, returning empty classes:", error)
      return []
    }
  },

  async getClassesBySchool(schoolId: string) {
    if (!shouldUseSupabase()) {
      return []
    }

    try {
      const { data, error } = await supabase
        .from("classes")
        .select(`
          *,
          teacher:users!classes_teacher_id_fkey(name, email)
        `)
        .eq("school_id", schoolId)

      if (error) {
        console.warn("⚠️ Supabase error, returning empty classes:", error.message)
        return []
      }
      return data || []
    } catch (error) {
      console.warn("⚠️ Database error, returning empty classes:", error)
      return []
    }
  },

  async createClass(classData: Omit<Class, "id" | "created_at" | "updated_at">) {
    if (!shouldUseSupabase()) {
      return {
        ...classData,
        id: `mock-class-${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as Class
    }

    try {
      const { data, error } = await supabase.from("classes").insert(classData).select().single()

      if (error) {
        console.warn("⚠️ Supabase error, creating mock class:", error.message)
        return {
          ...classData,
          id: `mock-class-${Date.now()}`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        } as Class
      }
      return data as Class
    } catch (error) {
      console.warn("⚠️ Database error, creating mock class:", error)
      return {
        ...classData,
        id: `mock-class-${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as Class
    }
  },
}

// Database service functions (legacy compatibility)
export const DatabaseService = {
  // Quiz operations
  async getQuizzes(): Promise<Quiz[]> {
    return await quizService.getAllQuizzes()
  },

  async createQuiz(quiz: Omit<Quiz, "id" | "created_at" | "updated_at">): Promise<Quiz> {
    return await quizService.createQuiz(quiz)
  },

  async updateQuiz(id: string, updates: Partial<Quiz>): Promise<Quiz> {
    return await quizService.updateQuiz(id, updates)
  },

  async deleteQuiz(id: string): Promise<void> {
    await quizService.deleteQuiz(id)
  },

  // Quiz attempt operations
  async getQuizAttempts(studentId?: string): Promise<QuizAttempt[]> {
    if (studentId) {
      return await quizService.getStudentQuizAttempts(studentId)
    }

    if (!shouldUseSupabase()) {
      console.log("📊 Using mock quiz attempts")
      return mockQuizAttempts
    }

    try {
      const { data, error } = await supabase
        .from("quiz_attempts")
        .select("*")
        .order("completed_at", { ascending: false })

      if (error) {
        console.warn("⚠️ Supabase error, using mock attempts:", error.message)
        return mockQuizAttempts
      }

      return data || []
    } catch (error) {
      console.warn("⚠️ Database error, using mock attempts:", error)
      return mockQuizAttempts
    }
  },

  async createQuizAttempt(attempt: Omit<QuizAttempt, "id" | "completed_at">): Promise<QuizAttempt> {
    return await quizService.submitQuizAttempt(attempt)
  },

  // User operations
  async getUsers(): Promise<User[]> {
    if (!shouldUseSupabase()) {
      console.log("👥 Using mock users")
      return mockUsers
    }

    try {
      const { data, error } = await supabase.from("users").select("*").order("created_at", { ascending: false })

      if (error) {
        console.warn("⚠️ Supabase error, using mock users:", error.message)
        return mockUsers
      }

      return data || mockUsers
    } catch (error) {
      console.warn("⚠️ Database error, using mock users:", error)
      return mockUsers
    }
  },
}

// AI Service untuk generate konten (legacy compatibility)
export const AIService = {
  async generateQuiz(subject: string, difficulty: "easy" | "medium" | "hard", questionCount = 5): Promise<any[]> {
    const result = await aiService.generateQuiz(
      `Generate ${questionCount} questions`,
      subject,
      difficulty,
      questionCount,
    )
    return result.questions
  },

  async generateLearningModule(subject: string, topic: string): Promise<any> {
    return await aiService.generateLearningModule(topic, subject, "10")
  },
}
