import { ValidationError } from "../4-models/error-models";
import { IOrderModel } from "../4-models/order-model";
import { IOrderedItemModel } from "../4-models/orderedItem-model";

// Add new shoppingCart:
async function addOrder(order: IOrderModel): Promise<IOrderModel> {

    const errors = order.validateSync();
    if(errors){
        throw new ValidationError(errors.message)
    }

    return order.save()
};


async function orderedItem(orderedItem: IOrderedItemModel): Promise<IOrderedItemModel> {

    const errors = orderedItem.validateSync();
    if(errors){
        throw new ValidationError(errors.message)
    }

     return orderedItem.save()

}


export default {
    addOrder,
    orderedItem
}