const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const permisosSchema=Schema({
    usuariId:{type: Schema.Types.ObjectId, required: true},
    rebostId:{type: Schema.Types.ObjectId, required: true},
    creador:Boolean,
    modificar:Boolean,
    veure:Boolean,
    data_creacio:{type:Date, default: Date.now},
    data_modificacio:{type:Date, default:Date.now},
})