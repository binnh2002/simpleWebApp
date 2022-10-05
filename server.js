var express = require("express");
var app = express();

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
// __dirname is the current directory you are in.
app.listen(3000, function () {
  console.log("listening on 3000");
});
