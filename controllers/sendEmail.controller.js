const httpStatus = require('http-status');

const { catchAsync } = require('../utils');
const { SendEmailServices } = require('../services');

const createData = catchAsync(async(req, res, next) => {
    const data = await SendEmailServices.createData(req.body, next);
    res.status(httpStatus.CREATED).json({
        status: "Success",
        message: "Created Successfully",
        data
    })
})

const getData = catchAsync(async(req, res, next) => {
    const data = await SendEmailServices.getData(req.params, next);
    res.status(httpStatus.FOUND).json({
        data
    })
})

const getAllData = catchAsync(async(req, res, next) => {
    const data = await SendEmailServices.getAllData(req.query, next);
    res.status(httpStatus.FOUND).json({
        data
    })
})

const updateData = catchAsync(async(req, res, next) => {
    const data = await SendEmailServices.updateData(req.body, req.params, next);
    res.status(httpStatus.OK).json({
        data
    })
})
const deleteData = catchAsync(async(req, res, next) => {
    const data = await SendEmailServices.deleteData(req.params, false, next);
    res.status(httpStatus.NO_CONTENT).json({
        data
    })
})

module.exports = { createData, getData, getAllData, updateData, deleteData }