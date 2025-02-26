import multer from "multer";
import cloudinary from "../utils/cloudinaryConfig.js";
import Product from "../models/productModal.js";
import { Readable } from 'stream';

// Multer Storage (for handling file uploads)
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const createProduct = async (req, res) => {
    try {
        console.log("Request body:", req.body);
        console.log("Request file:", req.file);

        const { name, price, category, discount } = req.body;
        let uploadedImageUrl = "";

        // Validate required fields
        if (!name || !price || !category) {
            return res.status(400).json({ message: "Missing required fields: name, price, category" });
        }

        // Validate price and discount
        if (isNaN(parseFloat(price)) || (discount && isNaN(parseFloat(discount)))) {
            return res.status(400).json({ message: "Price and discount must be valid numbers" });
        }

        console.log("Required fields validated");

        // Handle file upload to Cloudinary
        if (req.file) {
            try {
                console.log("Uploading file to Cloudinary");
                
                // Create a stream from the buffer
                const stream = Readable.from(req.file.buffer);

                // Use Cloudinary's upload_stream method
                const cloudinaryUpload = new Promise((resolve, reject) => {
                    const cloudinaryStream = cloudinary.uploader.upload_stream(
                        { folder: "images" },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result);
                        }
                    );

                    stream.pipe(cloudinaryStream);
                });

                const cloudinaryResponse = await cloudinaryUpload;
                console.log("Cloudinary response:", cloudinaryResponse);
                uploadedImageUrl = cloudinaryResponse.secure_url;
            } catch (cloudinaryError) {
                console.error("Cloudinary upload error:", cloudinaryError);
                return res.status(500).json({ message: "Error uploading image", error: cloudinaryError.toString() });
            }
        }

        // Create product in database
        try {
            console.log("Creating product in database");
            const product = await Product.create({
                name,
                price: parseFloat(price),
                category,
                discount: discount ? parseFloat(discount) : 0,
                image: uploadedImageUrl,
            });
            console.log("Product created:", product);
            res.status(201).json(product);
        } catch (dbError) {
            console.error("Database error:", dbError);
            res.status(500).json({ message: "Error creating product", error: dbError.toString() });
        }
    } catch (error) {
        console.error("Error in createProduct controller:", error);
        res.status(500).json({ message: "Server error", error: error.toString() });
    }
};

// Export the multer middleware for use in routes
export const uploadMiddleware = upload.single("image");

export const getAllProduct = async (req, res) =>{
  try{
    const product = await Product.find();
    res.status(200).json({ success: true,  product});
  } 
  catch(error){
      res.status(500).json({ success: false, message: "Server error", error: error.message});
   }
  }
  export const getproductById = async (req, res) =>{
    try{
      const{id}=req.params;
    const product=await Product.findById(id);
    if (!product){
         return res.status(404).json({ success: false, message: "product not found"});}
        res.status(200).json({ success: true, product});
      }
  
    catch(error){
      res.status(500).json({ success: false, message: "Server error", error: error.message});
    }
  }
  export const deleteproductById = async (req, res) =>{
    try{
      const {id}=req.params;
      const product=await Product.findByIdAndDelete(id);
      if (!product){
        return res.status(404).json({ success: false, message: "Product  not found"});}
        res.status(200).json({ success: true, message: "Product deleted successfully"});
    }
    catch(error){
      res.status(500).json({ success: false, message: "Server error", error: error.message});
    }
    
  }
  
  export const updateProductById = async (req, res) => {
    try {
        console.log("Request body:", req.body);
        console.log("Request file:", req.file);

        const { name, price, category, discount } = req.body;
        let uploadedImageUrl = "";

        // Validate required fields
        if (!name || !price || !category) {
            return res.status(400).json({ message: "Missing required fields: name, price, category" });
        }

        // Validate price and discount
        if (isNaN(parseFloat(price)) || (discount && isNaN(parseFloat(discount)))) {
            return res.status(400).json({ message: "Price and discount must be valid numbers" });
        }

        console.log("Required fields validated");

        // Handle file upload to Cloudinary
        if (req.file) {
            try {
                console.log("Uploading file to Cloudinary");
                
                // Create a stream from the buffer
                const stream = Readable.from(req.file.buffer);

                // Use Cloudinary's upload_stream method
                const cloudinaryUpload = new Promise((resolve, reject) => {
                    const cloudinaryStream = cloudinary.uploader.upload_stream(
                        { folder: "images" },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result);
                        }
                    );

                    stream.pipe(cloudinaryStream);
                });

                const cloudinaryResponse = await cloudinaryUpload;
                console.log("Cloudinary response:", cloudinaryResponse);
                uploadedImageUrl = cloudinaryResponse.secure_url;
            } catch (cloudinaryError) {
                console.error("Cloudinary upload error:", cloudinaryError);
                return res.status(500).json({ message: "Error uploading image", error: cloudinaryError.toString() });
            }
        }

        // Create product in database
        try {
            console.log("Creating product in database");
            const product = await Product.create({
                name,
                price: parseFloat(price),
                category,
                discount: discount ? parseFloat(discount) : 0,
                image: uploadedImageUrl,
            });
            console.log("Product created:", product);
            res.status(201).json(product);
        } catch (dbError) {
            console.error("Database error:", dbError);
            res.status(500).json({ message: "Error creating product", error: dbError.toString() });
        }
    } catch (error) {
        console.error("Error in createProduct controller:", error);
        res.status(500).json({ message: "Server error", error: error.toString() });
    }
};