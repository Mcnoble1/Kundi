const mongoose = require('mongoose');
require('dotenv').config();
const logger = require('./logger/logger');

const DB_URL = process.env.DB_URL;

function connectToMongoDB() {
    mongoose.connect(DB_URL);

    mongoose.connection.on('connected', () => {
        logger.info('Connected to MongoDB successfully');
    });

    mongoose.connection.on('error', (err) => {
        logger.error(err.message);
    })
}

module.exports = {connectToMongoDB}