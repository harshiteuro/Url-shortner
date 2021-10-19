const mongoose = require('mongoose');
const shortid = require('shortid');

const urlschema = new mongoose.Schema({
    long:{
        type: String,
        required: true
    },
    short:{
        type: String,
        required: true,
        default: shortid.generate
    }
});

module.exports = mongoose.model('shorturls',urlschema);