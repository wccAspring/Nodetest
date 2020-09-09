

var mysql = require("mysql");  //引用模块
var db = require("../operatordb/db"); //引入数据库封装模块
var express = require('express');
var router = express.Router()


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '用户接口数据传输' });
});



module.exports = router;
