import * as firebase from "firebase"
const firebaseConfig = {
    apiKey: "AIzaSyCyr-69XnAgeUfZSaiaXrOtn4PdPk8GSW4",
    authDomain: "animelist-724bc.firebaseapp.com",
    databaseURL: "https://animelist-724bc.firebaseio.com",
    projectId: "animelist-724bc",
    storageBucket: "",
    messagingSenderId: "784592769358",
    appId: "1:784592769358:web:4ea33965a4ada316898e1f"
  };

  

 const firebaseApp = firebase.initializeApp(firebaseConfig) 
 export const firebaseAuth = firebaseApp.auth();