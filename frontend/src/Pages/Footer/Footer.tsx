const Footer = () => {
  const currentDate = new Date().getFullYear();
  console.log(currentDate);
  return (
    <>
      <div className="text-[#a3a0a0] text-center text-sm border-t-[1px] border-[#928f8fca] p-4">
        <span> &copy; {currentDate}. All rights reserved</span>
      </div>
    </>
  );
};

export default Footer;
