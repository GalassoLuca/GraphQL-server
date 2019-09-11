const { readFileSync } = require('fs')
const { join } = require('path')
const readFile = path => readFileSync(join(__dirname, path), 'utf8')

const express = require('express')
const expressGraphql = require('express-graphql')
const { buildSchema } = require('graphql')
const app = express()

const { getCourse, getCourses, updateCourseTopic } = require('./data-layer')

/**
 * Create an express server and a GraphQL endpoint
 */
app.use('/graphql', expressGraphql({
  // GraphQL schema
  schema: buildSchema(readFile('schema.gql')),
  rootValue: {
    course: getCourse,
    courses: getCourses,
    updateCourseTopic: updateCourseTopic
  },
  graphiql: true
}))

/**
 * API REST with express
 */
app.get('/api/', function (req, res) {
  return res.json(getCourses({}))
})

app.get('/api/:id', function (req, res) {
  return res.json(getCourse(req.params))
})

app.post('/api/:id', function (req, res) {
  // TODO get the topic from the request with body-parser
  req.params.topic = 'Node Node Node'
  return res.json(updateCourseTopic(req.params))
})

app.listen(4000, () => {
  console.log('Express GraphQL Server Now Running On localhost:4000/graphql')
  console.log('API REST Server Now Running On localhost:4000/api')
})
