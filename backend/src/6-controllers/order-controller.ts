import express, { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import { OrderModel } from "../4-models/order-model";
import { OrderedItemModel } from "../4-models/orderedItem-model";
import logic from "../5-logic/order-logic"

const router = express.Router();

// POST http://localhost:3001/api/order
router.post("/order",verifyLoggedIn, async (request: Request, response: Response, next: NextFunction) => {

    try {
        const orderedArrayItems = request.body

        // First step - updates new order in db
        let userDetails = null;

        await cyber.getUserDetailsFromToken(request).then(i => {
            i.userId = i._id
            delete i._id
            userDetails = new OrderModel(i)
        })
        const addedOrder = await logic.addOrder(userDetails)

        // Second step - updates all the products purchased in the db and 
        // also associates them with order id to which they belong.
        orderedArrayItems.forEach(async item => {
            item['orderId'] = addedOrder._id
            const addedOrderedItem = new OrderedItemModel(item)
            await logic.orderedItem(addedOrderedItem)
        })

        response.status(201).json(true)

    }
    catch (err: any) {
        next(err)
    }
});


export default router;