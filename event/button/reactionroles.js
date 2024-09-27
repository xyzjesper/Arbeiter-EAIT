const {
  ButtonInteraction,
  Client,
  EmbedBuilder,
  PermissionsBitField,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  id: "reactionroles",

  /**
   *
   * @param {ButtonInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const reactionroleDB = require("../../event/schema/reactionroleDB");

    const data = await reactionroleDB.findOne({
      MessageID: interaction.message.id,
    });

    const member = interaction.guild.members.cache.get(interaction.user.id);

    if (member.roles.cache.has(data.RoleID)) {
      await member.roles.remove(data.RoleID);

      return await interaction.reply({
        content: `<@&${data.RoleID}> Removed for Game ${data.Name}`,
        ephemeral: true,
      });
    }

    member.roles.add(data.RoleID);

    await interaction.reply({
      content: `<@&${data.RoleID}> Added for Game ${data.Name}`,
      ephemeral: true,
    });
  },
};
