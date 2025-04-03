"use client";
import Aside from "../../reusable/aside";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TogglePassword from "@/components/reusable/TogglePassword";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const schema = z
  .object({
    // firstName: z.string().min(8, "First name must be at least 8 characters."),
    // lastName: z.string().min(8, "Last name must be at least 8 characters."),
    username: z.string().min(8,"Username must be at least 8 characters").max(100),
    email: z.string().email("Invalid email format."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .regex(/\d/, "Password must contain at least one number.")
      .regex(/[\W_]/, "Password must contain at least one special character."),
    confirmPassword: z.string().min(8,'Password confirmation is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
const RegisterForm = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit, 
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues:{
      username:'',
      email:'',
      password:'',
      confirmPassword:''
    }
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setLoading(true)
    const response = await fetch('/api/user',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      })
    })
    
    if(response.ok){
        router.push('/auth/login')
        toast.success("Registered Successfully")
    } else{
      const errorData = await response.json()
      toast.error(errorData.message)
      setLoading(false)
    }

  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex">
      <Aside />
      <div className="gap-2 flex flex-col w-full items-center justify-center">
        <h1 className="text-4xl font-bold">Create Account</h1>

        {/* Name Fields */}
        <div className="xl:flex w-3/4 gap-2">
          {/* <div className="flex flex-col w-full">
            <label>First Name</label>
            <input
              {...register("firstName")}
              maxLength={255}
              type="text"
              className="p-4 border border-[#DADADA] rounded-md"
              placeholder="Enter your First Name"
            />
            {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
          </div> */}

          {/* <div className="flex flex-col w-full">
            <label>Last Name</label>
            <input
              {...register("lastName")}
              maxLength={255}
              type="text"
              className="p-4 border border-[#DADADA] rounded-md"
              placeholder="Enter your Last Name"
            />
            {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
          </div> */}
        </div>

        {/* Email Field */}
        <div className="flex flex-col w-3/4">
          <label>Username</label>
          <input
            {...register("username")}
            maxLength={255}
            type="text"
            className="p-4 border border-[#DADADA] rounded-md"
            placeholder="Enter your username"
          />
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}
        </div>
        <div className="flex flex-col w-3/4">
          <label>Email</label>
          <input
            {...register("email")}
            maxLength={255}
            type="email"
            className="p-4 border border-[#DADADA] rounded-md"
            placeholder="Enter your Email"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>

        {/* Password Fields */}
        <div className="flex flex-col gap-3 w-3/4">
          <div className="flex flex-col relative w-full">
            <label>Password</label>
            <div className="flex justify-end items-center">
              <input
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
            {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="flex w-3/4 gap-2">
          <input type="checkbox" id="checkbox" className="cursor-pointer" />
          <label htmlFor="checkbox" className="cursor-pointer">
            By continuing, you agree to our{" "}
            <Link href="" className="text-blue-700">
              terms of service
            </Link>
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex flex-col w-full items-center gap-4">
          <button
            type="submit"
            className="flex p-4 border w-3/4 rounded-md bg-[#EA454C] hover:bg-red-400 text-white cursor-pointer justify-center"
          >
            {loading ? "Registering.." : "Register"}
            
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
