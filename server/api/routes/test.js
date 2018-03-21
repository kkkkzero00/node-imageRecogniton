
var express = require('express');
const testRouter = express.Router();
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');


testRouter.
    get('/a1',function(req,res){
        console.log('a1');
        res.status(200).json({type:'a1'});
    }).
    get('/a2',function(req,res){
        console.log('a2');
        res.status(200).json({type:'a2'});
    }).
    get('/a3',function(req,res){
        console.log('a2');
        res.status(200).json({type:'a3'});
    })

module.exports = testRouter;
