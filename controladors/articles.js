const Articles=require('../models/articles');

async function getAllArticles(req,res){
    try {
        const articles = await Articles.find({});
        if (!articles) return res.status(404).send({message:"No s'ha trobat cap article"});
        return res.status(200).send({articles});
    } catch (error) {
        return res.status(500).send({error});
    }
}

async function getArticle(req,res){
    try {
        const article = await Articles.findOne({_id:req.params.id});
        if (!article) return res.status(404).send({message:"No s'ha trobat l'article"});
        return res.status(200).send({article});
    } catch (error) {
        return res.status(500).send({message:`Ha sorgit l'error següent ${error}`});
    }
}

async function createArticle(req,res){
    try {
        const article = new Articles({
            nom:req.body.nom,
            tipus:req.body.tipus,
            temps_defecte_conservació:req.body.temps_defecte_conservació
        });
        const articleSaved = await article.save();
        return res.status(201).send({articleSaved});
    } catch (error) {
        return res.status(500).send({message:`Ha sorgit l'error següent ${error}`});
    }
}

async function updateArticle(req,res){
    try{
        const article = await Articles.findOne({_id:req.params.id});
        if (!article) return res.status(404).send({message:"No s'ha trobat l'article"});
        article.nom=req.body.nom;
        article.tipus=req.body.tipus;
        article.temps_defecte_conservació=req.body.temps_defecte_conservació;
        const articleUpdated = await article.save();
        return res.status(200).send({articleUpdated});
    }catch(error){
        return res.status(500).send({message:`Ha sorgit l'error següent ${error}`});
    }
}

async function deleteArticle(req,res){
    try{
        const article = await Articles.findOneAndDelete({_id:req.params.id});
        if (!article) return res.status(404).send({message:"No s'ha trobat l'article"});
        return res.status(200).send({articleDeleted:article});
    }catch(error){
        return res.status(500).send({message:`Ha sorgit l'error següent ${error}`});
    }
}

module.exports={
    getAllArticles,
    getArticle,
    createArticle,
    updateArticle,
    deleteArticle
}