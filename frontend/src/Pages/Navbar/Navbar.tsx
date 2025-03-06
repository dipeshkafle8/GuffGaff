import { MessageCircleMore } from "lucide-react";
import { Link } from "react-router-dom";
const NavBar = () => {
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
          <div className="text-[#d6d2d2] flex w-[18%] justify-between mr-20 font-semibold">
            <span className="cursor-pointer text-white">
              <Link
                to="/login"
                className="px-6 py-2 rounded-md bg-[#0995a5] hover:bg-[#548a90]"
              >
                Login{" "}
              </Link>
            </span>
            <span className="hover:text-white">
              <Link to="/features">Features</Link>
            </span>
            <span className="hover:text-white">
              <Link to="/about">About</Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
