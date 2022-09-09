const express = require('express');
const dotenv = require('dotenv');
const body = require('body-parser');
const connectDatabase = require('./configure/database');
const { newbuyer, GetBuyers, GetSingleBuyer, LoginBuyer, LogoutBuyer, UpdateBuyer } = require('./routes/BuyerRoutes');
const { CreateProduct, GetallProduct, GetSingleProduct, UpdateProduct, DeleteProduct } = require('./routes/ProductRoutes');
const error = require('./middleware/error');
const cookieParser = require("cookie-parser");




const app = express()
app.use(cookieParser())
app.use(body.urlencoded({ extended: false }))
app.use(body.json())
express.json()

dotenv.config({path:'./configure/app.env'})
const PORT = process.env.PORT



// product routes
app.use(CreateProduct)
app.use(GetallProduct)
app.use(GetSingleProduct)
app.use(UpdateProduct)
app.use(DeleteProduct)


// buyer's Route
app.use(newbuyer)
app.use(GetBuyers)
app.use(GetSingleBuyer)
app.use(LoginBuyer)
app.use(LogoutBuyer)
app.use(UpdateBuyer)


app.use(error)
connectDatabase(app,PORT)