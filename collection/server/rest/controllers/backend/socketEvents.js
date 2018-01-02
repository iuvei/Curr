const log4js = require('log4js')
const log = log4js.getLogger("admin_socketEvent")
var cachemgr = require('./../../tools/cachemgr');
exports = module.exports = function (io) {

    const counts = cachemgr.countUsers()
    io.emit('stats', {counts: counts});
    setInterval(function () {
        const counts = cachemgr.countUsers()
        io.emit('stats', {counts: counts});
    }, 60000);


    io.on('connection', function (socket) {

        socket.join('Lobby2');

        socket.on('chat mounted', function (user) {
            // TODO: Does the server need to know the user?
            console.log('======admin  mounted=====')
            socket.emit('receive socket', socket.id);
        });

        socket.on('UP', function (msg) {

            console.log('===========BET=====', msg)
        });
        socket.on('DOWN', function (msg) {

            console.log('===========BET=====', msg)
        });
        socket.on('admin', function (msg) {
            console.log('=======admin=======', msg)
            socket.broadcast.emit('admin message', msg);
        });
    });
};
