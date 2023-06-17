import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { configDotenv } from "dotenv";

configDotenv();

const serviceAccount = {
  //   type: process.env.TYPE,
  projectId: process.env.PROJECT_ID,
  //   privateKeyId: process.env.PRIVATE_KEY_ID,
  privateKey: process.env.PRIVATE_KEY
    ? process.env.PRIVATE_KEY.replace(/\\n/gm, "\n")
    : undefined,
  clientEmail: process.env.CLIENT_EMAIL,
  //   clientId: process.env.CLIENT_ID,
  //   authUri: process.env.AUTH_URI,
  //   tokenUri: process.env.TOKEN_URI,
  //   authProviderX509CertUrl: process.env.AUTH_PROVIDER_X509_CERT_URL,
  //   clientX509CertUrl: process.env.CLIENT_X509_CERT_URL,
  //   universeDomain: process.env.UNIVERSE_DOMAIN,
};

const app = initializeApp({ credential: cert(serviceAccount) });
const firestore = getFirestore(app);

export default firestore;
