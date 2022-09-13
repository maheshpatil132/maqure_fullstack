
const { catchaysnc } = require("../middleware/catchaysnc");
const db = require("../models/BuyerModel");
const Errorhandler = require("../utils/errorhandler");
const sendtoken = require("../utils/jwttoken");


exports.createbuyer = catchaysnc(async(req,res,next)=>{
    const buyer = new db({...req.body})
                 await buyer.save()
   sendtoken(buyer,200,res)
})

// getbuyer list
exports.getbuyers = catchaysnc(async(req,res,next)=>{
    const buyers = await db.find()
    res.json({
        sucess:true,
        buyers
    })
   
})

// getsingle buyer
exports.getsinglebuyer = catchaysnc(async(req,res,next)=>{
    const id = req.params.id

  const buyer = await db.findById(id)
  
  if(!buyer){
    return next("user not found",404)
  }
  
  res.status.json({
    success : true,
    buyer
  })
})


// login buyer
exports.loginbuyer = catchaysnc(async(req,res,next)=>{
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


// logout 
exports.logoutbuyer = catchaysnc(async (req, res, next) => {
  res.cookie(
    'token',
    null,
    {
      httpOnly: true,
      expires: new Date(Date.now())
    }
  )
  res.json({
    success: true,
    message: "successfully loged out the user "
  })
})

// forgot password



// reset password


// update Buyer profile
exports.Updatebuyer = catchaysnc(async(req,res,next)=>{
  const buyer = await db.findByIdAndUpdate(req.buyer.id,req.body,{new:true})
  if(!buyer){
    return next(new Errorhandler('user not Found',404))
  }
  await buyer.save({validateBeforeSave:false})
sendtoken(buyer,200,res)
})


// delete buyer
exports.deletebuyer = catchaysnc(async(req,res,next)=>{
  const buyer = await db.findByIdAndRemove(req.params.id);
    if (!buyer) {
      return next(new Errorhandler("Not Found", 404))
    }
    res.json({
      success: true,
      message: "deleted successfully",
      buyer
    })
})


