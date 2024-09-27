const { model, Schema } = require("mongoose");
const { String } = require("../util/schemaArguments");

module.exports = model("whitelist", new Schema({ Username: String }));
