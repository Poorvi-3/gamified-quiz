// ===== STATE =====
let users = {};
let leaderboard = [];
try { users = JSON.parse(localStorage.getItem('qv_users') || '{}'); } catch(e){}
try { leaderboard = JSON.parse(localStorage.getItem('qv_lb') || '[]'); } catch(e){}
let currentUser = null;
let quizType = 'java';
let qIndex, score, streak, bestStreak, correctCount, wrongCount, timer, timeLeft, answered, shuffledQs;

// ===== AUTH =====
function switchTab(tab) {
  document.querySelectorAll('.auth-tab').forEach((t,i) =>
    t.classList.toggle('active', (tab==='login'&&i===0)||(tab==='register'&&i===1))
  );
  document.getElementById('login-form').style.display = tab==='login'?'block':'none';
  document.getElementById('register-form').style.display = tab==='register'?'block':'none';
  document.getElementById('auth-error').textContent = '';
}

function handleLogin() {
  const u = document.getElementById('login-user').value.trim();
  if (!u) { setError('Please enter a username.'); return; }
  users[u] = users[u] || { pass:'', bestScore:0, games:0, bestStreak:0 };
  saveUsers();
  currentUser = u;
  setError('');
  enterLobby();
}

function handleRegister() {
  const u = document.getElementById('reg-user').value.trim();
  if (!u) { setError('Please enter a username.'); return; }
  users[u] = users[u] || { pass:'', bestScore:0, games:0, bestStreak:0 };
  saveUsers();
  currentUser = u;
  setError('');
  enterLobby();
}

function setError(msg) { document.getElementById('auth-error').textContent = msg; }
function saveUsers() { localStorage.setItem('qv_users', JSON.stringify(users)); }
function saveLB() { localStorage.setItem('qv_lb', JSON.stringify(leaderboard)); }
function logout() { currentUser = null; showScreen('landing'); }

// ===== LOBBY =====
function enterLobby() {
  if (!users[currentUser]) {
    users[currentUser] = { pass:'', bestScore:0, games:0, bestStreak:0 };
    saveUsers();
  }
  const u = users[currentUser];
  document.getElementById('nav-avatar').textContent = currentUser[0].toUpperCase();
  document.getElementById('nav-name').textContent = currentUser;
  document.getElementById('stat-best').textContent = u.bestScore || '—';
  document.getElementById('stat-games').textContent = u.games || 0;
  document.getElementById('stat-streak').textContent = u.bestStreak || 0;
  showScreen('lobby');
}