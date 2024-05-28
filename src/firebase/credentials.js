// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBFijMGVvDXAtDzz2K9EpXYOAoD5naaAqI',
  authDomain: 'usco-bab13.firebaseapp.com',
  projectId: 'usco-bab13',
  storageBucket: 'usco-bab13.appspot.com',
  messagingSenderId: '756907686385',
  appId: '1:756907686385:web:91c920eacd410164512c50',
  measurementId: 'G-BCJPE2JTM3'
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAnalytics = getAnalytics(firebaseApp)
export const firebaseAuth = getAuth(firebaseApp)
