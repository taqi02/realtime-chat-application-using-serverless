// ==== Firebase Config ====
const firebaseConfig = {
  apiKey: "AIzaSyCh8sKjnb6bM51nDZoRGqIJPAAUJRnmgwA",
  authDomain: "chat-application-9733b.firebaseapp.com",
  projectId: "chat-application-9733b",
  storageBucket: "chat-application-9733b.firebasestorage.app",
  messagingSenderId: "259346580645",
  appId: "1:259346580645:web:194d3be4f02e75e241b94c",
  measurementId: "G-0CFFPMH0R5"
};

// ==== Initialize Firebase ====
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// --- UI Elements ---
const loginContainer = document.getElementById('login-container');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const chatContainer = document.getElementById('chat-container');
const logoutBtn = document.getElementById('logout-btn');
const messagesDiv = document.getElementById('messages');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

let currentUser = null;
let unsubscribeMessages = null;

// --- Auth State Listener ---
auth.onAuthStateChanged(user => {
  currentUser = user;
  if (user) {
    loginContainer.style.display = 'none';
    chatContainer.style.display = '';
    listenForMessages();
  } else {
    loginContainer.style.display = '';
    chatContainer.style.display = 'none';
    messagesDiv.innerHTML = '';
    if (unsubscribeMessages) unsubscribeMessages();
  }
});

// --- Login Form ---
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  loginError.textContent = '';

  auth.signInWithEmailAndPassword(email, password)
    .catch(err => {
      loginError.textContent = err.message.replace('Firebase: ', '');
    });
});

// --- Logout ---
logoutBtn.addEventListener('click', () => {
  auth.signOut();
});

// --- Message Form ---
messageForm.addEventListener('submit', e => {
  e.preventDefault();
  const text = messageInput.value.trim();
  if (!text || !currentUser) return;

  db.collection('messages').add({
    user: currentUser.email,
    message: text,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });
  messageInput.value = '';
});

// --- Real-time Messages ---
function listenForMessages() {
  if (unsubscribeMessages) unsubscribeMessages();

  unsubscribeMessages = db.collection('messages')
    .orderBy('timestamp')
    .limitToLast(100)
    .onSnapshot(snapshot => {
      messagesDiv.innerHTML = '';
      snapshot.forEach(doc => {
        const data = doc.data();
        const self = data.user === (currentUser && currentUser.email);

        const bubble = document.createElement('div');
        bubble.className = 'message-bubble ' + (self ? 'self' : 'other');
        bubble.innerHTML = `
          <div>${data.message || ''}</div>
          <div class="message-meta">${data.user}${data.timestamp && data.timestamp.toDate() ? ' • ' + data.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</div>
        `;
        messagesDiv.appendChild(bubble);
      });
      // Scroll to bottom
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    });
}
