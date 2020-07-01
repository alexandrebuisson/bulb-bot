const firebase = require('firebase')
require('firebase/database')

const firebaseConfig = {
  apiKey: 'token',
  authDomain: 'authdomain',
  databaseURL: 'databaseurl',
  projectId: 'id',
  storageBucket: 'storageid',
  messagingSenderId: 'id',
  appId: 'appid',
  measurementId: 'id'
}

firebase.initializeApp(firebaseConfig)
const database = firebase.database()

module.exports = {
  database
}
