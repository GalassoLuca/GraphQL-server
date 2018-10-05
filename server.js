const express = require('express');
const express_graphql = require('express-graphql');
const { buildSchema } = require('graphql');
const app = express();

const coursesData = [
  {
    id: 1,
    title: 'The Complete Node.js Developer Course',
    author: 'Andrew Mead, Rob Percival',
    description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
    topic: 'Node.js',
    url: 'https://codingthesmartway.com/courses/nodejs/'
  },
  {
    id: 2,
    title: 'Node.js, Express & MongoDB Dev to Deployment',
    author: 'Brad Traversy',
    description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
    topic: 'Node.js',
    url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
  },
  {
    id: 3,
    title: 'JavaScript: Understanding The Weird Parts',
    author: 'Anthony Alicea',
    description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
    topic: 'JavaScript',
    url: 'https://codingthesmartway.com/courses/understand-javascript/'
  }
]
const getCourse = function (args) {
  const id = args.id;
  return coursesData.filter(course => {
    return course.id == id;
  })[0];
}
const getCourses = function (args) {
  if (args.topic) {
    const topic = args.topic;
    return coursesData.filter(course => course.topic === topic);
  } else {
    return coursesData;
  }
}
const updateCourseTopic = function ({ id, topic }) {
  coursesData.map(course => {
    if (course.id === id) {
      course.topic = topic;
      return course;
    }
  });
  return coursesData.filter(course => course.id === id)[0];
}

/**
 * Create an express server and a GraphQL endpoint
 */
app.use('/graphql', express_graphql({
  // GraphQL schema
  schema: buildSchema(`
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
    `),
  rootValue: {
    course: getCourse,
    courses: getCourses,
    updateCourseTopic: updateCourseTopic
  },
  graphiql: true
}));

/**
 * API REST with express
 */
// A GET to the root of a resource returns a list of that resource
app.get('/api/', function (req, res) {
  return res.json(getCourses({}));
})

// We specify a param in our path for the GET of a specific object
app.get('/api/:id', function (req, res) {
  return res.json(getCourse(req.params));
})

// Similar to the GET on an object, to update it we can PATCH
app.post('/api/:id', function (req, res) {
  // TODO get the topic from the request with body-parser
  req.params.topic = "Node Node Node"
  return res.json(updateCourseTopic(req.params));
})

app.listen(4000, () => {
  console.log('Express GraphQL Server Now Running On localhost:4000/graphql')
  console.log('API REST Server Now Running On localhost:4000/api')
})
