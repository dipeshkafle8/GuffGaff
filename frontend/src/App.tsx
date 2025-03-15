import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./Pages/Navbar/Navbar";
import Footer from "./Pages/Footer/Footer";
import LandingPage from "./Pages/LandingPage/LandingPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800">
          {/* <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" /> */}
          <NavBar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
