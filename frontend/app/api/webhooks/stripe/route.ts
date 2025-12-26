import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { PrismaClient } from "@prisma/client"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_mock_12345", {
  apiVersion: "2025-12-15.clover",
})

const prisma = new PrismaClient()

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get("stripe-signature")!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session
      
      // Create subscription in database
      await prisma.subscription.create({
        data: {
          userId: session.metadata?.userId!,
          status: "active",
          planId: session.metadata?.planId!,
          startDate: new Date(),
        },
      })
      break

    case "customer.subscription.updated":
      const subscription = event.data.object as Stripe.Subscription
      
      await prisma.subscription.updateMany({
        where: {
          userId: subscription.metadata.userId,
        },
        data: {
          status: subscription.status,
        },
      })
      break

    case "customer.subscription.deleted":
      const deletedSub = event.data.object as Stripe.Subscription
      
      await prisma.subscription.updateMany({
        where: {
          userId: deletedSub.metadata.userId,
        },
        data: {
          status: "canceled",
          endDate: new Date(),
        },
      })
      break

    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
