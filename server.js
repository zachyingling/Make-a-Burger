const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 8080;

const app = express();

app.use("/img", express.static(path.join(__dirname, "public/assets/images")));
app.use("/js", express.static(path.join(__dirname, "public/assets/js")));
app.use("/css", express.static(path.join(__dirname, "public/assets/css")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var routes = require("./controllers/burgers_controller.js");

app.use(routes);

app.listen(PORT, () => {
  console.log("Server listening.");
});
