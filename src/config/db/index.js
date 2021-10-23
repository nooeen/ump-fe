const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://admin:adminuet@maincluster.i7dlu.mongodb.net/uet-db?retryWrites=true&w=majority', {});
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log(error);
        console.log('Connect failure!!!');
    }
}

module.exports = { connect };
