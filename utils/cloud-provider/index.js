const { AWS } = require("./aws");

const getCloudProvider = (provider) => {
    switch (provider) {
        case "AWS":
            return AWS;
        default:
            return null;
    }
};

module.exports = { getCloudProvider };