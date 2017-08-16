const NodeCache = require( "node-cache" );
const myCache = new NodeCache( { stdTTL: 1800, checkperiod: 60 } );

function setUser(user) {
    myCache.set( user.email, user, 1800 );
}

function countUsers() {
    const users = myCache.keys();
    return users.length;
}

function isExist(key) {
    const ttlVal = myCache.getTtl(key);
    console.log('====tt=', ttlVal)
    if (ttlVal) {
        return true;
    }
    return false;
}

function stats() {
    return myCache.getStats();
}

exports.setUser = setUser;
exports.countUsers = countUsers;
exports.stats = stats;
exports.isExist = isExist;