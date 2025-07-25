import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS_JSON);

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    });
}

const bucket = admin.storage().bucket();

export default bucket;
