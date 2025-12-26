"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Chrome, Smartphone } from "lucide-react"

export default function LoginPage() {
  const [phone, setPhone] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-900/20 to-gray-900 flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-600 p-12 flex-col justify-between text-white">
        <div>
          <h1 className="text-5xl font-bold mb-4">NexusQ</h1>
          <p className="text-xl opacity-90">Universal Academic Intelligence Engine</p>
        </div>
        
        <div className="space-y-6">
          <div className="backdrop-blur-sm bg-white/10 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-2">For Indian Students</h3>
            <p className="opacity-90">Built specifically for IITs, NITs, and Universities across India. Mobile-first, optimized for slow networks.</p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold">95%</div>
              <div className="text-sm opacity-75">Accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-bold">2L+</div>
              <div className="text-sm opacity-75">Questions</div>
            </div>
            <div>
              <div className="text-3xl font-bold">₹199</div>
              <div className="text-sm opacity-75">Only</div>
            </div>
          </div>
        </div>
        
        <div className="text-sm opacity-75">
          Trusted by students at Jadavpur, IIT KGP, IIT Delhi, and more.
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md bg-gray-800 border-gray-700 text-white">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription className="text-gray-400">
              Sign in to access your exam predictions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Google Sign In - Primary for Indian users */}
            <Button 
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="w-full bg-white text-gray-900 hover:bg-gray-100 h-12 text-base font-medium"
            >
              <Chrome className="mr-2 h-5 w-5" />
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-gray-800 px-2 text-gray-500">Or</span>
              </div>
            </div>

            {/* Phone Number Login - Critical for Indian Context */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Mobile Number (Indian students)</label>
              <div className="flex gap-2">
                <Input 
                  type="tel" 
                  placeholder="+91 XXXXX XXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500"
                />
              </div>
              <Button 
                className="w-full bg-emerald-600 hover:bg-emerald-700 h-12"
                disabled
              >
                <Smartphone className="mr-2 h-4 w-4" />
                Get OTP (Coming Soon)
              </Button>
              <p className="text-xs text-gray-500">
                No password required. Fast login even on 2G.
              </p>
            </div>

            <div className="pt-4 text-center text-sm text-gray-500">
              By signing in, you agree to our{" "}
              <a href="#" className="text-emerald-500 hover:underline">Terms</a>
              {" "}and{" "}
              <a href="#" className="text-emerald-500 hover:underline">Privacy Policy</a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
