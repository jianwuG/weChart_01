'use strict';
const request = require('co-request');
const prefix = 'https://api.weixin.qq.com/cgi-bin/';//因为这一部分API是固定的，所以我们单独拿出来

const api = {
    accessToken:prefix+'token?grant_type=client_credential'
};

function Wechat(opts) { //这里面的值就是从中间件传过来的
    let that = this;
    this.appID = opts.wechat.appID;
    this.appSecret = opts.wechat.appSecret;
    this.getAccessToken = opts.wechat.getAccessToken;
    this.saveAccessToken = opts.wechat.saveAccessToken;
    //按照上面我们讲的逻辑来实现getAccessToken
    this.getAccessToken()
        .then(function (data) {
            try {
                data = JOSN.parse(data);

            }
            catch(e) {
                return that.updateAccessToken();
            }
            if (that.isValidAccessToken(data)) {
                Promise.resolve(data);
            }
            else {
                return that.updateAccessToken();
            }
        })
        .then(function (data) {
            that.access_token = data.access_token;
            that.expires_in = data.expires_in;
            that.saveAccessToken(data);
        })
}
//是否过期
Wechat.prototype.isValidAccessToken = function (data) {
    if (!data || !data.access_token || !data.expires_in) {
        return false;
    }
    let access_token = data.access_token;
    let expires_in = data.expires_in;
    let now = (new Date().getTime())

    if (now < expires_in) {
        return true;
    }else {
        return false;
    }
};
//更新、获取票据
Wechat.prototype.updateAccessToken = function () {
    let appID = this.appID;
    let appSecret = this.appSecret;
    let url = api.accessToken + '&appid=' + appID + '&secret=' + appSecret;
    return new Promise(function (resolve, reject) {
        request({url: url, json: true}, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                let data = body;
                let now = (new Date().getTime());
                let expires_in = now + (data.expires_in - 20) * 1000;
                data.expires_in = expires_in;
                resolve(data);
                // console.log(data);
            } else {
                reject()
            }
        });
    })
};
module.exports=Wechat;