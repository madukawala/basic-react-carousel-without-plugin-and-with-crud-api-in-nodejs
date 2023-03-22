module.exports = app => {
  const carousels = require("../controllers/carousel.controller.js");

  var router = require("express").Router();

  // Create a new Carousel
  router.post("/", carousels.create);

  // Retrieve all Carousels
  router.get("/", carousels.findAll);

  // Retrieve a single Carousel with id
  router.get("/:id", carousels.findOne);

  // Update a Carousel with id
  router.put("/:id", carousels.update);

  // Delete a Carousel with id
  router.delete("/:id", carousels.delete);

  // Create a new Carousel
  router.delete("/", carousels.deleteAll);

  app.use("/api/carousel", router);
};
