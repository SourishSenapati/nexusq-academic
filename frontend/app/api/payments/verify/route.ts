
import { NextRequest, NextResponse } from "next/server"
import { razorpayEngine } from "@/lib/razorpay_engine"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      userId,
      planId
    } = body

    const isValid = razorpayEngine.verifySignature(
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature
    )

    if (isValid) {
      // Update Database
      // await prisma.subscription.create(...)
      
      return NextResponse.json({ success: true, message: "Payment Verified" })
    } else {
      return NextResponse.json({ error: "Invalid Signature" }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ error: "Verification failed" }, { status: 500 })
  }
}
