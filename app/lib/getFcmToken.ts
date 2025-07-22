// lib/getFcmToken.ts
"use client";

import { getToken } from "firebase/messaging";
import { messaging } from "@/app/lib/firebaseMessaging";

export async function getFcmToken(): Promise<string | null> {
  if (!messaging) {
    console.warn("Messaging is not initialized or not supported.");
    return null;
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return null;

    const token = await getToken(messaging, {
      vapidKey:
        "BK0OLtKCdCnj-N_uDg-1VtV7yIfZQ8ePbNTzdu1Iqy9kX9pEc1wf-pE5kkRk6lCWeDVytSsQKDuoqZ86uGYi914",
    });

    return token;
  } catch (err) {
    console.error("Failed to get FCM token", err);
    return null;
  }
}
