import admin from "firebase-admin";
import serviceAccount from "../../firebase_service_account.json"; // Adjust path

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

export default admin;
