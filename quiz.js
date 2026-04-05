// ===== QUIZ =====
function startQuiz(type) {
  quizType = type || 'java';
  const pool = quizType === 'threads' ? QUESTIONS_MULTITHREADING : QUESTIONS;
  shuffledQs = [...pool].sort(() => Math.random() - 0.5);
  qIndex = 0; score = 0; streak = 0; bestStreak = 0;
  correctCount = 0; wrongCount = 0;
  showScreen('quiz-screen');
  loadQuestion();
}

function loadQuestion() {
  answered = false;
  const q = shuffledQs[qIndex];
  document.getElementById('q-counter').textContent = `QUESTION ${qIndex+1}/10`;
  document.getElementById('q-category-label').textContent = quizType === 'threads' ? '🧵 MULTITHREADING' : '☕ JAVA FUNDAMENTALS';
  document.getElementById('live-score').textContent = score;
  document.getElementById('q-text').textContent = q.q;
  document.getElementById('progress-fill').style.width = `${(qIndex/10)*100}%`;
  document.getElementById('feedback-bar').style.display = 'none';
  document.getElementById('next-btn').style.display = 'none';

  const sb = document.getElementById('streak-banner');
  if (streak >= 2) {
    sb.style.display = 'block';
    document.getElementById('streak-count').textContent = streak;
  } else {
    sb.style.display = 'none';
  }

  const grid = document.getElementById('options-grid');
  grid.innerHTML = '';
  q.opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span class="opt-label">${LABELS[i]}</span><span>${opt}</span>`;
    btn.onclick = () => selectAnswer(i, btn);
    grid.appendChild(btn);
  });

  clearInterval(timer);
  timeLeft = TIME;
  updateTimer();
  timer = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) { clearInterval(timer); if (!answered) timeOut(); }
  }, 1000);
}

function updateTimer() {
  const circle = document.getElementById('timer-circle');
  const num = document.getElementById('timer-num');
  const offset = CIRCUMFERENCE - (timeLeft / TIME) * CIRCUMFERENCE;
  circle.style.strokeDashoffset = offset;
  num.textContent = timeLeft;
  const clr = timeLeft <= 5 ? '#ff6584' : timeLeft <= 10 ? '#f7971e' : '#43e97b';
  circle.style.stroke = clr;
  num.style.color = clr;
}

function selectAnswer(idx, btn) {
  if (answered) return;
  answered = true;
  clearInterval(timer);
  const q = shuffledQs[qIndex];
  const allBtns = document.querySelectorAll('.option-btn');
  allBtns.forEach(b => b.disabled = true);
  const fb = document.getElementById('feedback-bar');

  if (idx === q.ans) {
    btn.classList.add('correct');
    streak++;
    bestStreak = Math.max(bestStreak, streak);
    correctCount++;
    const pts = 100 + (timeLeft * 5) + (streak > 1 ? (streak-1)*25 : 0);
    score += pts;
    document.getElementById('live-score').textContent = score;
    fb.className = 'feedback-bar correct';
    fb.innerHTML = `<span>✅</span><span><strong>Correct! +${pts} pts</strong> — ${q.explain}</span>`;
    if (streak >= 2) {
      document.getElementById('streak-count').textContent = streak;
      document.getElementById('streak-banner').style.display = 'block';
    }
  } else {
    btn.classList.add('wrong');
    allBtns[q.ans].classList.add('correct');
    streak = 0;
    wrongCount++;
    document.getElementById('streak-banner').style.display = 'none';
    fb.className = 'feedback-bar wrong';
    fb.innerHTML = `<span>❌</span><span><strong>Wrong!</strong> — ${q.explain}</span>`;
  }

  fb.style.display = 'flex';
  document.getElementById('next-btn').style.display = 'block';
}

function timeOut() {
  if (answered) return;
  answered = true;
  const q = shuffledQs[qIndex];
  document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
  document.querySelectorAll('.option-btn')[q.ans].classList.add('correct');
  streak = 0; wrongCount++;
  document.getElementById('streak-banner').style.display = 'none';
  const fb = document.getElementById('feedback-bar');
  fb.className = 'feedback-bar wrong';
  fb.innerHTML = `<span>⏰</span><span><strong>Time's up!</strong> — ${q.explain}</span>`;
  fb.style.display = 'flex';
  document.getElementById('next-btn').style.display = 'block';
}

function nextQuestion() {
  qIndex++;
  if (qIndex >= 10) endQuiz(); else loadQuestion();
}