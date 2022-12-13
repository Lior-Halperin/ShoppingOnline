import express, { NextFunction, Request, Response } from "express";
import path from "path";
import fs from "fs";
import { ProductModel } from "../4-models/product-model";
import logic from "../5-logic/product-logic";
import { RouteNotFoundError } from "../4-models/error-models";

const router = express.Router();

// GET http://localhost:3001/api/products
router.get("/products", async (request: Request, response: Response, next: NextFunction) => {
    try {

        const products = await logic.getAllProducts();
        response.json(products);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:3001/api/products/5e91e29b9c08fc560ce2cf3a
router.get("/products/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        const product = await logic.getOneProduct(_id);
        response.json(product);
    }
    catch (err: any) {
        next(err);
    }
});

// GET http://localhost:3001/api/products/category/62e2a895d599b19de53ffbcb
router.get("/products/category/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        console.log("api/products/category")
        const _id = request.params._id;
        const product = await logic.getAllProductsByCategoryId(_id);
        response.json(product);
    }
    catch (err: any) {
        next(err);
    }
});



// POST http://localhost:3001/api/products
router.post("/products", async (request: Request, response: Response, next: NextFunction) => {
    try {
        console.log('post: ',request.body)
        // Take image from request into the body:
        request.body.image = request.files?.image;
        
        const product = new ProductModel(request.body);
        const addedProduct = await logic.addProduct(product);
        response.status(201).json(addedProduct);
    }
    catch (err: any) {
        next(err);
    }
});



// PATCH http://localhost:3001/api/products/5e91e29b9c08fc560ce2cf3a
router.patch("/products/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        // console.log(request.body)
        // console.log('PATCH controller')
        request.body.image = request.files?.image;
        request.body._id = request.params._id;
        // console.log('request.body.image: ',request.body.image)
        // console.log('request.body._id : ',request.body._id )

        const product = new ProductModel(request.body);
        const updatedProduct = await logic.updatePartialProduct(product);
        response.json(updatedProduct);
    }
    catch (err: any) {
        next(err);
    }
});

// get http://localhost:3001/api/products/images/b744485b-bdef-472d-bb4a-46b137961144.jpg
router.get("/products/images/:imageName",  async (request: Request, response: Response, next: NextFunction) => {

    try {
        const imageName = request.params.imageName;
        const absolutePath = path.join(__dirname, "..", "1-assets", "images", imageName);

        if (!fs.existsSync(absolutePath)) {
            throw new RouteNotFoundError(request.method, request.originalUrl);
        }

        response.sendFile(absolutePath);
    }
    catch (err: any) {
        next(err);
    }
});

// // Mongo Query Language

// // GET http://localhost:3001/api/query-products
// router.get("/query-products", async (request: Request, response: Response, next: NextFunction) => {
//     try {
//         const products = await logic.testMongoQueryLanguage();
//         response.json(products);
//     }
//     catch (err: any) {
//         next(err);
//     }
// });

export default router;