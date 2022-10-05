var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var MongoClient = require("mongodb").MongoClient;
var connectionString =
  "mongodb+srv://binnh2002:220298Binh.@cluster0.rmcrbyb.mongodb.net/?retryWrites=true&w=majority";
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to Database");

    // kết nối / tạo database 'star-wars-quotes'
    const db = client.db("star-wars-quotes");

    // kết nối / tạo collection 'quotes'
    const quotesCollection = db.collection("quotes");

    // khi client truy cập port 3000 của server,
    // server sẽ trả về file index.html
    app.get("/", (req, res) => {
      // Note: __dirname is directory current directory you're in. Try logging it and see what you get!
      // Mine was '/Users/zellwk/Projects/demo-repos/crud-expressmongo' for this app.
      db.collection("quotes")
        .find()
        .toArray()
        .then((results) => {
          res.render("index.ejs", { quotes: results });
          console.log(results);
        })
        .catch((error) => console.error(error));
    });

    // client -> POST -> '/quotes' -> server -> 'Helloooo!' -> console
    app.post("/quotes", (req, res) => {
      quotesCollection
        .insertOne(req.body)
        .then((result) => {
          console.log(result);
          res.redirect("/");
        })
        .catch((error) => console.error(error));
    });

    // server lắng nghe port 3000
    const { PORT = 3000, LOCAL_ADDRESS = "0.0.0.0" } = process.env;
    app.listen(PORT, LOCAL_ADDRESS, () => {
      const address = server.address();
      console.log("server listening at", address);
    });
    // app.listen(3000, function () {
    //   console.log("listening on 3000");
    // });
  })
  .catch((error) => console.error(error));
