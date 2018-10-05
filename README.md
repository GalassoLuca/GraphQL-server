# README

Small comparison with GraphQL with single end poing and API REST

You can start the server with

```
npm start
```

## GraphQL
GraphiQL end point at http://localhost:4000/graphql

### GraphQL Schema
```
type Query {
  course(id: Int!): Course
  courses(topic: String): [Course]
},
type Mutation {
  updateCourseTopic(id: Int!, topic: String!): Course
}
type Course {
  id: Int
  title: String
  author: String
  description: String
  topic: String
  url: String
}
```

## API REST
HTTP GET on http://localhost:4000/api/ to get all the books

HTTP GET on http://localhost:4000/api/:id to get a book from id

HTTP POST on http://localhost:4000/api/:id to update the course of the selected book in ***Node Node Node***

## TIPS
I have reproduced, and took inspiration, from the following articles.

[Creating A GraphQL Server With Node.js And Express](https://medium.com/codingthesmartway-com-blog/creating-a-graphql-server-with-node-js-and-express-f6dddc5320e1)

[Building a Node.js REST API with Express](https://medium.com/@jeffandersen/building-a-node-js-rest-api-with-express-46b0901f29b6)

