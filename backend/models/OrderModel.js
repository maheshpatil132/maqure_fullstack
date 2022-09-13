const mongoose = require('mongoose');


const OrderModel = mongoose.Schema({
   buyer: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'buyer'
   },
   product: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'product'
   },
   quantity: {
      type: Number,
   },
   status: {
      type: String,
      default: 'processing'
   },
   remark: {
      type: String,
   },
   documents: [
      { type: String, }
   ],
   timer:{
     
   },
   bids: [{
      seller: {
         type: mongoose.SchemaTypes.ObjectId,
         ref: 'seller'
      },
      price: {
         type: String,
      },
   },

   ]

})