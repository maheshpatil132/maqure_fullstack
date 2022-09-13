const { catchaysnc } = require("../middleware/catchaysnc");
const db = require("../models/AdminModel");
const ProductModel = require("../models/ProductModel");
const SellerModel = require("../models/SellerModel");
const Errorhandler = require("../utils/errorhandler");
const sendtoken = require("../utils/jwttoken");

// create admin
exports.createadmin = catchaysnc(async(req,res,next)=>{
    const admin = new db({...req.body})
    await admin.save()
    sendtoken(admin,200,res)
})


// login seller
exports.loginadmin = catchaysnc(async(req,res,next)=>{
    const {email , password} = req.body
     // check email or password is enterde or not
     if (!email || !password) {
      return next(new Errorhandler('please enter email or paswwrod', 401))
    }
    //find user
    const user = await db.findOne({ email }).select("+password")
    //if user not found send error message
    if (!user) {
      return next(new Errorhandler('user not found : Invalid email or password', 404))
    }
    //check the passwrod is correct or not
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return next(new Errorhandler('Invalid Email or Password'), 404)
    }
    //create token and store it in cookie
    sendtoken(user, 200, res);
  })
  



// approve seller
exports.aproveseller = catchaysnc(async(req,res,next)=>{
  const {id} = req.params
  
  // update seller
  const seller = await SellerModel.findByIdAndUpdate(id,{Aprroved:true},{new:true})
  if(!seller){
    return next(new Errorhandler("seller not exist",404))
  }
  await seller.save()

  // delete request
  const admin = await db.findOne({email:"hiren@gmail.com"})
  
  const result = admin.sellerReq.filter(re=>re._id.toString() !== id.toString())
 
  await admin.updateOne({sellerReq:result},{new:true})

  admin.save()

  sendtoken(admin,200,res)
})



// reject seller
exports.rejectseller = catchaysnc(async(req,res,next)=>{
  const {id} = req.params
  const seller = await SellerModel.findByIdAndRemove(id,{Aprroved:true},{new:true})
  if(!seller){
    return next(new Errorhandler("seller not exist",404))
  }
  await seller.save()

  // delete request
  const admin = await db.findOne({email:"hiren@gmail.com"})
  
  const result = admin.sellerReq.filter(re=>re._id.toString() !== id.toString())
  
  await admin.updateOne({sellerReq:result},{new:true})
  admin.save()
  sendtoken(admin,200,res)
})


// add product
exports.addproduct = catchaysnc(async(req,res,next)=>{


  

  const addreq = req.body
  const user = await SellerModel.findById(addreq.seller)
  const products = await ProductModel.findById(addreq.product)
  
  await user.products.push(addreq.product)
  products.sellers.push(addreq.seller)
   await user.save()
   await products.save()
   
   res.status(200).json({
    sucess:true,
    message:"product added sucessfully"
   })
})




// get all seller request
exports.getallsellerrequest = catchaysnc(async (req,res,next)=>{
  const email = "hiren@gmail.com"
  const admin = await db.findOne({email:email}).populate('sellerReq')
  if(!admin){
    return next(new Errorhandler('admin not found',404))
  }
  res.status(200).json({
    sucess:true,
    admin
  })
})


// get all add prod request
exports.getalladdprodrequest = catchaysnc(async (req,res,next)=>{
  const email = "hiren@gmail.com"
  const admin = await db.findOne({email:email}).populate('AddprodReq.seller').populate('AddprodReq.product')
  if(!admin){
    return next(new Errorhandler('admin not found',404))
  }
  const Addreqs = await admin.AddprodReq
  res.status(200).json({
    sucess:true,
    Addreqs
  })
})

