const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    guildId: String,
    memberCount: String,
    createdAt: String,
    channel: String,
    welcome: String,
    welcomeMsg: String,
    welcomeChannel: String
});

module.exports = mongoose.model("Guild", guildSchema);