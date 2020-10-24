const express = require("express")
// const app = require("../app")
const router = express.Router()

router.get("/", function(req, res) {
    res.status(200).send({
        title:"Reprograma semana 11 - Revisão",
        version: "1.0.0"
    })
})

// module.exports = app.js
module.exports = router