const {
  Client,
  EmbedBuilder,
  Events,
  GuildMember,
  User,
  MessageReaction,
} = require("discord.js");

module.exports = {
  name: Events.MessageReactionAdd,

  /**
   *
   * @param {User} user
   * @param {MessageReaction} reaction
   * @param {Client} client
   */
  async execute(reaction, user, client) {
    const reactionroleDB = require("../schema/reactionroleDB");

    const data = await reactionroleDB.findOne({
      Reaction: reaction.emoji.name,
    });

    if (!data) return;

    const member = await reaction.message.guild.members.fetch(user);

    if (member.user.id == client.user.id) return;

    if (!member) return;

    if (member.roles.cache.has(data.RoleID)) return;

    member.roles.add(data.RoleID);
  },
};
