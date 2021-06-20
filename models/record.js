var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecordSchema = new Schema({
    key: String,
    value: String,
    createdAt: {type: Date},
    count: [Number],

});


// Export the model
module.exports = mongoose.model('Record', RecordSchema);