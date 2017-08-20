const log4js = require('log4js')
const log = log4js.getLogger("socketEvent")
var cachemgr = require('./../../tools/cachemgr');
const BetModel = require('../../models/quiz/bet.model');
const {RuleFactory} = require("../../tools/rules")
exports = module.exports = function (io) {

    const counts = cachemgr.countUsers()
    io.emit('stats', {counts: counts});
    setInterval(function () {
        const counts = cachemgr.countUsers()
        io.emit('stats', {counts: counts});
    }, 60000);


    // // middleware
    // io.use((socket, next) => {
    //     let token = socket.handshake.query.token;
    //     if (isValid(token)) {
    //         return next();
    //     }
    //     return next(new Error('authentication error'));
    // });

    io.on('connection', function (socket) {

        socket.join('Lobby');
        socket.on('chat mounted', function (user) {
            // TODO: Does the server need to know the user?
            console.log('==========..=======')
            socket.emit('receive socket', socket.id);
        });
        socket.on('BET', function (msg) {
            console.log('===========BET=====', msg)
            const {user, no, choice} = msg;
            //var reg = /^[0-9]\/[大小单双组和特庄闲龙虎ABC]\/[1-9][0-9]{0,5}$/
            if (!RuleFactory.isMatch(choice)) {
                log.warn("格式错误:", choice, " by ", user);
                //socket.emit('info', {type: "error", msg: "格式错误"});
                const record =  {from: 2, no, nickname: "客服", choice: `@${user.nickname}\n格式错误: ${choice}`, avatar: user.avatar}
                socket.emit('bet-msg', record);
                return;
            }
            BetModel.findOne({no, nickname: user.nickname, choice}, function (err, user) {
                if (err) {
                    log.error("内部错误:", err);
                    return;
                }
                if (user) {
                    //已经存在
                    //socket.emit('info', {type: "error", msg: "该期已经存在"});
                    return;
                }
            });
            const record =  {from: 1, no, nickname: user.nickname, choice, avatar: user.avatar}
            BetModel.create(record, function (err) {
                if (err) {
                    log.error("保存失败：", err);
                    //socket.emit('info', {type: "error", msg: "失败"});
                    return;
                } else {
                    socket.emit('bet-msg', record);
                    socket.broadcast.emit('bet-msg', record);
                }
            });

        });
        socket.on('UP', function (msg) {

            console.log('===========BET=====', msg)
        });
        socket.on('DOWN', function (msg) {

            console.log('===========BET=====', msg)
        });
        socket.on('new message', function (msg) {
            //socket.broadcast.to(msg.channelID).emit('new bc message', msg);
            console.log('=======broadcast====1====', msg.text)
            if (!msg.isImg && !msg.user.admin) {
                msg.text = blacklist_list.replaceKeywords(msg.text);
            }
            cachemgr.setUser(msg.user);
            socket.broadcast.emit('new bc message', msg);
        });
        socket.on('new channel', function (channel) {
            socket.broadcast.emit('new channel', channel);
        });
        socket.on('typing', function (data) {
            socket.broadcast.to(data.channel).emit('typing bc', data.user);
        });
        socket.on('stop typing', function (data) {
            socket.broadcast.to(data.channel).emit('stop typing bc', data.user);
        });
        socket.on('setUser', function (msg) {
            socket.broadcast.emit('noticeUser', msg);
        });
    });
};
