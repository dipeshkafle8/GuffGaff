import { Outlet } from "react-router-dom";
import NavBar from "@/Pages/Navbar/Navbar";
import Footer from "@/Pages/Footer/Footer";

const BeforeLogin = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default BeforeLogin;
