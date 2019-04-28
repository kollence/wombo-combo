import firebase from 'firebase/app'
import 'firebase/firestore';
import'firebase/app';
import 'firebase/auth';
import FirebaseConfig from './FirebaseConfig'
const firebaseApp = firebase.initializeApp(FirebaseConfig)
const db = firebaseApp.firestore()

db.settings({
    timestampsInSnapshots: true
})
export default db
