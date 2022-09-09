const Errorhandler = require("../utils/errorhandler")
const jwt = require('jsonwebtoken')
const Buyer = require("../models/BuyerModel")
const { catchaysnc } = require("./catchaysnc")

exports.isAutharization = catchaysnc(async (req, res, next) => {
   const {token} = req.cookies
   if(!token){
      return next(new Errorhandler('please Login for Access this the Resouces',401))
   }
   const decodeData = jwt.verify(token,process.env.JWT_SECRET_KEY)
   req.buyer = await Buyer.findById(decodeData.id)
   next()
})

exports.autherizesrole = (...roles)=>{
  return (req,res,next)=>{
    if(!roles.includes(req.buyer.role)){
      next(new Errorhandler(`Role : ${req.buyer.role} is not allowed`))
    }
   next()
  }
}

 