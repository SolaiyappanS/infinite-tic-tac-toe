const firebaseConfig = {
  apiKey: "AIzaSyBgszh3aMCtUMEU6LJ_F2d7U_0jZi2UuNI",
  authDomain: "infinite-tic-tac-toe-1456c.firebaseapp.com",
  projectId: "infinite-tic-tac-toe-1456c",
  storageBucket: "infinite-tic-tac-toe-1456c.appspot.com",
  messagingSenderId: "138493661788",
  appId: "1:138493661788:web:9d74294ad46fcc130bcc99",
  measurementId: "G-M4NNE4EW4R",
  databaseURL:
    "https://infinite-tic-tac-toe-1456c-default-rtdb.firebaseio.com/",
};
firebase.initializeApp(firebaseConfig);

firebase.database().ref().set("mando");
