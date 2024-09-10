const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'todo_app' 
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL database.');
});

app.get('/tasks', (req, res) => {
  connection.query('SELECT * FROM tasks', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.post('/tasks', (req, res) => {
  const { title, description, category, due_date, reminder } = req.body;
  connection.query(
    'INSERT INTO tasks (title, description, category, due_date, reminder) VALUES (?, ?, ?, ?, ?)',
    [title, description, category, due_date, reminder],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: results.insertId });
    }
  );
});

app.put('/tasks', (req, res) => {
  const { id, title, description, category, due_date, reminder } = req.body;
  connection.query(
    'UPDATE tasks SET title = ?, description = ?, category = ?, due_date = ?, reminder = ? WHERE id = ?',
    [title, description, category, due_date, reminder, id],
    (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ success: true });
    }
  );
});

app.delete('/tasks', (req, res) => {
  const { id } = req.body;
  connection.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
