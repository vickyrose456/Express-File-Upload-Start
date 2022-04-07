const mongoose = require('mongoose');

let FileModel = {};

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    data: {
        type: Buffer,
    },
    size: {
        type: Number,
    },
    encoding: {
        type: String,
    },
    tempFilePath: {
        type: String,
    },
    truncated: {
        type: Boolean,
    },
    MimeType: {
        type: String,
    },
    md5: {
        type: String,
    },

});

FileModel = mongoose.model('FileModel', fileSchema);

module.exports.FileModel = FileModel;
module.exports.fileSchema = fileSchema;