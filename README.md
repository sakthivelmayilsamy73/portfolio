# Sakthivel Mayilsamy — Portfolio Website

Full-stack developer portfolio built with HTML, CSS, and vanilla JavaScript.
Light professional theme · Python · React · AWS · Ontario, Canada.

---

## Project Structure

```
portfolio/
├── index.html                  # Main HTML file
├── style.css                   # Light theme stylesheet
├── .env                        # Your secrets — DO NOT COMMIT
├── .env.example                # Template — safe to commit
├── .gitignore                  # Keeps .env out of git
└── photos/
    ├── saktilogo.svg           # Your logo
    ├── 1.jpeg                  # Project 1 image
    ├── 2.jpeg                  # Project 2 image
    └── 3.jpeg                  # Project 3 image
```

---

## Quick Start

**1. Clone and set up**
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

**2. Set up environment variables**
```bash
cp .env.example .env
# Open .env and fill in your real values
```

**3. Open locally**
```bash
# Just open index.html in your browser — no build step needed
open index.html
```

---

## Environment Variables

Copy `.env.example` to `.env` and fill in your values.

| Variable | Where to get it | Risk if exposed |
|---|---|---|
| `WEB3FORMS_ACCESS_KEY` | web3forms.com dashboard | Low — domain-locked |
| `AWS_ACCESS_KEY_ID` | AWS IAM console | HIGH — rotate immediately if leaked |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM console | HIGH — rotate immediately if leaked |
| `SECRET_KEY` | Generate randomly | High — used to sign sessions |
| `DATABASE_URL` | Your DB host | High — full DB access |
| `OPENAI_API_KEY` | platform.openai.com | High — billing impact |

**Generate a secure SECRET_KEY:**
```bash
python3 -c "import secrets; print(secrets.token_hex(32))"
```

---

## Keeping API Keys Secure

### For this static site (no backend)

**Web3Forms key** — safe to put directly in HTML. It's domain-locked.
Go to web3forms.com → Settings → add your domain to the allowlist.

**All other keys** — do NOT put in HTML. Use one of these instead:

**Option A — Cloudflare Workers (free, recommended)**
```
Browser → Cloudflare Worker (key lives here) → API
```
1. Sign up at cloudflare.com (free)
2. Create a Worker
3. Add your key via Workers → Settings → Environment Variables
4. Call your worker URL from the frontend instead of the API directly

**Option B — Add a Flask backend**
```bash
pip install flask python-dotenv
```
```python
# app.py
from flask import Flask
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)

@app.route('/api/contact', methods=['POST'])
def contact():
    key = os.environ['WEB3FORMS_ACCESS_KEY']
    # make the API call server-side
```
Then deploy to Heroku and set config vars:
```bash
heroku config:set WEB3FORMS_ACCESS_KEY=your_key_here
heroku config:set SECRET_KEY=your_secret_here
```

---

## Deployment

### Heroku
```bash
# First time
heroku create your-portfolio-name
heroku config:set SECRET_KEY=$(python3 -c "import secrets; print(secrets.token_hex(32))")
heroku config:set WEB3FORMS_ACCESS_KEY=your_key_here

# Deploy
git push heroku main
```

### Netlify / Vercel (static)
1. Connect your GitHub repo
2. Set environment variables in the dashboard (Site Settings → Environment Variables)
3. Push to main — auto-deploys

### GitHub Pages (simplest for static)
```bash
# In repo settings → Pages → Source: main branch / root
# Your site goes live at: https://yourusername.github.io/portfolio
```

---

## Resume Download

Place your resume PDF in the project root named exactly:
```
Sakthivel_Mayilsamy_Resume.pdf
```
The download button in the Resume section links to this file automatically.

---

## Updating Content

| What to change | Where |
|---|---|
| Name, bio, about text | `index.html` — About section |
| Project descriptions | `index.html` — Work section |
| Project images | Replace `photos/1.jpeg`, `2.jpeg`, `3.jpeg` |
| Timeline / experience | `index.html` — Resume section |
| Colours and fonts | `style.css` — `:root` variables at the top |
| Contact email | `index.html` — Contact section |

---

## Contact

sakthivel.mayilsamy.dev@gmail.com  
linkedin.com/in/sakthivel-mayilsamy-b8463585  
+1 (647) 957-1139
