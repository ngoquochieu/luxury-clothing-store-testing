const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(process.env.DATABASE);
    } catch (error) {
        console.log(error);
    }
    console.log('Successful !!!');
}

module.exports = { connect };
