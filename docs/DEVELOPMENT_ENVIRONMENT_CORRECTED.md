# 🛠️ Development Environment Setup Guide — CORRECTED

**Veiled Dominion Engine** — Accurate, Production-Ready Configuration  
*Based on the actual working development cycle from `Loptr-Lab/duet-solo-hackathon`*

---

## ⚠️ Important Notice

This document corrects the previous v0.1.0-devenv-complete release documentation, which contained references to infrastructure that did not exist in the repository. This guide reflects the **actual project state** and proven workflows from active development.

---

## 📋 Quick Start

This project is a **Node.js + Express backend** with a **static HTML/CSS/JS frontend**. No Docker required for local development, though containerization is available for deployment.

### Minimum Requirements
- **Node.js** 20 LTS (can be verified via `.nvmrc` or manually)
- **npm** 10.x (installed with Node.js)
- **5GB free disk space** for dependencies
- **A text editor or IDE** (VS Code recommended)

### Launch Locally (5 minutes)

1. Clone the repository:
   ```bash
   git clone https://github.com/Loptr-Lab/veiled-dominion-engine.git
   cd veiled-dominion-engine
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment template:
   ```bash
   cp .env.example .env
   ```

4. Configure `.env` with your values (see [Environment Variables](#environment-variables) below)

5. Start the server:
   ```bash
   npm start
   ```

6. Open in browser:
   ```
   http://localhost:8080
   ```

---

## 🏗️ Project Architecture

### Technology Stack

| Component | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | 20 LTS | Backend runtime (Express server) |
| **npm** | 10.x | Package manager |
| **Express** | ^4.19.2 | HTTP framework |
| **Socket.IO** | ^4.7.5 | WebSocket multiplayer support |
| **Google Cloud Firestore** | ^7.7.0 | Game state persistence & logging |
| **HTML/CSS/JS** | (vanilla) | Frontend (no build step) |

### Directory Structure

```
veiled-dominion-engine/
├── server.js                      # Express entry point
├── gameNamespace.js               # Core game logic (states, rules)
├── veiled-chess-core-server.js    # Server-side game engine
├── roomStore.js                   # Session/room management
├── atprotoPoster.js               # AT Protocol integration (optional)
├── package.json                   # Dependencies
├── Dockerfile                     # Cloud Run deployment
├── .env.example                   # Environment template
├── public/                        # Static frontend
│   └── index.html                 # Single-page app (landing + game screens)
├── services/                      # Future: external integrations
├── data/                          # Data & analytics
└── docs/                          # Documentation
```

### Frontend Architecture

- **Single-page architecture** — no routing framework, content swaps via JavaScript (e.g., landing screen ↔ game screen via `display` toggling)
- **Screen-reader first** — semantic HTML, ARIA labels, accessible command bar
- **Accessibility-driven design** — Fog Mode information gates replicate what sighted players can see, not just visual cutoffs
- **CSS custom properties** — "breathing" animations for Radius of Ruin/Sanctuary auras driven by live board state

---

## 🌐 Environment Variables

Copy `.env.example` to `.env` and fill these values:

```env
# Server
PORT=8080

# Gemini AI (for onboarding/support agent)
GEMINI_API_KEY=your-key-here

# Stripe (payments for accessibility pack / supporter tier)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Deployment target
PUBLIC_URL=http://localhost:8080
```

### Local Development Notes

- `PORT`: Default 8080 locally
- `GEMINI_API_KEY`: Get from [Google AI Studio](https://aistudio.google.com/app/apikey) or Google Cloud console
- `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET`: Optional for local testing without payment flows; get from [Stripe Dashboard](https://dashboard.stripe.com/)
- `PUBLIC_URL`: Must be set for production (Cloud Run, etc.); for local dev, this defaults to the server URL

---

## 🔧 Common Development Workflows

### Starting the Development Server

```bash
# Install dependencies (run once, or after package.json changes)
npm install

# Start the server (watches for file changes via nodemon if installed)
npm start

# Alternative: direct Node.js
node server.js
```

The server will output:
```
Server running on http://localhost:8080
```

### Testing Game Logic Locally

1. Open `http://localhost:8080` in your browser
2. Use the browser's **Developer Tools Console** to test game functions:
   ```javascript
   // Example: check if a move is valid
   game.validateMove(fromSquare, toSquare);
   
   // Example: check board state
   console.log(game.getBoardState());
   ```

3. For screen reader testing (macOS/Linux):
   - **macOS:** VoiceOver (Cmd+F5)
   - **Linux:** NVDA or Orca
   - **Windows:** NVDA or JAWS
   - Test the accessible command bar: focus the input field and listen for prompts

### Adding Features

**Backend (game logic):**
- Edit `gameNamespace.js` (rule engine) or `veiled-chess-core-server.js` (server-side logic)
- Restart the server: `npm start`
- Test in browser console

**Frontend (UI/UX):**
- Edit `public/index.html`
- Refresh the browser (no build step needed)

**Database (Firestore):**
- Connect via Google Cloud project (if using persistence)
- Credentials loaded from environment or default credentials

### Running on Google Cloud Run (Deployment)

```bash
# Build and push to Cloud Run (requires gcloud CLI)
gcloud run deploy duet-solo \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY=...,STRIPE_SECRET_KEY=...,PUBLIC_URL=https://<your-cloud-run-url>
```

---

## 🐳 Docker (Optional Local / Always for Cloud)

If you prefer containerized development:

### Local Docker Build

```bash
# Build the image
docker build -t duet-solo:dev .

# Run the container
docker run -p 8080:8080 \
  -e GEMINI_API_KEY=... \
  -e STRIPE_SECRET_KEY=... \
  duet-solo:dev
```

### Dockerfile Reference

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
ENV PORT=8080
EXPOSE 8080
CMD ["node", "server.js"]
```

The image:
- Uses **Alpine Linux** (lightweight)
- Installs production dependencies only (`--omit=dev`)
- Exposes port 8080
- Runs `node server.js` on startup

---

## 🐛 Troubleshooting

### Issue: `npm start` fails with "Cannot find module"

**Solution:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm start
```

### Issue: Port 8080 already in use

**Solution:**
```bash
# Option 1: Use a different port
PORT=8081 npm start

# Option 2: Kill the process using port 8080
lsof -i :8080  # Find PID
kill -9 <PID>  # Kill it
```

### Issue: Socket.IO connection fails (WebSocket error)

**Solution:**
- Check that both client and server are running on the same origin
- Verify `PUBLIC_URL` environment variable is correct
- Check browser console for CORS errors; if present, confirm the server's CORS settings in `server.js`

### Issue: Gemini API calls fail

**Solution:**
```bash
# Verify your API key is set
echo $GEMINI_API_KEY

# If empty, add it to .env:
GEMINI_API_KEY=your-actual-key

# Restart the server
npm start
```

### Issue: Screen reader accessibility not working

**Solution:**
- Confirm you're using a supported screen reader (NVDA, JAWS, VoiceOver, etc.)
- Check that ARIA labels are present in `public/index.html` via DevTools:
  ```javascript
  document.querySelectorAll('[aria-label]').length  // Should be > 0
  ```
- Test the command bar by focusing the input field and using keyboard navigation

---

## 📚 Additional Resources

- **[Express.js Docs](https://expressjs.com/)** — Server framework reference
- **[Socket.IO Docs](https://socket.io/docs/)** — Real-time communication
- **[Google Cloud Firestore](https://firebase.google.com/docs/firestore)** — Database & logging
- **[Gemini API Docs](https://ai.google.dev/)** — AI onboarding agent
- **[Stripe Docs](https://stripe.com/docs)** — Payment processing
- **[WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)** — Accessibility standards

---

## ✅ Verification Checklist

After setup, verify your environment is ready:

- [ ] `node --version` outputs `v20.x` or higher
- [ ] `npm --version` outputs `10.x` or higher
- [ ] `npm install` completes without errors
- [ ] `.env` file exists with required keys (at least `PORT` and `GEMINI_API_KEY`)
- [ ] `npm start` outputs "Server running on http://localhost:8080"
- [ ] Browser loads `http://localhost:8080` without 404/500 errors
- [ ] Browser console has no CORS or Connection errors
- [ ] Accessibility features work (screen reader can navigate the app)

---

## 🚀 Next Steps

1. **Read the game rules:** `README.md` for the Playtest Rulebook
2. **Join the community:** See `CONTRIBUTING.md` for how to propose features or report bugs
3. **Deploy to Cloud Run:** Follow [Deploy to Cloud Run](#docker-optional-local--always-for-cloud) for live testing
4. **Set up Stripe:** Add real payment processing for supporter features
5. **Set up Gemini AI:** Implement onboarding agent (see `atprotoPoster.js` for AT Protocol integration example)

---

## 📝 Contributing Notes

- **No build step needed** — edit files and refresh the browser
- **Keep frontend and backend separation clear** — frontend in `public/index.html`, logic in `server.js` and `gameNamespace.js`
- **Test accessibility early** — use a screen reader from day 1, not as an afterthought
- **Use environment variables** — never hardcode API keys or secrets

---

*Last Updated: 2026-08-21*  
*Maintainer: Loptr Lab (@ibloud)*  
*Corrected from v0.1.0-devenv-complete — now reflects actual project state*
