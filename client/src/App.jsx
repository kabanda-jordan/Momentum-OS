import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-950 text-sm text-slate-200">
        Loading application...
      </div>
    );
  }

  return user ? children : <Navigate to="/auth" replace />;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-950 text-sm text-slate-200">
        Loading application...
      </div>
    );
  }

  return user ? <Navigate to="/app" replace /> : children;
};

const App = () => (
  <Suspense
    fallback={
      <div className="grid min-h-screen place-items-center bg-slate-950 text-sm text-slate-200">
        Loading application...
      </div>
    }
  >
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/auth"
        element={
          <PublicRoute>
            <AuthPage />
          </PublicRoute>
        }
      />
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Suspense>
);

export default App;
