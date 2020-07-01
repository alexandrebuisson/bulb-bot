const firebase = require('firebase')
require('firebase/database')

const firebaseConfig = {
 ///
};

firebase.initializeApp(firebaseConfig)
const database = firebase.database()

module.exports = {
  database
}
