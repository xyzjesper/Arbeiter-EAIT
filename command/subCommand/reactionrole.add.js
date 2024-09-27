const {
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  subCommand: "reactionrole.add",

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    await interaction.deferReply();
    const reactionroleDB = require("../../event/schema/reactionroleDB");

    const reaction = interaction.options.getString("emoji");
    const game = interaction.options.getString("gamename");
    const chanel = process.env.REACTIONSROLESCHANNEL;

    await interaction.editReply({
      content: "Checking if the role exists...",
      ephemeral: true,
    });

    const data = await reactionroleDB.findOne({
      Name: game.toLowerCase(),
    });

    if (data) {
      return interaction
        .editReply({
          content: "This reaction role already exists",
          ephemeral: true,
        })
        .then(() => {
          return interaction.deleteReply();
        });
    }

    await interaction.editReply({
      content: "Creating the reaction role",
      ephemeral: true,
    });

    const role = await interaction.guild.roles.create({
      name: "Reaction: " + game,
      color: "Random",
      permissions: [],
      mentionable: true,
    });

    await interaction.editReply({
      content: "Role created",
      ephemeral: true,
    });

    const embed = new EmbedBuilder()
      .setTitle("Reaction Role")
      .setDescription(
        `Reaction: ${reaction}`,
        `Role: <@&${role.id}>`,
        `Game: ${game}`
      )
      .setColor("Green");

    await interaction.editReply({
      embeds: [embed],
      components: [
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("reactionroles")
            .setLabel(game)
            .setStyle(ButtonStyle.Secondary)
            .setEmoji(reaction)
        ),
      ],
    });

    await reactionroleDB.create({
      Name: game.toLowerCase(),
      RoleID: role.id,
      Emoji: reaction,
      MessageID: interaction.channel.lastMessageId,
      ChannelID: chanel,
    });
  },
};
