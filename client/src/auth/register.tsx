import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { LockKeyhole, Mail, PhoneCall, User } from "lucide-react";
import { RegisterInputStates, userRegisterSchema } from "@/schema/userSchema";

interface UserRegistrationError {
  fullname: string;
  email: string;
  password: [string];
  confirmPassword: string;
  contact: string;
}

const Register = () => {
  const [inputs, setInputs] = useState<RegisterInputStates>({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    contact: "",
  });
  // error could be in either one of them so use Partial
  const [errors, setErrors] = useState<Partial<UserRegistrationError>>({});

  // state for passowrd strength
  const [passwordStrength, setPasswordStrength] = useState<string>("");

  const validatePasswordStrength = (password: string) => {
    const lengthCheck = password.length >= 8;
    const upperCaseCheck = /[A-Z]/.test(password);
    const lowerCaseCheck = /[a-z]/.test(password);
    const numberCheck = /[0-9]/.test(password);
    const specialCharCheck = /[@$!%*?&]/.test(password);

    const score = [
      lengthCheck,
      upperCaseCheck,
      lowerCaseCheck,
      numberCheck,
      specialCharCheck,
    ].filter(Boolean).length;

    if (score === 5) return "Strong ✅";
    if (score >= 3) return "Medium ⚠️";
    return "Weak ❌";
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
    if (name === "password") {
      setPasswordStrength(validatePasswordStrength(value));
    }
    // validate field on change
    const validationResult = userRegisterSchema.safeParse({
      ...inputs,
      [name]: value,
    });
    if (!validationResult.success) {
      const filedError = validationResult.error.formErrors.fieldErrors;
      setErrors(filedError as Partial<UserRegistrationError>);
    } else {
      setErrors({});
    }
  };

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // form validation start here
    const validationResult = userRegisterSchema.safeParse(inputs);
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<UserRegistrationError>);
      return;
    } else {
      setErrors({});
    }
    // register api start here
    console.log(inputs);
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 mx-4"
      >
        <div className="mb-3">
          <h2 className="text-center mb-3 font-bold">Register Form</h2>
          <div className="mb-4 relative">
            <Input
              className="pl-8"
              type="text"
              name="fullname"
              value={inputs.fullname}
              onChange={handleInputChange}
              placeholder="Fullname"
            />
            <User className="absolute inset-y-2 w-5 h-5 left-1 text-gray-500 pointer-events-none" />
            {errors && (
              <span className="text-red-500 text-xs">{errors.fullname}</span>
            )}
          </div>
          <div className="mb-4 relative">
            <Input
              className="pl-8"
              type="email"
              name="email"
              value={inputs.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
            <Mail className="absolute inset-y-2 w-5 h-5 left-1 text-gray-500 pointer-events-none" />
            {errors && (
              <span className="text-red-500 text-xs">{errors.email}</span>
            )}
          </div>
          <div className="mb-3 relative">
            <Input
              className="pl-8"
              type="password"
              name="password"
              value={inputs.password}
              onChange={handleInputChange}
              placeholder="Password"
            />
            <LockKeyhole className="absolute inset-y-2 w-5 h-5 left-1 text-gray-500 pointer-events-none" />
            {errors && (
              <span className="text-red-500 text-xs">
                {errors?.password?.map((msg, index) => (
                  <div key={index}>{msg}</div>
                ))}
              </span>
            )}
            <p
              className={`text-xs ${
                passwordStrength === "Weak ❌"
                  ? "text-red-500"
                  : passwordStrength === "Medium ⚠️"
                  ? "text-yellow-500"
                  : "text-green-500"
              }`}
            >
              {passwordStrength && `Password Strength: ${passwordStrength}`}
            </p>
          </div>

          <div className="mb-3 relative">
            <Input
              className="pl-8"
              type="password"
              name="confirmPassword"
              value={inputs.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confrim Password"
            />
            <LockKeyhole className="absolute inset-y-2 w-5 h-5 left-1 text-gray-500 pointer-events-none" />
            {errors && (
              <span className="text-red-500 text-xs">
                {errors.confirmPassword}
              </span>
            )}
          </div>
          <div className="mb-4 relative">
            <Input
              className="pl-8"
              type="text"
              name="contact"
              value={inputs.contact}
              onChange={handleInputChange}
              placeholder="Contact"
            />
            <PhoneCall className="absolute inset-y-2 w-5 h-5 left-1 text-gray-500 pointer-events-none" />
            {errors && (
              <span className="text-red-500 text-xs">{errors.contact}</span>
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-orange hover:bg-hoverOrange cursor-pointer"
          >
            Register
          </Button>
        </div>
        <Separator />
        <p className="mt-2">
          Already have an account?{" "}
          <Link className="font-bold text-orange" to={"/login"}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
