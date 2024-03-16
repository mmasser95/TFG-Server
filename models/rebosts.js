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
    elements:[elementsSchema],
});

module.exports=mongoose.model('Rebosts', rebostsSchema);