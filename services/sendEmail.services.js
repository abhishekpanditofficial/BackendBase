const { sendEmail } = require('../models/index');
const FactoryController = require('../controllers/factory.controller');

const createData = async(data, next) => {
    const doc = await FactoryController.createOne(sendEmail, data, true, next);
    return doc;
}

const getData = async(params, next) => {
    const doc = await FactoryController.getOne(sendEmail, params, null, true, next);
    return doc;
}

const getAllData = async(query, next) => {
    const allDocs = await FactoryController.getAll(sendEmail, query, false, next);
    return allDocs;
}

const updateData = async(updateData, params, next) => {
    const doc = await FactoryController.updateOne(sendEmail, params, updateData, true, next);
    return doc;
}
const deleteData = async(params, isUpdate, next) => {
    const doc = await FactoryController.deleteOne(sendEmail, params, isUpdate, true, next);
    return doc;
}

module.exports = { createData, getData, getAllData, updateData, deleteData }