const Express = require("express");
const router = Express.Router()
const {
    Signup, Login
} = require("../05-controllers/userController")

router.post("/signup", Signup)
router.post("/login", Login)

module.exports = router