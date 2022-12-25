import { IUserModel } from "../4-models/user-model";
import jwt from "jsonwebtoken"
import { Request } from "express";
import { UnauthorizedError } from "../4-models/error-models";
import Crypto from 'crypto';
import jwtDecode from "jwt-decode";

// Encrypt the password using hash technique
function hash(plainText: string): string {
    if(!plainText) return null;

    // SHA: Secure Hashing Algorithm
    const hashText = Crypto.createHash("sha512").update(plainText).digest("hex") // sha512 = Which algorithm to use | plainText = createHash | hex = turn into a string
    
    return hashText
}

// create a password that is embedded within the token to prevent content hackers from hacking into the system.
const secret = "limor";

function getNewToken(user: IUserModel): string {

    // Object to stash inside the token:
    const payload = { user };

    // Generate new token:
    const token = jwt.sign(payload, secret, { expiresIn: "10h" });

    // Return token
    return token;
};


function verifyToken(request: Request): Promise<boolean> {

    return new Promise<boolean>((resolve, reject) => {

        // Extract token header (autorization: Bearer token):
        const header = request.headers.authorization;

        // If no such header sent:
        if (!header) {
            reject(new UnauthorizedError("No token sent"))
        };

        //Extract the token:
        // Bearer the-token
        //        ^
        // 01234567
        const token = header.substring(7);

        // If no token sent:
        if (!token) {
            reject(new UnauthorizedError("No token sent"))
        }

        // If we have some token:
        jwt.verify(token, secret, (err, payload) => {
            if (err) {
                reject(new UnauthorizedError("Invalid or expired"));
                return;
            }

            resolve(true)
        });

    });
};

function getUserDetailsFromToken(request: Request): Promise<any>{

    return new Promise<any>((resolve, reject) => {
        const header = request.headers.authorization;
        const token = header.substring(7);
        const currentUser = (jwtDecode(token) as any).user

        if (currentUser === undefined) {
            reject( ("You do not have permission"))
            return;
        }
 
        resolve(currentUser)

    })

    
}

export default {
    getNewToken,
    verifyToken,
    hash,
    getUserDetailsFromToken
}