import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LandingPage from "./Pages/LandingPage/LandingPage";
import BeforeLogin from "./layout/BeforeLogin";
import AfterLogin from "./layout/AfterLogin";
import ChatDashBoard from "./Pages/ChatDashBoard/Chatdashboard";
import AuthRedirect from "./authRedirect/AuthRedirect";
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
