import { z } from "zod";
// user registration schema
export const userRegisterSchema = z.object({
  fullname: z.string().min(3, "Fullname is required"),
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one digit")
    .regex(/[@$!%*?&#]/, "Password must contain at least one special character"),
    confirmPassword : z.string(),
  contact: z.string().min(10, "Contact must be 10 digits"),
}).superRefine(({password, fullname, confirmPassword}, ctx)=>{
    fullname = fullname.toLowerCase();
    // check if the password contains the username or not
    if (password.toLowerCase().includes(fullname)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password should not contain your fullname",
          path: ['password'], 
        })
    }
    // check if the passowrd matches with confirmPassowrd or not?
    if(password !== confirmPassword){
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Passwords do not match",
            path: ['confirmPassword'],  
          })
    }
})

// get user registration types from userRegisterSchema
export type RegisterInputStates = z.infer<typeof userRegisterSchema>;

// user login schema
export const userLoginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be 8 characters"),
});
// get user login types from userLoginSchema
export type LoginInputStates = z.infer<typeof userLoginSchema>;
