import { MessageCircleMore } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Login from "../Login/Login";
import { Button } from "@/components/ui/button";
const NavBar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleLoginChange = () => {
    setIsLoginOpen((prev) => !prev);
  };
  return (
    <>
      <div className="border-b-[1px] border-[#928f8fca] h-[4.5rem] flex items-center">
        <div className="flex justify-between w-full">
          <Link to="/">
            <div className="flex text-white w-[8rem] justify-evenly items-center ml-2">
              <MessageCircleMore size={35} color="#a854f7" />
              <span className="text-xl font-semibold">GuffGaff</span>
            </div>
          </Link>
          <div className="text-[#d6d2d2] flex w-[22%] justify-between items-center mr-20 font-semibold">
            <Button
              className="bg-[#0a4dd3] hover:cursor-pointer text-md w-24"
              onClick={handleLoginChange}
            >
              Log in
            </Button>

            <span className="hover:text-white">
              <Link to="/features">Features</Link>
            </span>
            <span className="hover:text-white">
              <Link to="/about">About</Link>
            </span>
          </div>
        </div>
      </div>
      <Login isLoginOpen={isLoginOpen} handleLoginChange={handleLoginChange} />
    </>
  );
};

export default NavBar;
