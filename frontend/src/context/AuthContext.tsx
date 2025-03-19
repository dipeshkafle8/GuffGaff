import axiosInstance from "@/lib/axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

//for user that will be storing in use state
interface UserDetails {
  id: String;
  username: String;
  email: String;
}

//for what we are providing in context
interface AuthContextType {
  user: UserDetails | null;
  setUser: (user: UserDetails) => void;
}

//for AuthProvider what it's recieving
interface AuthProviderType {
  children: ReactNode;
}
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderType> = ({ children }) => {
  const [user, setUser] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axiosInstance.get("/user/check", {});
        setUser(response.data.user);
      } catch (err) {
        console.log("Error in Authentication," + err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuthentication();
  }, []);
  if (isLoading) {
    return <div>Loading.....</div>;
  }
  if (!isLoading) {
    return (
      <>
        <AuthContext.Provider value={{ user, setUser }}>
          {children}
        </AuthContext.Provider>
      </>
    );
  }
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
