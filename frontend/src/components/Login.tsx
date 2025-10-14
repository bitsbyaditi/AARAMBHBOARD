import React, { useState } from "react";
import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { useNavigate } from "react-router-dom";

const CLIENT_ID = "14e6n99bjmlduuob8d6m9cbiph";
const REGION = "ap-south-1";

const cognitoClient = new CognitoIdentityProviderClient({ region: REGION });

export default function Login() {
  const [email, setEmail] = useState(""); // Use 'aarambhuser' here
  const [password, setPassword] = useState(""); // Use 'Aarambh@123' here
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const command = new InitiateAuthCommand({
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId: CLIENT_ID,
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
        },
      });

      const response = await cognitoClient.send(command);
      const token = response.AuthenticationResult?.AccessToken;

      if (token) {
        localStorage.setItem("authToken", token);
        localStorage.setItem("userName", email);
        console.log("Login successful:", response);
        navigate("/dashboard");
      } else {
        setError("Login failed: No token received");
      }
    } catch (err: any) {
      setError(err.message || "Login failed");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center">Sign In</h2>

        {/* Google Login Placeholder */}
        <button
          onClick={() => console.log("Google login clicked")}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-all duration-200 mb-4"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="h-5 w-5"
          />
          <span>Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-600" />
          <span className="px-2 text-gray-400 text-sm">or</span>
          <hr className="flex-grow border-gray-600" />
        </div>

        {/* Cognito Login */}
        <input
          type="text"
          placeholder="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-3 w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white font-medium disabled:opacity-50"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        {error && <p className="mt-4 text-red-400 text-center">{error}</p>}

        {/* Links */}
        <div className="mt-6 flex justify-between text-sm text-gray-400">
          <button onClick={() => navigate("/register")} className="hover:underline">
            New user? Register
          </button>
          <button onClick={() => navigate("/forgot-password")} className="hover:underline">
            Forgot password?
          </button>
        </div>
      </div>
    </div>
  );
}
