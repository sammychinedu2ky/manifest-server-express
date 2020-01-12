let router = require("express").Router();
let fs = require("fs");
let formidable = require("formidable");
const genid = require("uuid");

router.use("/", (req, res, next) => {
  let dir = genid();
  req.dir = dir;
  fs.mkdir(`${dir}/images/icons`, { recursive: true }, err => {
    if (err) console.log(err);
    let form = new formidable.IncomingForm();
    form.uploadDir = dir;
    form.parse(req, (err, fields, files) => {
      req.manifest = JSON.parse(fields.manifest);
      fs.rename(files.pic.path, `${dir}/upload.png`, err => {
        next();
      });
    });
  });
});

module.exports = router;
