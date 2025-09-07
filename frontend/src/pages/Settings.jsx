import React, { useState } from "react";
import '../App.css';

export default function Settings() {
  const [username, setUsername] = useState("John");
  const [email, setEmail] = useState("john@example.com");
  const [darkMode, setDarkMode] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSaveProfile = () => {
    console.log({ username, email });
    alert("Profile settings saved!");
  };

  const handleSavePreferences = () => {
    console.log({ darkMode, emailAlerts });
    alert("Preferences saved!");
  };

  const handleChangePassword = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Password changed:", password);
    alert("Password updated!");
  };

  return (
    <main className="p-6 space-y-6">
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold">Profile Settings</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 border rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 border rounded px-3 py-2 w-full"
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          onClick={handleSaveProfile}
        >
          Save Profile
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold">Preferences</h2>
        <div className="flex items-center justify-between">
          <span>Dark Mode</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="form-checkbox"
          />
        </div>
        <div className="flex items-center justify-between">
          <span>Email Alerts for Cost Threshold</span>
          <input
            type="checkbox"
            checked={emailAlerts}
            onChange={() => setEmailAlerts(!emailAlerts)}
            className="form-checkbox"
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          onClick={handleSavePreferences}
        >
          Save Preferences
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold">Security</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 border rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 border rounded px-3 py-2 w-full"
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          onClick={handleChangePassword}
        >
          Change Password
        </button>
      </div>
    </main>
  );
}
