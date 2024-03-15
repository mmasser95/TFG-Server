const Ofertes = require('../models/ofertes.js');

async function getAllOfertes(req, res) {
    try {
        let ofertes = await Ofertes.find({});
        if (!ofertes) return res.status(404).send({ message: "No s'ha trobat cap oferta disponible" });
        return res.status(200).send({ ofertes });
    } catch (error) {
        return res.status(500).send({ message: `Ha sorgit l'error següent ${error}` });
    }
}

async function getOferta(req, res) {
    try {
        let oferta = await Ofertes.findOne({ _id: req.params.ofertaId });
        if (!oferta) return res.status(404).send({ message: "No s'ha trobat cap oferta disponible" });
        return res.status(200).send({ oferta });
    } catch (error) {
        return res.status(500).send({ message: `Ha sorgit l'error següent ${error}` });
    }
}

async function createOferta(req, res) {
    try {
        const oferta = new Ofertes({
            establiment: req.body.establiment,
            descripcio: req.body.descripcio,
            preu: req.body.preu,
            divisa: req.body.divisa,
        })
        const ofertaSaved = await oferta.save();
        return res.status(201).send({ ofertaSaved });
    } catch (error) {
        return res.status(500).send({ message: `Ha sorgit l'error següent ${error}` });
    }
}

async function updateOferta(req, res) {
    try {
        const oferta = await Ofertes.findOne({ _id: req.params.ofertaId });
        if (!oferta) return res.status(404).send({ message: "No s'ha trobat cap oferta disponible" });
        oferta.establiment = req.body.establiment;
        oferta.descripcio = req.body.descripcio;
        oferta.preu = req.body.preu;
        oferta.divisa = req.body.divisa;
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