import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDX01lb_VtYKH0QwMY1Rza0-uTwocsf7Eg',
  authDomain: 'redux-message.firebaseapp.com',
  projectId: 'redux-message',
  storageBucket: 'redux-message.appspot.com',
  messagingSenderId: '33822921460',
  appId: '1:33822921460:web:1591ec54c271cbf406c4a1',
  measurementId: 'G-PW0VZFSV8G',
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export default firebaseConfig;
export const auth = getAuth();
auth.languageCode = 'it';
