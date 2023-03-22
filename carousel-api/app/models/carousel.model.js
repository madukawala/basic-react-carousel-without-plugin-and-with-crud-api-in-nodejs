module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      subTitle: String,
      image: String
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Carousel = mongoose.model("carousel", schema);
  return Carousel;
};
