# NexusQ Deployment Instructions

## 1. GitHub Setup
Since the repository is initialized locally, you need to push it to a new remote.

1.  **Create a Repository:**
    *   Go to [GitHub New Repo](https://github.com/new).
    *   Name it: `nexusq-academic` (or your preferred name).
    *   **Uncheck** "Initialize with README" (we already have one).

2.  **Push Code:**
    Open your terminal in `d:\PROJECT\Q Predictor\NexusQ` and run:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/nexusq-academic.git
    git branch -M main
    git push -u origin main
    ```

## 2. Vercel Deployment (Frontend)
1.  **Dashboard:** Go to [Vercel Dashboard](https://vercel.com/dashboard).
2.  **Add New Project:** Click "Add New..." -> "Project".
3.  **Import:** Select the `nexusq-academic` repository.
4.  **Framework Preset:** It should auto-detect **Next.js**.
5.  **Root Directory:** Click "Edit" and select `frontend`.
6.  **Environment Variables:**
    Copy these from your local `.env` or `.env.example`:
    *   `DATABASE_URL` (Use a cloud Postgres like Supabase or Neon).
    *   `NEXTAUTH_SECRET` (Generate one).
    *   `NEXTAUTH_URL` (Set to your Vercel URL, e.g., `https://nexusq.vercel.app`).
    *   `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`.
    *   `RAZORPAY_KEY_ID` & `RAZORPAY_KEY_SECRET`.
7.  **Deploy:** Click "Deploy".

## 3. Razorpay Setup (Payments)
1.  **Account:** Log in to [Razorpay Dashboard](https://dashboard.razorpay.com).
2.  **Test Mode:** Ensure you are in "Test Mode" initially.
3.  **Keys:** Go to Settings -> API Keys -> Generate Key.
    *   Copy `Key ID` to `RAZORPAY_KEY_ID`.
    *   Copy `Key Secret` to `RAZORPAY_KEY_SECRET`.
4.  **Webhooks (Optional but recommended):**
    *   Add a webhook URL: `https://your-domain.vercel.app/api/payments/verify`.
    *   Secret: Add this to `RAZORPAY_WEBHOOK_SECRET`.

## 4. Backend Strategy
The Python backend (Agents/GraphRAG) works best on a long-running server, not Vercel Serverless.
*   **Recommended:** Deploy the `backend/` folder to **Railway** or **Render**.
*   **Docker:** Use the provided `Dockerfile` in `backend/` (you may need to create one based on `requirements.txt`).

## 5. Database (Supabase/Neon)
For a free Postgres database that works with Prisma:
1.  Sign up for **Supabase**.
2.  Create a project `NexusQ`.
3.  Get the `Transaction Pooling` connection string.
4.  Paste it as `DATABASE_URL` in Vercel.

**Need Help?** Check `README.md` for local development.
