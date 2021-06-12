const mongoose = require('mongoose');
const express = require('express');

const app = express()

const Cat = require('./models/Cat.model')

const cats = require('./cats.json')

mongoose
  .connect('mongodb://localhost:27017/animals', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Successfully connected to database"))
  .catch((err) => console.error("Error connecting to the database", err))


//Para cuando hagamos webs

// process.on('SIGINT', () => {
//   mongoose.connection.close(() => {
//     console.log('Disconnected from database')
//     process.exit(0)
//   })
// })

mongoose.connection.once('connected', () => {
  //Borrar base de datos
  mongoose.connection.db.dropDatabase()
    .then(() => {
      console.log('Database cleared')

      // Insertar mi primer gato
      return Cat.create({ name: "Garfield", age: 10, color: "Brown" })
    })
    .then((cat) => {
      console.log(`Cat with the name ${cat.name} has been created`)

      return Cat.insertMany(cats)
    })
    .then(cats => {
      cats.forEach(cat => console.log(`Cat with the name ${cat.name} has been created`))

      return Cat.findOneAndUpdate({ name: "Gatito1" }, { name: "Gato1" }, { new: true })
    })
    .then((catUpdated) => {
      console.log(catUpdated)

      return Cat.deleteOne({ name: 'Garfield' })
    })
    .then(() => {
      console.log('cat deleted')

      console.log('The final cats on database are:')
      return Cat.find()
    })
    .then(cats => cats.forEach((cat) => console.log(cat.name)))
    .catch((err) => console.error(err))
    .finally(() => {
      mongoose.connection.close(() => {
        console.log('Disconnected from database')
        process.exit(0)
      })
    })
})

// app.get('/', (req, res) => {
//   Cat.findById("60c49da6f61f059b54c06bd7")
//     .then((cats) => res.send(cats))
//     .catch(err => console.log(err))
// })

// app.listen(3000, () => console.log('Listening on port 3000'))