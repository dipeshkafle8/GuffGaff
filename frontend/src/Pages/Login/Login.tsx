import { Button } from "@/components/ui/button";
import { useState } from "react";
import { axiosWithCookie } from "../../lib/axios";
import SignUp from "./SignUp";
import { useAuth, AuthContextType } from "@/context/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LoginProps {
  isLoginOpen: boolean | undefined;
  handleLoginChange: () => void;
}

interface LoginDetails {
  email: string;
  password: string;
}

const Login: React.FC<LoginProps> = ({ isLoginOpen, handleLoginChange }) => {
  const { user, setUser }: AuthContextType = useAuth();

  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  //to send data to the backends
  const sendUserDetailsToBackEnd = async (user: LoginDetails) => {
    try {
      let response = await axiosWithCookie.post("/user/login", user);
      if (response.data.status) {
        setUser(response.data.user);
        console.log(user);
      }
    } catch (err) {
      console.log("Error in logging", err);
      setUser(null);
    }
  };

  //to handle change in signup
  const handleSignUpChange = () => {
    setIsSignUpOpen((prev) => !prev);
    handleLoginChange();
  };

  //to handle data on submit
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let obj: LoginDetails = {
      email: (formData.get("email") as string) ?? "",
      password: (formData.get("password") as string) ?? "",
    };
    sendUserDetailsToBackEnd(obj);
  };
  //to provide guest credentials
  const handleGuestCredentials = () => {
    let emailInput = document.getElementById("email") as HTMLInputElement;
    let passwordInput = document.getElementById("password") as HTMLInputElement;
    if (emailInput && passwordInput) {
      emailInput.value = "abc@gmail.com";
      passwordInput.value = "1234";
    }
  };
  return (
    <>
      {!isSignUpOpen ? (
        <Dialog open={isLoginOpen} onOpenChange={handleLoginChange}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-semibold">
                Login
              </DialogTitle>
              <DialogDescription className="text-center">
                Enter your email and password to access your account
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleOnSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email:
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    className="col-span-3"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    Password:
                  </Label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    className="col-span-3"
                    placeholder="Enter password"
                    required
                  />
                </div>
              </div>
              <div className=" flex flex-col gap-y-3 mt-8">
                <div className="flex justify-evenly">
                  <Button
                    type="button"
                    onClick={handleGuestCredentials}
                    className="w-28 bg-[#605dff] cursor-pointer hover:bg-[#474679]"
                  >
                    Guest
                  </Button>
                  <Button type="submit" className="w-28 cursor-pointer">
                    Login
                  </Button>
                </div>
                <div className="text-center">
                  <span
                    className="underline text-[#323131] hover:text-black cursor-pointer"
                    onClick={handleSignUpChange}
                  >
                    Don't have an account ?
                  </span>
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      ) : (
        <SignUp
          isSignUpOpen={isSignUpOpen}
          handleSignupChange={handleSignUpChange}
        />
      )}
    </>
  );
};

export default Login;
