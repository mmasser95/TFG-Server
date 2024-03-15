const Rebosts=require('../models/rebosts');

async function getAllRebosts(req,res){
    try {
        let userId=res.locals.payload.sub;
        const rebosts = await Rebosts.find({propietari:userId});
        if (!rebosts) return res.status(404).send({message:"No s'ha trobat cap rebost"});
        return res.status(200).send({rebosts});
    } catch (error) {
        return res.status(500).send({message:`Ha sorgit l'error següent ${error}`});
    }
}

async function getRebost(req,res){
    try {
        let userId=res.locals.payload.sub;
        const rebost = await Rebosts.findOne({propietari:userId,_id:req.params.id});
        if (!rebost) return res.status(404).send({message:"No s'ha trobat cap rebost"});
        return res.status(200).send({rebost});
    } catch (error) {
        return res.status(500).send({message:`Ha sorgit l'error següent ${error}`});
    }
}

async function createRebost(req,res){
    try {
        let userId=res.locals.payload.sub;
        const rebost = new Rebosts({
            nom:req.body.nom,
            propietari:userId
        });
        const rebostSaved = await rebost.save();
        return res.status(200).send({rebostSaved});
    } catch (error) {
        return res.status(500).send({message:`Ha sorgit l'error següent ${error}`});
    }
}


async function updateRebost(req,res){
    try {
        let userId=res.locals.payload.sub;
        const rebost = await Rebosts.findOne({propietari:userId,_id:req.params.id});
        if (!rebost) return res.status(404).send({message:"No s'ha trobat cap rebost"});
        rebost.nom=req.body.nom;
        rebost.elements=req.body.elements;
        const rebostUpdated = await rebost.save();
        return res.status(200).send({rebostUpdated});
    } catch (error) {
        return res.status(500).send({message:`Ha sorgit l'error següent ${error}`});
    }
}

async function deleteRebost(req,res){
    try {
        let userId=res.locals.payload.sub;
        const rebostDeleted = await Rebosts.findOneAndDelete({propietari:userId,_id:req.params.id});
        if (!rebostDeleted) return res.status(404).send({message:"No s'ha trobat cap rebost"});
        //const rebostDeleted = await rebost.remove();
        return res.status(200).send({rebostDeleted});
    } catch (error) {
        return res.status(500).send({message:`Ha sorgit l'error següent ${error}`});
    }
}

module.exports={
    getAllRebosts,
    getRebost,
    createRebost,
    updateRebost,
    deleteRebost
}