import * as admin from "firebase-admin";
import serviceAccount from "./fbservice.json";

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const bucket = admin.storage().bucket("gs://fbmarketplace-ff4fb.appspot.com");

export default bucket;
