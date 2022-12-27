import { ResourceNotFoundError, UnauthorizedError, ValidationError } from "../4-models/error-models";
import { IProductModel, ProductModel } from "../4-models/product-model";
import fs from "fs/promises";
import { v4 as uuid } from "uuid";
import { join } from "path";

// Get all products:
async function getAllProducts(): Promise<IProductModel[]> {

    // Get all products without categories (no join): 
    //return ProductModel.find().exec(); // (1. whet i want to do , 2. exec() return Promise)

    // Get all products with categories (join):
    return ProductModel.find().populate("productCategory").exec();

}

// Get one product by _id:
async function getOneProduct(_id: string): Promise<IProductModel> {
    const product = await ProductModel.findById(_id).exec();
    if (!product) {
        throw new ResourceNotFoundError(_id);
    }
    return product;
}

// Get all products by categories _id :
async function getAllProductsByCategoryId(_id:string): Promise<IProductModel[]> {

    return ProductModel.find({categoryId: _id}).populate("productCategory").exec();

}

// Add new product:
async function addProduct(product: IProductModel): Promise<IProductModel> {

    const errors = product.validateSync();
    const checkDup: number = await ProductModel.find({ name: `${product.name}` }).count();

    if (errors) {
        throw new ValidationError(errors.message);
    }

    if (checkDup > 0) {
        throw new UnauthorizedError("This name is already taken, Please select another")
    }

    product = await handlingImage(product)

    return product.save();
}


// Update partial product: 
async function updatePartialProduct(product: IProductModel): Promise<IProductModel> {
    const whatToValidate = [];
    for (const prop in product.toObject()) {
        whatToValidate.push(prop);
    }
    const errors = product.validateSync(whatToValidate);
    if (errors) {
        throw new ValidationError(errors.message);
    }

    product = await handlingImage(product)

    const updatedProduct = await ProductModel.findByIdAndUpdate(product._id, product, { returnOriginal: false });
    // { returnOriginal: false } --> return db product and not given product.
    if (!updatedProduct) {
        throw new ResourceNotFoundError(product._id);
    }

    return updatedProduct;
}

// Handling image:
async function handlingImage(product: IProductModel): Promise<IProductModel> {

        if (product.image) {

            ProductModel.findOne({ _id: `${product._id}` }, `imageName`).exec(async (err, result) => {
                console.log('result:' ,result)
                result && await fs.unlink("../backend/src/1-assets/images/" + result.imageName).catch(err=>console.log('that an image sent for deletion was not found'))
            })
            const newProduct = product.toObject()
    
            // Generate unique name with original extension:
            const dotIndex = newProduct.image.name.lastIndexOf(".");
            const extension = newProduct.image.name.substring(dotIndex); // return part of the string 
            newProduct.imageName = uuid() + extension; // example: 75045ec6-bcb6-4900-b7e5-284cb66110ad.png/jpg...
    
            // Save in disk:
            const data = newProduct.image.data
            await fs.writeFile(join(__dirname, "..", "1-assets", "images", newProduct.imageName), data)
    
            // Don't return back image file:
            delete newProduct.image;
    
            product = new ProductModel(newProduct)
    
        }
    
        return product


}



export default {
    getAllProducts,
    getOneProduct,
    addProduct,
    updatePartialProduct,
    getAllProductsByCategoryId

}
