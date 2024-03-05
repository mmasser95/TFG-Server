const mongoose=require('mongoose');
const Schema=mongoose.Schema;

let rebostsSchema=Schema({
    nom: String,
    propietari: { type: Schema.Types.ObjectId, ref: 'User' },
    elements:[{type: Schema.Types.ObjectId, ref: 'Elements' }],
});

module.exports=mongoose.model('Rebosts', rebostsSchema);