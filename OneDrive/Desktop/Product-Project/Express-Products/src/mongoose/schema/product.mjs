import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },

    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 200
    }
},
{
    timestamps: true
});

export default mongoose.model("Product", productSchema);