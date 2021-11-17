const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://admin:adminuet@maincluster.i7dlu.mongodb.net/test', {});
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
        console.log('MongoDB failed to connect');
    }
}

module.exports = { connect };