import type { ServiceAccount } from 'firebase-admin';

import admin from 'firebase-admin';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

const {
  FIREBASE_project_id,
  FIREBASE_private_key_id,
  FIREBASE_private_key,
  FIREBASE_client_email,
  FIREBASE_client_id,
  FIREBASE_client_x509_cert_url,
} = process.env;

if (!admin.apps.length) {
  initializeApp({
    credential: cert({
      project_id: FIREBASE_project_id,
      private_key_id: FIREBASE_private_key_id,
      private_key: FIREBASE_private_key?.replace(/\\n/gi, '\n'),
      client_email: FIREBASE_client_email,
      client_id: FIREBASE_client_id,

      type: 'service_account',
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url: FIREBASE_client_x509_cert_url,
    } as ServiceAccount),
  });
}

export const firestore = getFirestore();
export const storage = getStorage();
