import express from "express";
import contactRouter from "./contactPath.js";
import productRouter from "./productPath.js";
import blogRouter from "./blogPath.js";


const mainRouter=express.Router();
mainRouter.use("/contact",contactRouter)
mainRouter.use("/product", productRouter)
mainRouter.use("/blog", blogRouter)
export default mainRouter;