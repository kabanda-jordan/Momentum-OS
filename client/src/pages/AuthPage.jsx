import { useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../api/apiClient";
import { useAuth } from "../hooks/useAuth";
import Input from "../components/Input";
import Button from "../components/Button";

const initialForm = {
  name: "",
  email: "",
  password: ""
};

const AuthPage = () => {
  const { login } = useAuth();
  const [mode, setMode] = useState("login");
  const [formState, setFormState] = useState(initialForm);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((currentState) => ({ ...currentState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const endpoint = mode === "login" ? "/auth/login" : "/auth/signup";
      const payload =
        mode === "login"
          ? { email: formState.email, password: formState.password }
          : formState;

      const { data } = await apiClient.post(endpoint, payload);
      login(data);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Authentication failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.16),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.14),_transparent_25%),linear-gradient(180deg,_#ecfeff_0%,_#f8fafc_55%,_#eef2ff_100%)] px-4 py-10 dark:bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.12),_transparent_25%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.08),_transparent_25%),linear-gradient(180deg,_#020617_0%,_#0f172a_100%)]">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <Link
            to="/"
            className="inline-flex items-center rounded-full border border-slate-200/70 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur transition hover:bg-white dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:bg-slate-900"
          >
            Back to landing page
          </Link>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-300">
            Personal productivity
          </p>
          <h1 className="max-w-2xl text-5xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Build better momentum with one calm, modern dashboard.
          </h1>
          <p className="max-w-xl text-lg text-slate-600 dark:text-slate-300">
            Organize tasks, keep goals visible, and track weekly progress in a clean SaaS-style workspace.
          </p>
          <div className="grid max-w-xl gap-4 sm:grid-cols-3">
            {[
              ["Task flow", "Capture, filter, and complete your priorities."],
              ["Goal tracking", "Measure progress with clear deadlines."],
              ["Visual insight", "See what your week actually looks like."]
            ].map(([title, description]) => (
              <div
                key={title}
                className="rounded-3xl border border-white/50 bg-white/70 p-4 shadow-lg backdrop-blur dark:border-slate-800 dark:bg-slate-900/80"
              >
                <p className="font-medium text-slate-900 dark:text-white">{title}</p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border border-white/60 bg-white/80 p-6 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.28)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
          <div className="mb-6 flex gap-2 rounded-2xl bg-slate-100 p-1 dark:bg-slate-800">
            {["login", "signup"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setMode(item)}
                className={`flex-1 rounded-2xl px-4 py-2 text-sm font-medium capitalize transition ${
                  mode === item
                    ? "bg-white text-slate-900 shadow dark:bg-slate-950 dark:text-white"
                    : "text-slate-500 dark:text-slate-300"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {mode === "signup" ? (
              <Input label="Full name" name="name" value={formState.name} onChange={handleChange} required />
            ) : null}
            <Input
              label="Email address"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Password"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
              required
            />
            {error ? <p className="text-sm text-rose-500">{error}</p> : null}
            <Button className="w-full" disabled={submitting} type="submit">
              {submitting ? "Please wait..." : mode === "login" ? "Log in" : "Create account"}
            </Button>
          </form>

          <div className="mt-6 rounded-3xl bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-950/60 dark:text-slate-300">
            <p className="font-medium text-slate-900 dark:text-white">Demo access</p>
            <p className="mt-2">Email: demo@example.com</p>
            <p>Password: password123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
