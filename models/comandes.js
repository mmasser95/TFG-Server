const mongoose=require('mongoose');
const Schema=mongoose.Schema;


let comandesSchema=Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    ofertaId: [{ type: Schema.Types.ObjectId, ref: 'Ofertes' }],
    quantitat:Number,
    total: Number,
    data: { type: Date, default: Date.now },
});

module.exports=mongoose.model('Comandes', comandesSchema);