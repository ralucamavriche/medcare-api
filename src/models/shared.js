module.exports.toJSON = function (doc, ret) {
  ret.id = ret._id
  delete ret._id
  delete ret.__v
}