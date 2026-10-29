
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCzs1SJCUKtgdNoETXCmJ8xlEjyWjAOvOQ",
  authDomain: "proy-dise.firebaseapp.com",
  projectId: "proy-dise",
  storageBucket: "proy-dise.firebasestorage.app",
  messagingSenderId: "517738172453",
  appId: "1:517738172453:web:56eeeb7db86b6b46a9afcc"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
