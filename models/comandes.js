const mongoose=require('mongoose');
const Schema=mongoose.Schema;


let comandesSchema=Schema({
<<<<<<< HEAD
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    ofertaId: [{ type: Schema.Types.ObjectId, ref: 'Ofertes' }],
    quantitat:Number,
    total: Number,
    data: { type: Date, default: Date.now },
=======
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    oferta: { type: Schema.Types.ObjectId, ref: 'Ofertes', required: true},
    data: { type: Date, default: Date.now },
    pagat: Boolean,
>>>>>>> d4d839f3a3086caaf00dc03915903307889af1c7
});

module.exports=mongoose.model('Comandes', comandesSchema);