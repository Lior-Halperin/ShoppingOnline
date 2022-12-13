import { NextFunction, Request, Response } from "express";

async function catchAll(err: any, request: Request, response: Response, next: NextFunction) {
    
    console.log("--------catchAll----------")

    let status = err.status || 500;
    let message = err.message || "Unknown Error";

    if(err.code === 11000){
        status = 401
        const duplicateCredentials = Object.keys(err.keyValue).toString()
        message = "The " + duplicateCredentials + " is already taken, Please select another " + duplicateCredentials;
    }
    
    console.log(err)
    console.log(status + " " + message)

    response.status(status).send(message);
}

export default catchAll;