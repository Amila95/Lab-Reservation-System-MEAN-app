var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var schema = new Schema({
    user_id: { type: String, require: true },
    lab_name: { type: String, require: true },
    res_date: { type: String, require: true },
    in_time: { type: String, require: true },
    out_time: { type: String, require: true },
    reason: { type: String }
   
    


}, { collection: 'resavation' });

module.exports = mongoose.model('Resavation', schema);