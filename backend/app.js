const express = require('express');
const dotenv = require('dotenv');
const body = require('body-parser');
const http = require('http');
const { Server } = require('socket.io')
const connectDatabase = require('./configure/database');
const { newbuyer, GetBuyers, GetSingleBuyer, LoginBuyer, LogoutBuyer, UpdateBuyer, DeleteBuyer } = require('./routes/BuyerRoutes');
const { CreateProduct, GetallProduct, GetSingleProduct, UpdateProduct, DeleteProduct } = require('./routes/ProductRoutes');
const error = require('./middleware/error');
const cookieParser = require("cookie-parser");
const { CreateSeller, SignUpSeller, LoginSeller, DeleteSeller, AddProdRequest } = require('./routes/sellerRoutes');
const { CreateAdmin, LoginAdmin, ApproveSeller, RejectSeller, AddProduct, GetAllSellerRequest, GetAllProdRequest } = require('./routes/AdminRoutes');
const { CreateOrder, GetAllOrder, GetSingleOrder, AdminUpdates, BuyerUpdates, SellerUpdates, GetAllQuotes, GetQuote } = require('./routes/OrderRoutes');




const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['Get', 'post']
  }
})


app.use(cookieParser())
app.use(body.urlencoded({ extended: false }))
app.use(body.json())
express.json()

dotenv.config({ path: './configure/app.env' })
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
app.use(DeleteBuyer)

// seller's Routes
app.use(CreateSeller)
app.use(SignUpSeller)
app.use(LoginSeller)
app.use(DeleteSeller)
app.use(AddProdRequest)


// admin's routes
app.use(CreateAdmin)
app.use(LoginAdmin)
app.use(ApproveSeller)
app.use(RejectSeller)
app.use(AddProduct)
app.use(GetAllSellerRequest)
app.use(GetAllProdRequest)


// order routes
app.use(CreateOrder)
app.use(GetAllOrder)
app.use(GetSingleOrder)
app.use(AdminUpdates)
app.use(BuyerUpdates)
app.use(SellerUpdates)
app.use(GetAllQuotes)
app.use(GetQuote)


app.use(error)
connectDatabase(app, PORT)