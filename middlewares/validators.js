const { body, validationResult } = require('express-validator');
const ObjectId = require('mongoose').Types.ObjectId;
const sanitize = () => body('*').trim();
const schemaV = (method) => {
  switch (method) {
    case 'login':
      return [
        sanitize(),
        body('correu', 'Correu invàlid')
          .toLowerCase()
          .normalizeEmail()
          .isEmail(),
        body('contrasenya', 'Contrasenya invàlida')
          .exists()
          .isLength({ min: 8 }),
      ];
      break;
    case 'registreEstabliment':
      return [
        sanitize(),
        body('correu', 'Correu invàlid')
          .toLowerCase()
          .normalizeEmail()
          .isEmail(),
        body('contrasenya', 'Contrasenya invàlida')
          .exists()
          .isLength({ min: 8 }),
        body('nom', 'El nom es requerit').trim().notEmpty(),
        body('descripcio', 'La descripció es requerida').isLength({ min: 10 }),
        body('tipus', 'El tipus es requerit').notEmpty(),
        body('telf', 'El telf. es requerit').notEmpty().isNumeric(),
        body(
          'direccio.carrer',
          'El carrer de la direcció es obligatori'
        ).notEmpty(),
        body('direccio.numero', 'El numero de la direcció es obligatori')
          .notEmpty()
          .isNumeric(),
        body('direccio.CP', 'El codi postal es necessari')
          .notEmpty()
          .isNumeric(),
        body(
          'direccio.poblacio',
          'La població de la direcció es obligatoria'
        ).notEmpty(),
        body(
          'direccio.provincia',
          'La provincia de la direcció es obligatoria'
        ).notEmpty(),
      ];
      break;
    case 'registreClient':
      return [
        sanitize(),
        body('nom', 'El nom es obligatori').notEmpty(),
        body('correu', 'Correu invàlid')
          .toLowerCase()
          .normalizeEmail()
          .isEmail(),
        body('contrasenya', 'Contrasenya invàlida')
          .notEmpty()
          .isLength({ min: 8 }),
        body('telf', 'El telf. es requerit')
          .notEmpty()
          .isNumeric()
          .isLength({ min: 9, max: 9 }),
        body('data_naixement').notEmpty(),
      ];
      break;
    case 'crearEditarRebost':
      return [
        sanitize(),
        body('nom', 'El nom és obligatori')
          .notEmpty()
          .isLength({ min: 3, max: 20 }),
      ];
      break;
    case 'crearEditarOferta':
      return [
        sanitize(),
        body('nom', 'El nom es obligatori').notEmpty().isLength({ min: 3 }),
        body(
          'descripcio',
          'La descripcio és obligatoria i com a minim ha de tenir 10 caràcters'
        )
          .notEmpty()
          .isLength({ min: 10 }),
        body('preu', 'El preu és obligatori i com a mínim ha de ser 1')
          .notEmpty()
          .isNumeric()
          .custom((el) => el > 0),
        body(
          'quantitatDisponible',
          'La quantitat minima és requerida i com a minim ha de ser 1'
        )
          .notEmpty()
          .isNumeric()
          .custom((el) => el > 0),
        body('categoria', 'La categoria és requerida').notEmpty(),
      ];
      break;
    case 'crearEditarElement':
      return [
        sanitize(),
        body('categoria', 'La categoria és requerida').notEmpty(),
        body('aliment', "L'aliment és requerit")
          .notEmpty()
          .custom((v) => ObjectId.isValid(v)),
        body('data_compra', 'La data de compra és requerida').notEmpty(),
        body('data_caducitat', 'La data de caducitat és requerida').notEmpty(),
        body(
          'quantitat',
          'La quantitat és necessaria i cal que sigui 1 o major'
        )
          .notEmpty()
          .isNumeric()
          .custom((v) => v > 0),
        body('q_unitat').notEmpty(),
      ];
      break;
    case 'canviarContrasenya':
      return [
        sanitize(),
        body('oldC', "L'anterior contrasenya és requerida")
          .notEmpty()
          .isLength({ min: 8 }),
        body('newC', 'La nova contrasenya ha de tenir com a minim 8 caràcters')
          .notEmpty()
          .isLength({ min: 8 }),
        body(
          'rnewC',
          'La repetició de la contrasenya ha de ser igual que la nova contrasenya'
        )
          .notEmpty()
          .isLength({ min: 8 })
          .custom((value, { req }) => value === req.body.newC),
      ];
      break;
    case 'newComanda':
      return [
        sanitize(),
        body('establimentId', "La id de l'establiment és requerida")
          .notEmpty()
          .custom((v) => ObjectId.isValid(v)),
        body('oferta._id', 'La id de la oferta és requerida')
          .notEmpty()
          .custom((v) => ObjectId.isValid(v)),
        body('quantitat', 'La quantitat és requerida i ha de ser com a mínim 1')
          .notEmpty()
          .isNumeric()
          .custom((v) => v > 0),
        body(
          'total',
          "El total és requerit i ha de ser igual a la multiplicació de la quantitat pel preu de l'oferta"
        )
          .notEmpty()
          .isNumeric().custom(v=>v>0)
      ];

    case'newComentari':
    return[
      sanitize(),
      body("")
    ]
    break;
    default:
      return [sanitize()];
      break;
  }
};

const validate = (req, res, next) => {
  const err = validationResult(req);
  if (err.isEmpty()) return next();
  return res
    .status(400)
    .json({ message: 'Error de validació', errors: err.array() });
};

module.exports = { schemaV, validate };
