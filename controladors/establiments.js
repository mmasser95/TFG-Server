const parser=require('date-fns/parse')
const Establiments=require('../models/establiments');

async function getAllEstabliments(req,res){
    try {
        const establiments = await Establiments.find({});
        if (!establiments) return res.status(404).send({message:"No s'ha trobat cap establiment"});
        return res.status(200).send({establiments});
    } catch (error) {
        return res.status(500).send({message:`Ha sorgit l'error següent ${error}`});
    }
}

async function getEstabliment(req,res){
    try {
        const establiment = await Establiments.findOne({_id:req.params.id});
        if (!establiment) return res.status(404).send({message:"No s'ha trobat cap establiment"});
        return res.status(200).send({establiment});
    } catch (error) {
        return res.status(500).send({message:`Ha sorgit l'error següent ${error}`});
    }
}

async function createEstabliment(req,res){
    try {
        const establiment = new Establiments({
            nom:req.body.nom,
            correu:req.body.correu,
            contrasenya:req.body.contrasenya,
            descripcio:req.body.descripcio,
            tipus:req.body.tipus,
            horari:req.body.horari,
            telf:req.body.telf,
            web:req.body.web,
            direccio:req.body.direccio,
            latitude:req.body.latitude,
            longitude:req.body.longitude,
        });
        const establimentSaved = await establiment.save();
        return res.status(200).send({establimentSaved});
    } catch (error) {
        return res.status(500).send({message:`Ha sorgit l'error següent ${error}`});
    }
}

async function updateEstabliment(req,res){
    try {
        let userId=res.locals.payload.sub;
        const establiment=await Establiments.findOne({_id:req.params.id});
        if (!establiment) return res.status(404).send({message:"No s'ha trobat cap establiment"});
        establiment.nom=req.body.nom;
        establiment.correu=req.body.correu;
        establiment.descripcio=req.body.descripcio
        establiment.tipus=req.body.tipus;
        establiment.horari=req.body.horari;
        establiment.telf=req.body.telf;
        establiment.web=req.body.web;
        establiment.url_imatge_perfil=req.body.url_imatge_perfil;
        const establimentUpdated = await establiment.save();
        return res.status(200).send({establimentUpdated});
    }catch (error) {
        return res.status(500).send({message:`Ha sorgit l'error següent ${error}`});
    }
}

async function deleteEstabliment(req,res){
    try {
        let userId=res.locals.payload.sub;
        const establiment=await Establiments.findOneAndDelete({_id:req.params.id});
        if (!establiment) return res.status(404).send({message:"No s'ha trobat cap establiment"});
        
        return res.status(200).send({establimentDeleted:establiment});
    }catch (error) {
        return res.status(500).send({message:`Ha sorgit l'error següent ${error}`});
    }
}

module.exports={
    getAllEstabliments,
    getEstabliment,
    createEstabliment,
    updateEstabliment,
    deleteEstabliment
}