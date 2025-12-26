
"use client"

import { useState, useEffect, useCallback } from 'react'

// Mock types for WebGazer since we can't easily install the script type in this env
declare global {
  interface Window {
    webgazer: any
  }
}

export const useCognitiveLoad = () => {
  const [stressScore, setStressScore] = useState(0)
  const [gazeCoordinates, setGazeCoordinates] = useState({ x: 0, y: 0 })
  const [isStuck, setIsStuck] = useState(false)
  
  // Configuration
  const STUCK_THRESHOLD_MS = 15000 // 15 seconds
  const FIXATION_REGION_SIZE = 200 // pixels
  
  // State to track dwell time
  const [fixationStart, setFixationStart] = useState<number | null>(null)
  const [lastRegion, setLastRegion] = useState({ x: 0, y: 0 })

  const calculateDistance = (p1: {x:number, y:number}, p2: {x:number, y:number}) => {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2))
  }

  useEffect(() => {
    const initWebGazer = async () => {
      // In a real implementation, we would load the script here
      if (typeof window !== 'undefined' && window.webgazer) {
        try {
          await window.webgazer.setRegression('ridge')
            .setGazeListener((data: any, clock: any) => {
              if (data == null) return;
              
              const x = data.x
              const y = data.y
              setGazeCoordinates({ x, y })
              
              // Cognitive Load Logic
              // If gaze stays within a small region for > 15s -> High Cognitive Load
              
              setLastRegion(prev => {
                const dist = calculateDistance({x, y}, prev)
                
                if (dist < FIXATION_REGION_SIZE) {
                  // Gaze is stable in one region
                  if (fixationStart === null) {
                    setFixationStart(Date.now())
                  } else {
                    const dwellTime = Date.now() - fixationStart
                    if (dwellTime > STUCK_THRESHOLD_MS) {
                      setIsStuck(true)
                      setStressScore(85) // High stress
                    } else {
                      // Proportional stress score
                      setStressScore(Math.min(100, (dwellTime / STUCK_THRESHOLD_MS) * 100))
                    }
                  }
                  return prev // Keep same region center
                } else {
                  // Gaze moved
                  setFixationStart(null)
                  setIsStuck(false)
                  setStressScore(prevScore => Math.max(0, prevScore - 5)) // Decay stress
                  return { x, y } // Update region center
                }
              })
              
            }).begin()
            
            window.webgazer.showVideoPreview(false) // Privacy: Hide video, only data
        } catch (e) {
          console.error("WebGazer failed to init", e)
        }
      }
    }

    // Mock simulation for demo purposes if WebGazer isn't actually loaded
    const mockInterval = setInterval(() => {
      setStressScore(prev => {
        const noise = Math.random() * 10 - 5
        return Math.min(100, Math.max(0, prev + noise))
      })
    }, 1000)

    return () => {
      if (typeof window !== 'undefined' && window.webgazer) {
        window.webgazer.end()
      }
      clearInterval(mockInterval)
    }
  }, [fixationStart])

  return { stressScore, isStuck, gazeCoordinates }
}
