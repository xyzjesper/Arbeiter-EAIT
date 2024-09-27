const { Client, EmbedBuilder, Events, GuildMember } = require("discord.js");

module.exports = {
  name: Events.GuildMemberAdd,

  /**
   *
   * @param {GuildMember} member
   * @param {Client} client
   */
  async execute(member, client) {
    const whitelistDB = require("../schema/whitelistDB");

    const data = await whitelistDB.findOne({ Username: member.user.username });

    if (!data) {
      return member.kick("User is not whitelisted");
    } else {
      member.guild.channels.cache.get(process.env.WELCOMECHANNEL).send({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              `## The user ${member.user.username} has joined the server`
            )
            .setColor("Green"),
        ],
      });
    }
  },
};
