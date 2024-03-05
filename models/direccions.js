const mongoose=require('mongoose');
const Schema=mongoose.Schema;

let direccioSchema=Schema({
	carrer: String,
    numero: Number,
    porta: String,
    escala: String,
    pis: String,
    CP: Number,
    poblacio: String,
    provincia:String,
});

module.exports=mongoose.model('Direcció', direccioSchema);