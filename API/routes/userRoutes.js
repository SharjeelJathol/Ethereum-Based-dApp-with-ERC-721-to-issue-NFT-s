const express=require('express');
const user=express.Router();
const userController=require('../controllers/userController')
const authController=require('../controllers/authController')
user.post('/login', userController.login)
user.get('/logout', userController.logout)
user.post('/signup', userController.signup)
user.get('/username', userController.username)
user.get('/email', userController.email)
user.get('/public_address', userController.public_address)
user.get('/loginStatus', authController.authenticate,  userController.loginStatus)
module.exports=user;