import { CategoryModel } from "./category.model";

export interface ProductModel {
    
     _id: string;
     name: string;
     price: number; 
     categoryId: string;
     imageName: string;
     image: File;
     productCategory: CategoryModel

}

