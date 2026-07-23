const express = require('express');
const app = express();

const bookRoutes = require('./routes/books.routes');
const authorRoutes = require('./routes/authors.routes');
const errorHandler = require('./middleware/errorHandler');

app.use(express.json());

app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);

app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// http://localhost:3000/api/books
// http://localhost:3000/api/books?author=George Orwell
// http://localhost:3000/api/books?year=1949
// http://localhost:3000/api/books?title=great
// http://localhost:3000/api/books?page=1&limit=2
// http://localhost:3000/api/books?author=George Orwell&page=1&limit=1
// http://localhost:3000/api/authors/1
