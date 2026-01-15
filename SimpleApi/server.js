const http = require('http');

let todos = [];
let id = 1;

const server = http.createServer((req, res) => {

  const myURL = new URL(req.url, `http://${req.headers.host}`);
  const path = myURL.pathname;
  const q = myURL.searchParams;

  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (path === '/add') {
    const task = q.get('task');

    if (!task) {
      res.end('Task is required');
      return;
    }

    todos.push({ id: id++, task });
    res.end('Task Added');
  }

  else if (path === '/list') {
    if (todos.length === 0) {
      res.end('No tasks available');
      return;
    }

    let output = '';
    todos.forEach(t => {
      output += `${t.id} - ${t.task}\n`;
    });
    res.end(output);
  }

  else if (path === '/delete') {
    const deleteId = q.get('id');

    todos = todos.filter(t => t.id != deleteId);
    res.end('Task Deleted');
  }

  else {
    res.end('Invalid Request');
  }
});

server.listen(3000, () => {
  console.log('Simple TODO API running on http://localhost:3000');
});
