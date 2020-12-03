var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

mongoose.set('useCreateIndex', true);
var  { Schema } = mongoose;
var objectId = Schema.Types.ObjectId;

var PersonSchema = new Schema({
    _id: objectId,
    firstname: String,
    lastname: String,
    sex: String,
    age: Number,
    educated: Boolean,
    religion: String,
});

var Person = mongoConfig.model('Person', PersonSchema);

module.exports = Person;