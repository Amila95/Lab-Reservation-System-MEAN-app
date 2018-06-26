var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    lab_name: { type: String, require: true },
    lab_type: { type: String, required: true },
    seat: { type: Number },
    Type: { type: String, required: true },
    

}, { collection:'lab' });

module.exports = mongoose.model('Lab', schema);