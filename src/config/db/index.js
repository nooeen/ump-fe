const mongoose = require('mongoose');
//mongodb+srv://admin:adminuet@maincluster.i7dlu.mongodb.net/nestjs-course
//mongodb://localhost:27017/uetstudentmanager\
//mongodb://127.0.0.1:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false
async function connect() {
    try {
        await mongoose.connect('mongodb+srv://admin:adminuet@maincluster.i7dlu.mongodb.net/nestjs-course', {});
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log(error);
        console.log('Connect failure!!!');
    }
}

module.exports = { connect };
