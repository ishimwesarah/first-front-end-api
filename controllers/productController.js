import { get } from "mongoose";
import Product from "../models/productModal.js";

export const createProduct = async (req, res) =>{
    try {
        const {productName, productPrice, productCategory, productDiscount} = req.body;
        const newProduct = new Product({productName, productPrice, productCategory, productDiscount});
        await newProduct.save();
        res.status(201).json({ success: true, message: "Product created successfully", Product: newProduct});
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error", error: error.message});  
    }
}
 export const getAllProduct = async (req, res) =>{
try{
  const products = await Product.find();
  res.status(200).json({ success: true,  products});
} 
catch(error){
    res.status(500).json({ success: false, message: "Server error", error: error.message});
 }
}
export const getProductById = async (req, res) =>{
  try{
    const{id}=req.params;
  const products=await Product.findById(id);
  if (!products){
       return res.status(404).json({ success: false, message: "Product not found"});}
      res.status(200).json({ success: true, products});
    }

  catch(error){
    res.status(500).json({ success: false, message: "Server error", error: error.message});
  }
}
export const deleteProductById = async (req, res) =>{
  try{
    const {id}=req.params;
    const products=await Contact.findByIdAndDelete(id);
    if (!products){
      return res.status(404).json({ success: false, message: "Product not found"});}
      res.status(200).json({ success: true, message: "Product deleted successfully"});
  }
  catch(error){
    res.status(500).json({ success: false, message: "Server error", error: error.message});
  }
  
}

export const updateProductById = async (req, res) =>{
  try{
    const {id}=req.params;
    
    const updateData=await Product.findByIdAndUpdate(id, req.body);
    
    if (!updateData){
      return res.status(404).json({ success: false, message: "Product not found"});}
      res.status(200).json({ success: true, message: "Product updated successfully", Product: updateData});
  }
  catch(error){
    res.status(500).json({ success: false, message: "Server error", error: error.message});
  }
}