import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Mail } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState<string>("");
  const loading: boolean = false;
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <form className="flex flex-col gap-5 md:border border-gray-400 md:p-8 w-full max-w-md mx-4 rounded-lg">
        <div className="text-center">
          <h1 className="font-extabold text-2xl mb-2">Forgot Password</h1>
          <p className="text-sm text-gray-600">
            Enter your email address to rest your password
          </p>
        </div>
        <div className="relative">
          <Input
            className="pl-9"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your email"
          />
          <Mail className="absolute inset-y-2 left-2 w-5 h-5 text-gray-500 pointer-events-none" />
        </div>
        {loading ? (
          <Button disabled className="bg-orange hover:bg-hoverOrange">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button className="bg-orange hover:bg-hoverOrange">
            Send Reset Link
          </Button>
        )}
        <span className="text-center">
        Back to{" "}
        <Link to={"/login"} className="text-orange hover:underline">
          Login
        </Link>
      </span>
      </form>
    </div>
  );
};

export default ForgetPassword;
