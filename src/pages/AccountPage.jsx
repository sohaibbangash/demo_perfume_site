import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";

export default function AccountPage() {
  const { user, setUser, signOut } = useStore();
  const [mode, setMode] = useState("login");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Please enter a valid email address.");
    if (password.length < 6) return setError("Use at least 6 characters for your password.");
    const name = mode === "signup" ? String(form.get("name") || "").trim() : email.split("@")[0];
    if (mode === "signup" && !name) return setError("Please add your name.");
    setError("");
    setUser({ name, email });
    navigate("/");
  };

  if (user) {
    return <div className="page-wrap account-page"><span className="eyebrow">YOUR PERFUME STORE ACCOUNT</span><h1>Welcome back,<br /><em>{user.name}.</em></h1><p>Signed in with {user.email}.</p><button className="button button-dark" onClick={signOut}>Sign out <ArrowRight size={16} /></button></div>;
  }

  return (
    <div className="account-page page-wrap">
      <div className="account-card"><span className="eyebrow">{mode === "login" ? "YOUR ACCOUNT" : "JOIN THE COLLECTION"}</span><h1>{mode === "login" ? <>Welcome <em>back.</em></> : <>Make it <em>yours.</em></>}</h1><p>{mode === "login" ? "Sign in to find your saved favourites." : "Create an account and keep your favourites close."}</p>
        <form onSubmit={submit} noValidate>
          {mode === "signup" && <label>Your name<input name="name" type="text" autoComplete="name" placeholder="Your name" required /></label>}
          <label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></label>
          <label>Password<input name="password" type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} placeholder="At least 6 characters" required /></label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="button button-dark form-submit">{mode === "login" ? "Sign in" : "Create account"} <ArrowRight size={16} /></button>
        </form>
        <p className="mode-switch">{mode === "login" ? "New here?" : "Already have an account?"} <button onClick={() => { setError(""); setMode(mode === "login" ? "signup" : "login"); }}>{mode === "login" ? "Create an account" : "Sign in"}</button></p>
        <span className="demo-auth-note">Demo account · details stay in this browser.</span>
      </div>
    </div>
  );
}
