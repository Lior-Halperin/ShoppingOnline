
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import config from "./2-utils/config";
import dal from "./2-utils/dal";
import catchAll from "./3-middleware/catch-all";
import { RouteNotFoundError } from "./4-models/error-models";
import productController from "./6-controllers/product-controller";
import authController from "./6-controllers/auth-controller";
import cityListController from "./6-controllers/cityList-controller";
import shoppingCartController from "./6-controllers/order-controller"
import expressFileUpload from "express-fileupload";
import CategoryController from "./6-controllers/category-controller"

const expressServer = express();

//  Backend approval to browse AJAX to backend API
if (config.isDevelopment) expressServer.use(cors());

expressServer.use(express.json());

// Insert received files into request.files object:
expressServer.use(expressFileUpload())

expressServer.use("/api", productController);
expressServer.use("/api", authController);
expressServer.use("/api", cityListController);
expressServer.use("/api", shoppingCartController);
expressServer.use("/api", CategoryController);


//Route not found
expressServer.use("*", (request: Request, response: Response, next: NextFunction) => {
    next(new RouteNotFoundError(request.method, request.originalUrl));
});

expressServer.use(catchAll);

expressServer.listen(config.port, () => {
    console.log(`Listening on http://localhost:${config.port}`);
    dal.connect(); // Connect once to MongoDB.
});


