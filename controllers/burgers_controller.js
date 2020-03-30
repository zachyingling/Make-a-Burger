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

router.put("/api/burgers/", (req, res) => {
  burger.update(
    { devoured: req.body.devouredValue },
    "id = " + req.body.newID,
    result => {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    }
  );
});

module.exports = router;
