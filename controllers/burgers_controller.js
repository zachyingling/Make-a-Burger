const express = require("express");

let router = express.Router();

const burger = require("../models/burger.js");

router.get("/", (req, res) => {
  burger.all(data => {
    let tempObject = {
      burgers: data
    };
    res.render("index", tempObject);
  });
});

router.post("/api/burgers", (req, res) => {
  burger.insert(
    ["burger_name", "devoured"],
    [req.body.burgername.toString(), "0"],
    result => {
      res.redirect("/");
    }
  );
});

router.put("/api/burgers", (req, res) => {});

module.exports = router;
