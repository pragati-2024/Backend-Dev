function softDeletePlugin(schema) {
  schema.add({
    deleted: { type: Boolean, default: false, index: true },
    deletedAt: { type: Date, default: null },
  });

  function excludeDeleted(next) {
    const opts = this.getOptions ? this.getOptions() : {};
    if (opts && opts.withDeleted) return next();

    const filter = this.getFilter ? this.getFilter() : {};
    if (Object.prototype.hasOwnProperty.call(filter, "deleted")) return next();

    this.where({ deleted: { $ne: true } });
    next();
  }

  schema.pre("find", excludeDeleted);
  schema.pre("findOne", excludeDeleted);
  schema.pre("findOneAndUpdate", excludeDeleted);
  schema.pre("countDocuments", excludeDeleted);

  // Replace hard delete ops with soft delete updates
  schema.statics.deleteOne = function (filter, options) {
    return this.updateOne(
      filter,
      { $set: { deleted: true, deletedAt: new Date() } },
      options,
    );
  };

  schema.statics.deleteMany = function (filter, options) {
    return this.updateMany(
      filter,
      { $set: { deleted: true, deletedAt: new Date() } },
      options,
    );
  };

  schema.statics.findOneAndDelete = function (filter, options) {
    return this.findOneAndUpdate(
      filter,
      { $set: { deleted: true, deletedAt: new Date() } },
      { ...options, new: true },
    );
  };

  schema.statics.findByIdAndDelete = function (id, options) {
    return this.findOneAndUpdate(
      { _id: id },
      { $set: { deleted: true, deletedAt: new Date() } },
      { ...options, new: true },
    );
  };

  schema.methods.softDelete = function () {
    this.deleted = true;
    this.deletedAt = new Date();
    return this.save();
  };
}

module.exports = { softDeletePlugin };
