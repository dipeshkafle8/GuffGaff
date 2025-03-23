import { AuthContextType, useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const AfterLogin = () => {
  const { user }: AuthContextType = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.error("Please Log in", {
        position: "top-left",
        autoClose: 800,
      });
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }
  if (user) {
    return (
      <>
        <Outlet />
      </>
    );
  }
};

export default AfterLogin;
