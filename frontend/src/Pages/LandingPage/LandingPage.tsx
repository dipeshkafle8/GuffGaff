import { MessagesSquare } from "lucide-react";
import Features from "./Features";
import { Link } from "react-router-dom";
const LandingPage = () => {
  return (
    <>
      <div className="text-white flex justify-evenly mt-48">
        <div className="flex flex-col justify-center gap-y-2">
          <span className="text-5xl font-bold">
            Bindaas Chat,{" "}
            <span className="text-[rgb(212,125,227)]"> Instant Connect! </span>
          </span>
          <span className="text-xl">
            A real-time chatting application <br /> that allows users to send
            and receive messages instantly.
          </span>
          <span className="text-xl mt-4">
            <Link
              to="/chat"
              className="px-8 bg-[rgb(163,64,239)] py-2 rounded-md hover:bg-[rgb(149,90,194)]"
            >
              Let's chat
            </Link>
          </span>
        </div>
        <div>
          <MessagesSquare size={200} />
        </div>
      </div>
      <Features />
    </>
  );
};

export default LandingPage;
