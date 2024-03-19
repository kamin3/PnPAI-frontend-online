import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  onBackgroundMessage,
  getMessaging,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-sw.js";

const messaging = getMessaging(
  initializeApp({
    apiKey: "AIzaSyB4ls3cNL_lWNH-pmlHezElVKVCQGMsmX0",
    authDomain: "pnpnotification-9784d.firebaseapp.com",
    projectId: "pnpnotification-9784d",
    storageBucket: "pnpnotification-9784d.appspot.com",
    messagingSenderId: "316608149052",
    appId: "1:316608149052:web:0c25e529b1c6c1b45e7539",
  })
);

onBackgroundMessage(messaging, (notification) => {
  self.registration.showNotification("PNPAI Notification", {
    body: notification.data.message,
    icon: "./assets/icons/health.svg",
  });
});
