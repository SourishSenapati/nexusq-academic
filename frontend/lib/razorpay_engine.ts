
import Razorpay from 'razorpay'
import crypto from 'crypto'

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_12345678901234",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "mock_secret",
})

export class RazorpayEngine {
  /**
   * Creates an Order in Razorpay system
   * @param amount Amount in INR (will be converted to paise)
   * @param receiptId Unique receipt ID linked to user
   */
  async createOrder(amount: number, receiptId: string) {
    const options = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: receiptId,
    }

    try {
      const order = await razorpay.orders.create(options)
      return order
    } catch (error) {
      console.error("Razorpay Order Creation Failed:", error)
      throw error
    }
  }

  /**
   * Verifies the signature returned by checkout
   */
  verifySignature(orderId: string, paymentId: string, signature: string): boolean {
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(orderId + "|" + paymentId)
      .digest("hex")

    return generated_signature === signature
  }
}

export const razorpayEngine = new RazorpayEngine()
