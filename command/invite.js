require("dotenv").config();
const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
  PermissionsBitField,
  Client,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Invite a user to the server")
    .setDMPermission(false)
    .setDefaultMemberPermissions(
      PermissionsBitField.Flags.UseApplicationCommands
    )
    .addStringOption((options) =>
      options
        .setName("username")
        .setDescription("Username to whitelist")

        .setRequired(true)
    ),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const whitelistDB = require("../event/schema/whitelistDB");

    const username = interaction.options.getString("username");

    const data = await whitelistDB.findOne({ Username: username });

    if (data) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()

            .setDescription(
              `## The user ${username} has already been invited to the server`
            )
            .setColor("Red")
            .build(),
        ],
      });
    }

    await whitelistDB.create({ Username: username });

    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(
            `## The user ${username} has been invited to the server`
          )
          .setColor("Green")
          .build(),
      ],
    });
  },
};
