const Fire = require('firebase')

const config = {
  databaseURL: 'https://hacker-news.firebaseio.com'
}

Fire.initializeApp(config)

const database = module.exports = Fire.database().ref('/v0')

