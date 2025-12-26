"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  AlertCircle,
  BarChart3,
  Download
} from "lucide-react"

export default function IndustrialDashboard() {
  // Mock data for demonstration
  const knowledgeGaps = [
    { topic: "Heat Exchangers - Shell Design", failRate: 72, priority: "high" },
    { topic: "Thermodynamics - Entropy Calculations", failRate: 68, priority: "high" },
    { topic: "Fluid Mechanics - Bernoulli", failRate: 45, priority: "medium" },
    { topic: "Mass Transfer - Distillation", failRate: 38, priority: "medium" },
  ]

  const driftData = [
    { year: 2020, syllabusMatch: 85 },
    { year: 2021, syllabusMatch: 78 },
    { year: 2022, syllabusMatch: 72 },
    { year: 2023, syllabusMatch: 65 },
    { year: 2024, syllabusMatch: 58 },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Department Analytics
            </h1>
            <p className="text-gray-400 mt-1">Chemical Engineering - Jadavpur University</p>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-emerald-500 mt-1">↑ 12% from last year</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Avg Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">76.4%</div>
              <p className="text-xs text-yellow-500 mt-1">↓ 3% from last semester</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Questions Analyzed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,450</div>
              <p className="text-xs text-gray-500 mt-1">Last 5 years</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Curriculum Drift</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">42%</div>
              <p className="text-xs text-gray-500 mt-1">Needs review</p>
            </CardContent>
          </Card>
        </div>

        {/* Knowledge Gaps Heatmap */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              Knowledge Gaps (High Priority)
            </CardTitle>
            <CardDescription>
              Topics where students consistently struggle. Based on prediction accuracy and exam performance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {knowledgeGaps.map((gap, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{gap.topic}</span>
                    <span className="text-sm text-red-400">{gap.failRate}% struggle</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        gap.priority === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${gap.failRate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="mt-4 w-full border-gray-600 text-white hover:bg-gray-700">
              <BookOpen className="mr-2 h-4 w-4" />
              Suggest Remedial Workshops
            </Button>
          </CardContent>
        </Card>

        {/* Curriculum Drift Chart */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-cyan-500" />
              Curriculum Drift Analysis
            </CardTitle>
            <CardDescription>
              How exam patterns have deviated from official syllabus over 5 years
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-around gap-2">
              {driftData.map((data, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <div className="text-xs text-gray-400">{data.syllabusMatch}%</div>
                  <div 
                    className="w-full bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t"
                    style={{ height: `${data.syllabusMatch}%` }}
                  />
                  <div className="text-xs text-gray-500">{data.year}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-700 rounded-lg">
              <p className="text-sm text-yellow-400">
                <strong>Recommendation:</strong> Syllabus alignment has dropped by 27% since 2020. 
                Consider updating course content to include modern industrial practices in Heat Transfer and Process Design.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Items */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Recommended Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-emerald-900/20 border border-emerald-700 rounded">
              <BarChart3 className="h-5 w-5 text-emerald-500 mt-0.5" />
              <div>
                <p className="font-medium">Update Heat Exchanger Module</p>
                <p className="text-sm text-gray-400">Industry now focuses on Compact HX, but syllabus still emphasizes Shell & Tube only</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-cyan-900/20 border border-cyan-700 rounded">
              <Users className="h-5 w-5 text-cyan-500 mt-0.5" />
              <div>
                <p className="font-medium">Organize Entropy Workshop</p>
                <p className="text-sm text-gray-400">68% of students show weak understanding. Schedule extra tutorial sessions.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
