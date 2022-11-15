const { TestModel } = require('../models');
const { FactoryController } = require('../controllers');

const createData = async(data, next) => {
    const doc = await FactoryController.createOne(TestModel, data, true, next);
    return doc;
}

const getData = async(params, next) => {
    const doc = await FactoryController.getOne(TestModel, params, null, true, next);
    return doc;
}

const getAllData = async(query, next) => {
    const allDocs = await FactoryController.getAll(TestModel, query, false, next);
    return allDocs;
}

const updateData = async(updateData, params, next) => {
    const doc = await FactoryController.updateOne(TestModel, params, updateData, true, next);
    return doc;
}
const deleteData = async(params, isUpdate, next) => {
    const doc = await FactoryController.deleteOne(TestModel, params, isUpdate, true, next);
    return doc;
}

module.exports = { createData, getData, getAllData, updateData, deleteData }