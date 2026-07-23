let books = [];
let nextId = 1;

exports.getAllBooks = (req, res) => {
  const { author, year, title, page, limit } = req.query;

  let filtered = books;

  // Filter by author
  if (author) {
    filtered = filtered.filter(b =>
      b.author.toLowerCase() === author.toLowerCase()
    );
  }

  // Filter by year
  if (year) {
    filtered = filtered.filter(b =>
      b.year == year
    );
  }

  //  Search by title
  if (title) {
    filtered = filtered.filter(b =>
      b.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  // Pagination
  const pageNumber = parseInt(page) || 1;
  const limitNumber = parseInt(limit) || filtered.length;

  const start = (pageNumber - 1) * limitNumber;
  const end = start + limitNumber;

  const paginated = filtered.slice(start, end);

  res.json({
    total: filtered.length,
    page: pageNumber,
    limit: limitNumber,
    data: paginated
  });
};

exports.getBookById = (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json(book);
};

exports.createBook = (req, res) => {
  const { title, author, year } = req.body;
  const newBook = { id: nextId++, title, author, year };
  books.push(newBook);
  res.status(201).json(newBook);
};

exports.updateBook = (req, res) => {
  const index = books.findIndex(b => b.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "Book not found" });

  books[index] = { id: parseInt(req.params.id), ...req.body };
  res.json(books[index]);
};

exports.patchBook = (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  if (!book) return res.status(404).json({ error: "Book not found" });

  Object.assign(book, req.body);
  res.json(book);
};

exports.deleteBook = (req, res) => {
  books = books.filter(b => b.id != req.params.id);
  res.json({ message: "Deleted successfully" });
};