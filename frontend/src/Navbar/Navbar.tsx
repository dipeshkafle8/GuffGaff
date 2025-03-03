import { MessageCircleMore } from "lucide-react";
const NavBar = () => {
  return (
    <>
      <div className="border-b-[1px] border-[#928f8fca] h-[4.5rem] flex items-center">
        <div className="flex justify-between w-full">
          <div className="flex text-white w-[8rem] justify-evenly items-center ml-2">
            <MessageCircleMore size={35} color="#a854f7" />
            <span className="text-xl font-semibold">GuffGaff</span>
          </div>
          <div className="text-white flex w-[15%] justify-between mr-20 font-semibold">
            <span>Login</span>
            <span>Features</span>
            <span>About</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
