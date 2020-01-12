let router = require("express").Router();
let fs = require("fs");
let archiver = require("archiver");

router.use("/", (req, res, next) => {
  let zipFile = fs.createWriteStream(`${req.dir}.zip`);
  let archive = archiver("zip", {
    zlib: { level: 1 }
  });
  archive.pipe(zipFile);
  archive.on("error", function(err) {
    throw err;
  });
  archive.directory(`${req.dir}/`, false);

  zipFile.on("close", () => {
    res.download(`${req.dir}.zip`, "app-image.zip", () => {
      next();
    });
  });

  archive.finalize();
});

module.exports = router;
