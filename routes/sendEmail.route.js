const express = require('express')
const { getAllData, getData, createData, updateData, deleteData } = require('./../controllers/sendEmail.controller');
const router = express.Router();
/**
 * @swagger
 * components:
 *  Schemas:
 *    EMAIL:
 *      type: object
 *      required:
 *        - sendedToMail
 *        - date
 *        - type
 *        - status
 *      properties:
 *         id:
 *           type: string
 *           description: the auto generated id of the data
 *         sendedToMail:
 *           type: string
 *           description: email id of the user where the email was send
 *         date:
 *           type: string
 *           format : date
 *           description : creation date
 *         type :
 *           type : string
 *           description : email type
 *         status :
 *           type : string
 *           enum : ["SUCCESS","FAIL"]
 *           description : status of the email
 */
/**
 * @swagger
 * tags:
 *   name: EMAIL
 *   description: Test Api
 */

/**
 * @swagger
 * /api/v1/sendEmail:
 *   get:
 *     summary: returns all data
 *     tags: [EMAIL]
 *     responses:
 *       200:
 *         description: The list of all data
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/Schemas/EMAIL'
 */

/**
 * @swagger
 * /api/v1/sendEmail:
 *  post:
 *   summary: Create a new data
 *   tags: [EMAIL]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/Schemas/EMAIL'
 *   responses:
 *     200:
 *       description: successfully created
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/Schemas/EMAIL'
 *     500:
 *       description: some server error
 * 
 */
router
    .route('/sendEmail')
    .get(getAllData)
    .post(createData)

 /**
     * @swagger
     * /api/v1/sendEmail/{id}:
     *  get:
     *    summary: Get one specific data by id
     *    tags: [EMAIL]
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
     *              $ref: '#/components/Schemas/EMAIL'
     *      404:
     *        description: the data is not found
     * 
     */
    /**
     * @swagger
     * /api/v1/sendEmail/{id}:
     *  patch:
     *    summary: Update data
     *    tags: [EMAIL]
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
     *            $ref: '#/components/Schemas/EMAIL'
     *    responses:
     *      200:
     *        description: Data updated 
     *        content: 
     *          application/json:
     *            schema:
     *              $ref: '#/components/Schemas/EMAIL'
     *      404:
     *        description: Data is not found
     */

/**
 * @swagger
 * /api/v1/sendEmail/{id}:
 *  delete:
 *   summary: delete a data
 *   tags: [EMAIL]
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
 *             $ref: '#/components/Schemas/EMAIL'
 *     404:
 *       description: the book was not found
 * 
 */

router
    .route('/sendEmail/:id')
    .patch(updateData)
    .delete(deleteData)
    .get(getData)

module.exports = router