const mongoose=require('mongoose');
const Schema=mongoose.Schema;

let ofertesSchema=Schema({
    establiment: { type: Schema.Types.ObjectId, ref: 'Establiments' },
    articles: [{ type: Schema.Types.ObjectId, ref: 'Articles' }],
    preu: Number,
    divisa:String,
});

module.exports=mongoose.model('Ofertes', ofertesSchema);