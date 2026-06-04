# Disha Deployment Guide (Render)

This guide explains how to deploy the **Disha** application to [Render](https://render.com) using the single-server (monolithic) approach we configured.

---

## Prerequisites

1. A **GitHub** repository containing your code.
2. A **Render** account (free tier available).
3. A **MongoDB Atlas** database cluster (or any hosted MongoDB instance).

---

## Step-by-Step Deployment Instructions

### 1. Push your code to GitHub
Make sure all your latest local changes are pushed to your GitHub repository:
```bash
git add .
git commit -m "Configure production deployment"
git push origin main
```

### 2. Set up a Web Service on Render
1. Log in to your [Render Dashboard](https://dashboard.render.com).
2. Click **New +** and select **Web Service**.
3. Connect your GitHub account and select your `disha` repository.
4. Configure the web service settings:
   - **Name**: `disha` (or any unique name)
   - **Environment**: `Node`
   - **Region**: Select the region closest to your users
   - **Branch**: `main`
   - **Root Directory**: *Leave empty* (this ensures Render runs commands in the root folder)
   - **Build Command**: `npm run install-all && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: Select the **Free** tier (or Hobby if you prefer)

### 3. Add Environment Variables on Render
Click on the **Environment** tab in your Render Web Service settings and add the following environment variables:

| Key | Value | Description |
| :--- | :--- | :--- |
| `NODE_ENV` | `production` | Enables production mode and static serving |
| `MONGODB_URI` | `mongodb+srv://...` | Your MongoDB connection string (you can reuse your existing Atlas connection string) |
| `JWT_SECRET` | *Your secret JWT key* | Keep this secure (e.g., a long random string) |

*Note: Render will automatically set the `PORT` variable, and our backend is configured to listen to `process.env.PORT` automatically.*

### 4. Deploy and Verify
1. Click **Create Web Service**.
2. Render will start the build process:
   - It will install root dependencies, backend dependencies, and frontend dependencies.
   - It will build the React frontend production assets into `frontend/build/`.
   - It will start the backend Express server.
3. Once the build is complete and the log says `Server running on port 10000`, click on the provided URL (e.g., `https://disha.onrender.com`) to open your live deployed application!

---

## Troubleshooting & Tips

### Database Access Issues
If the app fails to connect to MongoDB in production:
1. Log in to your **MongoDB Atlas** console.
2. Navigate to **Network Access** under Security.
3. Make sure you allow connections from anywhere (`0.0.0.0/0`) since Render's free instances do not have static IP addresses. Alternatively, if you are using a paid tier, you can configure static IPs.

### Checking Logs
You can monitor application behavior and API logs at any time using the **Logs** tab in your Render Web Service dashboard.
