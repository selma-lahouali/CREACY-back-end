const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        products: [
            {
                productId: {
                    type: String
                }, 
                quantity: { 
                    type: Number,
                    default: 1
                },
                price:{
                    type: Number,
                },
                image: {
                    type: String 
                }
            }
        ],
        amount: {
            type: Number,
            required: true
        },
        address: {
            type: Object,
            // required: true
            default:"testing address"
        },
        status: {
            type: String, 
            default: "Pending"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
