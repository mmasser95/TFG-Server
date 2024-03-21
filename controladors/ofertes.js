const Ofertes = require('../models/ofertes.js');
const parse=require('date-fns/parse').parse;
async function getAllOfertes(req, res) {
    try {
        let establimentId=res.locals.payload.sub;
        let ofertes = await Ofertes.find({establiment:establimentId});
        if (!ofertes) return res.status(404).send({ message: "No s'ha trobat cap oferta disponible" });
        return res.status(200).send({ ofertes });
    } catch (error) {
        return res.status(500).send({ message: `Ha sorgit l'error següent ${error}` });
    }
}

async function getOferta(req, res) {
    try {
        let establimentId=res.locals.payload.sub;
        let oferta = await Ofertes.findOne({establiment:establimentId ,_id: req.params.ofertaId });
        if (!oferta) return res.status(404).send({ message: "No s'ha trobat cap oferta disponible" });
        return res.status(200).send({ oferta });
    } catch (error) {
        return res.status(500).send({ message: `Ha sorgit l'error següent ${error}` });
    }
}

async function createOferta(req, res) {
    try{
        var data_inici=parse(req.body.data_inici, 'dd/MM/yyyy', new Date());
        var data_final=parse(req.body.data_final, 'dd/MM/yyyy', new Date());
    }catch(err){
        return res.status(400).send({message: `Ha sorgit un error formatant la data`});
    }
    try {
        const oferta = new Ofertes({
            establiment: res.locals.payload.sub,
            nom:req.body.nom,
            preu: req.body.preu,
            descripcio: req.body.descripcio,
            quantitat_disponible:req.body.quantitat_disponible,
            active: req.body.active,
            url_image:req.body.url_image,
            categoria: req.body.categoria,
            data_inici: data_inici,
            data_final: data_final,
        })
        const ofertaSaved = await oferta.save();
        return res.status(201).send({ ofertaSaved });
    } catch (error) {
        return res.status(500).send({ message: `Ha sorgit l'error següent ${error}` });
    }
}

async function updateOferta(req, res) {
    try{
        var data_inici=parse(req.body.data_inici, 'dd/MM/yyyy', new Date());
        var data_final=parse(req.body.data_final, 'dd/MM/yyyy', new Date());
    }catch(err){
        return res.status(400).send({message: `Ha sorgit un error formatant la data`});
    }
    try {
        const oferta = await Ofertes.findOne({ _id: req.params.ofertaId });
        if (!oferta) return res.status(404).send({ message: "No s'ha trobat cap oferta disponible" });
        oferta.establiment = req.body.establiment;
        oferta.nom=req.body.nom;
        oferta.preu = req.body.preu;
        oferta.descripcio = req.body.descripcio;
        oferta.quantitat_disponible=req.body.quantitat_disponible;
        oferta.active =req.body.active;
        oferta.url_image=req.body.url_image;
        oferta.categoria=req.body.categoria;
        oferta.data_inici=data_inici;
        oferta.data_final=data_final;
        const ofertaUpdated = await oferta.save();
        return res.status(200).send({ ofertaUpdated });
    } catch (error) {
        return res.status(500).send({ message: `Ha sorgit l'error següent ${error}` });
    }
}

async function deleteOferta(req, res) {
    try {
        const oferta = await Ofertes.findOneAndDelete({ _id: req.params.ofertaId });
        if (!oferta) return res.status(404).send({ message: "No s'ha trobat cap oferta disponible" });
        return res.status(200).send({ ofertaDeleted: oferta });
    } catch (error) {
        return res.status(500).send({ message: `Ha sorgit l'error següent ${error}` });
    }
}

module.exports = {
    getAllOfertes,
    getOferta,
    createOferta,
    updateOferta,
    deleteOferta
}