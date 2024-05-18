// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAv9czz6CgBNwRBNDARSDz-iS1XzlcgELQ',
  authDomain: 'usco-32446.firebaseapp.com',
  projectId: 'usco-32446',
  storageBucket: 'usco-32446.appspot.com',
  messagingSenderId: '647249249461',
  appId: '1:647249249461:web:ff43662e4725971cab2afc',
  measurementId: 'G-6GDBJ9C3BW'
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAnalytics = getAnalytics(firebaseApp)
export const firebaseAuth = getAuth(firebaseApp)
