/**
 * Created by Administrator on 2017/12/12.
 */
'use strict';

const Koa=require('koa');
const sha1=require('sha1');
const wecharts=require('./encryption.js');

const config={
    wechart:{
    
        Token:'jianwuWeChart',
    }
};

const app=new Koa();


app.use(wecharts);
app.listen(8080);
console.log(1111111111111111);