import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import LandingPage from "./Pages/LandingPage/LandingPage";
import BeforeLogin from "./layout/BeforeLogin";
import AfterLogin from "./layout/AfterLogin";
import ChatDashBoard from "./Pages/ChatDashBoard/Chatdashboard";
function App() {
  return (
    <>
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800">
          <Routes>
            <Route element={<BeforeLogin />}>
              <Route path="/" element={<LandingPage />} />
            </Route>
            <Route element={<AfterLogin />}>
              <Route path="/chat" element={<ChatDashBoard />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
