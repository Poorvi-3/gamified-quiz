// ===== RESULTS =====
function endQuiz() {
  clearInterval(timer);
  const u = users[currentUser];
  u.games = (u.games||0)+1;
  u.bestScore = Math.max(u.bestScore||0, score);
  u.bestStreak = Math.max(u.bestStreak||0, bestStreak);
  saveUsers();

  const key = quizType;
  const ex = leaderboard.findIndex(e => e.name === currentUser && e.type === key);
  if (ex >= 0) { if (score > leaderboard[ex].score) leaderboard[ex].score = score; }
  else leaderboard.push({ name: currentUser, score, type: key });
  leaderboard.sort((a,b) => b.score-a.score);
  leaderboard = leaderboard.slice(0,20);
  saveLB();

  document.getElementById('final-score').textContent = score;
  const maxPts = 1750;
  const pctArc = Math.min(score / maxPts, 1);
  const arc = document.getElementById('score-arc');
  setTimeout(() => { arc.style.transition = 'stroke-dashoffset 1.2s ease'; arc.style.strokeDashoffset = 408 * (1 - pctArc); }, 100);

  document.getElementById('res-correct').textContent = correctCount;
  document.getElementById('res-wrong').textContent = wrongCount;
  document.getElementById('res-streak').textContent = bestStreak;
  document.getElementById('res-acc').textContent = Math.round((correctCount/10)*100) + '%';

  const pct = correctCount/10;
  let title, trophy, sub;
  if (pct === 1) { title='PERFECT!'; trophy='🏆'; sub='Flawless! You aced every question — pure mastery!'; }
  else if (pct >= 0.8) { title='OUTSTANDING!'; trophy='🥇'; sub='Incredible! Your Java knowledge is seriously impressive!'; }
  else if (pct >= 0.6) { title='WELL DONE!'; trophy='🥈'; sub='Solid performance! A bit more practice and you\'ll be unstoppable!'; }
  else if (pct >= 0.4) { title='KEEP GOING!'; trophy='🥉'; sub='Good effort! Review the concepts and try again — you\'ve got this!'; }
  else { title='PRACTICE MORE'; trophy='📚'; sub='Don\'t give up! Every attempt makes you stronger. Study and retry!'; }

  document.getElementById('result-title').textContent = title;
  document.getElementById('result-trophy').textContent = trophy;
  document.getElementById('result-sub').textContent = sub;
  renderLeaderboard();
  if (pct >= 0.6) spawnConfetti();
  showScreen('results-screen');
}

function renderLeaderboard() {
  const list = document.getElementById('lb-list');
  const lbl = document.getElementById('lb-quiz-label');
  if(lbl) lbl.textContent = quizType === 'threads' ? '🧵 MULTITHREADING BOARD' : '☕ JAVA FUNDAMENTALS BOARD';
  list.innerHTML = '';
  const filtered = leaderboard.filter(e => (e.type||'java') === quizType);
  if (!filtered.length) {
    list.innerHTML = '<div style="padding:18px;text-align:center;color:var(--muted);font-size:0.9rem">No scores yet for this quiz!</div>';
    return;
  }
  filtered.slice(0,10).forEach((entry, i) => {
    const row = document.createElement('div');
    row.className = 'lb-row' + (entry.name===currentUser?' highlight':'');
    row.style.animationDelay = `${i*0.08}s`;
    const rc = i===0?'gold':i===1?'silver':i===2?'bronze':'';
    const re = i===0?'🥇':i===1?'🥈':i===2?'🥉':`#${i+1}`;
    row.innerHTML = `
      <div class="lb-rank ${rc}">${re}</div>
      <div class="lb-avatar">${entry.name[0].toUpperCase()}</div>
      <div class="lb-name">${entry.name}${entry.name===currentUser?' <span style="color:var(--accent);font-size:0.72rem">(YOU)</span>':''}</div>
      <div class="lb-pts">${entry.score} pts</div>`;
    list.appendChild(row);
  });
}

function spawnConfetti() {
  const c = document.getElementById('confetti-container');
  c.innerHTML = '';
  const colors = ['#6c63ff','#ff6584','#43e97b','#f7971e','#a78bfa','#ffd700','#38bdf8'];
  for (let i=0;i<90;i++) {
    const el = document.createElement('div');
    el.className = 'conf';
    el.style.cssText = `left:${Math.random()*100}%;top:-10px;background:${colors[Math.floor(Math.random()*colors.length)]};
      width:${6+Math.random()*8}px;height:${6+Math.random()*8}px;
      border-radius:${Math.random()>.5?'50%':'2px'};
      animation-duration:${1.5+Math.random()*2}s;animation-delay:${Math.random()*0.8}s;`;
    c.appendChild(el);
  }
  setTimeout(() => { c.innerHTML=''; }, 4000);
}

function playAgain() { startQuiz(); }
function goLobby() { enterLobby(); }

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0,0);
}

// Allow Enter key on auth
document.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const loginVisible = document.getElementById('login-form').style.display !== 'none';
    if (document.getElementById('landing').classList.contains('active')) {
      if (loginVisible) handleLogin(); else handleRegister();
    }
  }
});