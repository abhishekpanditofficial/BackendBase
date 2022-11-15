const httpStatus = require('http-status');
const { AppError } = require('../utils');
const APIFeatures = require('../utils/apiFeatures');
const { MongooseErrorHandler } = require("../utils/error-handlers");

const getAll = async(Model, query, error = true, next) => {
    try {
        const features = new APIFeatures(Model.find(), query)
            .filter()
            .sort()
            .limitFields()
            .paginate();
        const doc = await features.query;
        if (!doc && error) throw new AppError(httpStatus.NOT_FOUND, "No document found with that config");
        return doc;
    } catch (error) {
        MongooseErrorHandler(error, next);
    }
}
const findAll = async(Model, options, queryOptions, error = true, next) => {
    try {
        let query = Model.find(options);
        if (queryOptions) {
            if (queryOptions.select) query = query.select(queryOptions.select);
        }
        const docs = await query;
        if (!docs && error) throw new AppError(httpStatus.NOT_FOUND, "No document found with that config");
        return docs;
    } catch (error) {
        MongooseErrorHandler(error, next);
    }
};

const getOne = async(Model, options, queryOptions, error = true, next) => {
    try {
        let query = Model.findOne(options);
        if (queryOptions) {
            if (queryOptions.populate) query = query.populate();
            if (queryOptions.select) query = query.select(queryOptions.select);
        }
        const doc = await query;
        if (!doc && error) throw new AppError(httpStatus.NOT_FOUND, "No document found with that config");
        if (!doc && !error) return false;
        return doc;
    } catch (error) {
        MongooseErrorHandler(error, next);
    }
}

const createOne = async(Model, data, error = true, next) => {
    try {
        const doc = await Model.create(data);
        if (!doc && error) throw new AppError(httpStatus.BAD_REQUEST, "Document cant't be created");
        return doc;
    } catch (error) {
        MongooseErrorHandler(error, next);
    }
}

const updateOne = async(Model, params, data, error = true, next) => {
    try {
        const doc = await getOne(Model, params, null, true, next);
        const updateDoc = await Model.findByIdAndUpdate(doc._id, data, { runValidators: true, new: true });
        if (!updateDoc && error) throw new AppError(httpStatus.BAD_REQUEST, "Document can't be updated");
        return updateDoc;
    } catch (error) {
        MongooseErrorHandler(error, next);
    }
}

const deleteOne = async(Model, params, isUpdate, error = true, next) => {
    try {
        if (isUpdate) {
            const updateDoc = await updateOne(Model, params, data, true, next);
            return updateDoc;
        } else {
            const doc = await getOne(Model, params, null, true, next);
            const deleteDoc = await Model.findByIdAndDelete(doc._id);
            if (!deleteDoc && error) throw new AppError(httpStatus.BAD_REQUEST, "Document can't be deleted");
            return deleteDoc;
        }
    } catch (error) {
        MongooseErrorHandler(error, next);
    }
}

const deleteMany = async(Model, options, error = true, next) => {
    try {
        const deleteDocuments = await Model.deleteMany(options);
        if (!deleteDocuments && error) throw new AppError(httpStatus.BAD_REQUEST, "Document can't be deleted");
        return deleteDocuments;
    } catch (error) {
        MongooseErrorHandler(error, next);
    }
};

module.exports = { getAll, getOne, createOne, updateOne, deleteOne, findAll, deleteMany };