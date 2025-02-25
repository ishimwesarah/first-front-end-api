import { createProduct, getAllProduct,getProductById, deleteProductById, updateProductById } from "../controllers/productController.js";
import express from "express";
const productRouter=express();
productRouter.post("/createProduct", createProduct);
productRouter.get("/getAllProduct", getAllProduct);
productRouter.get("/getProductById/:id", getProductById);
productRouter.delete("/deleteProductById/:id", deleteProductById);
productRouter.put("/updateProductById/:id", updateProductById);
export default productRouter;