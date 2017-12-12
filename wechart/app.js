/**
 * Created by Administrator on 2017/12/12.
 */
'use strict';

const Koa=require('koa');
const sha1=require('sha1');
const wecharts=require('./encryption.js');

const config={
    wechart:{
        appID:'wxbe5dd2e7b00c8001',
        appsecret:'f2a0db20b76edcd9d47eaa97d1623271',
        Token:'jianwuWeChart',
    }
};

const app=new Koa();


app.use(wecharts);
app.listen(8080);
console.log(1111111111111111);