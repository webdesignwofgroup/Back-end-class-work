import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
    {
        name:{type:String, required:true},
         price:{type:Number, require:true},
          description:{type:String, required:true},
           image:{type:String },
         stock:{type:String },
        category:{type:String },
    },
    {timestamps:true}
)

export const Product = mongoose.model('product', productSchema )