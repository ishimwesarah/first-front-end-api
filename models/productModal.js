import mongoose from "mongoose";
const { model, Schema } = mongoose;

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        discount: {
            type: Number,
            default: 0
        },
        image: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true,
        collection: "product"  // Moved to the correct place
    }
);

const Product = model("Product", productSchema);
export default Product;