import express, { NextFunction, Request, Response } from "express";
import logic from "../5-logic/category-logic";
import verifyLoggedIn from "../3-middleware/verify-logged-in";


const router = express.Router();

// GET http://localhost:3001/api/category-list
router.get("/category-list",verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {
    try{
        const categoryList = await logic.getCategoryList();
        response.json(categoryList);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;