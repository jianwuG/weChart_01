/**
 * Created by Administrator on 2017/12/12.
 */
//验证公众号
'use strict';

const sha1=require('sha1');

module.exports=(ctx)=>{
        // console.log(ctx.request.query);
        var query=ctx.request.query
        var token='jianwuWeChart';
        var signature=query.signature;
        var timestamp=query.timestamp;
        var nonce=query.nonce;

        var str=[token,timestamp,nonce].sort().join('');
        var sha=sha1(str);
        if(sha===signature){
            ctx.request.body= query.echostr;
        }
        else{
            ctx.request.body={ code: -1, msg: "fail"};
        }
};