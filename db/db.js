module.exports = function (success, err) {
    
    const mongoose = require('mongoose');

    const {DBHOST, DBPORT, DBNAME } = require('../config/config');

    mongoose.set('strictQuery', true);

    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`)
        .then(() => {
            success();
        })
}