const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    plotArea: {
      value: Number,
      unit: String // Store the unit separately as a string
    },
    plotPrice: Number,
    plotLocation: String,
    highlights: [String],
    pics: [
      {
        type: String,
        required: true,
        default: "https://icon-library.com/images/default-image-icon/default-image-icon-6.jpg" // Default picture URL
      }
    ]
  },
  {
    timestamps: true
  }
);

postSchema.pre("save", async function (next) {
  if (!this.isModified("pics")) {
    next();
  }

  // Handle logic for uploading the pictures here, e.g., resizing, saving to storage, etc.
  // For now, just proceed to the next middleware
  next();
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
