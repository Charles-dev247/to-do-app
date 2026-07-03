const db = require('../model/db');
//read
exports.getTodos = (req, res) => {
  db.query('SELECT * FROM todo', (err, results) => {
    if (err) {
      console.error('Error fetching todos:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
};
//create
exports.createTodos = (req, res) => {
  const title = req.body.title !== undefined ? req.body.title : req.query.title;
  const completed = req.body.completed !== undefined ? req.body.completed : req.query.completed;
  const isCompleted = (completed === 'true' || completed === true || completed === '1' || completed === 1) ? 1 : 0;

  db.query('INSERT INTO todo (title, completed) VALUES (?, ?)', [title, isCompleted], (err, results) => {
    if (err) {
      console.error('Error creating todo:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.status(201).json({ id: results.insertId, title, completed: !!isCompleted });
  });
};
//update
exports.updateTodos = (req, res) => {
  const { id } = req.params;
  const title = req.body.title !== undefined ? req.body.title : req.query.title;
  const completed = req.body.completed !== undefined ? req.body.completed : req.query.completed;
  const isCompleted = (completed === 'true' || completed === true || completed === '1' || completed === 1) ? 1 : 0;

  db.query('UPDATE todo SET title = ?, completed = ? WHERE id = ?', [title, isCompleted, id], (err, results) => {
    if (err) {
      console.error('Error updating todo:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json({ id, title, completed: !!isCompleted });
  });
};
//delete
exports.deleteTodos = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM todo WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error deleting todo:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json({ message: 'Todo deleted successfully' });
  });
};