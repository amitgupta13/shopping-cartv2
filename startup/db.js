const mongoose = require('mongoose');

module.exports = function(){
    mongoose.connect('mongodb://localhost/shopping', { useNewUrlParser: true })
    .then(()=>{
        console.log('Connected to DB');
    })
    .catch(()=>{
        console.log('Err connecting to DB');
    });
}