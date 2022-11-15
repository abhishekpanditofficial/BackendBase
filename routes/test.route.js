const express = require('express')
const multer = require("multer")
const { getAllData, getData, createData, updateData, deleteData } = require('./../controllers/test.controller');
const router = express.Router();
/**
 * @swagger
 * components:
 *  Schemas:
 *    TEST:
 *      type: object
 *      required:
 *        - name
 *        - email
 *      properties:
 *         id:
 *           type: string
 *           description: the auto generated id of the data
 *         name:
 *           type: string
 *           description: name of the data
 *         email:
 *           type: string
 *           description : email address 
 */
/**
 * @swagger
 * tags:
 *   name: TEST
 *   description: Test Api
 */

/**
 * @swagger
 * /api/v1/test:
 *   get:
 *     summary: returns all data
 *     tags: [TEST]
 *     responses:
 *       200:
 *         description: The list of all data
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/Schemas/TEST'
 */

/**
 * @swagger
 * /api/v1/test:
 *  post:
 *   summary: Create a new data
 *   tags: [TEST]
 *   requestBody:
 *      content:
 *         multipart/form-data:
 *            schema:
 *                type: object
 *                properties:
 *                 filePath:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 file:
 *                   type: string
 *                   required: true
 *                   format: binary
 *   responses:
 *     200:
 *       description: successfully created
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/Schemas/TEST'
 *     500:
 *       description: some server error
 * 
 */

router
    .route('/test')
    .get(getAllData)
    .post(multer({ storage: multer.memoryStorage() }).single("file"), createData)
    /**
     * @swagger
     * /api/v1/test/{id}:
     *  get:
     *    summary: Get one specific data by id
     *    tags: [TEST]
     *    parameters:
     *      - in: path
     *        name: id
     *        schema:
     *          type: string
     *        required: true
     *    description: the Data id
     *    responses:
     *      200:
     *        description: The data description by id
     *        content: 
     *          application/json:
     *            schema:
     *              $ref: '#/components/Schemas/TEST'
     *      404:
     *        description: the data is not found
     * 
     */
    /**
     * @swagger
     * /api/v1/test/{id}:
     *  patch:
     *    summary: Update data
     *    tags: [TEST]
     *    parameters:
     *      - in: path
     *        name: id
     *        schema:
     *          type: string
     *        required: true
     *    description: id of data
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/Schemas/TEST'
     *    responses:
     *      200:
     *        description: Data updated 
     *        content: 
     *          application/json:
     *            schema:
     *              $ref: '#/components/Schemas/TEST'
     *      404:
     *        description: Data is not found
     */

/**
 * @swagger
 * /api/v1/test/{id}:
 *  delete:
 *   summary: delete a data
 *   tags: [TEST]
 *   parameters: 
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: id of the book
 * 
 *   responses:
 *     204:
 *       description: successfully deleted.No content
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/Schemas/TEST'
 *     404:
 *       description: the book was not found
 * 
 */

router
    .route('/test/:id')
    .patch(updateData)
    .delete(deleteData)
    .get(getData)


module.exports = router;