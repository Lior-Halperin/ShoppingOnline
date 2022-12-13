import express, { NextFunction, Request, Response } from "express";
import { nextTick } from "process";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import { CredentialsModel } from "../4-models/credentials-model";
import { UserModel } from "../4-models/user-model";
import logic from "../5-logic/auth-logic";

const router = express.Router();

// register step-1
// PATCH http://localhost:3001/api/register-step1
router.patch("/register-step1", async (request: Request , response: Response, next: NextFunction) => {

    try{
        console.log("---- register step-1 ----")
        const user = new UserModel(request.body);
        const validateStep1 = await logic.registerStep1(user)

        response.json(validateStep1)
    }
    catch(err: any){
        next(err)
    }
});

// register step-2
// POST http://localhost:3001/api/auth/register-step2
router.post("/auth/register-step2", async (request: Request , response: Response, next: NextFunction) => {

    try{
        console.log("---- register step-2 ----")
        const user = new UserModel(request.body);
        const token = await logic.registerStep2(user);
        
        response.status(201).json(token)
    }
    catch(err: any){
        next(err);
    }
});

// login
// POST http://localhost:3001/api/auth/login
router.post("/auth/login", async (request: Request , response: Response, next: NextFunction) => {

    try{  
        //  Create credentials object
        const credentials = new CredentialsModel(request.body);
        // Login
        const token = await logic.login(credentials);
        // Return token 
        response.status(200).json(token)

    }
    catch(err: any){
        next(err)
    }
});

// Export all routes from this controller.
export default router;