require("dotenv").config();
const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reactionrole")
    .setDescription("Add an reaction Role to the server")
    .setDMPermission(false)
    .setDefaultMemberPermissions(
      PermissionsBitField.Flags.UseApplicationCommands
    )
    .addSubcommand((options) =>
      options
        .setName("add")
        .setDescription("Add a reaction role to the server")

        .addStringOption((option) =>
          option
            .setName("reaction")
            .setDescription("The reaction to add")
            .setRequired(true)
        )

        .addStringOption((option) =>
          option
            .setName("role")
            .setDescription("The role to add")
            .setRequired(true)
        )
    )

    .addSubcommand((options) =>
      options
        .setName("remove")
        .setDescription("Remove a reaction role from the server")
        .addRoleOption((option) =>
          option
            .setName("role")
            .setDescription("The role to remove")
            .setRequired(true)
        )
    ),
};
