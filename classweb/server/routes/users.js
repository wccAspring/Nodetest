var express = require('express');
var router = express.Router();
var db = require("../operatordb/db"); //引入数据库封装模块
var FLogger = require('../applog/Log/loghelper');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('请加入参数');
});

router.get('/getIndex', function(req, res, next) {
  console.log(123)
      if (req.query.name != null) {
          db.query(`SELECT * FROM role`, [], function (results, rows) {
              res.send(results)
          })
      }else{
        res.send({"msg":"输入参数"})
      }
});

const newLocal = '/deluser';
router.get(newLocal, function(req, res, next) {
      if (req.query.id !=null) {
          var where="where id="+req.query.id+"";
          var sql="DELETE FROM role "+where; 
          db.query(sql, [], function (results, rows) {
              res.send({success:"删除成功！"})
          })
      }else{
        res.send("参数错误")
      }
});

router.get('/getItem',function(req,res,next){
    if (req.query.id !=null) {
          var where="where id="+req.query.id+"";
          var sql="SELECT * FROM role "+where; 
          db.query(sql, [], function (results, rows) {
              res.send(results,rows.description,rows.role)
    })
    }else{
        res.send({success:"删除失败！",state:-1})
    }
});

router.post('/adduser', function (req, res) {
  if(req.body.description!=null&&req.body.role!=null){
    db.query(`INSERT INTO role (description,role)
            VALUES
            ('`+ req.body.description + `','` + req.body.role + `');`, [], function (results, rows) {
        //返回前端数据
        res.send(results)
        });
  }else{
    res.send("请传入参数")
  }
})

router.post('/login', function (req, res) {
  //FLogger.log("这是一条日志测试打印 none not paramters！", 111, "uuuuuuuuu", null, {jj: 188, name: "hello"});
  //FLogger.warn("warn", "这是一条日志测试打印 ",123);
  if(req.body.username!=null&&req.body.password!=null){
    db.query(`INSERT INTO role (description,role)
            VALUES
            ('`+ req.body.description + `','` + req.body.role + `');`, [], function (results, rows) {
        //返回前端数据
        res.send(results)
        
        });
  }else{
    res.send("请传入参数")
  }
  res.send("success")
})


router.post('/updateitem', function (req, res) {
  if(req.body.description!=null&&req.body.role!=null){
    db.query(`INSERT INTO role (description,role)
            VALUES
            ('`+ req.body.description + `','` + req.body.role + `');`, [], function (results, rows) {
        //返回前端数据
        res.send(results)
        });
  }else{
    res.send({state:-1,msg:"修改失败"})
  }
})


module.exports = router;
