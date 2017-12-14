/**
 * Created by Administrator on 2017/12/12.
 */
//验证公众号,获取access_token
'use strict';

const sha1=require('sha1');
const request = require('co-request');
const opts=require('./../config.js');
const prefix = 'https://api.weixin.qq.com/cgi-bin/';//因为这一部分API是固定的，所以我们单独拿出来
var api = {
        accessToken:prefix+'token?grant_type=client_credential'
};
function Wechat(opts) { //这里面的值就是从中间件传过来的
        var that = this;
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
        var access_token = data.access_token;
        var expires_in = data.expires_in;
        var now = (new Date().getTime())

        if (now < expires_in) {
                return true;
        }else {
                return false;
        }
};
//更新、获取票据
Wechat.prototype.updateAccessToken = function () {
        var appID = this.appID;
        var appSecret = this.appSecret;
        var url = api.accessToken + '&appid=' + appID + '&secret=' + appSecret;
        return new Promise(function (resolve, reject) {
                request({url: url, json: true}, function (error, response, body) {
                        if (!error && response.statusCode === 200) {
                                var data = body;
                                var now = (new Date().getTime());
                                var expires_in = now + (data.expires_in - 20) * 1000;
                                data.expires_in = expires_in;
                                resolve(data);
                                console.log(data);
                        } else {
                                reject()
                        }
                });
        })
};

module.exports=(ctx)=>{
        var wechat = new Wechat(opts);//我们实例化一下Wechat，就可以在中间件中直接调用了
        console.log(opts);
        var query=ctx.request.query;
        var token=opts.wechat.token;
        var signature=query.signature;
        var timestamp=query.timestamp;
        var nonce=query.nonce;

        var str=[token,timestamp,nonce].sort().join('');
        var sha=sha1(str);
        if(sha===signature){
            ctx.body= query.echostr;
        }
        else{
            ctx.body={ code: -1, msg: "fail"};
        }
};