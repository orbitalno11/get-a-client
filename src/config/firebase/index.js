import firebase from "firebase/app"
import "firebase/auth"
import { ENVIRONMENT, FIREBASE_CLIENT_CONFIG } from "../environmentConfig"

firebase.initializeApp(FIREBASE_CLIENT_CONFIG)
const auth = firebase.auth()

if (ENVIRONMENT === "local-dev") {
    auth.useEmulator("http://localhost:9099")
}

export default auth;
