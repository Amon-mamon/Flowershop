"use client"
import { IoMdClose } from "react-icons/io";

const SendCode = ({closeVerification} : {closeVerification:(value:boolean) => void}) => {

  return (
    <div onClick={()=> closeVerification(false)} className="z-[1000]  w-full h-full flex items-center justify-center top-0 left-0 bg-black/20 text-center fixed overscroll-contain ">
      <div onClick= {e => e.stopPropagation()} className="bg-white w-lg  border border-black/20 shadow-2xl rounded-2xl flex flex-col gap-3 p-2 py-3">
        <div className="w-full flex justify-end px-1">
          <IoMdClose 
          onClick={() => closeVerification(false)}
          className="text-2xl cursor-pointer" />
        </div>
        <div className="w-full flex px-9">
          <h1 className="text-2xl font-bold">Verification Code</h1>
        </div>
        <div className="flex w-full gap-2 justify-center">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              type="text"
              className="flex text-center border w-16 h-16 rounded-md"
              maxLength={1}
            />
          ))}
        </div>
        <div className="flex justify-end pr-7 ">
          <button
          onClick={() => closeVerification(false)}
          className="cursor-pointer rounded-md bg-[#EA454C] hover:bg-red-400 p-2 px-6 text-white">
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};
export default SendCode;
// className='w-full h-full flex items-center justify-center top-0 left-0 bg-gray-300 bg-opacity-20 text-center fixed
