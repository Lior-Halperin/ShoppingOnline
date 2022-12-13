import express, { NextFunction, Request, Response } from "express";
import logic from "../5-logic/cityList-logic";

const router = express.Router();

// GET http://localhost:3001/api/city-list
router.get("/city-list", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const cityList = await logic.getCityList();
        response.json(cityList);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;