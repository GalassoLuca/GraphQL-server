const db = require('./db')

module.exports = {
  getCourse,
  getCourses,
  updateCourseTopic
}

function getCourse ({ id }) {
  return db.find(course => course.id === id)
}

function getCourses ({ topic }) {
  if (topic) {
    return db.filter(course => course.topic === topic)
  }

  return db
}

function updateCourseTopic ({ id, topic }) {
  db.map(course => {
    if (course.id === id) {
      course.topic = topic
      return course
    }
  })

  return db.find(course => course.id === id)
}
