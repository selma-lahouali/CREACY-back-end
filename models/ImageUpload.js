const mongoose = require("mongoose");

const imageUploadSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const imageUpload = mongoose.model("imageUpload", imageUploadSchema);

module.exports = imageUpload;
