"use client";
import { IoMdClose } from "react-icons/io";
import React from 'react'
import { toast } from "react-toastify";

interface SendCodeProps {
  email: string;
  closeVerification: (value: boolean) => void;
  onVerified: () => void;
}

const SendCode = ({ email, closeVerification, onVerified }: SendCodeProps) => {
  const [otpInput, setOtpInput] = React.useState<string[]>(new Array(6).fill(""));
  const [loading, setLoading] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    if (/[^0-9]/.test(value)) return;

    const newOtp = [...otpInput];
    newOtp[index] = value;
    setOtpInput(newOtp);

    // Auto-focus next field
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    if (otpInput.some((digit) => digit === "")) {
      setErrorMessage("Please fill all the OTP fields.");
      return;
    }

    const otp = otpInput.join("");

    try {
      setLoading(true);
      setErrorMessage(null);

      const response = await fetch("/api/auth/verifyotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Email verified successfully!");
        onVerified();
        closeVerification(false);
      } else {
        setErrorMessage(result.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={() => closeVerification(false)}
      className="z-[1000] w-full h-full flex items-center justify-center top-0 left-0 bg-black/20 text-center fixed overscroll-contain"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-sm md:w-lg border border-black/20 shadow-2xl rounded-2xl flex flex-col gap-3 p-2 py-3"
      >
        <div className="w-full flex justify-end px-1">
          <IoMdClose
            onClick={() => closeVerification(false)}
            className="text-2xl cursor-pointer"
          />
        </div>
        <div className="w-full flex px-9">
          <h1 className="text-xl md:text-2xl font-bold">Verification Code</h1>
        </div>
        <div className="flex w-full gap-2 justify-center">
          {otpInput.map((value, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              className={` border text-center w-12 md:w-16 h-12 md:h-16 rounded-md ${errorMessage ? "border-red-500": "border"}`}
              maxLength={1}
              value={value}
              onChange={(e) => handleOtpChange(e, index)}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !value && index > 0) {
                  const prevInput = document.getElementById(`otp-${index - 1}`);
                  prevInput?.focus();
                }
              }}
            />
          ))}
        </div>
        {errorMessage && (
          <div className="text-red-500 text-sm text-center mt-2">{errorMessage}</div>
        )}
        <div className="flex justify-end pr-7">
          <button
            onClick={handleVerifyOtp}
            disabled={loading}
            className="cursor-pointer rounded-md bg-[#EA454C] hover:bg-red-400 py-2 px-3 md:px-6 text-white"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendCode;
