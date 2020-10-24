const express = require("express")
const router = express.Router()
const controller = require("../controller/movieController.js")

// GET

router.get("/", controller.getAllMovies) // p retornar todos os filmes
router.get("/:id", controller.getMovie) // retorna por id


// POST

router.post("/", controller.createMovie) // adiciona um filme 

// PUT

router.put("/:id", controller.updateMovie) 

// PATCH

router.patch("/:id/watched", controller.updateWatchedStatus) // altera elementos especificos 

// DELETE

router.delete("/:id", controller.deleteMovie)


module.exports = router