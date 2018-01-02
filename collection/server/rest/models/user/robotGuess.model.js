const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RobotGuessSchema = new Schema({
    choice: {type: String}, // 竞猜选择
});

module.exports = mongoose.model('Guess', RobotGuessSchema);