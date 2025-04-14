import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashBoardPage from "./pages/DashBoardPage";
import Sidebar from "./components/Sidebar";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import InboxPage from "./modules/mailbox/src/pages/InboxPage";
import SendEmail from "./modules/mailbox/src/components/SendEmail";
import SentMailPage from "./modules/mailbox/src/pages/SentMailPage";
import { Toaster } from "react-hot-toast";
import Mail from "./modules/mailbox/src/components/Mail";
import DraftPage from "./modules/mailbox/src/pages/DraftPage";
import ImportantPage from "./modules/mailbox/src/pages/ImportantPage";
import StarredPage from "./modules/mailbox/src/pages/StarredPage";

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
      <Navbar />
      <SendEmail />
      <div className="flex min-h-screen">
        {!hideSidebar && <Sidebar />}
        <main className="flex-1">
          <Routes>
            <Route
              path="/login"
              element={!authUser ? <LoginPage /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!authUser ? <SignupPage /> : <Navigate to="/" />}
            />
            <Route
              path="/"
              element={authUser ? <DashBoardPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/mail"
              element={authUser ? <InboxPage /> : <Navigate to="/login" />}
            />
            <Route path="/mail/:id" element={authUser ?<Mail/> : <Navigate to="/login" />}/>
            <Route
              path="/sent"
              element={authUser ? <SentMailPage />: <Navigate to="/login" /> }
            />
            <Route
              path="/drafts"
              element={authUser ? <DraftPage />: <Navigate to="/login" /> }
            />
            <Route
              path="/important"
              element={authUser ? <ImportantPage />: <Navigate to="/login" /> }
            />
            <Route
              path="/starred"
              element={authUser ? <StarredPage />: <Navigate to="/login" /> }
            />
          </Routes>
        </main>
      </div>
    </>
  );
};

export default App;
