import { useAuth } from "@/context/AuthContext";
import { AuthContextType } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const AuthRedirect: React.FC = () => {
  const { user }: AuthContextType = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/chat");
    } else {
      navigate("/");
    }
  }, []);

  return null;
};

export default AuthRedirect;
