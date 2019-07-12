import * as firebase from "firebase/app";
import "firebase/messaging";

const initializedFirebaseApp = firebase.initializeApp({
  messagingSenderId: "444854577111"
});

const messaging = initializedFirebaseApp.messaging();

messaging.usePublicVapidKey(
  "BBquCJKljxp4JfhFy_Jr43veh9bgZfacK50_1ED1z2_TLLXvukkfd7oTaOwjnlATJwA2aGjzChwZ6LMhAYU8PxI"
);

export { messaging };
