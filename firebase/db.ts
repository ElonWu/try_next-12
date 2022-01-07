import admin from 'firebase-admin';
const { getFirestore } = require('firebase-admin/firestore');
const { getStorage } = require('firebase-admin/storage');

import type { Bucket } from '@google-cloud/storage';

const {
  FIREBASE_SERVICE_ACCOUNT_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_BUCKET,
  FIREBASE_DATABASE,
} = process.env;

// try {
//   admin.initializeApp({
//     serviceAccountId: FIREBASE_SERVICE_ACCOUNT_ID,
//     // projectId: FIREBASE_PROJECT_ID,

//     credential: admin.credential.cert({
//       projectId: FIREBASE_PROJECT_ID,
//       privateKey: FIREBASE_PRIVATE_KEY,
//       clientEmail: FIREBASE_CLIENT_EMAIL,
//     }),

//     databaseURL: FIREBASE_DATABASE,
//   });
// } catch (err) {
//   console.log(err);
// }

// export const db = getFirestore();
// export const bucket: Bucket = getStorage().bucket(FIREBASE_BUCKET);
