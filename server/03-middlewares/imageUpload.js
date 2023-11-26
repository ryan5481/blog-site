const multer = require('multer')

//BOARD MEMBER CITIZENSHIP FILE
const articleImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../client/src/uploads/articleImages/")
    },
    filename: function (req, file, cb) {
        cb(null, "Article_img_" + Date.now() + ".jpeg")
    }
}) 

const ArticleImagesUpload = multer({storage: articleImageStorage }).single("heroImage")
// ([
//     {name: "heroImage", maxCount: 1},
    // {name: "image1", maxCount: 1},
    // {name: "image2", maxCount: 1},
    // {name: "image3", maxCount: 1},
    // {name: "image4", maxCount: 1},
    // {name: "image5", maxCount: 1}
// ])


exports.ArticleImagesUpload = ArticleImagesUpload;
