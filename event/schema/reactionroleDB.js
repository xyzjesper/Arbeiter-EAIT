const { model, Schema } = require("mongoose");
const { String } = require("../util/schemaArguments");

module.exports = model(
  "reactionrole",
  new Schema({ Reaction: String, RoleID: String, MessageID: String })
);
