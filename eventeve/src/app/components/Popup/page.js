
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  auth,
  googleProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@/Firebase/config/firebaseConfig";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegisterPopupVisible, setRegisterPopupVisible] = useState(false);
  const [userType, setUserType] = useState(""); // "vendor" or "user"
  const router = useRouter();

  // 🔐 Handle Email Login
  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
  
      // const response = await fetch("http://localhost:5000/api/login", {
        await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/login`, {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) throw new Error("Login verification failed");
  
      const userData = await response.json(); // { role: "vendor", status: "Pending" }
  
      console.log("✅ User data from backend:", userData);
  
      alert("Login successful!");
  
      // ✅ Redirect based on role and status
      if (userData.role === "vendor") {
        if (userData.status === "Approved") {
          router.push("/Vendor/VendorDashboard");
        } else if (userData.status === "Pending") {
          alert("Your vendor account is pending approval.");
          router.push("/Vendor/ApprovalPending"); // optional page
        } else if (userData.status === "Rejected") {
          alert("Your vendor registration has been rejected.");
        }
      } else {
        // Optional: Redirect regular user
        router.push("/User/HomePage"); // change to your actual user homepage route
      }
  
    } catch (error) {
      console.error("❌ Login error:", error.message);
      alert("Login failed!");
    }
  };
  
  

  // 🟦 Handle Google Sign-in
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();

      // await fetch("http://localhost:5000/api/login", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${token}`,
      //   },
      // });


      await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      

      console.log("✅ Google Sign-In:", result.user);
      alert(`Welcome, ${result.user.displayName}!`);
    } catch (error) {
      console.error("❌ Google Sign-In Error:", error.message);
      alert("Google Sign-In Failed!");
    }
  };

  // 🆕 Handle Email Signup (with role)
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!userType) {
      alert("Please select a user type (Vendor or User).");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();

      // const endpoint =
      //   userType === "vendor"
      //     ? "http://localhost:5000/api/signup/vendor"
      //     : "http://localhost:5000/api/signup/user";

      // await fetch(endpoint, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${token}`,
      //   },
      //   body: JSON.stringify({
      //     userType,
      //   }),
      // });


      await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      

      console.log("✅ Signup successful");
      alert("Signup successful!");
      setRegisterPopupVisible(false);


     
      
    } catch (error) {
      console.error("❌ Signup error:", error.message);
      alert("Signup failed!");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      {/* Login Box */}
      <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md animate-fadeIn">
        <h1 className="text-2xl font-bold text-black mb-6 text-center">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-black">
              Email
            </label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-bold text-black">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-indigo-600 text-white rounded-md hover:opacity-90"
          >
            Log In
          </button>
        </form>

        <button
          onClick={handleGoogleSignIn}
          className="w-full mt-3 p-3 bg-blue-600 text-white rounded-md hover:opacity-90"
        >
          Log in with Google
        </button>

        <div className="mt-6 text-center text-sm text-black">
          Don't have an account?{" "}
          <button
            onClick={() => setRegisterPopupVisible(true)}
            className="text-red-600 hover:underline"
          >
            Register here
          </button>
        </div>
      </div>

      {/* Signup Popup */}
      {isRegisterPopupVisible && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md animate-fadeIn">
            <h1 className="text-2xl font-bold text-black mb-6 text-center">Sign Up</h1>
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-black">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-bold text-black">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>

              <div className="text-sm font-bold text-black">
                <p>Sign up as:</p>
                <div className="flex space-x-4 mt-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="user-type"
                      value="vendor"
                      checked={userType === "vendor"}
                      onChange={(e) => setUserType(e.target.value)}
                      className="mr-2"
                    />
                    Vendor
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="user-type"
                      value="user"
                      checked={userType === "user"}
                      onChange={(e) => setUserType(e.target.value)}
                      className="mr-2"
                    />
                    User
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full p-3 bg-indigo-600 text-white rounded-md hover:opacity-90"
              >
                Sign Up
              </button>
            </form>

            <button
              onClick={handleGoogleSignIn}
              className="w-full mt-3 p-3 bg-blue-600 text-white rounded-md hover:opacity-90"
            >
              Sign up with Google
            </button>

            <div className="mt-4 text-center">
              <button
                onClick={() => setRegisterPopupVisible(false)}
                className="text-red-600 hover:underline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
