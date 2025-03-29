import admin from "firebase-admin";
import { FirebaseAppConfig } from "../../utils/appConfig";

// Initialize Firebase Admin    
const serviceAccount: admin.ServiceAccount = {
  projectId: FirebaseAppConfig.project_id,
  privateKey: FirebaseAppConfig.private_key?.replace(/\\n/g, "\n"), // Ensure correct key format
  clientEmail: FirebaseAppConfig.client_email,
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}



export default admin;
