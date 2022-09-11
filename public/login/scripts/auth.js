// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.4/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB26kv2VCXe1FzxMVpu-65f78t4P0JILMU",
  authDomain: "geneaz.firebaseapp.com",
  databaseURL: "https://geneaz-default-rtdb.firebaseio.com",
  projectId: "geneaz",
  storageBucket: "geneaz.appspot.com",
  messagingSenderId: "1090047398827",
  appId: "1:1090047398827:web:87cb7016a55cf50c25b8ee",
  measurementId: "G-1JNWN0BQYE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// auth reference
const auth = getAuth(app);

// listen for auth status changes
auth.onAuthStateChanged((user) => {
    if(user) {
        // info Modal
        document.querySelector('#login-li').style.display = 'none';
        document.querySelector('#novoacesso-li').style.display = 'none';
        document.querySelector('#acessogeneaz-li').style.display = '';
        const accInfo = document.querySelector('.account-details');
        accInfo.innerHTML = 'E-mail: ' + user.email+'<br/>';
        accInfo.innerHTML += 'Criado em: ' + new Date(user.metadata.creationTime).toLocaleString('pt-BR')+'<br/>';
        accInfo.innerHTML += 'Ultimo acesso: ' + new Date(user.metadata.lastSignInTime).toLocaleString('pt-BR');
        console.log('User Logged in: ', user);
    } else {
        console.log('User logged out');
        document.querySelector('#meuacesso-li').style.display = 'none';
        document.querySelector('#sair-li').style.display = 'none';
        document.querySelector('#acessogeneaz-li').style.display = 'none';
    }
});

// sign up user
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // sign up the user with email and pass
    createUserWithEmailAndPassword(auth ,email, password)
    .then((cred) => {
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
    });
    
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    //e.preventDefault();
    auth.signOut();
    location.reload();
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
    
    signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
        // close the login modal and reset form
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        location.reload();
        //loginForm.reset();
    }).catch((error) => {
        alert('Acesso não autorizado.');
    })
})
