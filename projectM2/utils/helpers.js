const moment = require('moment');

function getCurrentTime(){
    return moment().format('HH:mm:ss');
}

module.exports = getCurrentTime