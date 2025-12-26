
import { NextRequest, NextResponse } from "next/server"
import { razorpayEngine } from "@/lib/razorpay_engine"
import { auth } from "@/auth"

export async function POST(req: NextRequest) {
  // In real app, check auth
  // const session = await auth()
  // if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const body = await req.json()
    const { amount, planId } = body
    
    // Receipt ID logic - link to user
    const receiptId = `rcpt_${Date.now()}`
    
    const order = await razorpayEngine.createOrder(amount, receiptId)
    
    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json({ error: "Order creation failed" }, { status: 500 })
  }
}
