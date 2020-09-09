var mysql = require('mysql');
var dbConfig = require('./db.config');

module.exports = {
    query : function(sql,params,callback){
        //每次使用的时候需要创建链接，数据操作完成之后要关闭连接
        var connection = mysql.createConnection(dbConfig);
        connection.connect(function(err){
            if(err){
                console.log('数据库链接失败');
                throw err;
            }
            //开始数据操作
            connection.query( sql, params, function(err,results,fields ){
                if(err){
                    console.log('数据操作失败');
                    throw err;
                }else{
                    callback && callback((JSON.stringify(results)), (JSON.stringify(fields)));
                }
                connection.end(function(err){
                    if(err){
                        console.log('关闭数据库连接失败！');
                        throw err;
                    }
                });
            });
        });
    }
};