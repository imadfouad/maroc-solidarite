// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyBZKgZiU-ed6sff-K8MMcob2NpqdiCSvD8",
    authDomain: "maroc-seisme.firebaseapp.com",
    projectId: "maroc-seisme",
    storageBucket: "maroc-seisme.appspot.com",
    messagingSenderId: "861103668171",
    appId: "1:861103668171:web:807a8ae0fe6e33fa1c144e",
    measurementId: "G-0QX2W1ERBN"
  }
};
