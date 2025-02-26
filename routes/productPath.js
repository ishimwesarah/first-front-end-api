import express from "express";
import { createProduct, deleteproductById, getproductById, updateProductById, uploadMiddleware, getAllProduct } from "../controllers/productController.js";

const router = express.Router();

router.post("/createProduct", uploadMiddleware, createProduct);
router.post("/getproductById/:id", getproductById);
router.post("/getAllProduct", getAllProduct);
router.post("/deleteproductById/:id", deleteproductById);
router.post("/updateProductById", uploadMiddleware, updateProductById);


export default router;