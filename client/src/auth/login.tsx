import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import {Eye, EyeClosed, Loader2, LockKeyhole, Mail} from 'lucide-react'
import { LoginInputStates, userLoginSchema } from "@/schema/userSchema";

// no need to explicitly define interface or type as we can get it from the zod schema
// interface LoginInputStates {
//   email : string;
//   password : string;
// };


const Login = () => {
  const loading : boolean   = false;
  const [inputs, setInputs] = useState<LoginInputStates>({
    email : "",
    password : ""
  })
const [errors, setErrors] = useState<Partial<LoginInputStates>>({});

const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleInputChange = (e:ChangeEvent<HTMLInputElement>) =>{
    const {name, value} = e.target;
    setInputs({...inputs, [name] : value});

    // validate field on change
    const validationResult = userLoginSchema.safeParse({...inputs, [name] : value});
    if(!validationResult.success){
      const filedError = validationResult.error.formErrors.fieldErrors;
      setErrors(filedError as Partial<LoginInputStates>)
    }else {setErrors({})}
  }

function handleSubmit(e:FormEvent){
  e.preventDefault();
  // form validation starts here
  const validationResult = userLoginSchema.safeParse(inputs);
  if(!validationResult.success){
    const fieldError = validationResult.error.formErrors.fieldErrors;
    setErrors(fieldError as Partial<LoginInputStates>);
    return
  }else{
    setErrors({})
  }

  console.log(inputs);
}


  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit = {handleSubmit} className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 mx-4">
        <div className="mb-3">
          <h2 className="text-center mb-3 font-bold">Login Form</h2>
          <div className="mb-4 relative">
            <Input className="pl-8" type="email" name="email" value={inputs.email} onChange={handleInputChange} placeholder="Email" />
            <Mail className="absolute inset-y-2 w-5 h-5 left-1 text-gray-500 pointer-events-none" />
            {errors && <span className="text-red-500 text-xs">{errors.email}</span>}
          </div>
          <div className="mb-3 relative">
            <Input className="pl-8" type={`${showPassword ? "text" : "password"}`} name="password" value={inputs.password} onChange={handleInputChange} placeholder="Password" />
            {errors && <span className="text-red-500 text-xs">{errors.password}</span>}
            <LockKeyhole className="absolute inset-y-2 w-5 h-5 left-1 text-gray-500 pointer-events-none"/>
            <div
              className="w-5 absolute inset-y-2 right-2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeClosed className="absolute inset-y-.75 w-5 h-5 right-.1 text-gray-500 pointer-events-none" />
              ) : (
                <Eye className="absolute inset-y-.75 w-5 h-5 right-.1 text-gray-500 pointer-events-none" />
              )}
            </div>
          </div>
          {
            loading ? <Button disabled className="w-full bg-orange hover:bg-hoverOrange"><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please Wait</Button> : <Button type="submit" className="w-full bg-orange hover:bg-hoverOrange cursor-pointer">
            Login
          </Button>
          }
          
          <div className="mt-3 text-center">
            <Link to={"/forgot-password"} className="text-orange">Forgot password?</Link>
          </div>
        </div>
        <Separator />
        <p className="mt-2">
          Don't have an account?{" "}
          <Link className="text-orange" to={"/register"}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
