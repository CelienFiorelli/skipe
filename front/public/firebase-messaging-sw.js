// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/11.3.1/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker
// "Default" Firebase configuration (prevents errors)
const firebaseConfig = {
    apiKey: "AIzaSyA2SjvLR_wsh_yNJOB-T5pN1YfZ273PHgQ",
    authDomain: "skipe-2ba29.firebaseapp.com",
    projectId: "skipe-2ba29",
    storageBucket: "skipe-2ba29.firebasestorage.app",
    messagingSenderId: "519792353484",
    appId: "1:519792353484:web:d3f991d0806d4c70a32269"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  // const notificationTitle = 'test';
  const notificationOptions = {
    icon: './skipe.webp',
    image: './skipe.webp',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});