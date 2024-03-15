const Elements=require('../models/elements');
const Rebosts=require('../models/rebosts');
async function getAllElements(req,res){
    try{
        const rebostId=req.params.rebostId;
        const rebost=await Rebosts.findOne({_id:rebostId});
        if (!rebost) return res.status(404).send({message:"No s'ha trobat cap rebost"});
        const elements=await Elements.find({_id:rebost.elements});
        if(!elements) return res.status(404).send({message:"No s'ha trobat cap element"});
        return res.status(200).send({elements});
    }catch(error){
        return res.status(500).send({message:`Ha sorgit l'error següent ${error}`});
    }
}

async function getElement(req,res){
    try{
        const elementId=req.params.elementId;
        const element=await Elements.findOne({_id:elementId});
        if (!element) return res.status(404).send({message:"No s'ha trobat cap element"});
        return res.status(200).send({element});
    }catch(error){
        return res.status(500).send({message:`Ha sorgit l'error següent ${error}`});
    }
}

async function createElement(req,res){
    try{
        let rebostId=req.body.rebostId;
        const rebost = await Rebosts.findOne({_id:rebostId});
        if (!rebost) return res.status(404).send({message:"No s'ha trobat cap rebost"});
        const element = new Elements({
            article:req.body.article,
            data_compra:req.body.data_compra,
            data_caducitat:req.body.data_caducitat
        });
        const elementSaved = await element.save();
        rebost.elements.push(elementSaved._id);
        const rebostSaved = await rebost.save();
        return res.status(200).send({elementSaved,rebostSaved});
    }catch(error){
        return res.status(500).send({message:`Ha sorgit l'error següent ${error}`});
    }
}

async function updateElement(req,res){
    try{
        const elementId=req.params.elementId;
        const element=await Elements.findOne({_id:elementId});
        if (!element) return res.status(404).send({message:"No s'ha trobat cap element"});
        element.article=req.body.article;
        element.data_compra=req.body.data_compra;
        element.data_caducitat=req.body.data_caducitat;
        const elementUpdated = await element.save();
        return res.status(200).send({elementUpdated});
    }catch(error){
        return res.status(500).send({message:`Ha sorgit l'error següent ${error}`});
    }
}

async function deleteElement(req,res){
    try{
        const elementId=req.params.elementId;
        const element=await Elements.findOneAndDelete({_id:elementId});
        if (!element) return res.status(404).send({message:"No s'ha trobat cap element"});
        const rebosts=await Rebosts.find({elements:element._id});
        for (rebost of rebosts) {
            rebost.elements.splice(rebost.elements.indexOf(element._id),1);
            await rebost.save();
        }
    }
    catch(error){
        return res.status(500).send({message:`Ha sorgit l'error següent ${error}`});
    }
}

module.exports={
    getAllElements,
    getElement,
    createElement,
    updateElement,
    deleteElement
}