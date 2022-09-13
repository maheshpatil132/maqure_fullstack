const Errorhandler = require("../utils/errorhandler")
const jwt = require('jsonwebtoken')
const Buyer = require("../models/BuyerModel")
const { catchaysnc } = require("./catchaysnc")
const AdminModel = require("../models/AdminModel")
const SellerModel = require("../models/SellerModel")

exports.isAutharization = catchaysnc(async (req, res, next) => {
   const {token} = req.cookies
   if(!token){
      return next(new Errorhandler('please Login for Access this the Resouces',401))
   }
   const decodeData = jwt.verify(token,process.env.JWT_SECRET_KEY)
   req.user = await Buyer.findById(decodeData.id)
   next()
})

exports.isAdmin = catchaysnc(async (req, res, next) => {
  const {token} = req.cookies
  if(!token){
     return next(new Errorhandler('please Login for Access this the Resouces',401))
  }
  const decodeData = jwt.verify(token,process.env.JWT_SECRET_KEY)
  req.user = await AdminModel.findById(decodeData.id)
  next()
})


exports.isSeller = catchaysnc(async (req, res, next) => {
  const {token} = req.cookies
  if(!token){
     return next(new Errorhandler('please Login for Access this the Resouces',401))
  }
  const decodeData = jwt.verify(token,process.env.JWT_SECRET_KEY)
  req.user = await SellerModel.findById(decodeData.id)
  if(!req.user.Aprroved){
    return next(new Errorhandler('your account are not verified',401))
  }
  next()
})



exports.autherizesrole = (...roles)=>{
  return (req,res,next)=>{
    if(!roles.includes(req.user.role)){
      next(new Errorhandler(`Role : ${req.user.role} is not allowed`))
    }
   next()
  }
}

 