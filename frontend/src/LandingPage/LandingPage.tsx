import { MessagesSquare } from "lucide-react";
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
        </div>
        <div>
          <MessagesSquare size={200} />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
