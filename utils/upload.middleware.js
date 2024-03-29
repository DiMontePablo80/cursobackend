const multer = require("multer");

const storage = multer.diskStorage({
    destination: "public/images/products/",
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + ".png");
    }
});

const upload = multer({ storage });
module.exports = upload;