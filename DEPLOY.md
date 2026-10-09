# Deploy to GitHub + Netlify

## 1. Create GitHub repository

1. Sign in: [github.com/MuhammadSaad297](https://github.com/MuhammadSaad297?tab=repositories)
2. Click **New** (green button) → **New repository**
3. Name example: `punjab-driving-centers`
4. **Public** → do **not** add README (project already has files)
5. Click **Create repository**

## 2. Push this project (first time)

Open PowerShell in the project folder (`driving-centers-portal`):

```powershell
cd "d:\New folder\driving-centers-portal"

git init
git add .
git commit -m "Initial commit: Punjab Driving Centers Angular site"

git branch -M main
git remote add origin https://github.com/MuhammadSaad297/punjab-driving-centers.git
git push -u origin main
```

Replace `punjab-driving-centers` if you used a different repo name.

GitHub will ask you to sign in (browser or Personal Access Token).

### Personal Access Token (if password fails)

1. GitHub → **Settings** → **Developer settings** → **Personal access tokens**
2. Generate token with **repo** scope
3. Use the token as the password when `git push` asks

## 3. Connect Netlify

1. [app.netlify.com](https://app.netlify.com) → sign up / log in (use **GitHub** login)
2. **Add new site** → **Import an existing project** → **GitHub**
3. Authorize Netlify → select **`punjab-driving-centers`**
4. Build settings (should auto-detect from `netlify.toml`):
   - **Build command:** `npm run build:prod`
   - **Publish directory:** `dist/driving-centers-portal/browser`
5. **Deploy site**

After ~2 minutes you get a URL like `https://random-name.netlify.app`.

## 4. Custom domain (optional)

Netlify → **Domain settings** → add `punjabdrivingcenter.com` and follow DNS instructions.

## 5. Later updates

```powershell
git add .
git commit -m "Describe your change"
git push
```

Netlify redeploys automatically on every push to `main`.

## Contact form on live site

Web3Forms key is in `src/assets/config/contact-form.json` (public key). Ensure Web3Forms dashboard has your notification email linked. Test the contact form after deploy.
