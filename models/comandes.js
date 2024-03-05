const mongoose=require('mongoose');
const Schema=mongoose.Schema;


let comandesSchema=Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    ofertes: [{ type: Schema.Types.ObjectId, ref: 'Ofertes' }],
    total: Number,
    data: { type: Date, default: Date.now },
    pagat: Boolean,
    dataPagament: Date,
});

module.exports=mongoose.model('Comandes', comandesSchema);