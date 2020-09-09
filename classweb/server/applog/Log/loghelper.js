const log4js = require('log4js');
 
var LogType = {
    NONE: "none",
    DEBUG: "debug",
    INFO: "info",
    WARN: "warn",
    ERROR: "error",
    FATAL: "fatal",
}
 
var LogTypeOrder = {
    NONE: 0,
    DEBUG: 1,
    INFO: 2,
    WARN: 3,
    ERROR: 4,
    FATAL: 5,
}
 
var Kinds = ["business", "net"];
 
function appenderFull(filename){
    return {
        type: "dateFile",
        filename: filename,  //日志文件的存储路径
        alwaysIncludePattern: true,  //（可选，默认false）将模式包含在当前日志文件的名称以及备份中
        pattern: "-yyyy-MM-dd.log",  //（可选，默认为-yyyy-MM-dd） 确定何时滚动日志的模式。 格式:.yyyy-MM-dd-hh:mm:ss.log
        encoding: 'utf-8', //（可选，默认为utf-8）文件数据的存储编码
        maxLogSize: "1M" //文件最大存储空间，当文件内容超过文件存储空间会自动生成一个文件xxx.log.1的序列自增长的文件, 单位：K M G
    }
}
 
var appenders = {default: appenderFull("./logs/default/default")};
var categories = {default: {appenders: ["default"], level: log4js.levels.ALL}};
 
for(const kind of Kinds){
    for(let type in LogType){
        if(LogType.hasOwnProperty(type)){
            type = LogType[type];
            let key = kind + "_" + type;
            appenders[key] = appenderFull(`./logs/${kind}/${type}/${type}`);
            categories[key] = {appenders: [key], level: type === LogType.NONE ? log4js.levels.ALL : type}
        }
    }
}
 
log4js.configure({
    appenders: appenders,
    categories: categories,
});
 
var KindIndex = 0;
exports.log = function(type){
    try {
        if(arguments.length === 0) return;
        let more = "";
        for(let i = 1; i < arguments.length; i++){
            more += (more === "" ? arguments[i] : "  " + arguments[i]);
        }
        if(typeof(type) === "string" && arguments.length > 1 && LogType[type.toUpperCase()]){
            type = type.toLowerCase();
            log4js.getLogger(Kinds[KindIndex] + "_" + type)[type === LogType.NONE ? LogType.DEBUG : type](more);
        }
        else{
            more = type + more;
            log4js.getLogger(Kinds[KindIndex] + "_" + LogType.NONE)[LogType.DEBUG](more);
        }
    } catch (error) {
        console.error(error);
    }
};
 
function _registerLogFunc(type){
    return function(){
        if(arguments.length === 0) return;
        let args = [type];
        for(let i = 0; i < arguments.length; i++){
            args.push(arguments[i]);
        }
        exports.log.apply(null, args);
    }
}
 
const DEFAULT_FORMAT = ':remote-addr - -'
  + ' ":method :url HTTP/:http-version"'
  + ' :status :content-length ":referrer"'
  + ' ":user-agent"';
 
exports.netLog = function(type){
    try {
        type = typeof(type) === "string" && LogType[type.toUpperCase()] ? type.toLowerCase() : LogType.NONE;
        return log4js.connectLogger(log4js.getLogger(Kinds[1] + "_" + LogType.NONE), {level: 'auto', format: function(req, res, callback){
            try {
                let level = LogType.INFO;
                if(res.statusCode){
                    if (res.statusCode >= 300) level = LogType.WARN;
                    if (res.statusCode >= 400) level = LogType.ERROR;
                }
                let record = callback(DEFAULT_FORMAT);
                let category = type === LogType.NONE ? type : level;
                KindIndex = 1;
                LogTypeOrder[category.toUpperCase()] >= LogTypeOrder[type.toUpperCase()] && exports.log(category, record);
                KindIndex = 0;
            } catch (error) {
                console.error(error);
            }
            return;
        }});
    } catch (error) {
        console.error(error);
    }
}

exports.debug = _registerLogFunc(LogType.DEBUG);
exports.info = _registerLogFunc(LogType.INFO);
exports.warn = _registerLogFunc(LogType.WARN);
exports.error = _registerLogFunc(LogType.ERROR);
exports.fatal = _registerLogFunc(LogType.FATAL);
