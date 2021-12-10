import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBv4caUlaw6hYaS3kQqFJOqhv7zWurCPv4",
    authDomain: "fed20-introduktion.firebaseapp.com",
    projectId: "fed20-introduktion",
    storageBucket: "fed20-introduktion.appspot.com",
    messagingSenderId: "39523895617",
    appId: "1:39523895617:web:38609a85a116ec4d97f9c0"
  };

// init firebase
const app = initializeApp(firebaseConfig)

// get firebase auth instance
const auth = getAuth()

// get firebase firestore instance
const db = getFirestore(app)

export {
	app as default,
	auth,
	db,
}
