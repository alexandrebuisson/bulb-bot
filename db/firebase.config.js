const firebase = require('firebase')
require('firebase/auth')
require('firebase/database')

const firebaseConfig = {
  apiKey: 'AIzaSyBkPbH5LR7-cXDoE2Lc25XEtgCbvxC5cIU',
  authDomain: 'bulb-bot.firebaseapp.com',
  databaseURL: 'https://bulb-bot.firebaseio.com',
  projectId: 'bulb-bot',
  storageBucket: 'bulb-bot.appspot.com',
  messagingSenderId: '463810155573',
  appId: '1:463810155573:web:8d5329ea6c62ab5915cd7c',
  measurementId: 'G-D3FE5R9FKF'
}

firebase.initializeApp(firebaseConfig)
const database = firebase.database()

module.exports = {
  database
}
