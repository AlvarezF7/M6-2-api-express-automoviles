
require('dotenv').config(); 

const express = require('express');
const path = require('path'); //modulo para rutas absolutas
const app = express();

const pool = require('./data_base'); 

const PORT = process.env.PORT || 3000; //puerto donde escucha express

app.use(express.json());
app.use(express.static('public')); //conecta el front al api



//ruta especifica
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//GET /conductores: retorna la lista de todos los conductores.
app.get('/conductores', async (req, res) => {
  try {
    const {rows} = await pool.query('SELECT nombre FROM conductores'); //  consulta SQL
    res.json(rows);  //devuelve los resultados como JSON
  } 
    catch (err) {
    console.error(err.message);
    res.status(500).send('Error en la consulta');
  }
});

//GET /automóviles: retorna la lista de todos los automóviles.
app.get('/automoviles', async (req, res) =>{
  try{
    const {rows}  = await pool.query('SELECT patente, marca FROM automoviles');
    res.status(200).json(rows);
  } 
   
    catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

//GET /conductoressinauto?edad=49:devuelve los conductores menores a 49 sin auto

app.get('/conductoressinauto', async (req, res) => {
  try {
    const { edad } = req.query;

    const { rows } = await pool.query(
      `SELECT co.nombre, co.edad
       FROM conductores co
       LEFT JOIN automoviles au
       ON co.nombre = au.nombre_conductor
       WHERE au.nombre_conductor IS NULL
       AND co.edad < $1`,
      [edad]
    );

    res.status(200).json(rows);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

//GET /solitos: retorna la lista de conductores sin automóvil y automóviles sin conductor.

app.get('/solitos', async (req, res) => {
  try {
    // Conductores sin auto
    const { rows: conductores } = await pool.query(
      `SELECT nombre, edad
       FROM conductores co
       LEFT JOIN automoviles au
       ON co.nombre = au.nombre_conductor
       WHERE au.nombre_conductor IS NULL`
    );

    // Autos sin conductor
    const { rows: autos } = await pool.query(
      `SELECT marca, patente
       FROM automoviles au
       LEFT JOIN conductores co
       ON au.nombre_conductor = co.nombre
       WHERE co.nombre IS NULL`
    );

    res.status(200).json({
      conductores_sin_auto: conductores,
      autos_sin_conductor: autos
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// GET /auto_patente : Devuelve autos que coincidan con 'patente' (parcial) o
//  'iniciopatente' (inicio) y sus conductores.
app.get('/auto', async (req, res) => {
  try {
    const { patente, iniciopatente } = req.query;

    if (!patente && !iniciopatente) {
      return res.status(400).json({
        error: "Se requiere al menos un parámetro: 'patente' o 'iniciopatente'"
      });
    }

    let query = `
      SELECT au.marca, au.patente, co.nombre AS conductor, co.edad AS edad_conductor
      FROM automoviles au
      LEFT JOIN conductores co
      ON au.nombre_conductor = co.nombre
      WHERE 1=1
    `;
    const params = [];

    if (patente) {
      params.push(`%${patente}%`);
      query += ` AND au.patente ILIKE $${params.length}`;
    }

    if (iniciopatente) {
      params.push(`${iniciopatente}%`);
      query += ` AND au.patente ILIKE $${params.length}`;
    }

    const { rows } = await pool.query(query, params);

    if (rows.length === 0) {
      return res.status(404).json({
        error: "No se encontraron automóviles con los parámetros enviados"
      });
    }

    res.status(200).json(rows);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      error: "Error del servidor"
    });
  }
});


//Escucha los puertos
app.listen(PORT,() =>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
})


