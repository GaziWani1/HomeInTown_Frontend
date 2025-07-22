importScripts(
  "https://www.gstatic.com/firebasejs/10.11.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.11.1/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "dummy",
  projectId: "dummy",
  messagingSenderId: "your-sender-id",
  appId: "dummy",
});

firebase.messaging();
