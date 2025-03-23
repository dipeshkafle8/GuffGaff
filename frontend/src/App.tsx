import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LandingPage from "./Pages/LandingPage/LandingPage.tsx";
import BeforeLogin from "./layout/BeforeLogin.tsx";
import AfterLogin from "./layout/AfterLogin.tsx";
import ChatDashBoard from "./Pages/ChatDashBoard/Chatdashboard.tsx";
import AuthRedirect from "./authRedirect/AuthRedirect.tsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800">
          <AuthRedirect />
          <Routes>
            <Route element={<BeforeLogin />}>
              <Route path="/" element={<LandingPage />} />
            </Route>
            <Route element={<AfterLogin />}>
              <Route path="/chat" element={<ChatDashBoard />} />
            </Route>
          </Routes>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
    </>
  );
}

export default App;
