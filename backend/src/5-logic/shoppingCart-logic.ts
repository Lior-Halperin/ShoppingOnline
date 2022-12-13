import { ValidationError } from "../4-models/error-models";
import { IShoppingCartModel } from "../4-models/shoppingCart-model";

// Add new shoppingCart:
async function addShoppingCart(shoppingCart: IShoppingCartModel): Promise<IShoppingCartModel> {

    const errors = shoppingCart.validateSync();
    if(errors){
        throw new ValidationError(errors.message)
    }

    return shoppingCart.save()
};

// Get 
// async function 

export default {
    addShoppingCart
}