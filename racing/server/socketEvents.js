var cachemgr = require('./rest/tools/cachemgr');
exports = module.exports = function (io) {

    const counts = cachemgr.countUsers()
    io.emit('stats', {counts: counts});
    setInterval(function(){
        const counts = cachemgr.countUsers()
        io.emit('stats', {counts: counts});
    }, 60000);


    io.on('connection', function (socket) {

        socket.join('Lobby');
        socket.on('chat mounted', function (user) {
            // TODO: Does the server need to know the user?
            console.log('==========..=======')
            socket.emit('receive socket', socket.id);
        });
        socket.on('leave channel', function (channel) {
            socket.leave(channel);
        });
        socket.on('join channel', function (channel) {
            socket.join(channel.name);
        });
        socket.on('new message', function (msg) {
            //socket.broadcast.to(msg.channelID).emit('new bc message', msg);
            console.log('=======broadcast====1====', msg.text)
            if (!msg.isImg && !msg.user.admin){
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
