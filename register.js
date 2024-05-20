// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCpwtSYxag-Sp0k2CWRqkoChkaVovuPwQQ",
    authDomain: "treasure-tiles-beb7a.firebaseapp.com",
    databaseURL: "https://treasure-tiles-beb7a-default-rtdb.firebaseio.com",
    projectId: "treasure-tiles-beb7a",
    storageBucket: "treasure-tiles-beb7a.appspot.com",
    messagingSenderId: "901706185644",
    appId: "1:901706185644:web:1d60d83de54f3cea4d9809",
    measurementId: "G-5B8WKYPSKK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Ensure the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Sign Up
    const signUpForm = document.getElementById('form1');
    signUpForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById('email-signup').value;
        const password = document.getElementById('password-signup').value;
        const username = document.getElementById('username-signup').value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up
                alert("Creating account...");
                // Redirect to index.html with username as query parameter
                window.location.href = `index.html?username=${encodeURIComponent(username)}`;
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
            });
    });

    // Sign In
    const signInForm = document.getElementById('form2');
    signInForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById('email-signin').value;
        const password = document.getElementById('password-signin').value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                alert("Signing in...");
                const user = userCredential.user;
                // Redirect to index.html
                window.location.href = `index.html?username=${encodeURIComponent(user.email)}`;
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
            });
    });

    // Forgot Password
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    forgotPasswordLink.addEventListener("click", function (event) {
        event.preventDefault();

        const email = document.getElementById('email-signin').value;
        if (!email) {
            alert("Please enter your email address first.");
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("Password reset email sent!");
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
            });
    });
});
