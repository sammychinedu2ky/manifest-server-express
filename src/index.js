let express = require("express");
let fs = require("fs");
let app = express();
let genid = require("uuid");
let session = require("express-session");
let createFolders = require("./process/createfolders");
let createImages = require("./process/createimages");
let writeManifest = require("./process/writeManifest");
let zipFile = require("./process/zipFile");
let delDocs = require("./process/delDocs");
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    cookie: { secure: true }
  })
);

app.use(createFolders, createImages, writeManifest, zipFile, delDocs);

app.get("/", (req, res) => {});
app.listen(5000, () => {
  console.log("server is listening");
});
