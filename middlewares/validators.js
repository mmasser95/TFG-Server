const { body, validationResult } = require('express-validator');

const schemaV = (method) => {
  switch (method) {
    case 'login':
      return [
        body('correu', 'Correu invàlid')
          .trim()
          .toLowerCase()
          .normalizeEmail()
          .isEmail(),
        body('contrasenya', 'Contrasenya invàlida')
          .trim()
          .exists()
          .isLength({ min: 8 }),
      ];
      break;
    case 'registreEstabliment':
      return [
        body('correu', 'Correu invàlid')
          .trim()
          .toLowerCase()
          .normalizeEmail()
          .isEmail(),
        body('contrasenya', 'Contrasenya invàlida')
          .trim()
          .exists()
          .isLength({ min: 8 }),
        body('nom', 'El nom es requerit').trim().notEmpty(),
        body('descripcio', 'La descripció es requerida')
          .trim()
          .isLength({ min: 10 }),
        body('tipus', 'El tipus es requerit').trim().notEmpty(),
        body('telf', 'El telf. es requerit').trim().notEmpty().isNumeric(),
        body('direccio.carrer', 'El carrer de la direcció es obligatori')
          .trim()
          .notEmpty(),
        body('direccio.numero', 'El numero de la direcció es obligatori')
          .trim()
          .notEmpty()
          .isNumeric(),
        body('direccio.CP', 'El codi postal es necessari')
          .trim()
          .notEmpty()
          .isNumeric(),
        body('direccio.poblacio', 'La població de la direcció es obligatoria')
          .trim()
          .notEmpty(),
        body('direccio.provincia', 'La provincia de la direcció es obligatoria')
          .trim()
          .notEmpty(),
      ];
      break;
    case 'registreClient':
      return [
        body('nom', 'El nom es obligatori').trim().notEmpty(),
        body('correu', 'Correu invàlid')
          .trim()
          .toLowerCase()
          .normalizeEmail()
          .isEmail(),
        body('contrasenya', 'Contrasenya invàlida')
          .trim()
          .exists()
          .isLength({ min: 8 }),
        body('telf', 'El telf. es requerit').trim().notEmpty().isNumeric(),
        body('data_naixement').trim().notEmpty(),
      ];
      break;
    default:
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
