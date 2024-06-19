const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    plotArea: {
      value: Number,
      unit: String 
    },
    plotPrice: Number,
    plotLocation: String,
    highlights: [String],
    pics: [
      {
        type: String,
        required: true,
        default: "https://icon-library.com/images/default-image-icon/default-image-icon-6.jpg" 
      }
    ],
    type: {
      type: String,
      required: true,
      enum: ["Amaravathi", "Andhra", "Telangana", "Commercial"], 
      default: "Amaravathi" 
    }
  },
  {
    timestamps: true
  }
);

postSchema.pre("save", async function (next) {
  if (!this.isModified("pics")) {
    next();
  }

  next();
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
