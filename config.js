/**
 * Created by Administrator on 2017/12/14.
 */
var  util=require('./util/util.js');
var  path=require('path');
var wechat_file = path.join(__dirname, './wechat.txt');
module.exports = {
    port: 8080,
    wechat: {
        appID: '************',
        appSecret: '***********',
        token: '*********',
        getAccessToken: function () {
            //获取access_token
            return util.readFileAsync(wechat_file);
        },
        saveAccessToken: function (data) {
            data = JSON.stringify(data);
            //保存access_token
            return util.writeFileAsync(wechat_file,data);
        }
    }

};