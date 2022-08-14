import { initializeApp} from "firebase/app";
import { getFirestore} from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBgsIvT3xK5SPaJ-Dsuu4IsZ6Rigoxik_U",
    authDomain: "superchat-c4a7d.firebaseapp.com",
    projectId: "superchat-c4a7d",
    storageBucket: "superchat-c4a7d.appspot.com",
    messagingSenderId: "995106029419",
    appId: "1:995106029419:web:e7619dec55cea97fa1162e"
  };

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);