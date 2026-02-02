"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth_service, useAppData } from "@/context/AppContext";
import axios from "axios";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const ResetPage = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [btnLoading, setbtnLoading] = useState(false);
  const { isAuth } = useAppData();

  if (isAuth) return redirect("/");

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setbtnLoading(true);
    try {
      const { data } = await axios.post(
        `${auth_service}/api/auth/reset/${token}`,
        {
          password,
        }
      );

      toast.success(data.message);
      setPassword("");
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setbtnLoading(false);
    }
  };
  return (
    <div className="mt-20 md:mt-5 z-0">
      <div className="md:w-1/3 border border-gray-400 rounded-lg p-8 flex flex-col w-full relative shadow-md m-auto">
        <h2 className="mb-1">
          <span className="text-3xl">Reset Password</span>
        </h2>
        <form
          onSubmit={submitHandler}
          className="flex flex-col justify-between mt-3"
        >
          <div className="grid w-full max-w-sm items-center gap-1.5 ml-1">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              disabled={btnLoading}
              className="flex justify-center items-center gap-2"
            >
              Submit
            </Button>
          </div>
        </form>

        <Link
          className="mt-2 text-blue-500 underline text-sm ml-2"
          href={"/login"}
        >
          Go to login page
        </Link>
      </div>
    </div>
  );
};

export default ResetPage;
