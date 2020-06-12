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
  res.send(`Phonebook has info for ${persons.length} people <br />
  ${new Date()}`)
})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      res.status(400).send({ error: 'malformatted id' })
    })
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})