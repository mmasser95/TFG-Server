const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const preferitsSchema = Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  establimentId: {
    type: Schema.Types.ObjectId,
    ref: 'Establiment',
    required: true,
  },
});

module.exports = mongoose.model('Preferits', preferitsSchema);
