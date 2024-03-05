const express=require('express');
const router=express.Router();

const auth=require('../../middlewares/auth.js');
const isAuth=auth.isAuth;

const userCtrl=require('../../controladors/user.js');
const articlesCtrl=require('../../controladors/articles.js');
const rebostsCtrl=require('../../controladors/rebosts.js');
const establimentsCtrl=require('../../controladors/establiments.js');

//users
router
.post('/signup',userCtrl.postUser)
.get('/users', userCtrl.getUsers)
.post('/login', userCtrl.logIn)
.get('/profile',isAuth,userCtrl.getMyUser)

//direccions
/*router
.get()
.get()
.post()
.put()
.delete();

//elements
router
.get()
.get()
.post()
.put()
.delete();*/

//articles
router
.get('/articles', articlesCtrl.getAllArticles)
.get('/articles/:id', articlesCtrl.getArticle)
.post('/articles',isAuth,articlesCtrl.createArticle)
.put('/articles/:id',isAuth, articlesCtrl.updateArticle)
.delete('/articles/:id',isAuth, articlesCtrl.deleteArticle);

//rebosts
router
.get('/rebosts', isAuth, rebostsCtrl.getAllRebosts)
.get('/rebosts/:id', isAuth, rebostsCtrl.getRebost)
.post('/rebosts', isAuth, rebostsCtrl.createRebost)
.put('/rebosts/:id', isAuth, rebostsCtrl.updateRebost)
.delete('/rebosts/:id', isAuth, rebostsCtrl.deleteRebost);

//establiments
router
.get('/establiments', establimentsCtrl.getAllEstabliments)
.get('/establiments/:id', establimentsCtrl.getEstabliment)
.post('/establiments', isAuth, establimentsCtrl.createEstabliment)
.put('/establiments/:id', isAuth, establimentsCtrl.updateEstabliment)
.delete('/establiments/:id', isAuth, establimentsCtrl.deleteEstabliment);

//ofertes

/*router.get().get().post().put().delete();

router.get().get().post().put().delete();
router.get().get().post().put().delete();
router.get().get().post().put().delete();*/

module.exports=router;
