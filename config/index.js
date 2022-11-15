module.exports = {
    //environment
    environment: process.env.NODE_ENV,
    //Nodemailer

    emailPassword: process.env.EMAIL_PASSWORD,
    emailUser: process.env.EMAIL_USERNAME,
    emailHost: process.env.EMAIL_HOST,
    emailPort: process.env.EMAIL_PORT,

    //server port configuration
    server: {
        port: process.env.PORT
    },
    //mongodb configuration

    mongoDB: {
        mongoDBUri: process.env.MONGO_HOST + "/" + (process.env.MONGO_DB_NAME || "development"),
        mongoDBOptions: { useNewUrlParser: true, useUnifiedTopology: true }
    },

    aws: {
        accessKeyId: process.env.aws_access_key,
        secretAccessKey: process.env.aws_secret_key,
        region: process.env.aws_region || "ap-south-1",
    }
}