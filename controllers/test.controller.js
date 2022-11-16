const httpStatus = require('http-status');

const { catchAsync } = require('../utils');
const { TestServices } = require('../services');


const createData = catchAsync(async(req, res, next) => {
        const doc = await TestServices.createData(req.body, next);
        res.status(httpStatus.CREATED).json({
            status: "Success",
            message: "Created Successfully",
            doc
        })
})


const getData = catchAsync(async(req, res, next) => {
    const data = await TestServices.getData({ _id: req.params.id }, next);
    if (data) {
        res.status(httpStatus.FOUND).json({
            data
        })
    }
})

const getAllData = catchAsync(async(req, res, next) => {
    const data = await TestServices.getAllData(req.query, next);
    res.status(httpStatus.FOUND).json({
        data
    })
})

const updateData = catchAsync(async(req, res, next) => {
    const data = await TestServices.updateData(req.body, req.params, next);
    res.status(httpStatus.OK).json({
        data
    })
})
const deleteData = catchAsync(async(req, res, next) => {
    const data = await TestServices.deleteData(req.params, false, next);
    res.status(httpStatus.NO_CONTENT).json({
        data
    })
})

module.exports = { createData, getData, getAllData, updateData, deleteData }