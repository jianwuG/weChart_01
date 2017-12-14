/**
 * Created by Administrator on 2017/12/14.
 */
'use strict';

var fs = require('fs');

exports.readFileAsync = function (path, encoding) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, encoding, function (err, data) {
            if (err) reject(err)
            else
            {
                console.log("22222",data);
                resolve(data)
            }
        })
    })
};
exports.writeFileAsync = function (path, data) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(path, data, function (err, data) {
            if (err) reject(err)
            else resolve()
        })
    })
};