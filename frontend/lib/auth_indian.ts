
// Mock SMS Provider logic for India (MSG91 / Fast2SMS)

export async function sendOTP(phoneNumber: string): Promise<string> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    
    console.log(`[AuthIndian] Generating OTP for ${phoneNumber}: ${otp}`)
    
    // In production, call MSG91 API here
    // const response = await fetch("https://api.msg91.com/api/v5/otp?...", { ... })
    
    // Simulate API latency
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return otp
}

export async function verifyOTP(phoneNumber: string, inputOtp: string, cachedOtp: string): Promise<boolean> {
    if (inputOtp === cachedOtp) {
        return true
    }
    return false
}
