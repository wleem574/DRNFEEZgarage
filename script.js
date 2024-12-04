// إعداد Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBMa1ZBBH6Xdi-MqqG4-B8z2oBtOzb3MfA",
  authDomain: "drnfeez-c4037.firebaseapp.com",
  databaseURL: "https://drnfeez-c4037-default-rtdb.firebaseio.com",
  projectId: "drnfeez-c4037",
  storageBucket: "drnfeez-c4037.firebasestorage.app",
  messagingSenderId: "912450814298",
  appId: "1:912450814298:web:2c1cd95abbda31e3a4b363"
};
};
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

// التحقق من حالة تسجيل الدخول
auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('signup-container').style.display = 'none';
        document.getElementById('maintenance-container').style.display = 'block';
        initMapbox();
    } else {
        document.getElementById('login-container').style.display = 'block';
        document.getElementById('signup-container').style.display = 'none';
        document.getElementById('maintenance-container').style.display = 'none';
    }
});

// تحويل بين نموذج تسجيل الدخول والتسجيل
function toggleSignup() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('signup-container').style.display = 'block';
}

function toggleLogin() {
    document.getElementById('signup-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';
}

// تسجيل الدخول
document.getElementById('loginForm').addEventListener('submit', event => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            document.getElementById('loginError').textContent = '';
        })
        .catch(error => {
            document.getElementById('loginError
