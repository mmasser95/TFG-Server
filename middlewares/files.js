const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

function nomFitxerPersonalitzat(tipusImatge, nomUsuari, nomOriginal) {
  const extensio = nomOriginal.split('.').pop();
  return `${tipusImatge}.${nomUsuari}.${extensio}`;
}

const perfilStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/perfil/'),
  filename: (req, file, cb) =>{
  console.log(req.body)
    cb(null, nomFitxerPersonalitzat('perfil', req.body.nom, file.originalname))},
});
const fondoStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/fondo/'),
  filename: (req, file, cb) =>{
  console.log(req.body)
    cb(null, nomFitxerPersonalitzat('fondo', req.body.nom, file.originalname))},
});

const ofertaStorage=multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/ofertes/'),
    filename: (req, file, cb) =>
      cb(null, nomFitxerPersonalitzat('ofertes', uuidv4(), file.originalname)),
  });

const perfilUpload=multer({storage:perfilStorage})
const fondoUpload=multer({storage:fondoStorage})
const ofertaUpload=multer({storage:ofertaStorage})

const deleteImage=(ruta)=> new Promise((resolve,reject)=>{
    fs.unlink(ruta).then(() => {
        resolve('Imatge borrada correctament')
    }).catch((err) => {
        reject(`Ha sorgit l'error següent ${err}`)
    });
})

module.exports={
    perfilUpload,
    fondoUpload,
    ofertaUpload,
    deleteImage
}