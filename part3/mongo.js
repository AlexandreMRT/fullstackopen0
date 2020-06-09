const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Please provide the passowrd as an aragument: node mongo.js <password>');
  process.exit(1);
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@fullstackopen-ho7ye.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('person', personSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
})

if (process.argv.length === 3) {
  
  Person.find({}).then(result => {
    result.map(result => {
      console.log(result.name, result.number);
    })
    mongoose.connection.close()
  })
} else if (process.argv.length > 3) {
  
  person.save().then(result => {
    console.log(`added ${person.name} number ${person.number} to phonebook`);
    mongoose.connection.close()
  })
}



