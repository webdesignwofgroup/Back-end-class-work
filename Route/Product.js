import express from "express";
import { createProduct,  deleteProduct,  getAllproducts, getProductById, updateProduct } from "../controller/product.js";

const productRouter = express.Router();

// 🔥 Add this line here
console.log("Product router loaded");

productRouter.post('/', createProduct) ; 
productRouter.get('/', getAllproducts);
productRouter.get('/:id', getProductById);
productRouter.put('/:id', updateProduct);
productRouter.delete('/:id', deleteProduct);


export default productRouter;