"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BookOpen,
  Trophy,
  TrendingUp,
  MessageSquare,
  Award,
  Brain,
  ChevronRight,
  Play,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { ChatBot } from "@/components/chatbot/chatbot"
import { useAuth } from "@/hooks/use-auth"

interface LearningModule {
  id: string
  title: string
  subject: string
  progress: number
  totalLessons: number
  completedLessons: number
  difficulty: "Mudah" | "Sedang" | "Sulit"
  estimatedTime: string
  status: "not_started" | "in_progress" | "completed"
}

interface Quiz {
  id: string
  title: string
  subject: string
  questions: number
  timeLimit: number
  difficulty: "Mudah" | "Sedang" | "Sulit"
  bestScore?: number
  attempts: number
  status: "available" | "completed" | "locked"
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  earned: boolean
  earnedDate?: string
  progress?: number
  target?: number
}

export function StudentDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [learningModules, setLearningModules] = useState<LearningModule[]>([])
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      setIsLoading(true)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock data
      setLearningModules([
        {
          id: "1",
          title: "Aljabar Dasar",
          subject: "Matematika",
          progress: 75,
          totalLessons: 12,
          completedLessons: 9,
          difficulty: "Sedang",
          estimatedTime: "2 jam",
          status: "in_progress",
        },
        {
          id: "2",
          title: "Tata Bahasa Indonesia",
          subject: "Bahasa Indonesia",
          progress: 100,
          totalLessons: 8,
          completedLessons: 8,
          difficulty: "Mudah",
          estimatedTime: "1.5 jam",
          status: "completed",
        },
        {
          id: "3",
          title: "Sistem Persamaan Linear",
          subject: "Matematika",
          progress: 0,
          totalLessons: 10,
          completedLessons: 0,
          difficulty: "Sulit",
          estimatedTime: "3 jam",
          status: "not_started",
        },
      ])

      setQuizzes([
        {
          id: "1",
          title: "Quiz Aljabar Dasar",
          subject: "Matematika",
          questions: 20,
          timeLimit: 30,
          difficulty: "Sedang",
          bestScore: 85,
          attempts: 2,
          status: "completed",
        },
        {
          id: "2",
          title: "Quiz Tata Bahasa",
          subject: "Bahasa Indonesia",
          questions: 15,
          timeLimit: 20,
          difficulty: "Mudah",
          bestScore: 92,
          attempts: 1,
          status: "completed",
        },
        {
          id: "3",
          title: "Quiz Sistem Persamaan",
          subject: "Matematika",
          questions: 25,
          timeLimit: 45,
          difficulty: "Sulit",
          attempts: 0,
          status: "available",
        },
      ])

      setAchievements([
        {
          id: "1",
          title: "Pembelajar Rajin",
          description: "Selesaikan 5 modul pembelajaran",
          icon: "📚",
          earned: true,
          earnedDate: "2024-01-15",
          progress: 5,
          target: 5,
        },
        {
          id: "2",
          title: "Master Quiz",
          description: "Dapatkan skor 90+ di 3 quiz",
          icon: "🏆",
          earned: false,
          progress: 1,
          target: 3,
        },
        {
          id: "3",
          title: "Konsisten Belajar",
          description: "Belajar selama 7 hari berturut-turut",
          icon: "🔥",
          earned: false,
          progress: 3,
          target: 7,
        },
      ])

      setIsLoading(false)
    }

    loadData()
  }, [])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Mudah":
        return "bg-green-100 text-green-800"
      case "Sedang":
        return "bg-yellow-100 text-yellow-800"
      case "Sulit":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "in_progress":
        return <Play className="h-4 w-4 text-blue-500" />
      case "not_started":
        return <AlertCircle className="h-4 w-4 text-gray-400" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />
    }
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat dashboard...</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data pembelajaran...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar_url || ""} />
              <AvatarFallback className="bg-blue-500 text-white text-lg">
                {user.full_name?.charAt(0) || user.email?.charAt(0) || "S"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Selamat datang, {user.full_name || "Siswa"}!</h1>
              <p className="text-gray-600">Mari lanjutkan perjalanan belajar Anda hari ini</p>
            </div>
          </div>

          {/* Tambahkan tombol logout */}
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => useAuth().logout()}>
              Logout
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Modul Aktif</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {learningModules.filter((m) => m.status === "in_progress").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Trophy className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Quiz Selesai</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {quizzes.filter((q) => q.status === "completed").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Award className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pencapaian</p>
                  <p className="text-2xl font-bold text-gray-900">{achievements.filter((a) => a.earned).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Rata-rata Skor</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(
                      quizzes.filter((q) => q.bestScore).reduce((acc, q) => acc + (q.bestScore || 0), 0) /
                        quizzes.filter((q) => q.bestScore).length,
                    ) || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Ringkasan</TabsTrigger>
          <TabsTrigger value="modules">Modul</TabsTrigger>
          <TabsTrigger value="quizzes">Quiz</TabsTrigger>
          <TabsTrigger value="achievements">Pencapaian</TabsTrigger>
          <TabsTrigger value="chat">AI Assistant</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Learning Modules */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Modul Pembelajaran Terbaru
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {learningModules.slice(0, 3).map((module) => (
                  <div key={module.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(module.status)}
                      <div>
                        <h4 className="font-medium">{module.title}</h4>
                        <p className="text-sm text-gray-600">{module.subject}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={module.progress} className="w-20 h-2" />
                          <span className="text-xs text-gray-500">{module.progress}%</span>
                        </div>
                      </div>
                    </div>
                    <Badge className={getDifficultyColor(module.difficulty)}>{module.difficulty}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Quizzes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Quiz Terbaru
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {quizzes.slice(0, 3).map((quiz) => (
                  <div key={quiz.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{quiz.title}</h4>
                      <p className="text-sm text-gray-600">{quiz.subject}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-gray-500">{quiz.questions} soal</span>
                        <span className="text-xs text-gray-500">{quiz.timeLimit} menit</span>
                        {quiz.bestScore && (
                          <span className="text-xs text-green-600">Skor terbaik: {quiz.bestScore}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getDifficultyColor(quiz.difficulty)}>{quiz.difficulty}</Badge>
                      <Button size="sm" variant={quiz.status === "available" ? "default" : "outline"}>
                        {quiz.status === "available" ? "Mulai" : "Lihat"}
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Achievements Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Pencapaian Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {achievements.slice(0, 3).map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 border rounded-lg ${achievement.earned ? "bg-yellow-50 border-yellow-200" : "bg-gray-50 border-gray-200"}`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div>
                        <h4 className="font-medium">{achievement.title}</h4>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                    {!achievement.earned && achievement.progress && achievement.target && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                          <span>Progress</span>
                          <span>
                            {achievement.progress}/{achievement.target}
                          </span>
                        </div>
                        <Progress value={(achievement.progress / achievement.target) * 100} className="h-2" />
                      </div>
                    )}
                    {achievement.earned && achievement.earnedDate && (
                      <p className="text-xs text-green-600 mt-2">
                        Diraih pada {new Date(achievement.earnedDate).toLocaleDateString("id-ID")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="modules" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Semua Modul Pembelajaran</CardTitle>
              <CardDescription>Jelajahi dan lanjutkan modul pembelajaran Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {learningModules.map((module) => (
                  <Card key={module.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(module.status)}
                          <Badge className={getDifficultyColor(module.difficulty)}>{module.difficulty}</Badge>
                        </div>
                        <span className="text-xs text-gray-500">{module.estimatedTime}</span>
                      </div>

                      <h3 className="font-semibold mb-1">{module.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{module.subject}</p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>
                            {module.completedLessons}/{module.totalLessons} pelajaran
                          </span>
                        </div>
                        <Progress value={module.progress} className="h-2" />
                      </div>

                      <Button className="w-full" variant={module.status === "completed" ? "outline" : "default"}>
                        {module.status === "completed"
                          ? "Tinjau Ulang"
                          : module.status === "in_progress"
                          ? "Lanjutkan"
                          : "Mulai"}
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quizzes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Semua Quiz</CardTitle>
              <CardDescription>Uji pemahaman Anda dengan berbagai quiz</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {quizzes.map((quiz) => (
                  <Card key={quiz.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <Badge className={getDifficultyColor(quiz.difficulty)}>{quiz.difficulty}</Badge>
                        <span className="text-xs text-gray-500">{quiz.timeLimit} menit</span>
                      </div>

                      <h3 className="font-semibold mb-1">{quiz.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{quiz.subject}</p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span>{quiz.questions} soal</span>
                          <span>{quiz.attempts} percobaan</span>
                        </div>
                        {quiz.bestScore && (
                          <div className="flex items-center justify-between text-sm">
                            <span>Skor terbaik:</span>
                            <span className="font-semibold text-green-600">{quiz.bestScore}</span>
                          </div>
                        )}
                      </div>

                      <Button
                        className="w-full"
                        variant={quiz.status === "completed" ? "outline" : "default"}
                        disabled={quiz.status === "locked"}
                      >
                        {quiz.status === "completed"
                          ? "Coba Lagi"
                          : quiz.status === "available"
                          ? "Mulai Quiz"
                          : "Terkunci"}
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pencapaian</CardTitle>
              <CardDescription>Lihat semua pencapaian dan progress Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <Card
                    key={achievement.id}
                    className={`${achievement.earned ? "bg-yellow-50 border-yellow-200" : "bg-gray-50 border-gray-200"}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <span className="text-3xl">{achievement.icon}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{achievement.title}</h3>
                            {achievement.earned && <CheckCircle className="h-4 w-4 text-green-500" />}
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>

                          {achievement.earned ? (
                            <p className="text-sm text-green-600">
                              ✅ Diraih pada{" "}
                              {achievement.earnedDate && new Date(achievement.earnedDate).toLocaleDateString("id-ID")}
                            </p>
                          ) : (
                            <div>
                              <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
                                <span>Progress</span>
                                <span>
                                  {achievement.progress}/{achievement.target}
                                </span>
                              </div>
                              <Progress
                                value={
                                  achievement.progress && achievement.target
                                    ? (achievement.progress / achievement.target) * 100
                                    : 0
                                }
                                className="h-2"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chat" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                AI Assistant
              </CardTitle>
              <CardDescription>Tanyakan apa saja tentang materi pembelajaran kepada AI assistant</CardDescription>
            </CardHeader>
            <CardContent>
              <ChatBot userRole="student" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
