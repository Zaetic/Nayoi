const mongoose = require("mongoose");
const {MessageEmbed} = require("discord.js");
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
const {errorReturn} = require("../functions.js");
const RoleReaction = require("../models/rolereaction.js");


module.exports = async (bot, reaction, user) => {
    
    if(user.bot == true) return

    let removeMemberRole = (emojiRoleMappings) => {

        if(emojiRoleMappings.get(reaction.emoji.id)) {

            let roleId = emojiRoleMappings.get(reaction.emoji.id);

            let role = reaction.message.guild.roles.cache.find(role => role.id === roleId);
            let member = reaction.message.guild.members.cache.get(user.id);
            if(role && member) {
                member.roles.remove(role);
                
            }
        }
    }

    if(reaction.message) {
        await reaction.message.fetch();
        let { id } = reaction.message;
        try {
            await mongoose.connect(`${bot.mongodb}`);
            let msgDocument = await RoleReaction.findOne({ messageId: id });
            if(msgDocument) {
                let { emojiRoleMappings } = msgDocument;
                removeMemberRole(emojiRoleMappings);
                return
            }
        }
        catch(err) {
            console.log(err);
        }
    }

}