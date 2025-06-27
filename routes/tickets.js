const express = require('express');
const router = express.Router();
const db = require('../config/database');

// GET / - Listado en vista
router.get('/', (req, res) => {
  db.query('SELECT * FROM tickets ORDER BY created_at DESC', (err, results) => {
    if (err) {
      console.error('Error al obtener tickets:', err);
      return res.status(500).send('Error al cargar tickets');
    }
    res.render('tickets', {
      title: 'Listado de Tickets',
      tickets: results
    });
  });
});

// GET /api - API endpoint para cargar tickets vía AJAX
router.get("/api", (req, res) => {
  db.query("SELECT * FROM tickets ORDER BY created_at DESC", (err, results) => {
    if (err) {
      console.error("Error al obtener tickets:", err)
      return res.status(500).json({ error: "Error al cargar tickets" })
    }
    res.json(results)
  })
})

// POST /create - Crear ticket
router.post('/create', (req, res) => {
  const { subject, category, priority, description } = req.body;
  const user_id = req.user ? req.user.id : 1; // Ajusta según tu sistema de auth
  
  const query = `
    INSERT INTO tickets (user_id, status, subject, category, priority, description, created_at, updated_at) 
    VALUES (?, 'Abierto', ?, ?, ?, ?, NOW(), NOW())
  `;
  
  db.query(query, [user_id, subject, category, priority, description || null], (err, result) => {
    if (err) {
      console.error('Error al crear ticket:', err);
      return res.status(500).send('Error al crear ticket');
    }
    res.redirect('/tickets');
  });
});

// POST /:id/update - Actualizar ticket  
router.post('/:id/update', (req, res) => {
  const { id } = req.params;
  const { subject, category, priority, status, description } = req.body;
  
  const query = `
    UPDATE tickets 
    SET subject = ?, category = ?, priority = ?, status = ?, description = ?, updated_at = NOW() 
    WHERE id = ?
  `;
  
  db.query(query, [subject, category, priority, status, description || null, id], (err, result) => {
    if (err) {
      console.error('Error al actualizar ticket:', err);
      return res.status(500).send('Error al actualizar ticket');
    }
    res.redirect('/tickets');
  });
});

// POST /:id/delete - Eliminar ticket
router.post('/:id/delete', (req, res) => {
  const { id } = req.params;
  
  const query = 'DELETE FROM tickets WHERE id = ?';
  
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar ticket:', err);
      return res.status(500).send('Error al eliminar ticket');
    }
    res.redirect('/tickets');
  });
});

module.exports = router;