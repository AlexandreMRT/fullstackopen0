require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const PORT = process.env.PORT

morgan.token('person',
  (req, res) => req.method === 'POST' ? JSON.stringify(req.body) : ' '
)

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'));

app.use(express.json())

app.use(express.static('build'))

app.use(cors())

// const generateId = () => {
//   const id  = Math.random() * (10000 - persons.length) + persons.length

//   return Math.floor(id)
// }

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name ||  !body.number) {
    return res.status(400).json({
      error: 'name and/or number missing'
    })
  }
  // TO DO else if to get all people inside the database and check
  // } else if (persons.find(person => person.name === body.name)) {
  //   return res.status(400).json({
  //     error: "Name must be unique"
  //   })
  // }

  const person = new Person({
    name: req.body.name,
    number: req.body.number,
  })

  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
})

app.get('/info', (req, res) => {
  Person.collection.countDocuments({}, function(error, people) {
    res.send(`Phonebook has info for ${people} people <br />
    ${new Date()}`)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})