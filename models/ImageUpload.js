const mongoose = require("mongoose");

const imageUploadSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("imgUpload", imageUploadSchema);
