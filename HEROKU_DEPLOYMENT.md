# Heroku Deployment Guide

This guide will help you deploy your Task Management App to Heroku for free.

## 🚀 Quick Deploy (Recommended)

### Option 1: Deploy from GitHub (Easiest)

1. **Go to Heroku Dashboard:**
   - Visit [heroku.com](https://heroku.com)
   - Sign up or log in to your account

2. **Create New App:**
   - Click "New" → "Create new app"
   - Choose a unique app name (e.g., `your-task-app-123`)
   - Select your region
   - Click "Create app"

3. **Connect to GitHub:**
   - In your app dashboard, go to "Deploy" tab
   - Under "Deployment method", select "GitHub"
   - Connect your GitHub account if not already connected
   - Search for your repository: `fenix473/task-management-app`
   - Click "Connect"

4. **Configure Buildpacks:**
   - Go to "Settings" tab
   - Click "Add buildpack"
   - Add: `heroku/nodejs`
   - Click "Save changes"

5. **Deploy:**
   - Go back to "Deploy" tab
   - Under "Manual deploy", click "Deploy Branch"
   - Wait for deployment to complete (5-10 minutes)

6. **Open Your App:**
   - Click "Open app" button
   - Your app will be available at: `https://your-app-name.herokuapp.com`

### Option 2: Deploy via Heroku CLI

1. **Install Heroku CLI:**
   ```bash
   # Windows (with Chocolatey)
   choco install heroku-cli
   
   # Or download from: https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login to Heroku:**
   ```bash
   heroku login
   ```

3. **Create Heroku App:**
   ```bash
   heroku create your-task-app-name
   ```

4. **Set Buildpack:**
   ```bash
   heroku buildpacks:set heroku/nodejs
   ```

5. **Deploy:**
   ```bash
   git push heroku main
   ```

6. **Open App:**
   ```bash
   heroku open
   ```

## 🔧 Configuration

### Environment Variables

Set these in your Heroku app settings:

1. **Go to Settings tab in Heroku Dashboard**
2. **Click "Reveal Config Vars"**
3. **Add these variables:**

```
NODE_ENV = production
PORT = 5000
```

### Database Configuration

The app uses SQLite with ephemeral storage on Heroku. This means:
- ✅ Data persists during the app's lifetime
- ⚠️ Data will be lost when the app restarts
- 💡 For production, consider using Heroku Postgres

## 📊 Monitoring

### View Logs
```bash
heroku logs --tail
```

### Check App Status
```bash
heroku ps
```

### Restart App
```bash
heroku restart
```

## 🛠️ Troubleshooting

### Common Issues

1. **Build Fails:**
   - Check logs: `heroku logs --tail`
   - Ensure all dependencies are in package.json
   - Verify Node.js version compatibility

2. **App Crashes:**
   - Check logs for error messages
   - Verify environment variables are set
   - Ensure PORT is correctly configured

3. **Database Issues:**
   - SQLite files are ephemeral on Heroku
   - Consider upgrading to Postgres for persistent data

### Debug Commands

```bash
# View recent logs
heroku logs

# View real-time logs
heroku logs --tail

# Check app status
heroku ps

# Restart the app
heroku restart

# Open app in browser
heroku open

# Run commands on the app
heroku run bash
```

## 🔄 Updates

### Deploy Updates

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Update description"
   git push origin main
   ```

2. **Deploy to Heroku:**
   - If using GitHub integration: Automatic deployment
   - If using CLI: `git push heroku main`

### Rollback

```bash
# List releases
heroku releases

# Rollback to previous version
heroku rollback
```

## 💰 Free Tier Limitations

**Important:** Heroku discontinued their free tier in November 2022. You'll need to:

1. **Add a credit card** to your Heroku account
2. **Choose a paid plan:**
   - **Basic Dyno:** $7/month (recommended for small apps)
   - **Eco Dyno:** $5/month (sleeps after 30 minutes of inactivity)

### Cost Optimization

- Use **Eco Dynos** for development/testing
- Use **Basic Dynos** for production apps
- Monitor usage in Heroku Dashboard

## 🌐 Custom Domain (Optional)

1. **Add Custom Domain:**
   ```bash
   heroku domains:add www.yourdomain.com
   ```

2. **Configure DNS:**
   - Point your domain to the Heroku DNS target
   - Wait for DNS propagation (up to 24 hours)

## 📈 Scaling (Future)

When your app grows:

1. **Upgrade Dyno:**
   ```bash
   heroku ps:type standard-1x
   ```

2. **Add Database:**
   ```bash
   heroku addons:create heroku-postgresql:mini
   ```

3. **Add Monitoring:**
   ```bash
   heroku addons:create papertrail:choklad
   ```

## 🎯 Next Steps

After successful deployment:

1. **Test all features** on the live app
2. **Set up monitoring** and alerts
3. **Configure backups** if using a database
4. **Set up CI/CD** for automatic deployments
5. **Add SSL certificate** for HTTPS

## 📞 Support

- **Heroku Documentation:** [devcenter.heroku.com](https://devcenter.heroku.com)
- **Heroku Status:** [status.heroku.com](https://status.heroku.com)
- **Community:** [stackoverflow.com/questions/tagged/heroku](https://stackoverflow.com/questions/tagged/heroku)

---

**Your app will be live at:** `https://your-app-name.herokuapp.com`

🎉 **Congratulations! Your Task Management App is now deployed on Heroku!** 