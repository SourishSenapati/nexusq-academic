
"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import priceConfig from '@/price_config.json'

// Mock Geo-detection hook
const useCountry = () => {
    const [country, setCountry] = useState('IN') // Default to India for this demo
    // In real app, fetch from /api/geo
    return country
}

export default function PricingDisplay() {
    const country = useCountry()
    const config = (priceConfig as any)[country] || (priceConfig as any)['DEFAULT']
    
    const handlePayment = async (planKey: string) => {
        const amount = config.plans[planKey].price
        
        if (country === 'IN') {
             // Load Razorpay
             alert(`Initiating Razorpay UPI for ${config.symbol}${amount}`)
             // In real app: call /api/payments/create-order -> open Razorpay modal
        } else {
             alert(`Initiating Stripe Checkout for ${config.symbol}${amount}`)
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
            {/* Micro Plan */}
            <Card className="bg-gray-800 border-gray-700 text-white">
                <CardHeader>
                    <CardTitle>The Pass</CardTitle>
                    <CardDescription>One-time check</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold mb-4">{config.plans.micro.label}</div>
                    <Button onClick={() => handlePayment('micro')} className="w-full bg-gray-700">
                        {country === 'IN' ? 'Pay via UPI' : 'Pay via Card'}
                    </Button>
                </CardContent>
            </Card>

            {/* Semester Plan */}
            <Card className="bg-gray-800 border-emerald-500 border-2 text-white relative">
                 <div className="absolute top-0 right-0 bg-emerald-500 text-xs px-2 py-1 rounded-bl">POPULAR</div>
                <CardHeader>
                    <CardTitle>Semester Saver</CardTitle>
                    <CardDescription>Netflix for Exams</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold mb-4 text-emerald-400">{config.plans.semester.label}</div>
                    <ul className="space-y-2 mb-6 text-sm text-gray-300">
                        <li className="flex gap-2"><Check className="h-4 w-4 text-emerald-500"/> Unlimited Predictions</li>
                        <li className="flex gap-2"><Check className="h-4 w-4 text-emerald-500"/> Visual Cortex AI</li>
                    </ul>
                    <Button onClick={() => handlePayment('semester')} className="w-full bg-emerald-600 hover:bg-emerald-700">
                        {country === 'IN' ? 'Pay via UPI' : 'Subcribe'}
                    </Button>
                </CardContent>
            </Card>

             {/* Topper Plan */}
             <Card className="bg-gray-800 border-gray-700 text-white">
                <CardHeader>
                    <CardTitle>The Topper</CardTitle>
                    <CardDescription>Yearly Access</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold mb-4">{config.plans.topper.label}</div>
                    <Button onClick={() => handlePayment('topper')} className="w-full bg-gray-700">
                        {country === 'IN' ? 'Pay via UPI' : 'Subscribe'}
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
