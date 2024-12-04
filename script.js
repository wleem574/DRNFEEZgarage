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

// تهيئة تطبيق Firebase
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
            document.getElementById('loginError').textContent = '';  // مسح أي خطأ
        })
        .catch(error => {
            document.getElementById('loginError').textContent = error.message;  // عرض الخطأ
        });
});

// تسجيل الخروج
document.getElementById('logout').addEventListener('click', () => {
    auth.signOut().then(() => {
        document.getElementById('maintenance-container').style.display = 'none';
        document.getElementById('login-container').style.display = 'block';
        document.getElementById('signup-container').style.display = 'none';
    }).catch(error => {
        console.error('Error during sign out:', error);
    });
});

// إنشاء حساب جديد
document.getElementById('signupForm').addEventListener('submit', event => {
    event.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const phone = document.getElementById('phone').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            const user = userCredential.user;
            // حفظ رقم الهاتف في قاعدة البيانات
            database.ref('users/' + user.uid).set({
                phone: phone
            }).then(() => {
                document.getElementById('signupError').textContent = '';  // مسح أي خطأ
                document.getElementById('signup-container').style.display = 'none';
                document.getElementById('maintenance-container').style.display = 'block';
                initMapbox();  // تهيئة الخريطة
            });
        })
        .catch(error => {
            document.getElementById('signupError').textContent = error.message;  // عرض الخطأ
        });
});

// إعداد خريطة Mapbox
function initMapbox() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWRtaW4wNjciLCJhIjoiY2xhaWxlYzc5M2Y1b3F1ZzE0b2p2bDN2dyJ9.rTjjbASi78biOZyrtXyXdg';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [31.2357, 30.0444], // مكان افتراضي (الإحداثيات الخاصة بالقاهرة)
        zoom: 12
    });
}
