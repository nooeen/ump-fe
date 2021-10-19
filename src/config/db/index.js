const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/uetstudentmanager', {});
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log(error);
        console.log('Connect failure!!!');
    }
}

module.exports = { connect };
