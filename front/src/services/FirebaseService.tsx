// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken } from "firebase/messaging";

// const firebaseConfig = {
//     apiKey: "AIzaSyA2SjvLR_wsh_yNJOB-T5pN1YfZ273PHgQ",
//     authDomain: "skipe-2ba29.firebaseapp.com",
//     projectId: "skipe-2ba29",
//     storageBucket: "skipe-2ba29.firebasestorage.app",
//     messagingSenderId: "519792353484",
//     appId: "1:519792353484:web:d3f991d0806d4c70a32269"
// };

// const validKey = 'BFUuR9WB_HCqzIh8yT59bc-kEXktKwrHevD5iMb-W0wUXdN4cz-VLI8jAHUSqiZxIv-gBm9iWczJAAvclzqmhO0'

// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);

// export const requestPermission = async (): Promise<string | null> => {
//   try {
//     const permission = await Notification.requestPermission();
    
//     if (permission === "granted") {
//       const token = await getToken(messaging, { vapidKey: validKey });
//       console.log("FCM Token:", token);
//       return token;
//     } else {
//       console.log("Permission denied");
//       return null;
//     }
//   } catch (error) {
//     console.error("Error getting permission:", error);
//     return null;
//   }
// };

// export default messaging;