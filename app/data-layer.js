const db = require('./db')

module.exports = {
  getBook,
  getBooks,
  updateBookAuthor
}

function getBook ({ id }) {
  return db.find(book => book.id === id)
}

function getBooks ({ author }) {
  if (author) {
    return db.filter(book => book.author.includes(author))
  }

  return db
}

function updateBookAuthor ({ id, author }) {
  db.find(book => {
    if (book.id === id) {
      book.author = author
      return book
    }
  })

  return db.find(book => book.id === id)
}
