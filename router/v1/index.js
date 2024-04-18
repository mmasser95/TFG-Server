const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth.js');
const uploadManager = require('../../middlewares/files.js');
const isAuth = auth.isAuth;

const { schemaV, validate } = require('../../middlewares/validators.js');

const userCtrl = require('../../controladors/user.js');
const alimentsCtrl = require('../../controladors/aliments.js');
const rebostsCtrl = require('../../controladors/rebosts.js');
const establimentsCtrl = require('../../controladors/establiments.js');
const elementsCtrl = require('../../controladors/elements.js');
const ofertesCtrl = require('../../controladors/ofertes.js');
const comandesCtrl = require('../../controladors/comandes.js');
const avaluacionsCtrl = require('../../controladors/avaluacions.js');

//users
router
  .post('/signup', schemaV('registreClient'), validate, userCtrl.postUser)
  .get('/users', userCtrl.getUsers)
  .post(
    '/login',
    schemaV('login'),
    validate,
    userCtrl.logIn,
    establimentsCtrl.login
  )
  .get('/profile', isAuth, userCtrl.getMyUser)
  .delete('/users', isAuth, userCtrl.deleteUser)
  .get('/fav', isAuth, userCtrl.getPreferits)
  .get('/myfav', isAuth, userCtrl.getMyPreferits)
  .post('/fav', isAuth, userCtrl.marcarPreferit)
  .delete('/fav/:establimentId', isAuth, userCtrl.desmarcarPreferit)
  .put('/users/contrasenya', isAuth, userCtrl.actualitzarContrasenya);

//establiments
router
  .get('/establiments', establimentsCtrl.getAllEstabliments)
  .get('/establiments/:id', establimentsCtrl.getEstabliment)
  .post(
    '/establiments',
    schemaV('registreEstabliment'),
    validate,
    uploadManager.perfilUpload.single('img_perfil'),
    uploadManager.fondoUpload.single('img_fondo'),
    establimentsCtrl.createEstabliment
  )
  .put(
    '/establiments',
    isAuth,
    uploadManager.perfilUpload.single('img_perfil'),
    uploadManager.fondoUpload.single('img_fondo'),
    establimentsCtrl.updateEstabliment
  )
  .put(
    '/establiments/img_perfil',
    isAuth,
    uploadManager.perfilUpload.single('img_perfil'),
    establimentsCtrl.updateImatgePerfil
  )
  .put(
    '/establiments/img_fondo',
    isAuth,
    uploadManager.fondoUpload.single('img_fondo'),
    establimentsCtrl.updateImatgeFondo
  )
  .put('/establiments/direccio', isAuth, establimentsCtrl.updateDireccio)
  .delete('/establiments', isAuth, establimentsCtrl.deleteEstabliment)
  .put(
    '/establiments/contrasenya',
    isAuth,
    establimentsCtrl.actualitzarContrasenya
  )
  .get('/estadistiques/:id',isAuth,establimentsCtrl.getEstadistiques);

//Search Establiments

router.post('/search', isAuth, establimentsCtrl.searchEstabliments);

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

//Google
//router.get('/login/google', passport.authenticate(googleStrategy));

//elements
router
  .get('/rebosts/:rebostId/elements', isAuth, elementsCtrl.getAllElements)
  .get(
    '/rebosts/:rebostId/elements/:elementId',
    isAuth,
    elementsCtrl.getElement
  )
  .post('/rebosts/:rebostId/elements', isAuth, elementsCtrl.createElement)
  .put(
    '/rebosts/:rebostId/elements/:elementId',
    isAuth,
    elementsCtrl.updateElement
  )
  .delete(
    '/rebosts/:rebostId/elements/:elementId',
    isAuth,
    elementsCtrl.deleteElement
  );

//aliments
router
  .get('/aliments', alimentsCtrl.getAllAliments)
  .get('/aliments/tipus', alimentsCtrl.getAllTipus)
  .get('/aliments/tipus/:tipus', alimentsCtrl.getAllAlimentsByTipus)
  .get('/aliments/:id', alimentsCtrl.getAliment)
  .post('/aliments', isAuth, alimentsCtrl.createAliment)
  .put('/aliments/:id', isAuth, alimentsCtrl.updateAliment)
  .delete('/aliments/:id', isAuth, alimentsCtrl.deleteAliment);

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
  .post(
    '/ofertes',
    isAuth,
    uploadManager.ofertaUpload.single('img_oferta'),
    ofertesCtrl.createOferta
  )
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
