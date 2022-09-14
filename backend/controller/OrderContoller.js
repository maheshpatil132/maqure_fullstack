const { default: mongoose } = require("mongoose");
const { catchaysnc } = require("../middleware/catchaysnc");
const db = require("../models/OrderModel");
const Errorhandler = require("../utils/errorhandler");


// create
exports.createorder = catchaysnc(async (req, res, next) => {
    const { product, quantity } = req.body
    const data = {
        buyer: req.user._id,
        product,
        quantity
    }
    const order = new db({ ...data })
    await order.save()
    res.status(200).json({
        success: true,
        message: 'your order is created'
    })
})

// update order   

// 1. update status / finalprice  == admin
exports.adminupdates = catchaysnc(async (req, res, next) => {

    const order = await db.findByIdAndUpdate(req.body.id, { ...req.body }, { new: true })

    if (!order) {
        return next(new Errorhandler('order not found', 404))
    }
    await order.save()
    res.status(200).json({
        success: true,
        message: "order updated successfully",
        order
    })

})

// 2. update negotitation ==  buyer
exports.buyerupdates = catchaysnc(async (req, res, next) => {

    const order = await db.findByIdAndUpdate(req.body.id, { ...req.body }, { new: true })

    if (!order) {
        return next(new Errorhandler('order not found', 404))
    }
    await order.save()
    res.status(200).json({
        success: true,
        message: "order updated successfully",
        order
    })

})

// 3. update bids == seller
exports.sellerupdates = catchaysnc(async (req, res, next) => {

    const { price } = req.body

    const data = {
        seller: req.user._id,
        price
    }
    const order = await db.findById(req.body.id)

    if (!order) {
        return next(new Errorhandler('order not found', 404))
    }

    const isBided = order.bids.find(rev => rev.seller.toString() === req.user._id.toString())

    if (isBided) {

        order.bids.forEach(rev => {
            if (rev.seller.toString() === req.user._id.toString()) {
                rev.price = price
            }
        })
    } else {
        product.reviews.push(data)
    }

    await order.save()

    res.status(200).json({
        success: true,
        message: "order updated successfully",
        order
    })

})


// get all order
exports.getallorders = catchaysnc(async (req, res, next) => {
    const orders = await db.find({})
    res.status(200).json({
        success: true,
        orders
    })
})

// get single order
exports.getsingleorder = catchaysnc(async (req, res, next) => {
    const order = await db.findById(req.params.id)

    if (!order) {
        return next(new Errorhandler("order not found", 404))
    }

    res.status(200).json({
        success: true,
        order
    })
})


// get all seller's quoate
exports.getallquoate = catchaysnc(async (req, res, next) => {
    const quotes = await db.findById(req.params.id, {bids:1, _id:0}).populate('bids.seller',{name:1,_id:0});
    if (!quotes) {
        return next(new Errorhandler("order does not exist", 404))
    }
    const bids = await quotes.bids
    res.status(200).json({
        success: true,
        quotes
    })

})


// get single quoate

exports.getquote = catchaysnc(async (req, res, next) => {
    const { id } = req.params
    const { order } = req.params
    const quote = await db.findById(order,{ _id: 0, bids: { $elemMatch: { _id: id } } }).populate('bids.seller', { name: 1, _id: 0 })

    if(!quote){
        return next(new Errorhandler("order does not exist" , 404))
    }
    
    res.status(200).json({
        quote
    })
})


// admin have selected

// accept order
exports.acceptorder = catchaysnc(async(req,res,next)=>{

})


// reject / delete quoate
