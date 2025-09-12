const admin = require('firebase-admin');

// Initialize Firebase Admin (you'll need your service account key)
const serviceAccount = require('C:/Users/anind/Downloads/aniprojects-7e99a-firebase-adminsdk-fbsvc-0892836dcc.json');
// "C:\Users\anind\Downloads\aniprojects-7e99a-firebase-adminsdk-fbsvc-0892836dcc.json"
//C:/Users/anind/Downloads/aniprojects-7e99a-firebase-adminsdk-fbsvc-0892836dcc.json

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: process.env.FIREBASE_PROJECT_ID
});

module.exports = admin;