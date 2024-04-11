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
const avaluacionsCtrl = require('../../controladors/avaluacions.js');

//users
router
  .post('/signup', userCtrl.postUser)
  .get('/users', userCtrl.getUsers)
  .post('/login', userCtrl.logIn, establimentsCtrl.login)
  .get('/profile', isAuth, userCtrl.getMyUser);

//establiments
router
  .get('/establiments', establimentsCtrl.getAllEstabliments)
  .get('/establiments/:id', establimentsCtrl.getEstabliment)
  .post('/establiments', establimentsCtrl.createEstabliment)
  .put('/establiments/:id', isAuth, establimentsCtrl.updateEstabliment)
  .put('/establiments/:id/direccio', isAuth, establimentsCtrl.updateDireccio)
  .delete('/establiments/:id', isAuth, establimentsCtrl.deleteEstabliment);

//avaluacions
router
  .get(
    '/establiments/:establimentId/avaluacions',
    isAuth,
    avaluacionsCtrl.getAllAvaluacions
  )
  .post(
    '/establiments/:establimentId/avaluacions',
    isAuth,
    avaluacionsCtrl.createAvaluacio
  )
  .put(
    '/establiments/:establimentId/avaluacions/:avaluacioId',
    isAuth,
    avaluacionsCtrl.updateAvaluacio
  )
  .delete(
    '/establiments/:establimentId/avaluacions/:avaluacioId',
    isAuth,
    avaluacionsCtrl.deleteAvaluacio
  );

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
  .get('/rebosts/:rebostId/elements/:elementId', elementsCtrl.getElement)
  .post('/rebosts/:rebostId/elements', elementsCtrl.createElement)
  .put('/rebosts/:rebostId/elements/:elementId', elementsCtrl.updateElement)
  .delete('/rebosts/:rebostId/elements/:elementId', elementsCtrl.deleteElement);

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

//ofertes
router
  .get('/ofertes', isAuth, ofertesCtrl.getAllOfertes)
  .get('/ofertes/:id', isAuth, ofertesCtrl.getOferta)
  .post('/ofertes', isAuth, ofertesCtrl.createOferta)
  .put('/ofertes/:id', isAuth, ofertesCtrl.updateOferta)
  .delete('/ofertes/:id', isAuth, ofertesCtrl.deleteOferta);

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
