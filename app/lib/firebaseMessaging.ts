"use client";

import { getMessaging } from "firebase/messaging";
import { firebaseApp } from "./firebase";

let messaging: ReturnType<typeof getMessaging> | null = null;

if (typeof window !== "undefined" && typeof navigator !== "undefined") {
  try {
    messaging = getMessaging(firebaseApp);
  } catch (err) {
    console.error("Firebase Messaging not supported:", err);
  }
}

export { messaging };
