const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer({ dest: "tmp/" });
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(`It is working!`);
});

app.post("/upload", upload.single("file"), function (req, res) {
  console.log(req.file);

  let file = "./uploads" + "/" + req.file.originalname;

  fs.rename(req.file.path, file, function (err) {
    if (err) {
      res.send(500);
      console.log("błąd");
    } else {
      res.json({
        message: "File uploaded successfully",
        filename: req.originalname,
      });
      console.log("dodano plik");
    }
  });
});

app.listen(process.env.PORT || 8080, () => console.log("Server is running"));
