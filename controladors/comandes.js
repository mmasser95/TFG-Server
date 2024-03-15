const Comandes=require('../models/comandes.js');

async function getAllComandes(req,res){
    try {
        let userId=res.locals.payload.sub;
        const comandes = await Comandes.find({user:userId});
        if (!comandes) return res.status(404).send({message:"No s'ha trobat cap comanda"});
        return res.status(200).send({comandes});
    } catch (error) {
        return res.status(500).send({message:`Ha sorgit l'error següent ${error}`});
    }
}

async function getComanda(req,res){
    try {
        const comandaId=req.params.comandaId;
        let userId=res.locals.payload.sub;
        const comanda=await Comandes.findOne({_id:comandaId,user:userId});
        if (!comanda) return res.status(404).send({message:"No s'ha trobat cap comanda"});
        return res.status(200).send({comanda});
    } catch (error) {
        return res.status(500).send({message:`Ha sorgit l'error següent ${error}`});
    }
}

async function createComanda(req,res){
    try {
        let userId=res.locals.payload.sub;
        const comanda=new Comandes({
            user:userId,
            ofertes:req.body.ofertes,
            total:req.body.total,
            data:req.body.data,
            pagat:req.body.pagat,
            dataPagament:req.body.dataPagament,
        });
        const comandaSaved = await comanda.save();
        return res.status(201).send({comandaSaved});
    } catch (error) {
        return res.status(500).send({message:`Ha sorgit l'error següent ${error}`});
    }
}

async function updateComanda(req,res){
    try {
        let userId=res.locals.payload.sub;
        const comanda=await Comandes.findOne({_id:req.params.comandaId,user:userId});
        if (!comanda) return res.status(404).send({message:"No s'ha trobat cap comanda"});
        comanda.ofertes=req.body.ofertes;
        comanda.total=req.body.total;
        comanda.data=req.body.data;
        comanda.pagat=req.body.pagat;
        comanda.dataPagament=req.body.dataPagament;
        const comandaUpdated = await comanda.save();
        return res.status(200).send({comandaUpdated});
    } catch (error) {
        return res.status(500).send({message:`Ha sorgit l'error següent ${error}`});
    }
}

async function deleteComanda(req,res){
    try {
        let userId=res.locals.payload.sub;
        const comanda=await Comandes.findOne({_id:req.params.comandaId,user:userId});
        if (!comanda) return res.status(404).send({message:"No s'ha trobat cap comanda"});
        const comandaDeleted = await comanda.remove();
        return res.status(200).send({comandaDeleted});
    } catch (error) {
        return res.status(500).send({message:`Ha sorgit l'error següent ${error}`});
    }
}
module.exports={
    getAllComandes,
    getComanda,
    createComanda,
    updateComanda,
    deleteComanda
}