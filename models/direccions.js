const mongoose=require('mongoose');
const Schema=mongoose.Schema;

let direccioSchema=Schema({
	carrer: String,
    numero: Number,
    CP: Number,
    poblacio: String,
    provincia:String,
    pais:String,
    data_creacio:{type:Date, default:Date.now},
    data_modificacio:{type:Date, default:Date.now},
});

module.exports=mongoose.model('Direcció', direccioSchema);