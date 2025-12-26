
"use client"

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Brain, Eye, Lightbulb } from "lucide-react"
import { useCognitiveLoad } from "@/hooks/use-cognitive-load"
import { Button } from "@/components/ui/button"

export default function BioFeedbackMonitor() {
  const { stressScore, isStuck, gazeCoordinates } = useCognitiveLoad()
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    if (isStuck) {
      setShowHint(true)
    }
  }, [isStuck])

  return (
    <Card className="fixed bottom-4 right-4 w-80 bg-gray-900 border-emerald-500/30 text-white shadow-2xl backdrop-blur-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          <span className="flex items-center gap-2 text-emerald-400">
            <Brain className="h-4 w-4" />
            Bio-Adaptive Flow
          </span>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Eye className="h-3 w-3" />
            Tracking Active
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Cognitive Load</span>
              <span className={stressScore > 70 ? "text-red-400" : "text-emerald-400"}>
                {Math.round(stressScore)}%
              </span>
            </div>
            <Progress 
              value={stressScore} 
              className={`h-2 ${stressScore > 70 ? "bg-red-900" : "bg-emerald-900"}`} 
            />
          </div>
          
          {showHint && (
            <Alert className="bg-yellow-900/20 border-yellow-600 text-yellow-200 animate-in fade-in slide-in-from-bottom-2">
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>Stuck on a concept?</AlertTitle>
              <AlertDescription className="text-xs mt-1">
                NexusQ detected high dwell time on this section. 
                <Button 
                  size="sm" 
                  variant="link" 
                  className="text-yellow-400 p-0 h-auto ml-1 underline"
                  onClick={() => console.log("Reveal hint")}
                >
                  Show Micro-Hint
                </Button>
              </AlertDescription>
            </Alert>
          )}

          <div className="text-[10px] text-gray-600 text-center">
             Privacy Secure: Gaze data processed locally.
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
