# Harsha Vardhan — Cybersecurity Portfolio

## Quick Start

### 1. Install Node.js
Download from https://nodejs.org (LTS version recommended)

### 2. Install dependencies
```bash
cd harsha-portfolio
npm install
```

### 3. Run development server
```bash
npm run dev
```

Open http://localhost:3000

### 4. Build for production
```bash
npm run build
npm start
```

## Deploy

### Vercel (Recommended — free)
1. Push to GitHub
2. Import at vercel.com
3. Deploy (zero config)

### Netlify
```bash
npm run build
# Deploy the .next folder
```

## Customization

| File | What to change |
|------|---------------|
| `components/Hero.tsx` | Name, subtitle, CTA buttons |
| `components/About.tsx` | Bio text, stats |
| `components/Experience.tsx` | Job history |
| `components/Projects.tsx` | Project cards |
| `components/Contact.tsx` | Email, social links, phone |
| `app/layout.tsx` | SEO metadata |
| `app/globals.css` | Colors, fonts |
