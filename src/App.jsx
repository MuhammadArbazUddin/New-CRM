import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashBoardPage from "./pages/DashBoardPage";
import Sidebar from "./components/Sidebar";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import InboxPage from "./modules/mailbox/src/pages/InboxPage";
import SentMailPage from "./modules/mailbox/src/pages/SentMailPage";
import { Toaster } from "react-hot-toast";
import Mail from "./modules/mailbox/src/components/Mail";
import DraftPage from "./modules/mailbox/src/pages/DraftPage";
import ImportantPage from "./modules/mailbox/src/pages/ImportantPage";
import StarredPage from "./modules/mailbox/src/pages/StarredPage";
import BinPage from "./modules/mailbox/src/pages/BinPage";
import HRMDashboard from "./modules/hrm/src/pages/HRMDashboard";
import HRMProfileForm from "./modules/hrm/src/components/HRMProfileForm";

const App = () => {
  const location = useLocation();
  const hideSidebar =
    location.pathname === "/login" || location.pathname === "/signup";
  const { authUser, checkAuth } = useAuthStore();


  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex min-h-screen">
        {!hideSidebar && <Sidebar />}
        <main className="flex-1">
          <Routes>
            {/* Auth Routes */}
            <Route
              path="/login"
              element={!authUser ? <LoginPage /> : <Navigate to="/" />}
            />
            {/* <Route
              path="/signup"
              element={!authUser ? <SignupPage /> : <Navigate to="/" />}
            /> */}
            <Route
              path="/"
              element={authUser ? <DashBoardPage /> : <Navigate to="/login" />}
            />
            {/* Mail Routes */}
            <Route
              path="/mail"
              element={authUser ? <InboxPage /> : <Navigate to="/login" />}
            />
            <Route path="/mail/:id" element={authUser ? <Mail /> : <Navigate to="/login" />} />
            <Route
              path="/mail/sent"
              element={authUser ? <SentMailPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/mail/drafts"
              element={authUser ? <DraftPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/mail/important"
              element={authUser ? <ImportantPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/mail/starred"
              element={authUser ? <StarredPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/mail/bin"
              element={authUser ? <BinPage /> : <Navigate to="/login" />}
            />
            {/* HRM Routes */}
            <Route
              path="/hrm"
              element={authUser ? <HRMDashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/hrm/staff"
              element={authUser ? <HRMDashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/hrm/member"
              element={authUser ? <HRMProfileForm/>   : <Navigate to="/login" />}
            />
          </Routes>
        </main>
      </div>
    </>
  );
};

export default App;
