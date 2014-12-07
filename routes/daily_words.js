var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var dailyWords = require('../models/daily_words');


router.get('/', function(req, res) {
    dailyWords.find().select('-__v').exec(function (err, doc){
        if(err){
            res.send(err);
        }else{
            res.send(doc);
        }
    });
});

router.post('/', function(req, res) {
    var DailyWords = new dailyWords({
        words:req.body.words,
        means:req.body.means,
       timeStamp:getDateTime()
    });
    DailyWords.save(function(err) {
        if (err){
            res.send(err);
        }else{
            res.send(DailyWords);
        }
    });
});

router.post('/update', function(req, res) {
    dailyWords.findOneAndUpdate(
        { _id: req.body.id },
        {
            words:req.body.words,
            means:req.body.means,
            $push:{updateTime:getDateTime()}
        },
        {upsert:true},function(err) {
        if (err){
            res.send(err);
        }else{
            res.send('Done');
        }
    });
});

router.delete('/', function(req, res) {
    dailyWords.remove({ _id: req.body.id }, function(err) {
        if (err) {
            res.send('fail to delete');
        }
        else {
            res.send('deleted successfully');
        }
    });
});


//getTime
function getDateTime() {
    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    return year + "" + month + "" + day + "" + hour + "" + min + "" + sec;
}

module.exports = router;
