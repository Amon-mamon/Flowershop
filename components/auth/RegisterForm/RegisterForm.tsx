"use client";
import Aside from "../../reusable/sidecontent/aside";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TogglePassword from "@/components/reusable/togglepassword/TogglePassword";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import SendCode from "./modal/SendCode";
import { registerSchema, RegisterSchemaType } from "@/lib/validators/schema";


const RegisterForm = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [openVerification, setOpenVerification] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>("");
  const [isEmailVerified, setIsEmailVerified] = React.useState<boolean>(false);
  const [isChecked, setIsChecked] = React.useState<boolean>(false)
  const [isRegistering, setIsRegistering] = React.useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  // Function to handle OTP sending request
  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Please enter an email first.");
      return;
    }

    try {
      setLoading(true)
      const response = await fetch("/api/auth/sendotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      
      if (response.ok) {
        toast.success(result.message || "OTP sent to email.");
        setOpenVerification(true); 
      } else {
        toast.error(result.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("Thid is the error", error);
      toast.error("An error occurred while sending OTP.");
    } finally{
        setLoading(false) 
    }
  };

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    if (!isEmailVerified) {
      toast.error("Please verify your email first.");
      return;
    }

    try {
      setIsRegistering(true)
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }),
      });
  
      if (response.ok) {
        router.push("/auth/login");
        toast.success("Registered Successfully");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
        setLoading(false);
      } reset()
    } catch (error) {
      console.log(error)
    } finally {
      setIsRegistering(false)
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex">
      <Aside />
      <div className="gap-2 flex flex-col w-full items-center justify-center  ">
        <h1 className="text-4xl font-bold">Create Account</h1>

        {/* Username */}
        <div className="flex flex-col w-3/4">
          <label>Username</label>
          <input
            {...register("username")}
            disabled={isEmailVerified}
            maxLength={255}
            type="text"
            className="p-4 border border-[#DADADA] rounded-md"
            placeholder="Enter your username"
          />
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}
        </div>

        {/* Email + Send Code */}
        <div className="flex flex-col w-3/4 relative">
          <label>Email</label>
          <input
            {...register("email")}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isEmailVerified}
            maxLength={255}
            type="email"
            className="p-4 border border-[#DADADA] rounded-md"
            placeholder="Enter your Email"
          />
          
          <button
            onClick={handleSendOtp}  // Trigger the send OTP request
            disabled={isEmailVerified}
            type="button"
            className="disabled:cursor-not-allowed disabled:bg-red-300 absolute_button py-2 px-1 md:px-3 text-sm md:text-base text-white rounded-md cursor-pointer bg-[#EA454C] hover:bg-red-400"
          >
            {loading ? "Sending.." : (isEmailVerified ? "Verified" : "Send Code")}
            
          </button>
          
          {openVerification && (
            <SendCode
              email={email}
              closeVerification={setOpenVerification}
              onVerified={() => setIsEmailVerified(true)}
            
            />  
          )}
        </div>
          {errors.email && <p className="text-red-500 w-3/4">{errors.email.message}</p>}

        {/* Password */}
        <div className="flex flex-col gap-3 w-3/4">
          <div className="flex flex-col relative w-full">
            <label>Password</label>
            <div className="flex justify-end items-center">
              <input
              disabled={isEmailVerified}
                {...register("password")}
                type={isVisible ? "text" : "password"}
                className="p-4 border border-[#DADADA] rounded-md w-full"
                placeholder="**********"
              />
              <TogglePassword setValue={setIsVisible} value={isVisible} />
            </div>
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>

          <div className="flex flex-col relative w-full">
            <label>Confirm Password</label>
            <div className="flex justify-end items-center w-full">
              <input
                {...register("confirmPassword")}
                type={isVisible ? "text" : "password"}
                className="p-4 border border-[#DADADA] rounded-md w-full"
                placeholder="**********"
              />
              <TogglePassword setValue={setIsVisible} value={isVisible} />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>

        {/* Terms */}
        <div className="flex w-3/4 gap-2">
          <input 
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          type="checkbox" id="checkbox" className="cursor-pointer" />
          <label htmlFor="checkbox" className="cursor-pointer">
            By continuing, you agree to our{" "}
            <Link href="" className="text-blue-700">
              terms of service
            </Link>
          </label>
        </div>

        {/* Submit */}
        <div className="flex flex-col w-full items-center gap-4">
            <button
              disabled={!isChecked}
              type="submit"
              className="flex p-4 border w-3/4 rounded-md bg-[#EA454C] disabled:cursor-not-allowed disabled:bg-red-200 hover:bg-red-400 text-white cursor-pointer justify-center"
            >
              {isRegistering  ? "Registering..." : "Register"}

            </button>
          <p>
            Already have an account?{" "}
            <Link href="/auth/login/" className="text-blue-800">
              Login
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
