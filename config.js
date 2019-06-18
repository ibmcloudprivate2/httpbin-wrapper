// const result = require('dotenv').config();

// if (result.error) {
//     throw result.error;
// }

// console.log(result.parsed);

module.exports = {
    CONTAINER_PORT: process.env.CONTAINER_PORT,
    TARGET_URI: process.env.TARGET_URI,
    TARGET_URL: process.env.TARGET_URL
};