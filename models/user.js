// models/User.js (or Post.js)
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      description: String,
      price: {
        type: Number,
        required: true,
      },
      image: {
        type: String, // This will typically be a URL or a Cloudinary public_id
        required: true,
      },
      timestamp: {
        type: Number,
        default: () => Date.now(),
      },
      adDateTime: {
        type: Date,
        default: () => new Date(),
      }
  
});

module.exports = mongoose.model('User', userSchema);
