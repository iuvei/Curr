
/**
 * Created by sven on 2017/8/5.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SettingsSchema = new Schema({
    type: {type: String, required: true },
    config: { type: Object, default: {} },
    createdAt: { type: Date, default: Date.now()},
    updatedAt: { type: Date, default: Date.now() }
});

module.exports=mongoose.model('Settings', SettingsSchema);