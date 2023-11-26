const Express = require("express");
const router = Express.Router()
const {
    CreateArticle, GetArticles
} = require("../05-controllers/articleController")
const { ArticleImagesUpload } = require("../03-middlewares/imageUpload");

router.post("/create-article", ArticleImagesUpload, CreateArticle)
router.get("/get-articles", GetArticles)

module.exports = router