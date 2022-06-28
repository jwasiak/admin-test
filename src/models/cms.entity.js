const mongoose = require("mongoose");

const CmsSchema = new mongoose.Schema({
  title: String,
  content: String,
  amount: String,
});

const Cms = mongoose.model("cms", CmsSchema);

module.exports = Cms;
