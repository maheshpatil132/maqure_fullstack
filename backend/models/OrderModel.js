const mongoose = require('mongoose');


const OrderModel = mongoose.Schema({
   buyer: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'buyer',
      required:true
   },
   product: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'product',
      required:true
   },
   winner:[{
      type: mongoose.SchemaTypes.ObjectId,
      ref:'seller',
      price:{
         type:Number,
      }
   }],
   quantity: {
      type: Number,
      required:true
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
   timer: {
      type:Date
   },
   bids: [{
      seller: {
         type: mongoose.SchemaTypes.ObjectId,
         ref: 'seller'
      },
      price: {
         type: Number,
      },
   }
   ],
   finalPrice:{
      type:Number
   },
   deal:{
      type:Boolean,
      default:null
   },
   negotation:{
      type:Boolean,
      default:false
   },
   createdAt: {
      type: Date,
      default: Date.now,
    },
});



module.exports = mongoose.model('order',OrderModel)