require("dotenv").config();
const { Client, ActivityType, PresenceUpdateStatus } = require("discord.js");
const { loadCommands } = require("../../func/loadCommands");
const { guildloadCommands } = require("../../func/guildloadCommands");

module.exports = {
  name: "ready",
  once: true,
  /**
   * @param {Client} client
   */
  async execute(client) {
    loadCommands(client);
    guildloadCommands(client);

    client.user.presence.set({
      status: PresenceUpdateStatus.Online,
      activities: [
        {
          type: ActivityType.Custom,
          name: `🦾 Ich arbeite gern für meinen Konzern!`,
        },
      ],
    });
  },
};
