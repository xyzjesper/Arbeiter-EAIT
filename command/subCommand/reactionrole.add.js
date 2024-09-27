const {
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  subCommand: "reactionrole.add",

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    await interaction.deferReply({ ephemeral: true });
    const reactionroleDB = require("../../event/schema/reactionroleDB");

    const reaction = interaction.options.getString("reaction");
    const roleid = interaction.options.getString("role");
    const chanel = process.env.REACTIONSROLESCHANNEL;

    await interaction.editReply({
      content: "Checking if the role exists...",
      ephemeral: true,
    });

    const data = await reactionroleDB.findOne({
      RoleID: roleid.toLowerCase(),
      Reaction: reaction,
    });

    if (data) {
      return interaction.reply({
        content: "This reaction role already exists",
        ephemeral: true,
      });
    }

    await interaction.editReply({
      content: "Creating the reaction role",
      ephemeral: true,
    });

    const role = await interaction.guild.roles.create({
      name: "Reaction: " + roleid,
      color: "Random",
      permissions: [],
      mentionable: true,
    });
    await interaction.editReply({
      content: "Role created",
      ephemeral: true,
    });

    const message = await client.channels.cache.get(chanel).send({
      embeds: [
        new EmbedBuilder().setDescription(
          [
            `## React to get the role`,
            ``,
            `**Role:** <@&${role.id}>`,
            `**Reaction**: ${reaction}`,
          ].join("\n")
        ),
      ],
    });

    await message.react(reaction);

    await reactionroleDB.create({
      Reaction: reaction,
      RoleID: role.id,
      MessageID: message.id,
    });

    const embed = new EmbedBuilder()
      .setTitle("Reaction Role Added")
      .setDescription(`Reaction: ${reaction}\nRole: <@&${role.id}>`)
      .setColor("Green");

    await interaction.editReply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};
