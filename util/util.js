/**
 * Created by Administrator on 2017/12/14.
 */
'use strict';
//辅助
const fs = require('fs');
const xml2js = require('xml2js');

const parseString = xml2js.parseString;
const builder = new xml2js.Builder();

//读取access_token
exports.readFileAsync  = function (path, encoding) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, encoding, function (err, data) {
            if (err) reject(err);
            else resolve(data)
        })
    })
};
//存储access_token
exports.writeFileAsync = function (path, data) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(path, data, function (err, data) {
            if (err) reject(err)
            else resolve()
        })
    })
};

//xml转json
exports.xmlToJson = function (xml) {
    return new Promise(function (resolve, reject) {
        parseString(xml,{trim:true},function(err,data){
            if(err) reject(err)
            else resolve(data);
        })

    })
};
//多图文的消息中存在嵌套的情况/格式化
exports.formatMessage=function(result){
    var message = {};
    if(typeof result === 'object'){
        var keys = Object.keys(result);
        for(var i=0;i<keys.length;i++){
            var key = keys[i];
            var item = result[key];
            if(!(item instanceof Array) || item.length === 0) continue;
            if (item.length === 1){
                var val = item[0];
                if (typeof val === 'object') message[key] = formatMessage(val);
                else message[key] = (val || '').trim();
            }else{
                message[key] = [];
                for(var j=0,k=item.length;j<k;j++) message[key].push(formatMessage(item[j]));
            }
        }
    }
    return message;
};

exports.jsonToXml = (obj) => {
    return builder.buildObject(obj)
};