const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

app.use(cors());
app.use(bodyParser.json());

// npm run dev 
// middleware 
app.use(async function(req, res, next) {
    try {
      req.db = await pool.getConnection();
      req.db.connection.config.namedPlaceholders = true;
  
      await req.db.query(`SET SESSION sql_mode = "TRADITIONAL"`);
      await req.db.query(`SET time_zone = '-8:00'`);
  
      await next();
  
      req.db.release();
    } catch (err) {
      console.log(err);
  
      if (req.db) req.db.release();
      throw err;
    }
});

// getting all cars that arent deleted
app.get('/cars', async (req, res) => {
    try {
        const [query] = await req.db.query(
            'SELECT * FROM car WHERE deleted_flag = 0'
        )
        res.json({ success: true, message: 'Car successfully created', data: query })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// adding a new car request 
app.post('/add-car', async(req, res) => {
    const { make, model, year } = req.body;
    try {
        const query = await req.db.query(
          `INSERT INTO car (make, model, year, deleted_flag) 
           VALUES (:make, :model, :year, :deleted_flag)`,
          {
            make,
            model,
            year,
            deleted_flag: 0
          }
        )
    res.json({ success: true, message: 'Car added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/cars/:id', async(req, res) => {
    const { id } = req.params;
    const { make, model, year } = req.body;
    try {
        const cars = await req.db.query(
        `UPDATE car SET make=:make, model=:model, year=:year
            WHERE (id = :id)`
        , {
                id,
                model,
                make,
                year,
            }
        );
        res.json({ success: true, message: 'Car updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/cars/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [cars] = await req.db.query(
            `UPDATE car SET deleted_flag=:deleted_flag WHERE id = :id`,
            {
                id,
                deleted_flag: 1
            }
        );
        res.json({ message: 'Car deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});