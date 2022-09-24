const mongoose = require('mongoose');
const validator = require('validator');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const BuyerModel = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        validator:[validator.isEmail,"Please Enter the valid Email"]
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    mobile:{
        type:Number,
        length:10,
        required:true
    },
    role:{
      type:String,
      default:'buyer'
    },
    bids:[
        {
          type:mongoose.SchemaTypes.ObjectId,
          ref:'order'
        }
    ],
    date: {
        type: Date,
        default: Date.now()
    }
})

BuyerModel.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next()
    }
    this.password = await bcrypt.hash(this.password, 10)
  })
  
  // generate the token
  BuyerModel.methods.generateToken = function () {
    const token = jwt.sign({ id: this._id , role:this.role}, process.env.JWT_SECRET_KEY)
    return token
  }
  
  // compare the password
  BuyerModel.methods.comparePassword = function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password)
  }
  
  //resetpassword token generate
  BuyerModel.methods.getresetToken = function () {
    const resettoken = crypto.randomBytes(20).toString('hex')
    this.resetpasswordToken = crypto.createHash('sha256')
      .update(resettoken)
      .digest('hex');
    this.resetPasswordExpires = Date.now() + 15 * 60 * 1000
    return resettoken
  }
  
module.exports = mongoose.model('buyer',BuyerModel)