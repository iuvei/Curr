const log4js = require('log4js')
const log = log4js.getLogger("socketEvent")
var cachemgr = require('./../../tools/cachemgr');
const BetModel = require('../../models/quiz/bet.model');
const UserModel = require('../../models/user/user.model');
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
            const {openid, nickname, avatar} = user;
            const rule = RuleFactory.match(choice);
            console.log('==========', rule)
            if (rule) {
                const amount = rule.amount(choice);
                console.log(amount)
                UserModel.findOne({openid}, function (err, userinfo) {
                    if (err) {
                        log.error("内部错误:", err);
                        return;
                    }
                    if (userinfo) {
                        log.info("User: ", openid, " Balance: ", userinfo.balance, " Amount: ", amount)
                        if (userinfo.balance < amount) {
                            log.error("User: ", openid, "余额不足")
                            socket.emit('bet-msg', {from: 2, nickname: "客服", choice: `@${nickname} 余额不足`});
                            return;
                        }

                        const query = {openid};
                        if (userinfo.balance !== 0) {
                            query.balance = userinfo.balance
                        }
                        UserModel.update(query, {'$set': {balance: userinfo.balance - amount}}, {upsert: false}, function (err, ret) {
                            if (err) {
                                log.error("内部错误:", err);
                                return;
                            }
                            if (ret.nModified !== 1) {
                                log.error("更新余额失败:", query, {'$set': {balance: userinfo.balance - amount}}, err);
                                socket.emit('bet-msg', {from: 2, nickname: "客服", choice: `@${nickname} 更新余额失败`});
                                return
                            }
                        });

                        const record = {from: 1, no, openid, nickname, choice, avatar, amount}
                        BetModel.create(record, function (err) {
                            if (err) {
                                log.error("下注保存失败：", err);
                                socket.emit('bet-msg', {from: 2, nickname: "客服", choice: `@${nickname} 下注失败`});
                                return;
                            } else {
                                socket.emit('bet-msg', record);
                                socket.broadcast.emit('bet-msg', record);
                            }
                        });
                    }
                });

            } else {
                log.error("choice没有匹配:", choice, rule);
            }

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
