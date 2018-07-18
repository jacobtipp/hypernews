import * as firebase from 'firebase';

const config = {
  databaseURL: 'https://hacker-news.firebaseio.com'
};

firebase.initializeApp(config);

export const database = firebase.database().ref('/v0');
