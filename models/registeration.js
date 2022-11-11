const mongoose = require('mongoose');

const registerationSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phnNo: {type: Number, required: true},
    email: {
        type: String, unique: true, required: true
    },
    password: {type: String, required: true}
})

module.exports =  mongoose.model('users',registerationSchema);