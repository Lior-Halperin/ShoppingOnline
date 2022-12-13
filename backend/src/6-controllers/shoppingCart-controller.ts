import express, { NextFunction, Request, Response } from "express";
import { ShoppingCartModel } from "../4-models/shoppingCart-model";
import logic from "../5-logic/shoppingCart-logic"

const router = express.Router();

// POST http://localhost:3001/api/shopping-cart
router.post("/shopping-cart", async (request: Request, response: Response, next: NextFunction) => {

    try {
        const shoppingCart = new ShoppingCartModel(request.body);
        const addedShoppingCar = await logic.addShoppingCart(shoppingCart);
        response.status(201).json(addedShoppingCar);
    }
    catch(err: any){
        next(err)
    }
});

export default router;