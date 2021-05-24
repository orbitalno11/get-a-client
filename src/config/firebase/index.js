import firebase from "firebase/app"
import "firebase/auth"
import {FIREBASE_CLIENT_CONFIG} from "../environmentConfig"

firebase.initializeApp(FIREBASE_CLIENT_CONFIG)
const auth = firebase.auth()

export default auth;
