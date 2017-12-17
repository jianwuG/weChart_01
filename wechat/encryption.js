/**
 * Created by Administrator on 2017/12/12.
 */
//验证公众号,获取access_token
'use strict';

const sha1 = require('sha1');
const opts = require('./../config.js');
const Wechat = require('./wechat');
const contentType = require('content-type');
const getRawBody = require('raw-body');
const util = require('../util/util');
const createXml = require('./createXml');
const autoReply = require('./autoReply');

module.exports = async(ctx) => {
    let wechat = new Wechat(opts);//我们实例化一下Wechat，就可以在中间件中直接调用了
    // console.log(ctx);

    let token = opts.wechat.token;
    let signature = ctx.request.query.signature;
    let timestamp = ctx.request.query.timestamp;
    let nonce = ctx.request.query.nonce;

    let str = [token, timestamp, nonce].sort().join('');
    let sha = sha1(str);
    if (ctx.request.method === "GET") {
        if (sha === signature) {
            ctx.body = ctx.request.query.echostr;
        }
        else {
            ctx.body = {code: -1, msg: "fail"};
        }
    }
    else if (ctx.request.method === "POST") {

        if (sha !== signature) {
            ctx.body = {code: -1, msg: "fail"};
            return false
        }
        let xml = await getRawBody(ctx.req, {
            length: ctx.req.headers["content-length"],
            limit: "1mb",
            encoding: contentType.parse(ctx.req).parameters.charset,
        });

        let data = await util.xmlToJson(xml);
        let message = util.formatMessage(data.xml);
        ctx.status = 200;
        ctx.type = 'application/xml';
        ctx.body = await autoReply.autoReply(message);
        console.log('222111', data);
        console.log('222111111', message);
        console.log(ctx.body);


    }

};