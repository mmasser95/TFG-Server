const express = require('express');
const router = express.Router();

const auth = require('../../middlewares/auth.js');
const isAuth = auth.isAuth;

const userCtrl = require('../../controladors/user.js');
const articlesCtrl = require('../../controladors/articles.js');
const rebostsCtrl = require('../../controladors/rebosts.js');
const establimentsCtrl = require('../../controladors/establiments.js');
const elementsCtrl = require('../../controladors/elements.js');
const ofertesCtrl = require('../../controladors/ofertes.js');
const comandesCtrl = require('../../controladors/comandes.js');

//users
router
    .post('/signup', userCtrl.postUser)
    .get('/users', userCtrl.getUsers)
    .post('/login', userCtrl.logIn)
    .get('/profile', isAuth, userCtrl.getMyUser)

//direccions
/*router
.get()
.get()
.post()
.put()
.delete();*/

//elements
router
    .get('/rebosts/:rebostId/elements', elementsCtrl.getAllElements)
    .get('/elements/:elementId', elementsCtrl.getElement)
    .post('/elements', elementsCtrl.createElement)
    .put('/elements/:elementId', elementsCtrl.updateElement)
    .delete('/elements/:elementId', elementsCtrl.deleteElement);

//articles
router
    .get('/articles', articlesCtrl.getAllArticles)
    .get('/articles/tipus', articlesCtrl.getAllTipus)
    .get('/articles/tipus/:tipus', articlesCtrl.getAllArticlesByTipus)
    .get('/articles/:id', articlesCtrl.getArticle)
    .post('/articles', isAuth, articlesCtrl.createArticle)
    .put('/articles/:id', isAuth, articlesCtrl.updateArticle)
    .delete('/articles/:id', isAuth, articlesCtrl.deleteArticle);

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

router
    .get('/ofertes', ofertesCtrl.getAllOfertes)
    .get('/ofertes/:ofertaId', ofertesCtrl.getOferta)
    .post('/ofertes', isAuth, ofertesCtrl.createOferta)
    .put('/ofertes/:ofertaId', isAuth, ofertesCtrl.updateOferta)
    .delete('/ofertes/:ofertaId', isAuth, ofertesCtrl.deleteOferta);

//comandes
router
    .get('/comandes', isAuth, comandesCtrl.getAllComandes)
    .get('/comandes/:comandaId', isAuth, comandesCtrl.getComanda)
    .post('/comandes', isAuth, comandesCtrl.createComanda)
    .put('/comandes/:comandaId', isAuth, comandesCtrl.updateComanda)
    .delete('/comandes/:comandaId', isAuth, comandesCtrl.deleteComanda);

/*

router.get().get().post().put().delete();
router.get().get().post().put().delete();*/

module.exports = router;
