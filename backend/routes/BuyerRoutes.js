const express = require('express');
const { createbuyer, getbuyers, getsinglebuyer, loginbuyer, logoutbuyer, Updatebuyer, deletebuyer } = require('../controller/BuyerController');
const { isAutharization, autherizesrole } = require('../middleware/auth');


const app = express.Router()


const newbuyer =  app.post('/new/buyer' , createbuyer)
const GetBuyers =  app.get('/buyers' ,isAutharization , autherizesrole('admin') ,getbuyers)
const GetSingleBuyer =  app.get('/buyer/:id' , getsinglebuyer)
const LoginBuyer =  app.post('/login/buyer' , loginbuyer)
const LogoutBuyer = app.get('/logout/buyer',logoutbuyer)
const UpdateBuyer = app.put('/update/buyer',isAutharization,Updatebuyer)
const DeleteBuyer =  app.delete('/buyer/:id', isAutharization,autherizesrole('admin'),deletebuyer)






module.exports = {newbuyer , GetBuyers , GetSingleBuyer , LoginBuyer , LogoutBuyer , UpdateBuyer}