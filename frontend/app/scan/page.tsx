
"use client"

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileText, Loader2, BarChart2 } from "lucide-react"

export default function ScanPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return
    setUploading(true)

    // Simulate Upload & Analysis Pipeline
    // In production, this calls /api/analyze
    setTimeout(() => {
        setUploading(false)
        setAnalyzing(true)
        
        // Simulate Analysis
        setTimeout(() => {
            setAnalyzing(false)
            setResult({
                questionCount: 14,
                topTopic: "Heat Transfer",
                predictedQuestions: [
                    "Derive LMTD for Counter Flow",
                    "Critical Radius of Insulation",
                    "Nusselt Film Condensation Theory"
                ],
                texUrl: "/downloads/prediction.tex"
            })
        }, 3000)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-xl mx-auto space-y-8">
        <div className="text-center">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                NexusQ Scanner
            </h1>
            <p className="text-gray-400 mt-2">Upload Notes, Past Papers, or Textbooks.</p>
        </div>

        {!result && (
            <Card className="bg-gray-800 border-dashed border-2 border-gray-600 hover:border-indigo-500 transition-colors">
                <CardContent className="flex flex-col items-center justify-center p-12 space-y-4">
                    <div className="p-4 bg-gray-700 rounded-full">
                        <Upload className="h-8 w-8 text-indigo-400" />
                    </div>
                    <div className="text-center space-y-1">
                        <h3 className="font-semibold text-lg">Drop your file here</h3>
                        <p className="text-sm text-gray-500">PDF, PNG, or JPG up to 10MB</p>
                    </div>
                    <input 
                        type="file" 
                        onChange={handleFileChange}
                        className="hidden" 
                        id="file-upload"
                    />
                    <label htmlFor="file-upload">
                        <Button variant="outline" className="mt-4" asChild>
                            <span>Browse Files</span>
                        </Button>
                    </label>
                    {file && <p className="text-emerald-400 text-sm">{file.name}</p>}
                    
                    {file && !uploading && !analyzing && (
                        <Button 
                            className="w-full bg-indigo-600 hover:bg-indigo-700 mt-4"
                            onClick={handleUpload}
                        >
                            Start Analysis
                        </Button>
                    )}

                    {uploading && (
                        <div className="flex items-center gap-2 text-indigo-400">
                            <Loader2 className="animate-spin h-4 w-4" />
                            Uploading to Cortex...
                        </div>
                    )}
                     {analyzing && (
                        <div className="flex items-center gap-2 text-purple-400">
                            <Loader2 className="animate-spin h-4 w-4" />
                            Running GraphRAG Analysis...
                        </div>
                    )}
                </CardContent>
            </Card>
        )}

        {result && (
            <div className="space-y-6 animate-in slide-in-from-bottom-4">
                <Card className="bg-gray-800 border-l-4 border-emerald-500">
                    <CardContent className="p-6">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <BarChart2 className="text-emerald-400"/> Analysis Complete
                        </h3>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            <div className="p-3 bg-gray-700 rounded">
                                <p className="text-xs text-gray-400">Top Topic</p>
                                <p className="font-semibold text-emerald-300">{result.topTopic}</p>
                            </div>
                            <div className="p-3 bg-gray-700 rounded">
                                <p className="text-xs text-gray-400">Questions extracted</p>
                                <p className="font-semibold text-emerald-300">{result.questionCount}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-2">
                    <h4 className="text-lg font-semibold text-gray-300">Predicted Questions</h4>
                    {result.predictedQuestions.map((q: string, i: number) => (
                        <div key={i} className="p-4 bg-gray-800 rounded border border-gray-700">
                            <span className="text-xs font-bold text-indigo-400">Q{i+1}</span>
                            <p className="mt-1">{q}</p>
                        </div>
                    ))}
                </div>

                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 h-12 text-lg">
                    <FileText className="mr-2 h-5 w-5" />
                    Download Predicted Paper (.tex)
                </Button>
            </div>
        )}
      </div>
    </div>
  )
}
