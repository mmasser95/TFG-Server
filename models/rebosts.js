const mongoose=require('mongoose');
const Schema=mongoose.Schema;

let elementsSchema=Schema({
    article: { type: Schema.Types.ObjectId, ref: 'Articles' },
    data_compra:Date,
    data_caducitat:Date,
});

let rebostsSchema=Schema({
    nom: String,
    propietari: { type: Schema.Types.ObjectId, ref: 'User' },
    descripcio:String,
    elements:[elementsSchema],
    data_creacio:{type:Date, default:Date.now},
    data_modificacio:{type:Date, default:Date.now},
});

module.exports=mongoose.model('Rebosts', rebostsSchema);