// Load required packages
var mongoose = require('mongoose');

// Define our daily_words schema
var dailyWords   = new mongoose.Schema({
    words:String,
    means:String,
    timeStamp:String,
    updateTime:[]
});

// Export the Mongoose model
module.exports = mongoose.model('dailyWords', dailyWords);