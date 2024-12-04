// تأكد من تحميل كافة العناصر قبل تنفيذ السكربتات
document.addEventListener("DOMContentLoaded", function () {

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

    // دالة لتحويل بين صفحات التسجيل وتسجيل الدخول
    window.toggleSignup = function () {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('signup-container').style.display = 'block';
    }

    window.toggleLogin = function () {
        document.getElementById('signup-container').style.display = 'none';
        document.getElementById('login-container').style.display = 'block';
    }

    // إظهار/إخفاء كلمة المرور
    const togglePassword = document.getElementById('togglePassword');
    const passwordField = document.getElementById('password');
    togglePassword.addEventListener('click', () => {
        if (passwordField.type === "password") {
            passwordField.type = "text";
        } else {
            passwordField.type = "password";
        }
    });

    // تسجيل الدخول
    document.getElementById('loginForm').addEventListener('submit', event => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                document.getElementById('loginError').textContent = '';  // مسح أي خطأ
                alert('تم تسجيل الدخول بنجاح!');
            })
            .catch(error => {
                document.getElementById('loginError').textContent = error.message;
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
                database.ref('users/' + user.uid).set({
                    phone: phone
                }).then(() => {
                    document.getElementById('signupError').textContent = '';
                    document.getElementById('signup-container').style.display = 'none';
                    document.getElementById('maintenance-container').style.display = 'block';
                    alert("تم إنشاء الحساب بنجاح!");
                });
            })
            .catch(error => {
                document.getElementById('signupError').textContent = error.message;
            });
    });

    // تهيئة خريطة Mapbox باستخدام الموقع الحالي
    function initMapbox() {
        mapboxgl.accessToken = 'pk.eyJ1Ijoid2xlZW01NzQiLCJhIjoiY200OWd1MTllMDlsZDJycjZiMjd3enRoMyJ9.gXzkkWVGxyct5EtwDnZ1NA';
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [31.2357, 30.0444], // الموقع الافتراضي (القاهرة)
            zoom: 12
        });

        // الحصول على الموقع الجغرافي للمستخدم
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                map.setCenter([userLng, userLat]);
                new mapboxgl.Marker()
                    .setLngLat([userLng, userLat])
                    .addTo(map);
            });
        }
    }
});
