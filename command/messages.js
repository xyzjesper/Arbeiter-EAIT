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
    .setName("messages")
    .setDescription("Send default messages to the server")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("The message to send")
        .setRequired(true)
        .addChoices({ name: "reaction", value: "reaction" })
    )

    .addChannelOption((option) =>
      option.setName("channel").setDescription("Channel").setRequired(true)
    ),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const channel = interaction.options.getChannel("channel");
    const message = interaction.options.getString("message");

    switch (message) {
      case "reaction":
        {
          const embed = new EmbedBuilder()
            .setTitle("Reaction Role")
            .setDescription("React to get the role");

          const message = await channel.send({
            embeds: [embed],
          });
        }
        break;
    }
  },
};
