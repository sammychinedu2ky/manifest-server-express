let router = require("express").Router();
let sharp = require("sharp");
let fs = require("fs");
router.use("/", (req, res, next) => {
  let input = sharp(`${req.dir}/upload.png`);
  let sizes = [72, 96, 128, 144, 152, 192, 384, 512];
  sizes.forEach(size => {
    input
      .clone()
      .resize(size)
      .toFile(`${req.dir}/images/icons/icon-${size}x${size}.png`, err => {
        if (size == 512) {
          fs.unlinkSync(`${req.dir}/upload.png`);
          next();
        }
      });
  });
});

module.exports = router;
