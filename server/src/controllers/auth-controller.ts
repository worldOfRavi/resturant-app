import { Request, Response } from "express";

class AuthController{
    static async register(req:Request, res:Response){
        res.send("Registration successfull");
    }
}

export default AuthController;