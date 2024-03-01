const express=require('express');
const router=express.Router();

const auth=require('../middlewares/auth.js');
const isAuth=auth.isAuth;

const userCtrl=require('../controladors/user.js');

router.post('/signup',userCtrl.postUser);
router.get('/users', userCtrl.getUsers);
router.post('/login', userCtrl.logIn);
router.get('/profile',isAuth,userCtrl.getMyUser)
module.exports=router;
