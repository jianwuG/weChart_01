/**
 * Created by Administrator on 2017/12/12.
 */
'use strict';

const Koa=require('koa');
const sha1=require('sha1');
const wecharts=require('./encryption.js');
const opts=require('./../config.js');

const app=new Koa();


app.use(wecharts);
app.listen(opts.port);
console.log("Listen Sever:",opts.port);