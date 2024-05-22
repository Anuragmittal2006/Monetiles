// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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
const db = getFirestore(app); // Initialize Firestore

// Ensure the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Function to display messages
    function displayMessage(message, type = "info") {
        const messageDiv = document.getElementById("message");
        messageDiv.innerText = message;
        messageDiv.className = type; // Add class based on the message type (info, error, success)
        setTimeout(() => {
            messageDiv.innerText = "";
            messageDiv.className = ""; // Clear message after 5 seconds
        }, 5000);
    }

    // Function to show the spinner
    function showSpinner() {
        document.getElementById("spinner").style.display = "block";
    }

    // Function to hide the spinner
    function hideSpinner() {
        document.getElementById("spinner").style.display = "none";
    }

    // Function to update the wallet balance in the DOM
    function updateWalletBalance(balance) {
        const balanceDiv = document.getElementById("wallet");
        balanceDiv.innerText = `Wallet Balance: ${balance}`;
    }

    // Function to listen to real-time updates for the user's document
    function listenToUserDocument(uid) {
        const userDocRef = doc(db, "users", uid);
        onSnapshot(userDocRef, (doc) => {
            if (doc.exists()) {
                const userData = doc.data();
                updateWalletBalance(userData.walletBalance);
            } else {
                console.log("No such document!");
            }
        });
    }

    // Function to create a new user document with initial wallet balance
    async function createUserDocument(uid, username) {
        console.log("Creating user document for UID:", uid);
        try {
            await setDoc(doc(db, "users", uid), {
                username: username,
                walletBalance: 0 // Set initial wallet balance to 0
            });
            console.log("User document successfully created!");
            // Start listening to real-time updates for the user's document
            listenToUserDocument(uid);
        } catch (error) {
            console.error("Error creating user document: ", error);
            displayMessage(`Error creating user document: ${error.message}`, "error");
        }
    }

    // Sign Up
    const signUpForm = document.getElementById('form1');
    signUpForm.addEventListener("submit", function (event) {
        event.preventDefault();

        showSpinner();

        const email = document.getElementById('email-signup').value;
        const password = document.getElementById('password-signup').value;
        const username = document.getElementById('username-signup').value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                sendEmailVerification(user)
                    .then(() => {
                        displayMessage("Email verification sent! Please verify your email.", "info");

                        // Create user document in Firestore
                        createUserDocument(user.uid, username);

                        // Check email verification status periodically
                        const intervalId = setInterval(() => {
                            user.reload()
                                .then(() => {
                                    if (user.emailVerified) {
                                        clearInterval(intervalId);
                                        hideSpinner();
                                        displayMessage("Email verified! Account created successfully.", "success");

                                        // Redirect to index.html with username as query parameter
                                        window.location.href = `index.html?username=${encodeURIComponent(username)}`;
                                    }
                                })
                                .catch((error) => {
                                    clearInterval(intervalId);
                                    hideSpinner();
                                    displayMessage(error.message, "error");
                                });
                        }, 5000); // Check every 5 seconds

                        // Set a timeout to delete the user if not verified within 5 minutes
                        setTimeout(() => {
                            user.reload()
                                .then(() => {
                                    if (!user.emailVerified) {
                                        user.delete()
                                            .then(() => {
                                                displayMessage("Email not verified within 5 minutes. Account deleted.", "error");
                                            })
                                            .catch((error) => {
                                                displayMessage(error.message, "error");
                                            });
                                    }
                                })
                                .catch((error) => {
                                    displayMessage(error.message, "error");
                                });
                        }, 300000); // 5 minutes in milliseconds
                    })
                    .catch((error) => {
                        hideSpinner();
                        displayMessage(error.message, "error");
                    });
            })
            .catch((error) => {
                hideSpinner();
                displayMessage(error.message, "error");
            });
    });

    // Sign In
    const signInForm = document.getElementById('form2');
    signInForm.addEventListener("submit", function (event) {
        event.preventDefault();

        showSpinner();

        const email = document.getElementById('email-signin').value;
        const password = document.getElementById('password-signin').value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                hideSpinner();
                alert("Signing in...");
                const user = userCredential.user;
                // Redirect to index.html
                window.location.href = `index.html?username=${encodeURIComponent(user.email)}`;
                // Start listening to real-time updates for the user's document
                listenToUserDocument(user.uid);
            })
            .catch((error) => {
                hideSpinner();
                const errorMessage = error.message;
                displayMessage(errorMessage, "error");
            });
    });

    // Forgot Password
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    forgotPasswordLink.addEventListener("click", function (event) {
        event.preventDefault();

        const email = document.getElementById('email-signin').value;
        if (!email) {
            displayMessage("Please enter your email address first.", "error");
            return;
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                displayMessage("Password reset email sent!", "success");
            })
            .catch((error) => {
                const errorMessage = error.message;
                displayMessage(errorMessage, "error");
            });
    });
});

// Logout Button Click Event
const logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', function() {
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log("User logged out successfully.");
        // Redirect to login page or another page after logout
        window.location.href = "login.html"; // Change this to your desired page URL
    }).catch((error) => {
        // An error happened.
        console.error("Error logging out:", error);
    });
});
