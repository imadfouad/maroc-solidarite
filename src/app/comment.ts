import firebase from 'firebase/compat/app';

export interface Comment {
  text: string;
  timestamp: firebase.firestore.Timestamp | firebase.firestore.FieldValue;
}