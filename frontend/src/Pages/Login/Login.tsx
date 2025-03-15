import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
  const handleOnSubmit = async () => {
    console.log("Hello");
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-[#0a4dd3] hover:cursor-pointer text-md w-24">
            Log in
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-semibold">
              Login
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleOnSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email:
                </Label>
                <Input
                  type="text"
                  id="email"
                  className="col-span-3"
                  placeholder="Enter your email"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Password:
                </Label>
                <Input
                  type="password"
                  id="password"
                  className="col-span-3"
                  placeholder="Enter password"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Login</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Login;
