const mongoose=require('mongoose');
const Schema=mongoose.Schema;


let comandesSchema=Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    oferta: { type: Schema.Types.ObjectId, ref: 'Ofertes', required: true},
    data: { type: Date, default: Date.now },
    pagat: Boolean,
});

module.exports=mongoose.model('Comandes', comandesSchema);