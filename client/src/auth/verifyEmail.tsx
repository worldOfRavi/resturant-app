import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import React, { ChangeEvent, KeyboardEvent, useRef, useState } from "react";

const VerifyEmail = () => {
    const loading : boolean = false;
  const [opt, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  // use useRef to target and focus the next input box on fill of one box
  const inputRef = useRef<HTMLInputElement[]>([]);
  const handleChange = (index: number, value: string) => {
    if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
      const newOtp = [...opt];
      newOtp[index] = value;
      setOtp(newOtp);
      // move forward if the current input is filled
      if (value !== "" && index < 5) {
        inputRef.current[index + 1].focus();
      }
    }
  };
  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !opt[index] && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="p-8 flex flex-col gap-10 w-full max-w-md rounded-md md:border border-gray-300 mx-4">
        <div className="text-center">
          <h1 className="font-extrabold text-2xl">Verify your email</h1>
          <p className="text-sm text-gray-600">
            Enter the 6 digit code sent to your email address
          </p>
        </div>
        <form action="">
          <div className="flex justify-between">
            {opt.map((letter: string, idx: number) => (
              <Input
                key={idx}
                type="text"
                ref={(element:HTMLInputElement ) => {inputRef.current[idx] = element}}
                value={letter}
                maxLength={1}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(idx, e.target.value)
                }
                onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                  handleKeyDown(idx, e)
                }
                className="md:w-12 md:h-12 w-8 h-8 text-center text-sm md:text-2xl font-normal md:font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            ))}
          </div>
          <div className=" mt-3">
          {
            loading ? <Button disabled className="bg-orange w-full"><Loader2 className="mr-2 w-4 h-4 animate-spin" /> please wait</Button> : <Button className="bg-orange hover:bg-hoverOrange w-full cursor-pointer">Verify</Button>
          }
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
