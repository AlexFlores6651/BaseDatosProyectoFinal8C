const express = require('express');
const cors = require('cors'); // Importa cors
const db = require('./db');
const bodyParser = require('body-parser'); 
const app = express();
const port = 3333;

app.use(cors()); // Habilita CORS
app.use(bodyParser.json()); // Usar body-parser para solicitudes JSON
app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/productos', (req, res) => {
  db.query('SELECT * FROM Producto', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/api/productos', (req, res) => {
  let query = 'SELECT * FROM Producto WHERE 1=1';
  let queryParams = [];

  // Verificar y agregar filtro de precio
  if (req.query.precio) {
    query += ' AND precio <= ?';
    queryParams.push(req.query.precio);
  }

  // Verificar y agregar filtro de categoría
  if (req.query.categoria) {
    query += ' AND categoria = ?';
    queryParams.push(req.query.categoria);
  }

  // Ejecutar la consulta con los filtros
  db.query(query, queryParams, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/api/datos/:tabla', (req, res) => {
    const tabla = req.params.tabla;
    db.query(`SELECT * FROM ${tabla}`, (err, results) => {
        if(err) throw err;
        res.json(results);
    });
});

app.get('/api/stock', (req, res) => {
  const query = `
      SELECT p.id as ID, p.nombre as Producto, ps.cantidad as Cantidad,
             s.id as "ID Sucursal", s.nombre as sucursal
      FROM producto_sucursal ps
      JOIN Producto p ON ps.id_prod = p.id
      JOIN sucursal s ON ps.id_sucursal = s.id;
  `;
  db.query(query, (err, results) => {
      if (err) throw err;
      res.json(results);
  });
});

app.get('/stock', (req, res) => {
  const query = `
      SELECT p.id as ID, p.nombre as Producto, ps.cantidad as Cantidad,
             s.id as "ID Sucursal", s.nombre as sucursal
      FROM producto_sucursal ps
      JOIN Producto p ON ps.id_prod = p.id
      JOIN sucursal s ON ps.id_sucursal = s.id;
  `;
  db.query(query, (err, results) => {
      if (err) throw err;
      res.json(results);
  });
});


// Endpoint para filtrar productos
app.post('/api/tabla/productos/filtrar', async (req, res) => {
  const filtros = req.body;
  
  try {
    const connection = await pool.getConnection();

    let sql = 'SELECT * FROM Producto WHERE 1=1';
    const values = [];

    if (filtros.precio !== undefined) {
      sql += ' AND precio <= ?';
      values.push(filtros.precio);
    }
    if (filtros.cantidad !== undefined) {
      sql += ' AND cantidad >= ?';
      values.push(filtros.cantidad);
    }
    if (filtros.disponibilidad !== undefined) {
      sql += ' AND disponibilidad = ?';
      values.push(filtros.disponibilidad);
    }

    const [rows, fields] = await connection.query(sql, values);
    connection.release(); // Liberar la conexión

    res.json(rows);
  } catch (err) {
    console.error('Error al filtrar productos:', err);
    res.status(500).send('Error al filtrar productos');
  }
});

app.get('/api/empleados', (req, res) => {
  const query = `
    SELECT e.id, e.nombre AS empleadoNombre, s.nombre AS sucursalNombre, 
           m.nombre AS municipioNombre, es.nombre AS estadoNombre
    FROM empleado e
    JOIN sucursal s ON e.id_suc = s.id
    JOIN direccion d ON s.cdg_dir = d.id
    JOIN municipio m ON d.id_munic = m.id
    JOIN estado es ON m.id_edo = es.id
  `;
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});


app.get('/api/ventass', (req, res) => {
  const query = `
      SELECT p.nombre as Producto, d.cantidad as Cantidad, d.precio as Precio,
             v.fecha, e.id as 'ID Empleado', e.nombre as 'Nombre Empleado', 
             c.codigo as 'Cliente ID', c.nombre as 'Nombre Cliente'
      FROM Detalle d 
      JOIN Producto p ON d.id_prod = p.id 
      JOIN ventas v ON d.cdg_vta = v.id
      JOIN empleado e ON v.cdg_emp = e.id
      JOIN cliente c ON v.cdg_cte = c.codigo;
  `;

  db.query(query, (err, results) => {
      if (err) {
          console.error('Error executing query:', err);
          res.status(500).send('Server error');
          return;
      }
      res.json(results);
  });
});

app.get('/api/ventass', (req, res) => {
  const query = `
      SELECT p.nombre as Producto, d.cantidad as Cantidad, d.precio as Precio,
             v.fecha, e.id as 'ID Empleado', e.nombre as 'Nombre Empleado', 
             c.codigo as 'Cliente ID', c.nombre as 'Nombre Cliente'
      FROM Detalle d 
      JOIN Producto p ON d.id_prod = p.id 
      JOIN ventas v ON d.cdg_vta = v.id
      JOIN empleado e ON v.cdg_emp = e.id
      JOIN cliente c ON v.cdg_cte = c.codigo;
  `;

  db.query(query, (err, results) => {
      if (err) {
          console.error('Error executing query:', err);
          res.status(500).send('Server error');
          return;
      }
      res.json(results);
  });
});

// Endpoint genérico para obtener datos de cualquier tabla
app.get('/api/datos/:tabla', (req, res) => {
  const tabla = req.params.tabla;
  const query = `SELECT * FROM ??`;  // Usar placeholders para evitar inyección SQL

  db.query(query, [tabla], (err, results) => {
      if (err) {
          console.error('Error executing query:', err);
          res.status(500).send('Server error');
          return;
      }
      res.json(results);
  });
});


app.get('/ventass', (req, res) => {
  const query = `
      SELECT p.nombre as Producto, d.cantidad as Cantidad, d.precio as Precio,
             v.fecha, e.id as 'ID Empleado', e.nombre as 'Nombre Empleado', 
             c.codigo as 'Cliente ID', c.nombre as 'Nombre Cliente'
      FROM Detalle d 
      JOIN Producto p ON d.id_prod = p.id 
      JOIN ventas v ON d.cdg_vta = v.id
      JOIN empleado e ON v.cdg_emp = e.id
      JOIN cliente c ON v.cdg_cte = c.codigo;
  `;

  db.query(query, (err, results) => {
      if (err) {
          console.error('Error executing query:', err);
          res.status(500).send('Server error');
          return;
      }
      res.json(results);
  });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

app.get('/api/clientes', (req, res) => {
  const query = `
    SELECT 
        c.codigo AS CodigoCliente,
        c.clave AS Clave,
        c.nombre AS Nombre,
        c.primape AS PrimerApellido,
        c.segape AS SegundoApellido,
        c.activo AS Activo,
        c.email AS Email,
        c.telefono AS Telefono,
        c.sexo AS Sexo,
        dir.nombre AS Direccion,
        dir.num_ext AS NumeroExterior,
        dir.num_int AS NumeroInterior,
        edo.nombre AS Estado,
        munic.nombre AS Municipio,
        local.nombre AS Localidad,
        frac.nombre AS Fraccionamiento,
        v.fecha AS FechaVenta,
        p.nombre AS ProductoNombre,
        p.descripcion AS ProductoDescripcion,
        p.categoria AS CategoriaProducto,
        p.sku AS SKUProducto,
        d.precio AS PrecioProducto,
        d.cantidad AS CantidadProducto
    FROM 
        cliente c
    LEFT JOIN 
        direccion dir ON c.cdg_dir = dir.id
    LEFT JOIN 
        fraccionamiento frac ON dir.id_fracc = frac.id
    LEFT JOIN 
        localidad local ON dir.id_local = local.id
    LEFT JOIN 
        municipio munic ON dir.id_munic = munic.id
    LEFT JOIN 
        estado edo ON dir.id_edo = edo.id
    LEFT JOIN 
        ventas v ON c.codigo = v.cdg_cte
    LEFT JOIN 
        Detalle d ON v.id = d.cdg_vta
    LEFT JOIN 
        Producto p ON d.id_prod = p.id;
  `;

  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Endpoint para agregar un nuevo empleado
app.post('/api/empleados', (req, res) => {
  const { codigo, nombre, primape, segape, puesto, activo, email, telefono, cdg_dir, id_suc, cdg_jefe } = req.body;
  const query = `
    INSERT INTO empleado (codigo, nombre, primape, segape, puesto, activo, email, telefono, cdg_dir, id_suc, cdg_jefe) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [codigo, nombre, primape, segape, puesto, activo, email, telefono, cdg_dir, id_suc, cdg_jefe], (err, results) => {
    if (err) throw err;
    res.json({ idEmpleado: results.insertId, codigo, nombre, primape, segape, puesto, activo, email, telefono, cdg_dir, id_suc, cdg_jefe });
  });
});

// Endpoint para actualizar un empleado existente
app.put('/api/empleados/:id', (req, res) => {
  const { id } = req.params;
  const { codigo, nombre, primape, segape, puesto, activo, email, telefono, cdg_dir, id_suc, cdg_jefe } = req.body;
  const query = `
    UPDATE empleado SET codigo = ?, nombre = ?, primape = ?, segape = ?, puesto = ?, activo = ?, email = ?, telefono = ?, cdg_dir = ?, id_suc = ?, cdg_jefe = ? 
    WHERE idEmpleado = ?
  `;
  db.query(query, [codigo, nombre, primape, segape, puesto, activo, email, telefono, cdg_dir, id_suc, cdg_jefe, id], (err, results) => {
    if (err) throw err;
    res.json({ idEmpleado: id, codigo, nombre, primape, segape, puesto, activo, email, telefono, cdg_dir, id_suc, cdg_jefe });
  });
});

// Endpoint para eliminar un empleado
app.delete('/api/empleados/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM empleado WHERE idEmpleado = ?';
  db.query(query, [id], (err, results) => {
    if (err) throw err;
    res.json({ idEmpleado: id });
  });
});

