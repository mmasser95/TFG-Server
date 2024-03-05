const mongoose=require('mongoose');
const Schema=mongoose.Schema;

let elementsSchema=Schema({
    article: { type: Schema.Types.ObjectId, ref: 'Articles' },
    data_compra:Date,
    data_caducitat:Date,
});

module.exports=mongoose.model('Elements', elementsSchema);
