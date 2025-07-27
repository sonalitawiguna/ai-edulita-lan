"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ChatBot } from "@/components/chatbot/chatbot"
import { useAuth } from "@/hooks/use-auth"
import { quizService, reportService, learningModuleService, aiService } from "@/lib/database"
import { useToast } from "@/hooks/use-toast"
import {
  Users,
  BookOpen,
  ClipboardList,
  BarChart3,
  MessageSquare,
  FileText,
  TrendingUp,
  Target,
  LogOut,
  Plus,
  Download,
  Eye,
  Edit,
  CheckCircle,
  AlertCircle,
  Clock,
  Trash2,
  Save,
  Sparkles,
  Brain,
  Loader2,
  GraduationCap,
} from "lucide-react"

export function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [quizzes, setQuizzes] = useState<any[]>([])
  const [learningModules, setLearningModules] = useState<any[]>([])
  const [reports, setReports] = useState<any[]>([])
  const [isCreateQuizOpen, setIsCreateQuizOpen] = useState(false)
  const [isCreateModuleOpen, setIsCreateModuleOpen] = useState(false)
  const [isCreateReportOpen, setIsCreateReportOpen] = useState(false)
  const [editingQuiz, setEditingQuiz] = useState<any>(null)
  const [editingModule, setEditingModule] = useState<any>(null)
  const [editingReport, setEditingReport] = useState<any>(null)
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false)
  const [isGeneratingModule, setIsGeneratingModule] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = async () => {
    try {
      await logout()
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  // Load teacher's data
  useEffect(() => {
    const loadTeacherData = async () => {
      if (user?.id) {
        try {
          const teacherQuizzes = await quizService.getQuizzesByTeacher(user.id)
          const teacherModules = await learningModuleService.getModulesByTeacher(user.id)
          const teacherReports = await reportService.getReportsByTeacher(user.id)
          setQuizzes(teacherQuizzes)
          setLearningModules(teacherModules)
          setReports(teacherReports)
        } catch (error) {
          console.error("Error loading teacher data:", error)
        }
      }
    }

    loadTeacherData()
  }, [user?.id])

  // Quiz form state
  const [quizForm, setQuizForm] = useState({
    title: "",
    subject: "",
    difficulty: "medium",
    questions: [
      {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
        explanation: "",
      },
    ],
  })

  // AI Quiz generation form
  const [aiQuizForm, setAiQuizForm] = useState({
    prompt: "",
    subject: "",
    difficulty: "medium",
    questionCount: 5,
  })

  // Learning Module form state
  const [moduleForm, setModuleForm] = useState({
    title: "",
    subject: "",
    grade: "",
    description: "",
    content: {
      objectives: [""],
      materials: [
        {
          type: "text",
          title: "",
          content: "",
        },
      ],
    },
  })

  // AI Module generation form
  const [aiModuleForm, setAiModuleForm] = useState({
    prompt: "",
    subject: "",
    grade: "",
  })

  // Report form state
  const [reportForm, setReportForm] = useState({
    title: "",
    type: "monthly",
    class: "",
    content: "",
  })

  const handleGenerateQuizWithAI = async () => {
    if (!aiQuizForm.prompt || !aiQuizForm.subject) {
      toast({
        title: "Error",
        description: "Mohon isi prompt dan mata pelajaran",
        variant: "destructive",
      })
      return
    }

    setIsGeneratingQuiz(true)
    try {
      const generatedQuiz = await aiService.generateQuiz(
        aiQuizForm.prompt,
        aiQuizForm.subject,
        aiQuizForm.difficulty,
        aiQuizForm.questionCount,
      )

      setQuizForm(generatedQuiz)
      setAiQuizForm({ prompt: "", subject: "", difficulty: "medium", questionCount: 5 })

      toast({
        title: "Kuis berhasil dibuat dengan AI",
        description: "Kuis telah dibuat, Anda dapat mengedit sebelum menyimpan",
      })
    } catch (error) {
      console.error("Error generating quiz with AI:", error)
      toast({
        title: "Error",
        description: "Gagal membuat kuis dengan AI",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingQuiz(false)
    }
  }

  const handleGenerateModuleWithAI = async () => {
    if (!aiModuleForm.prompt || !aiModuleForm.subject || !aiModuleForm.grade) {
      toast({
        title: "Error",
        description: "Mohon isi semua field yang diperlukan",
        variant: "destructive",
      })
      return
    }

    setIsGeneratingModule(true)
    try {
      const generatedModule = await aiService.generateLearningModule(
        aiModuleForm.prompt,
        aiModuleForm.subject,
        aiModuleForm.grade,
      )

      setModuleForm(generatedModule)
      setAiModuleForm({ prompt: "", subject: "", grade: "" })

      toast({
        title: "Modul berhasil dibuat dengan AI",
        description: "Modul telah dibuat, Anda dapat mengedit sebelum menyimpan",
      })
    } catch (error) {
      console.error("Error generating module with AI:", error)
      toast({
        title: "Error",
        description: "Gagal membuat modul dengan AI",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingModule(false)
    }
  }

  const handleCreateQuiz = async () => {
    try {
      const quizData = {
        ...quizForm,
        created_by: user?.id || "",
      }

      if (editingQuiz) {
        await quizService.updateQuiz(editingQuiz.id, quizData)
        toast({
          title: "Kuis berhasil diperbarui",
          description: "Kuis telah diperbarui dan dapat dilihat siswa",
        })
      } else {
        await quizService.createQuiz(quizData)
        toast({
          title: "Kuis berhasil dibuat",
          description: "Kuis baru telah dibuat dan dapat dilihat siswa",
        })
      }

      // Reload quizzes
      const updatedQuizzes = await quizService.getQuizzesByTeacher(user?.id || "")
      setQuizzes(updatedQuizzes)

      // Reset form
      setQuizForm({
        title: "",
        subject: "",
        difficulty: "medium",
        questions: [
          {
            question: "",
            options: ["", "", "", ""],
            correctAnswer: 0,
            explanation: "",
          },
        ],
      })
      setIsCreateQuizOpen(false)
      setEditingQuiz(null)
    } catch (error) {
      console.error("Error creating/updating quiz:", error)
      toast({
        title: "Error",
        description: "Gagal menyimpan kuis",
        variant: "destructive",
      })
    }
  }

  const handleCreateModule = async () => {
    try {
      const moduleData = {
        ...moduleForm,
        created_by: user?.id || "",
      }

      if (editingModule) {
        await learningModuleService.updateModule(editingModule.id, moduleData)
        toast({
          title: "Modul berhasil diperbarui",
          description: "Modul telah diperbarui",
        })
      } else {
        await learningModuleService.createModule(moduleData)
        toast({
          title: "Modul berhasil dibuat",
          description: "Modul baru telah dibuat",
        })
      }

      // Reload modules
      const updatedModules = await learningModuleService.getModulesByTeacher(user?.id || "")
      setLearningModules(updatedModules)

      // Reset form
      setModuleForm({
        title: "",
        subject: "",
        grade: "",
        description: "",
        content: {
          objectives: [""],
          materials: [
            {
              type: "text",
              title: "",
              content: "",
            },
          ],
        },
      })
      setIsCreateModuleOpen(false)
      setEditingModule(null)
    } catch (error) {
      console.error("Error creating/updating module:", error)
      toast({
        title: "Error",
        description: "Gagal menyimpan modul",
        variant: "destructive",
      })
    }
  }

  const handleCreateReport = async () => {
    try {
      const reportData = {
        ...reportForm,
        created_by: user?.id || "",
        status: "draft",
      }

      if (editingReport) {
        await reportService.updateReport(editingReport.id, reportData)
        toast({
          title: "Laporan berhasil diperbarui",
          description: "Laporan telah diperbarui",
        })
      } else {
        await reportService.createReport(reportData)
        toast({
          title: "Laporan berhasil dibuat",
          description: "Laporan baru telah dibuat",
        })
      }

      // Reload reports
      const updatedReports = await reportService.getReportsByTeacher(user?.id || "")
      setReports(updatedReports)

      // Reset form
      setReportForm({
        title: "",
        type: "monthly",
        class: "",
        content: "",
      })
      setIsCreateReportOpen(false)
      setEditingReport(null)
    } catch (error) {
      console.error("Error creating/updating report:", error)
      toast({
        title: "Error",
        description: "Gagal menyimpan laporan",
        variant: "destructive",
      })
    }
  }

  const handleDeleteQuiz = async (quizId: string) => {
    try {
      await quizService.deleteQuiz(quizId)
      const updatedQuizzes = await quizService.getQuizzesByTeacher(user?.id || "")
      setQuizzes(updatedQuizzes)
      toast({
        title: "Kuis berhasil dihapus",
        description: "Kuis telah dihapus dari sistem",
      })
    } catch (error) {
      console.error("Error deleting quiz:", error)
      toast({
        title: "Error",
        description: "Gagal menghapus kuis",
        variant: "destructive",
      })
    }
  }

  const handleDeleteModule = async (moduleId: string) => {
    try {
      await learningModuleService.deleteModule(moduleId)
      const updatedModules = await learningModuleService.getModulesByTeacher(user?.id || "")
      setLearningModules(updatedModules)
      toast({
        title: "Modul berhasil dihapus",
        description: "Modul telah dihapus dari sistem",
      })
    } catch (error) {
      console.error("Error deleting module:", error)
      toast({
        title: "Error",
        description: "Gagal menghapus modul",
        variant: "destructive",
      })
    }
  }

  const handleDeleteReport = async (reportId: string) => {
    try {
      await reportService.deleteReport(reportId)
      const updatedReports = await reportService.getReportsByTeacher(user?.id || "")
      setReports(updatedReports)
      toast({
        title: "Laporan berhasil dihapus",
        description: "Laporan telah dihapus dari sistem",
      })
    } catch (error) {
      console.error("Error deleting report:", error)
      toast({
        title: "Error",
        description: "Gagal menghapus laporan",
        variant: "destructive",
      })
    }
  }

  const addQuestion = () => {
    setQuizForm({
      ...quizForm,
      questions: [
        ...quizForm.questions,
        {
          question: "",
          options: ["", "", "", ""],
          correctAnswer: 0,
          explanation: "",
        },
      ],
    })
  }

  const updateQuestion = (index: number, field: string, value: any) => {
    const updatedQuestions = [...quizForm.questions]
    if (field === "options") {
      updatedQuestions[index].options = value
    } else {
      updatedQuestions[index] = { ...updatedQuestions[index], [field]: value }
    }
    setQuizForm({ ...quizForm, questions: updatedQuestions })
  }

  const addObjective = () => {
    setModuleForm({
      ...moduleForm,
      content: {
        ...moduleForm.content,
        objectives: [...moduleForm.content.objectives, ""],
      },
    })
  }

  const updateObjective = (index: number, value: string) => {
    const updatedObjectives = [...moduleForm.content.objectives]
    updatedObjectives[index] = value
    setModuleForm({
      ...moduleForm,
      content: {
        ...moduleForm.content,
        objectives: updatedObjectives,
      },
    })
  }

  const addMaterial = () => {
    setModuleForm({
      ...moduleForm,
      content: {
        ...moduleForm.content,
        materials: [
          ...moduleForm.content.materials,
          {
            type: "text",
            title: "",
            content: "",
          },
        ],
      },
    })
  }

  const updateMaterial = (index: number, field: string, value: any) => {
    const updatedMaterials = [...moduleForm.content.materials]
    updatedMaterials[index] = { ...updatedMaterials[index], [field]: value }
    setModuleForm({
      ...moduleForm,
      content: {
        ...moduleForm.content,
        materials: updatedMaterials,
      },
    })
  }

  const classData = [
    { class: "X IPA 1", students: 32, avgScore: 85.2, completion: 78 },
    { class: "X IPA 2", students: 30, avgScore: 82.7, completion: 85 },
    { class: "XI IPA 1", students: 28, avgScore: 88.1, completion: 92 },
  ]

  const recentAssignments = [
    { title: "Kuis Hukum Newton", class: "X IPA 1", submitted: 28, total: 32, avgScore: 87 },
    { title: "Tugas Aljabar Linear", class: "X IPA 2", submitted: 25, total: 30, avgScore: 82 },
    { title: "Praktikum Kimia", class: "XI IPA 1", submitted: 26, total: 28, avgScore: 90 },
  ]

  const studentAnalysis = [
    {
      name: "Ahmad Rizki",
      class: "X IPA 1",
      avgScore: 92,
      trend: "up",
      status: "excellent",
      recommendation: "Berikan tantangan lebih",
    },
    {
      name: "Siti Nurhaliza",
      class: "X IPA 1",
      avgScore: 65,
      trend: "down",
      status: "needs_attention",
      recommendation: "Perlu bimbingan khusus",
    },
    {
      name: "Budi Santoso",
      class: "X IPA 2",
      avgScore: 78,
      trend: "stable",
      status: "good",
      recommendation: "Pertahankan konsistensi",
    },
    {
      name: "Maya Sari",
      class: "XI IPA 1",
      avgScore: 88,
      trend: "up",
      status: "very_good",
      recommendation: "Kembangkan potensi lebih",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Guru</h1>
              <p className="text-gray-600">Kelola pembelajaran dan pantau progress siswa</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Guru Matematika
              </Badge>
              <div className="text-right">
                <p className="text-sm text-gray-600">Total Siswa</p>
                <p className="text-xl font-bold text-blue-600">90</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2 bg-transparent"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Ringkasan
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              AI Assistant
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4" />
              Kuis & Modul
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Analisis Siswa
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Laporan
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Kelas</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">90 siswa total</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Kuis Aktif</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{quizzes.length}</div>
                  <p className="text-xs text-muted-foreground">Dapat dikerjakan siswa</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Modul Ajar</CardTitle>
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{learningModules.length}</div>
                  <p className="text-xs text-muted-foreground">Modul pembelajaran</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Laporan</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{reports.length}</div>
                  <p className="text-xs text-muted-foreground">Total laporan</p>
                </CardContent>
              </Card>
            </div>

            {/* Class Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Overview Kelas</CardTitle>
                  <CardDescription>Ringkasan performa setiap kelas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {classData.map((classItem, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium">{classItem.class}</h4>
                        <p className="text-sm text-gray-600">{classItem.students} siswa</p>
                        <div className="mt-2">
                          <div className="flex justify-between text-xs mb-1">
                            <span>Completion Rate</span>
                            <span>{classItem.completion}%</span>
                          </div>
                          <Progress value={classItem.completion} className="h-2" />
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-lg font-bold text-blue-600">{classItem.avgScore}</p>
                        <p className="text-xs text-gray-500">Rata-rata</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Konten Terbaru</CardTitle>
                  <CardDescription>Kuis dan modul yang baru dibuat</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[...quizzes.slice(0, 2), ...learningModules.slice(0, 1)].map((item, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{item.title}</h4>
                        <Badge variant="outline">
                          {item.questions ? "Kuis" : "Modul"} - {item.subject}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>
                          {item.questions ? `${item.questions?.length || 0} soal` : `Kelas ${item.grade || "Semua"}`}
                        </span>
                        <span>{item.difficulty || "Pembelajaran"}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Dibuat: {new Date(item.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                  {quizzes.length === 0 && learningModules.length === 0 && (
                    <div className="text-center py-4 text-gray-500">
                      Belum ada konten. Buat kuis atau modul pertama Anda!
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="chat">
            <div className="max-w-4xl mx-auto">
              <ChatBot userRole="teacher" />
            </div>
          </TabsContent>

          <TabsContent value="quiz" className="space-y-6">
            {/* Quiz Management */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <ClipboardList className="h-5 w-5" />
                      Manajemen Kuis
                    </CardTitle>
                    <CardDescription>Kelola kuis untuk siswa Anda dengan bantuan AI</CardDescription>
                  </div>
                  <Dialog open={isCreateQuizOpen} onOpenChange={setIsCreateQuizOpen}>
                    <DialogTrigger asChild>
                      <Button className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Buat Kuis Baru
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{editingQuiz ? "Edit Kuis" : "Buat Kuis Baru"}</DialogTitle>
                        <DialogDescription>
                          {editingQuiz
                            ? "Perbarui kuis yang sudah ada"
                            : "Buat kuis baru dengan bantuan AI atau manual"}
                        </DialogDescription>
                      </DialogHeader>

                      {/* AI Generation Section */}
                      <div className="border rounded-lg p-4 bg-gradient-to-r from-purple-50 to-blue-50">
                        <div className="flex items-center gap-2 mb-4">
                          <Sparkles className="h-5 w-5 text-purple-600" />
                          <h3 className="font-semibold text-purple-800">Generate Kuis dengan AI</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <Label htmlFor="ai-prompt">Deskripsi Kuis</Label>
                            <Textarea
                              id="ai-prompt"
                              value={aiQuizForm.prompt}
                              onChange={(e) => setAiQuizForm({ ...aiQuizForm, prompt: e.target.value })}
                              placeholder="Contoh: Buat kuis tentang hukum Newton untuk siswa kelas 10..."
                              rows={3}
                            />
                          </div>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="ai-subject">Mata Pelajaran</Label>
                              <Select
                                value={aiQuizForm.subject}
                                onValueChange={(value) => setAiQuizForm({ ...aiQuizForm, subject: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Pilih mata pelajaran" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="matematika">Matematika</SelectItem>
                                  <SelectItem value="fisika">Fisika</SelectItem>
                                  <SelectItem value="kimia">Kimia</SelectItem>
                                  <SelectItem value="biologi">Biologi</SelectItem>
                                  <SelectItem value="bahasa-indonesia">Bahasa Indonesia</SelectItem>
                                  <SelectItem value="bahasa-inggris">Bahasa Inggris</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="space-y-2">
                                <Label htmlFor="ai-difficulty">Tingkat</Label>
                                <Select
                                  value={aiQuizForm.difficulty}
                                  onValueChange={(value) => setAiQuizForm({ ...aiQuizForm, difficulty: value })}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="easy">Mudah</SelectItem>
                                    <SelectItem value="medium">Sedang</SelectItem>
                                    <SelectItem value="hard">Sulit</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="ai-count">Jumlah Soal</Label>
                                <Select
                                  value={aiQuizForm.questionCount.toString()}
                                  onValueChange={(value) =>
                                    setAiQuizForm({ ...aiQuizForm, questionCount: Number.parseInt(value) })
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="3">3 Soal</SelectItem>
                                    <SelectItem value="5">5 Soal</SelectItem>
                                    <SelectItem value="10">10 Soal</SelectItem>
                                    <SelectItem value="15">15 Soal</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button
                          onClick={handleGenerateQuizWithAI}
                          disabled={isGeneratingQuiz || !aiQuizForm.prompt || !aiQuizForm.subject}
                          className="w-full"
                        >
                          {isGeneratingQuiz ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Membuat Kuis dengan AI...
                            </>
                          ) : (
                            <>
                              <Brain className="h-4 w-4 mr-2" />
                              Generate Kuis dengan AI
                            </>
                          )}
                        </Button>
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="title">Judul Kuis</Label>
                            <Input
                              id="title"
                              value={quizForm.title}
                              onChange={(e) => setQuizForm({ ...quizForm, title: e.target.value })}
                              placeholder="Masukkan judul kuis"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="subject">Mata Pelajaran</Label>
                            <Select
                              value={quizForm.subject}
                              onValueChange={(value) => setQuizForm({ ...quizForm, subject: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih mata pelajaran" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="matematika">Matematika</SelectItem>
                                <SelectItem value="fisika">Fisika</SelectItem>
                                <SelectItem value="kimia">Kimia</SelectItem>
                                <SelectItem value="biologi">Biologi</SelectItem>
                                <SelectItem value="bahasa-indonesia">Bahasa Indonesia</SelectItem>
                                <SelectItem value="bahasa-inggris">Bahasa Inggris</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="difficulty">Tingkat Kesulitan</Label>
                          <Select
                            value={quizForm.difficulty}
                            onValueChange={(value) => setQuizForm({ ...quizForm, difficulty: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="easy">Mudah</SelectItem>
                              <SelectItem value="medium">Sedang</SelectItem>
                              <SelectItem value="hard">Sulit</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Questions */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label className="text-lg font-medium">Soal-soal</Label>
                            <Button type="button" onClick={addQuestion} variant="outline" size="sm">
                              <Plus className="h-4 w-4 mr-2" />
                              Tambah Soal
                            </Button>
                          </div>

                          {quizForm.questions.map((question, qIndex) => (
                            <div key={qIndex} className="border rounded-lg p-4 space-y-4">
                              <div className="flex items-center justify-between">
                                <Label className="font-medium">Soal {qIndex + 1}</Label>
                                {quizForm.questions.length > 1 && (
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      const updatedQuestions = quizForm.questions.filter((_, i) => i !== qIndex)
                                      setQuizForm({ ...quizForm, questions: updatedQuestions })
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>

                              <div className="space-y-2">
                                <Label>Pertanyaan</Label>
                                <Textarea
                                  value={question.question}
                                  onChange={(e) => updateQuestion(qIndex, "question", e.target.value)}
                                  placeholder="Masukkan pertanyaan"
                                />
                              </div>

                              <div className="space-y-2">
                                <Label>Pilihan Jawaban</Label>
                                {question.options.map((option, oIndex) => (
                                  <div key={oIndex} className="flex items-center gap-2">
                                    <input
                                      type="radio"
                                      name={`correct-${qIndex}`}
                                      checked={question.correctAnswer === oIndex}
                                      onChange={() => updateQuestion(qIndex, "correctAnswer", oIndex)}
                                    />
                                    <Input
                                      value={option}
                                      onChange={(e) => {
                                        const newOptions = [...question.options]
                                        newOptions[oIndex] = e.target.value
                                        updateQuestion(qIndex, "options", newOptions)
                                      }}
                                      placeholder={`Pilihan ${String.fromCharCode(65 + oIndex)}`}
                                    />
                                  </div>
                                ))}
                              </div>

                              <div className="space-y-2">
                                <Label>Penjelasan</Label>
                                <Textarea
                                  value={question.explanation}
                                  onChange={(e) => updateQuestion(qIndex, "explanation", e.target.value)}
                                  placeholder="Penjelasan jawaban yang benar"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCreateQuizOpen(false)}>
                          Batal
                        </Button>
                        <Button onClick={handleCreateQuiz}>
                          <Save className="h-4 w-4 mr-2" />
                          {editingQuiz ? "Perbarui Kuis" : "Simpan Kuis"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quizzes.map((quiz) => (
                    <div key={quiz.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium">{quiz.title}</h4>
                          <Badge variant="outline">{quiz.subject}</Badge>
                          <Badge
                            variant={
                              quiz.difficulty === "easy"
                                ? "secondary"
                                : quiz.difficulty === "medium"
                                  ? "default"
                                  : "destructive"
                            }
                          >
                            {quiz.difficulty === "easy" ? "Mudah" : quiz.difficulty === "medium" ? "Sedang" : "Sulit"}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                          <span>{quiz.questions?.length || 0} soal</span>
                          <span className="mx-2">•</span>
                          <span>Dibuat: {new Date(quiz.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingQuiz(quiz)
                            setQuizForm({
                              title: quiz.title,
                              subject: quiz.subject,
                              difficulty: quiz.difficulty,
                              questions: quiz.questions || [],
                            })
                            setIsCreateQuizOpen(true)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteQuiz(quiz.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {quizzes.length === 0 && (
                    <div className="text-center py-8">
                      <ClipboardList className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">Belum ada kuis</p>
                      <p className="text-sm text-gray-500">Buat kuis pertama Anda dengan bantuan AI</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Learning Module Management */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      Manajemen Modul Ajar
                    </CardTitle>
                    <CardDescription>Kelola modul pembelajaran dengan bantuan AI</CardDescription>
                  </div>
                  <Dialog open={isCreateModuleOpen} onOpenChange={setIsCreateModuleOpen}>
                    <DialogTrigger asChild>
                      <Button className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Buat Modul Baru
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{editingModule ? "Edit Modul" : "Buat Modul Ajar Baru"}</DialogTitle>
                        <DialogDescription>
                          {editingModule
                            ? "Perbarui modul yang sudah ada"
                            : "Buat modul pembelajaran baru dengan bantuan AI"}
                        </DialogDescription>
                      </DialogHeader>

                      {/* AI Generation Section */}
                      <div className="border rounded-lg p-4 bg-gradient-to-r from-green-50 to-blue-50">
                        <div className="flex items-center gap-2 mb-4">
                          <Sparkles className="h-5 w-5 text-green-600" />
                          <h3 className="font-semibold text-green-800">Generate Modul dengan AI</h3>
                        </div>
                        <div className="grid grid-cols-1 gap-4 mb-4">
                          <div className="space-y-2">
                            <Label htmlFor="ai-module-prompt">Deskripsi Modul</Label>
                            <Textarea
                              id="ai-module-prompt"
                              value={aiModuleForm.prompt}
                              onChange={(e) => setAiModuleForm({ ...aiModuleForm, prompt: e.target.value })}
                              placeholder="Contoh: Buat modul pembelajaran tentang sistem persamaan linear untuk kelas 10..."
                              rows={3}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="ai-module-subject">Mata Pelajaran</Label>
                              <Select
                                value={aiModuleForm.subject}
                                onValueChange={(value) => setAiModuleForm({ ...aiModuleForm, subject: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Pilih mata pelajaran" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="matematika">Matematika</SelectItem>
                                  <SelectItem value="fisika">Fisika</SelectItem>
                                  <SelectItem value="kimia">Kimia</SelectItem>
                                  <SelectItem value="biologi">Biologi</SelectItem>
                                  <SelectItem value="bahasa-indonesia">Bahasa Indonesia</SelectItem>
                                  <SelectItem value="bahasa-inggris">Bahasa Inggris</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="ai-module-grade">Kelas</Label>
                              <Select
                                value={aiModuleForm.grade}
                                onValueChange={(value) => setAiModuleForm({ ...aiModuleForm, grade: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Pilih kelas" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="10">Kelas 10</SelectItem>
                                  <SelectItem value="11">Kelas 11</SelectItem>
                                  <SelectItem value="12">Kelas 12</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                        <Button
                          onClick={handleGenerateModuleWithAI}
                          disabled={
                            isGeneratingModule || !aiModuleForm.prompt || !aiModuleForm.subject || !aiModuleForm.grade
                          }
                          className="w-full"
                        >
                          {isGeneratingModule ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Membuat Modul dengan AI...
                            </>
                          ) : (
                            <>
                              <Brain className="h-4 w-4 mr-2" />
                              Generate Modul dengan AI
                            </>
                          )}
                        </Button>
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="module-title">Judul Modul</Label>
                            <Input
                              id="module-title"
                              value={moduleForm.title}
                              onChange={(e) => setModuleForm({ ...moduleForm, title: e.target.value })}
                              placeholder="Masukkan judul modul"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="module-subject">Mata Pelajaran</Label>
                            <Select
                              value={moduleForm.subject}
                              onValueChange={(value) => setModuleForm({ ...moduleForm, subject: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih mata pelajaran" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="matematika">Matematika</SelectItem>
                                <SelectItem value="fisika">Fisika</SelectItem>
                                <SelectItem value="kimia">Kimia</SelectItem>
                                <SelectItem value="biologi">Biologi</SelectItem>
                                <SelectItem value="bahasa-indonesia">Bahasa Indonesia</SelectItem>
                                <SelectItem value="bahasa-inggris">Bahasa Inggris</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="module-grade">Kelas</Label>
                            <Select
                              value={moduleForm.grade}
                              onValueChange={(value) => setModuleForm({ ...moduleForm, grade: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih kelas" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="10">Kelas 10</SelectItem>
                                <SelectItem value="11">Kelas 11</SelectItem>
                                <SelectItem value="12">Kelas 12</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="module-description">Deskripsi</Label>
                          <Textarea
                            id="module-description"
                            value={moduleForm.description}
                            onChange={(e) => setModuleForm({ ...moduleForm, description: e.target.value })}
                            placeholder="Deskripsi singkat tentang modul"
                            rows={3}
                          />
                        </div>

                        {/* Learning Objectives */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label className="text-lg font-medium">Tujuan Pembelajaran</Label>
                            <Button type="button" onClick={addObjective} variant="outline" size="sm">
                              <Plus className="h-4 w-4 mr-2" />
                              Tambah Tujuan
                            </Button>
                          </div>
                          {moduleForm.content.objectives.map((objective, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <Input
                                value={objective}
                                onChange={(e) => updateObjective(index, e.target.value)}
                                placeholder={`Tujuan pembelajaran ${index + 1}`}
                              />
                              {moduleForm.content.objectives.length > 1 && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    const updatedObjectives = moduleForm.content.objectives.filter(
                                      (_, i) => i !== index,
                                    )
                                    setModuleForm({
                                      ...moduleForm,
                                      content: { ...moduleForm.content, objectives: updatedObjectives },
                                    })
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Learning Materials */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label className="text-lg font-medium">Materi Pembelajaran</Label>
                            <Button type="button" onClick={addMaterial} variant="outline" size="sm">
                              <Plus className="h-4 w-4 mr-2" />
                              Tambah Materi
                            </Button>
                          </div>
                          {moduleForm.content.materials.map((material, index) => (
                            <div key={index} className="border rounded-lg p-4 space-y-4">
                              <div className="flex items-center justify-between">
                                <Label className="font-medium">Materi {index + 1}</Label>
                                {moduleForm.content.materials.length > 1 && (
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      const updatedMaterials = moduleForm.content.materials.filter(
                                        (_, i) => i !== index,
                                      )
                                      setModuleForm({
                                        ...moduleForm,
                                        content: { ...moduleForm.content, materials: updatedMaterials },
                                      })
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Jenis Materi</Label>
                                  <Select
                                    value={material.type}
                                    onValueChange={(value) => updateMaterial(index, "type", value)}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="text">Teks</SelectItem>
                                      <SelectItem value="video">Video</SelectItem>
                                      <SelectItem value="exercise">Latihan</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label>Judul Materi</Label>
                                  <Input
                                    value={material.title}
                                    onChange={(e) => updateMaterial(index, "title", e.target.value)}
                                    placeholder="Judul materi"
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label>Konten</Label>
                                <Textarea
                                  value={material.content}
                                  onChange={(e) => updateMaterial(index, "content", e.target.value)}
                                  placeholder={
                                    material.type === "video"
                                      ? "URL video atau deskripsi"
                                      : "Konten materi pembelajaran"
                                  }
                                  rows={4}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCreateModuleOpen(false)}>
                          Batal
                        </Button>
                        <Button onClick={handleCreateModule}>
                          <Save className="h-4 w-4 mr-2" />
                          {editingModule ? "Perbarui Modul" : "Simpan Modul"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {learningModules.map((module) => (
                    <div key={module.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium">{module.title}</h4>
                          <Badge variant="outline">{module.subject}</Badge>
                          <Badge variant="secondary">Kelas {module.grade}</Badge>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          <p>{module.description}</p>
                        </div>
                        <div className="text-sm text-gray-600">
                          <span>{module.content?.objectives?.length || 0} tujuan pembelajaran</span>
                          <span className="mx-2">•</span>
                          <span>{module.content?.materials?.length || 0} materi</span>
                          <span className="mx-2">•</span>
                          <span>Dibuat: {new Date(module.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingModule(module)
                            setModuleForm({
                              title: module.title,
                              subject: module.subject,
                              grade: module.grade,
                              description: module.description,
                              content: module.content || {
                                objectives: [""],
                                materials: [{ type: "text", title: "", content: "" }],
                              },
                            })
                            setIsCreateModuleOpen(true)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteModule(module.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {learningModules.length === 0 && (
                    <div className="text-center py-8">
                      <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">Belum ada modul ajar</p>
                      <p className="text-sm text-gray-500">Buat modul pembelajaran pertama Anda dengan bantuan AI</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Analisis Hasil Belajar Siswa
                </CardTitle>
                <CardDescription>Analisis mendalam performa siswa dengan rekomendasi intervensi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studentAnalysis.map((student, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <h4 className="font-medium">{student.name}</h4>
                          <Badge variant="outline">{student.class}</Badge>
                          <Badge
                            variant={
                              student.status === "excellent"
                                ? "default"
                                : student.status === "very_good"
                                  ? "default"
                                  : student.status === "good"
                                    ? "secondary"
                                    : "destructive"
                            }
                          >
                            {student.status === "excellent"
                              ? "Sangat Baik"
                              : student.status === "very_good"
                                ? "Baik Sekali"
                                : student.status === "good"
                                  ? "Baik"
                                  : "Perlu Perhatian"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold">{student.avgScore}</span>
                          {student.trend === "up" && <TrendingUp className="h-4 w-4 text-green-600" />}
                          {student.trend === "down" && <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />}
                          {student.trend === "stable" && <div className="h-4 w-4 bg-gray-400 rounded-full" />}
                        </div>
                      </div>
                      <div className="mb-3">
                        <Progress value={student.avgScore} className="h-2" />
                      </div>
                      <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                        <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-blue-800">Rekomendasi:</p>
                          <p className="text-sm text-blue-700">{student.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Class Performance Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Siswa Berprestasi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 mb-2">12</div>
                  <p className="text-sm text-gray-600">Nilai di atas 85</p>
                  <Progress value={40} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Perlu Bimbingan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-600 mb-2">8</div>
                  <p className="text-sm text-gray-600">Nilai 60-75</p>
                  <Progress value={27} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Perlu Perhatian Khusus</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600 mb-2">3</div>
                  <p className="text-sm text-gray-600">Nilai di bawah 60</p>
                  <Progress value={10} className="mt-2" />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Laporan Capaian & Refleksi
                    </CardTitle>
                    <CardDescription>Generate dan kelola laporan pembelajaran</CardDescription>
                  </div>
                  <Dialog open={isCreateReportOpen} onOpenChange={setIsCreateReportOpen}>
                    <DialogTrigger asChild>
                      <Button className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Buat Laporan Baru
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{editingReport ? "Edit Laporan" : "Buat Laporan Baru"}</DialogTitle>
                        <DialogDescription>
                          {editingReport ? "Perbarui laporan yang sudah ada" : "Buat laporan pembelajaran baru"}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="report-title">Judul Laporan</Label>
                          <Input
                            id="report-title"
                            value={reportForm.title}
                            onChange={(e) => setReportForm({ ...reportForm, title: e.target.value })}
                            placeholder="Masukkan judul laporan"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="report-type">Jenis Laporan</Label>
                            <Select
                              value={reportForm.type}
                              onValueChange={(value) => setReportForm({ ...reportForm, type: value })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="monthly">Bulanan</SelectItem>
                                <SelectItem value="semester">Semester</SelectItem>
                                <SelectItem value="reflection">Refleksi</SelectItem>
                                <SelectItem value="analysis">Analisis</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="report-class">Kelas</Label>
                            <Select
                              value={reportForm.class}
                              onValueChange={(value) => setReportForm({ ...reportForm, class: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih kelas" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="X IPA 1">X IPA 1</SelectItem>
                                <SelectItem value="X IPA 2">X IPA 2</SelectItem>
                                <SelectItem value="XI IPA 1">XI IPA 1</SelectItem>
                                <SelectItem value="Semua Kelas">Semua Kelas</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="report-content">Isi Laporan</Label>
                          <Textarea
                            id="report-content"
                            value={reportForm.content}
                            onChange={(e) => setReportForm({ ...reportForm, content: e.target.value })}
                            placeholder="Tulis isi laporan..."
                            rows={8}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCreateReportOpen(false)}>
                          Batal
                        </Button>
                        <Button onClick={handleCreateReport}>
                          <Save className="h-4 w-4 mr-2" />
                          {editingReport ? "Perbarui Laporan" : "Simpan Laporan"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium">{report.title}</h4>
                          <Badge variant={report.status === "completed" ? "default" : "secondary"}>
                            {report.status === "completed" ? (
                              <>
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Selesai
                              </>
                            ) : (
                              <>
                                <Clock className="h-3 w-3 mr-1" />
                                Draft
                              </>
                            )}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                          <span>
                            Jenis:{" "}
                            {report.type === "monthly"
                              ? "Bulanan"
                              : report.type === "semester"
                                ? "Semester"
                                : report.type === "reflection"
                                  ? "Refleksi"
                                  : "Analisis"}
                          </span>
                          <span className="mx-2">•</span>
                          <span>Kelas: {report.class}</span>
                          <span className="mx-2">•</span>
                          <span>Dibuat: {new Date(report.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingReport(report)
                            setReportForm({
                              title: report.title,
                              type: report.type,
                              class: report.class,
                              content: report.content,
                            })
                            setIsCreateReportOpen(true)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteReport(report.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {reports.length === 0 && (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">Belum ada laporan</p>
                      <p className="text-sm text-gray-500">Buat laporan pertama Anda</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
