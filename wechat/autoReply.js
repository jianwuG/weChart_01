/**
 * Created by Administrator on 2017/12/17.
 */

'use strict';

const createXML = require('./createXML');

exports.autoReply=function(message) {
    if (message.MsgType === 'event') {
        if (message.Event === 'subscribe') {
            if (message.EventKey) {
                console.log('扫码进入');
            }
            // let now = new Date().getTime();
            let now = new Date();
            let tpl=`${now}\n感谢关注!!!!!!!\n1.回复文字\n2.回复图文`;
            return Promise.resolve(createXML({
                ToUserName: message.FromUserName,
                FromUserName: message.ToUserName,
                MsgType: 'text',
                Content:tpl
            }));
        }else if (message.Event === 'unsubscribe') {
            console.log('取关');
            return Promise.resolve('');
        }
    }
    else if (message.MsgType === 'text') {
        let content = message.Content;
        if (content === '1') {
            return Promise.resolve(createXML({
                ToUserName: message.FromUserName,
                FromUserName: message.ToUserName,
                MsgType: 'text',
                Content: `回复文本信息111111111111`
            }));
        }else if (content === '2') {
            return Promise.resolve(createXML({
                ToUserName: message.FromUserName,
                FromUserName: message.ToUserName,
                MsgType: 'news',
                Articles: [
                    {
                        Title: '篮球',
                        Description: 'nba1111111',
                        PicUrl: 'http://imgcdn.zhibo8.cc/2017/12/14/80ffc190f324a11b92b25531ad06d6f4.jpg',
                        Url: 'https://www.zhibo8.cc/nba/'
                    },
                    {
                        Title: '足球',
                        Description: '足球111111111111',
                        PicUrl: 'http://imgcdn.zhibo8.cc/2017/12/12/8e7131b7fe07a25eab3e602881991aa8.jpg',
                        Url: 'https://tu.zhibo8.cc/zuqiu/'
                    }
                ]
            }));
        }
        else {
            return Promise.resolve(createXML({
                ToUserName: message.FromUserName,
                FromUserName: message.ToUserName,
                MsgType: 'news',
                Articles: [
                    {
                        Title: '街霸恶搞欧冠16强对阵',
                        Description: '街霸恶搞欧冠16强对阵',
                        PicUrl: 'http://imgcdn.zhibo8.cc/2017/12/11/114b0f1bf5cf7b0a1ce369d1b8f44b98.jpg',
                        Url: 'https://tu.zhibo8.cc/home/album/37860/'
                    }
                ]
            }));
        }
    }
};