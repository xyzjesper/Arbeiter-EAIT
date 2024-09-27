const {
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  subCommand: "reactionrole.remove",

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    await interaction.deferReply({ ephemeral: true });

    if (interaction.member.id !== "850470027026759690") {
      return interaction.editReply({
        content: "You can't remove roles!",
        ephemeral: true,
      });
    }

    const reactionroleDB = require("../../event/schema/reactionroleDB");

    await interaction.editReply({
      content: "Deleting the role...",
      ephemeral: true,
    });

    const role = interaction.options.getRole("role");
    await role.delete();

    await interaction.editReply({
      content: "Role deleted",
      ephemeral: true,
    });

    await interaction.editReply({
      content: "Deleting Database entry...",
      ephemeral: true,
    });

    await reactionroleDB.deleteMany({
      RoleID: role.id,
    });

    interaction.editReply({
      content: "Reaction role removed",
      ephemeral: true,
    });
  },
};
