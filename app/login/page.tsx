"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getFcmToken } from "@/app/lib/getFcmToken";

async function loginCustomer(mobile: string) {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mobile }),
  });

  return await res.json();
}

async function verifyOtp({
  mobile,
  otp,
  customer_name,
  fcm_token_app,
  fcm_token_web,
}: {
  mobile: string;
  otp: string;
  customer_name: string;
  fcm_token_app: string;
  fcm_token_web: string;
}) {
  const res = await fetch("/api/verify-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      mobile,
      otp,
      customer_name,
      fcm_token_app,
      fcm_token_web,
    }),
  });
  console.log(res);

  return await res.json();
}

export default function Login() {
  const router = useRouter();
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"login" | "otp">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await loginCustomer(mobile);
      if (res.status === 1) {
        setStep("otp");
      } else {
        setError(res.message || "Failed to send OTP.");
      }
    } catch (err) {
      setError("Something went wrong.");
      console.log(err, "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // const handleVerify = async () => {
  //   setLoading(true);
  //   setError("");

  //   try {
  //     const fcmToken = await getFcmToken();

  //     const res = await verifyOtp({
  //       mobile,
  //       otp,
  //       customer_name: "abc",
  //       fcm_token_app: fcmToken ?? "",
  //       fcm_token_web: fcmToken ?? "",
  //     });

  //     if (res.status === 1) {
  //       console.log("Login successful:", res);
  //       // Redirect or store token here
  //       router.push("../main/map");
  //     } else {
  //       setError(res.message || "OTP verification failed.");
  //     }
  //   } catch (err) {
  //     setError("Something went wrong during verification.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleVerify = async () => {
    setLoading(true);
    setError("");

    try {
      const fcmToken = await getFcmToken();

      const res = await verifyOtp({
        mobile,
        otp,
        customer_name: "abc",
        fcm_token_app: fcmToken ?? "",
        fcm_token_web: fcmToken ?? "",
      });

      if (res.status === 1) {
        console.log("Login successful:", res);

        const apiKey = res.api_key;

        if (!apiKey) {
          setError("API key not returned.");
          return;
        }

        // 💾 Store it in localStorage or sessionStorage
        localStorage.setItem("google_maps_api_key", apiKey);

        router.push("../main/map");
      } else {
        setError(res.message || "OTP verification failed.");
      }
    } catch (err) {
      setError("Something went wrong during verification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {step === "login" ? "Login with Mobile" : "Verify OTP"}
        </h2>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        {step === "login" && (
          <>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter mobile number"
              className="w-full mb-4 p-3 border rounded text-sm"
            />
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium p-3 rounded"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {step === "otp" && (
          <>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full mb-4 p-3 border rounded text-sm"
            />
            <button
              onClick={handleVerify}
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium p-3 rounded"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
