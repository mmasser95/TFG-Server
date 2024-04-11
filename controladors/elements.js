// const Elements=require('../models/elements');
// const rebosts = require('../models/rebosts');
// const Rebosts=require('../models/rebosts');
async function getAllElements(req, res) {
  try {
    const rebostId = req.params.rebostId;
    const rebost = [];
    if (!rebost)
      return res.status(404).send({ message: "No s'ha trobat cap element" });
    const elements = rebost.elements;
    if (!elements)
      return res.status(404).send({ message: "No s'ha trobat cap element" });
    return res.status(200).send({ elements });
  } catch (error) {
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${error}` });
  }
}

async function getElement(req, res) {
  try {
    const rebostId = req.params.rebostId;
    const rebost = []; //await
    if (!rebost)
      return res.status(404).send({ message: "No s'ha trobat cap element" });
    const elementId = req.params.elementId;
    const element = []; //await rebost.elements.id(elementId);
    if (!element)
      return res.status(404).send({ message: "No s'ha trobat cap element" });
    return res.status(200).send({ element });
  } catch (error) {
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${error}` });
  }
}

async function createElement(req, res) {
  try {
    let rebostId = req.params.rebostId;
    const rebost = []; //await Rebosts.findOne({_id:rebostId});
    if (!rebost)
      return res.status(404).send({ message: "No s'ha trobat cap rebost" });
    const element = {
      article: req.body.article,
      data_compra: req.body.data_compra,
      data_caducitat: req.body.data_caducitat,
    };
    rebost.elements.push(element);
    const rebostSaved = await rebost.save();
    return res.status(200).send({ elementSaved, rebostSaved });
  } catch (error) {
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${error}` });
  }
}

async function updateElement(req, res) {
  try {
    const rebostId = req.params.rebostId;
    // const rebost= await Rebosts.findOne({_id: rebostId});
    // if(!rebost) return res.status(404).send({message:`No s'ha trobat cap rebost`});
    const elementId = req.params.elementId;
    // const element=rebost.elements.id(elementId);
    // if (!element) return res.status(404).send({message:"No s'ha trobat cap element"});
    // element.article=req.body.article;
    // element.data_compra=req.body.data_compra;
    // element.data_caducitat=req.body.data_caducitat;
    // rebost.elements.id(elementId).deleteOne();
    // rebost.elements.push(element);
    // return res.status(200).send({elementUpdated});
    // Rebosts.findOneAndUpdate({
    //     '_id':rebostId,
    //     'elements._id':elementId
    // },{
    //     '$set':{
    //         "elements.$.article":req.body.article,
    //         "elements.$.data_compra":req.body.data_compra,
    //         "elements.$.data_caducitat":req.body.data_caducitat,
    //     }
    // },(err,elementUpdated)=>{
    //     if(err) return res.status(500).send({message:`Ha sorgit l'error següent ${error}`})
    //     if(!elementUpdated) return res.status(404).send({message:"No s'ha trobat l'element"});
    //     return res.status(200).send({elementUpdated})
    // })
    return res.status(301).send({ message: 'Not implemented' });
  } catch (error) {
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${error}` });
  }
}

async function deleteElement(req, res) {
  try {
    // const rebostId = req.params.rebostId;
    // const rebost = await Rebosts.findOne({ _id: rebostId });
    // if (!rebost)
    //   return res.status(404).send({ message: "No s'ha trobat cap element" });
    // const elementId = req.params.elementId;
    // const element = await rebost.elements.id(elementId);
    // if (!element)
    //   return res.status(404).send({ message: "No s'ha trobat cap element" });
    // element.deleteOne();
    // await rebost.save();
    return res.status(301).send({ message: 'Not implemented' });
  } catch (error) {
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${error}` });
  }
}

module.exports = {
  getAllElements,
  getElement,
  createElement,
  updateElement,
  deleteElement,
};
