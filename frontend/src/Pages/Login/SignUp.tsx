import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { axiosWithCookie } from "@/lib/axios";
import { toast } from "react-toastify";

//props received by component
interface SignUpProps {
  isSignUpOpen: boolean | undefined;
  handleSignupChange: () => void;
}

//Userdetails types
interface UserDetails {
  username: String;
  email: String;
  password: String;
}
const SignUp: React.FC<SignUpProps> = ({
  isSignUpOpen,
  handleSignupChange,
}) => {
  const sendUserDetails = async (user: UserDetails) => {
    try {
      const res = await axiosWithCookie.post("/user/register", user);
      if (res.data.status) {
        toast.success("User Created!!", {
          position: "top-right",
          autoClose: 1000,
        });
        handleSignupChange();
      }
    } catch (err) {
      toast.error("Error in user creation", {
        position: "top-right",
        autoClose: 1000,
      });
      console.log("Error while registering User", err);
    }
  };
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let obj: UserDetails = {
      username: (formData.get("username") as string) ?? "",
      email: (formData.get("email") as string) ?? "",
      password: (formData.get("password") as string) ?? "",
    };
    sendUserDetails(obj);
  };
  return (
    <>
      <Dialog open={isSignUpOpen} onOpenChange={handleSignupChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-semibold">
              Sign Up
            </DialogTitle>
            <DialogDescription className="text-center">
              Create your account
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleOnSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username:
                </Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  className="col-span-3"
                  placeholder="Enter your username"
                  required
                />
              </div>
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
              <div className="flex justify-center mt-4">
                <Button type="submit" className="cursor-pointer w-28">
                  Sign Up
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SignUp;
