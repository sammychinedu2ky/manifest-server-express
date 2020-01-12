let express = require("express");
let fs = require("fs");
let app = express();
let genid = require("uuid");
let createFolders = require("./process/createfolders");
let createImages = require("./process/createimages");
let writeManifest = require("./process/writeManifest");
let zipFile = require("./process/zipFile");
let delDocs = require("./process/delDocs");

app.get("/", (req, res) => {
  res.json({say:"hi"})
});
app.use(createFolders, createImages, writeManifest, zipFile, delDocs);


app.listen(process.env.PORT || 5000, () => {
  console.log("server is listening");
});
