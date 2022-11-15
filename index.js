const express = require('express')
const dotenv = require('dotenv')

dotenv.config({ path: './config.env' });

const app = express();
const morgan = require('morgan')
const basicRouter = require('./routes/test.route')
const helmet = require('helmet')
const config = require('./config/index')
const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')
const httpStatus = require('http-status');
const { errorMiddleware } = require('./middleware')
const { AppError } = require('./utils');
const mongoose = require('mongoose')
const logger = require('./logger/defaultLogger')


// Set security HTTP headers
app.use(helmet())

// Development logging
if (config.environment === 'development') {
    app.use(morgan('dev'));
}
// Limit requests from same API
/*const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000000,
    message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);*/

// Body parser, reading data from body into req.body
app.use(
    express.json({
        limit: "100mb", // limit the size of the incoming data
        extended: true, // allow to parse nested objects
        parameterLimit: 100000, // limit the number of parameters
    })
);

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS



// Prevent parameter pollution
app.use(
    hpp({
        whitelist: [
            'duration',
            'email',
            'name',
            'difficulty'
        ]
    })
);


const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "News App",
            version: "2.0.0",
            description: "This is a test desc."
        },
        servers: [{
            url: "http://localhost:3700"
        }, ]
    },

    apis: ["./routes/*.js"]
};

const specs = swaggerJsdoc(options)

app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs))

//Routes

app.use('/api/v1', basicRouter)




mongoose.connect(config.mongoDB.mongoDBUri, config.mongoDB.mongoDBOptions, () => {
    console.log("Connected to MongoDB 📌...");
});


const port = config.server.port || 3000;
app.listen(port, () => {
    if (config.environment === 'development') {
        logger.info(`App running on port ${port} & running on ${config.environment}`);
    }

});



app.all('*', (req, res, next) => {
    next(new AppError(httpStatus.NOT_FOUND, `Can't find ${req.originalUrl} on this server!`))
})

// Convert error to AppError, as required
app.use(errorMiddleware.errorConverter);

// Handle errors
app.use(errorMiddleware.errorHandler);


module.exports = app