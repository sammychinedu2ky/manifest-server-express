let router = require("express").Router();
let fs = require("fs");

router.use((req, res, next) => {
  try {
    let files = fs.readdirSync(`${req.dir}/images/icons`);
    for (file of files) {
      fs.unlinkSync(`${req.dir}/images/icons/${file}`);
    }
    fs.unlinkSync(`${req.dir}.zip`);
    fs.rmdirSync(`${req.dir}/images`, { recursive: true });
    fs.unlinkSync(`${req.dir}/manifest.json`);
    fs.rmdirSync(`${req.dir}`, { recursive: true });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
