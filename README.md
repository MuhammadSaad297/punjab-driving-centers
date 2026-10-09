# Punjab Driving Centers Portal (Angular)

Professional, component-based Angular site for driving schools in Lahore. Center data is loaded from `src/assets/data/centers.json` via `DrivingCenterService`.

## Project structure

```
src/app/
  core/           # models & services
  shared/         # header, footer, cards, star rating
  layouts/        # main shell layout
  features/       # home, centers list/detail, about, contact
src/assets/data/  # JSON data source
src/environments/ # dev, staging, production
```

## Local development

```bash
npm install
npm start
```

Open `http://localhost:4200`.

## Environments

| File | Use |
|------|-----|
| `environment.ts` | Local dev (`ng serve`) |
| `environment.staging.ts` | Preview builds (`npm run build:staging`) |
| `environment.prod.ts` | Production (`npm run build:prod`) |

Edit `dataUrl`, `supportPhone`, `baseHref`, and branding in these files.

## Contact form email (no backend)

**Changing only `inquiryRecipientEmail` does NOT send email.** The browser cannot mail Gmail by itself. You must add a free relay key.

### Option A — Web3Forms (recommended, ~5 min)

1. Open [web3forms.com](https://web3forms.com/) → create form with **`blsspain651@gmail.com`** (or your inbox).
2. Copy the **Access Key**.
3. Paste in `src/environments/environment.ts` and `environment.prod.ts`:

```ts
inquiryRecipientEmail: 'blsspain651@gmail.com',
web3formsAccessKey: 'YOUR_ACCESS_KEY_HERE',
```

4. `npm start` or `npm run build:prod` → deploy again.
5. Submit the contact form → check inbox (and **Spam**).

### Option B — EmailJS

See [emailjs.com](https://www.emailjs.com/) and fill `emailJs.publicKey`, `serviceId`, `templateId` in environment files.

### If no key is set

The form only opens **mailto:** — the visitor must press **Send** in their own email app. You will **not** receive anything until Web3Forms/EmailJS is configured.

Service: `src/app/core/services/contact-inquiry.service.ts`

## Update driving center data

Edit `src/assets/data/centers.json` — add centers, reviews, services, or set `"featured": true` for homepage cards. No code changes required if you follow the existing JSON shape.

## Free hosting

Build output folder: `dist/driving-centers-portal/browser`

### Netlify (recommended)

1. Push this folder to GitHub.
2. [Netlify](https://www.netlify.com/) → **Add new site** → Import repo.
3. Build command: `npm run build:prod` (or use included `netlify.toml`).
4. Publish directory: `dist/driving-centers-portal/browser`.

### Vercel

Import the repo; `vercel.json` sets build and SPA rewrites.

### Firebase Hosting

```bash
npm run build:prod
npx firebase-tools login
npx firebase-tools init hosting   # select existing firebase.json, public = dist/.../browser
npx firebase-tools deploy --only hosting
```

### GitHub Pages

Replace `REPO_NAME` in `package.json` script `build:gh-pages`, set `baseHref` in `environment.prod.ts` to match, then deploy the `browser` folder to GitHub Pages.

## Tech stack

- Angular 19 (standalone components, lazy routes)
- HttpClient + JSON assets
- SCSS design system in `src/styles.scss`
