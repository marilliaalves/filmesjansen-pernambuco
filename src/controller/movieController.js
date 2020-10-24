const movies = require("../models/movies.json")


// GET
const getAllMovies = (req, res) => {
    console.log(req.url)
    res.status(200).send(movies)
}
// Incremento de GET para buscar por id

const getMovie = (req, res) => {
    const movieId = req.params.id
    const movieFound = movies.find((movie) => movie.id == movieId)
    if (movieFound) {
        res.status(200).send(movieFound)
    } else {
        res.status(404).send({ message: "Eita, não achamos o filme." })
    }
}

//POST
const fs = require("fs")

const createMovie = (req, res) => {
    const { id, name, year, filmDirector, watched } = req.body
    movies.push({ id, name, year, filmDirector, watched })
    fs.writeFile("./src/models/movies.json", JSON.stringify(movies), 'utf8', function (err) { 
        if (err) {
            res.status(500).send({ message: err })
        } else {
            console.log("Os filmes foram atualizados, visse?")
            const movieFound = movies.find(movie => movie.id == id)      
            res.status(200).send(movieFound)
        }
    })
}

// PUT

const updateMovie = (req, res) => {
    try {
        const movieId = req.params.id
        const movieToUpdate = req.body 

        const movieFound = movies.find(movie => movie.id == movieId) 
        const movieIndex = movies.indexOf(movieFound) 

        if (movieIndex >= 0) { 
            movies.splice(movieIndex, 1, movieToUpdate) 
        } else {
            res.status(404).send({ message: "Eita, não encontramos o filme que você quer atualizar." })
        }

        fs.writeFile("./src/models/movies.json", JSON.stringify(movies), 'utf8', function (err) { 
            if (err) {
                res.status(500).send({ message: err }) 
            } else {
                console.log("Aí sim! Filme atualizado com sucesso.")
                const movieUpdated = movies.find(movie => movie.id == movieId) 
                res.status(200).send(movieUpdated) 
            }
        })
    } catch (err) {
        res.status(500).send({ message: err }) 
    }
}

// PATCH

const updateWatchedStatus = (req, res) => {
    try {
        const movieId = req.params.id 
        const watched = req.body.watched //  valor true ou false

        const movieToUpdate = movies.find(movie => movie.id == movieId) 
        const movieIndex = movies.indexOf(movieToUpdate) 

        if (movieIndex >= 0) {
            movieToUpdate.watched = watched 
            movies.splice(movieIndex, 1, movieToUpdate) 
        } else {
            res.status(404).send({ message: "Ih... O filme não foi encontrado." })
        }

        fs.writeFile("./src/models/movies.json", JSON.stringify(movies), 'utf8', function (err) { 
            if (err) {
                res.status(500).send({ message: err })
            } else {
                console.log("Foi atualizado, visse?")
                const movieUpdated = movies.find((movie) => movie.id == movieId) 
                res.status(200).send(movieUpdated) 
            }
        })
    } catch (err) {
        res.status(500).send({ message: err })
    }
}

// DELETE

const deleteMovie = (req, res) => {
    try {
        const movieId = req.params.id
        const movieFound = movies.find(movie => movie.id == movieId) 
        const movieIndex = movies.indexOf(movieFound) 

        if (movieIndex >= 0) { 
            movies.splice(movieIndex, 1) 
        } else {
            res.status(404).send({ message: "Não encontramos o filme que você quer deletar." })
        }

        fs.writeFile("./src/models/movies.json", JSON.stringify(movies), 'utf8', function (err) { 
            if (err) {
                res.status(500).send({ message: err })
            } else {
                console.log("O filme foi deletado!")
                res.sendStatus(204)
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: "Erro ao deletar o filme" })
    }
}



module.exports = {
    createMovie,
    updateMovie,
    updateWatchedStatus,
    getMovie,
    getAllMovies,
    deleteMovie
}