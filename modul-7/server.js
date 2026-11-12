const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Koneksi ke Database db_kampus
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_kampus'
});

db.connect((err) => {
    if (err) {
        console.error('Gagal terhubung ke database MySQL:', err);
        return;
    }
    console.log('Terhubung ke database MySQL db_kampus!');
});

// GET: Ambil semua data
app.get('/api/mahasiswa', (req, res) => {
    const query = 'SELECT * FROM mahasiswa ORDER BY id DESC';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// POST: Tambah data baru (dengan Email)
app.post('/api/mahasiswa', (req, res) => {
    const { nim, nama, jurusan, email } = req.body;
    const query = 'INSERT INTO mahasiswa (nim, nama, jurusan, email) VALUES (?, ?, ?, ?)';
    db.query(query, [nim, nama, jurusan, email || ''], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Mahasiswa berhasil ditambahkan', id: results.insertId });
    });
});

// PUT: Edit data
app.put('/api/mahasiswa/:id', (req, res) => {
    const { id } = req.params;
    const { nim, nama, jurusan, email } = req.body;
    const query = 'UPDATE mahasiswa SET nim = ?, nama = ?, jurusan = ?, email = ? WHERE id = ?';
    db.query(query, [nim, nama, jurusan, email || '', id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Mahasiswa berhasil diperbarui' });
    });
});

// DELETE: Hapus data
app.delete('/api/mahasiswa/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM mahasiswa WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Mahasiswa berhasil dihapus' });
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server berjalan pada port: http://localhost:${PORT}`);
});