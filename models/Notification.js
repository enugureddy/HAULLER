// models/Notification.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  },
  {
    collection: 'member_notifications',
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// ✅ Indexing for performance on userId & isRead
notificationSchema.index({ userId: 1, isRead: 1 });

// ✅ Virtual for human-readable time ago (example)
notificationSchema.virtual('timeAgo').get(function () {
  const now = Date.now();
  const diffMs = now - this.createdAt.getTime();
  const mins = Math.floor(diffMs / 60000);
  return mins < 60 ? `${mins} mins ago` : `${Math.floor(mins / 60)} hrs ago`;
});

// ✅ Optional: Populate user on query (reference join)
notificationSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true
});

module.exports = mongoose.model('Notification', notificationSchema);
