let authors = [];
let nextAuthorId = 1;

exports.getAllAuthors = (req, res) => {
  res.json(authors);
};

exports.getAuthorById = (req, res) => {
  const author = authors.find(a => a.id == req.params.id);
  if (!author) return res.status(404).json({ error: "Author not found" });
  res.json(author);
};

exports.createAuthor = (req, res) => {
  const { name, country } = req.body;
  const newAuthor = { id: nextAuthorId++, name, country };
  authors.push(newAuthor);
  res.status(201).json(newAuthor);
};

exports.updateAuthor = (req, res) => {
  const index = authors.findIndex(a => a.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "Author not found" });

  authors[index] = { id: parseInt(req.params.id), ...req.body };
  res.json(authors[index]);
};

exports.deleteAuthor = (req, res) => {
  authors = authors.filter(a => a.id != req.params.id);
  res.json({ message: "Deleted successfully" });
};