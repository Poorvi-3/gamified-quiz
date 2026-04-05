# ⚡ QuizVerse — Play. Learn. Compete.

A gamified online quiz system built with HTML, CSS and vanilla JavaScript.
Inspired by the project presentation by C Bimbitha & R K Poorvi.

## 🚀 Features
- ☕ Java Fundamentals Quiz (10 questions)
- 🧵 Java Multithreading Quiz (10 questions)
- ⏱ 20-second countdown timer per question
- 🔥 Streak system with "On Fire" banner
- 🏆 Persistent leaderboard (localStorage)
- ⚡ Instant feedback with explanations
- 🎊 Confetti on high scores

## 📁 Project Structure
```
quizverse/
├── index.html          ← Main HTML (all screens)
├── css/
│   └── style.css       ← All styles
├── js/
│   ├── questions.js    ← Java + Multithreading question banks
│   ├── auth.js         ← Login / Register / Lobby logic
│   ├── quiz.js         ← Timer, scoring, streak logic
│   └── results.js      ← Results, leaderboard, confetti
└── README.md
```

## 🌐 How to Run

### Locally (in Antigravity / VS Code)
1. Open the `quizverse/` folder in Antigravity
2. Right-click `index.html` → **Open with Live Server**
3. Done! Runs at `http://localhost:5500`

### Online (share with anyone)
1. Go to https://app.netlify.com/drop
2. Drag the entire `quizverse/` folder onto the page
3. Get a public URL instantly — works on any device, any network

### GitHub Pages
1. Push this folder to a GitHub repo
2. Settings → Pages → Branch: main → Save
3. Live at: `https://yourusername.github.io/quizverse`

## 🛠 Tech Stack
- HTML5, CSS3, Vanilla JavaScript
- Google Fonts (Orbitron + Exo 2)
- localStorage for persistent scores
- No frameworks, no dependencies, no backend needed
