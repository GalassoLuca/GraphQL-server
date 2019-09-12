const { readFileSync } = require('fs')
const { join } = require('path')
const readFile = path => readFileSync(join(__dirname, path), 'utf8')

const express = require('express')
const expressGraphql = require('express-graphql')
const { buildSchema } = require('graphql')
const app = express()

const { getBook, getBooks, updateBookAuthor } = require('./data-layer')

/**
 * Create an GraphQL endpoint with express
 */
app.use('/graphql', expressGraphql({
  // GraphQL schema
  schema: buildSchema(readFile('schema.gql')),
  rootValue: {
    book: getBook,
    books: getBooks,
    updateBookAuthor: updateBookAuthor
  },
  graphiql: true
}))

/**
 * API REST with express
 */
app.get('/api/', function (req, res) {
  return res.json(getBooks({}))
})

app.get('/api/:id', function (req, res) {
  return res.json(getBook(req.params))
})

app.post('/api/:id', function (req, res) {
  // TODO get the author from the request with body-parser
  req.params.author = 'Martin'
  return res.json(updateBookAuthor(req.params))
})

app.listen(4000, () => {
  console.log('Express GraphQL Server Now Running On localhost:4000/graphql')
  console.log('API REST Server Now Running On localhost:4000/api')
})
